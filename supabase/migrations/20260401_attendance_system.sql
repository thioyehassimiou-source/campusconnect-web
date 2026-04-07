-- Migration: Attendance System v2
-- 20260401_attendance_system.sql

-- 1. Create Sessions Table (for QR code generation)
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES public.profiles(id) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES public.attendance_sessions(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'present' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Prevent duplicate attendance for the same student in the same session
    CONSTRAINT attendance_student_session_unique UNIQUE(student_id, session_id)
);

-- 3. Enable RLS
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Sessions
DROP POLICY IF EXISTS "Instructors can manage their own sessions" ON public.attendance_sessions;
CREATE POLICY "Instructors can manage their own sessions" ON public.attendance_sessions
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND (role = 'teacher' OR role = 'admin')
        )
    );

DROP POLICY IF EXISTS "Anyone authenticated can view sessions" ON public.attendance_sessions;
CREATE POLICY "Anyone authenticated can view sessions" ON public.attendance_sessions
    FOR SELECT TO authenticated USING (true);

-- 5. RLS Policies for Attendance
DROP POLICY IF EXISTS "Students can insert their own attendance" ON public.attendance;
CREATE POLICY "Students can insert their own attendance" 
ON public.attendance FOR INSERT 
TO authenticated 
WITH CHECK (
    auth.uid() = student_id AND
    EXISTS (
        SELECT 1 FROM public.attendance_sessions 
        WHERE id = session_id AND expires_at > NOW()
    )
);

DROP POLICY IF EXISTS "Users can view their own attendance" ON public.attendance;
CREATE POLICY "Users can view their own attendance" 
ON public.attendance FOR SELECT 
TO authenticated 
USING (
    auth.uid() = student_id OR
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND (role = 'teacher' OR role = 'admin')
    )
);

-- 6. Add to Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance;

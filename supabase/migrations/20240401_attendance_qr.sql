-- Migration: Add QR Code Attendance System (Updated)
-- 20240401_attendance_qr.sql

-- 1. Create table if not exists
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY
);

-- 2. Ensure all required columns exist (for cases where table already exists with different schema)
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES public.profiles(id);
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id);
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS session_id UUID;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'present';
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Add constraint if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'attendance_student_session_unique') THEN
        ALTER TABLE public.attendance ADD CONSTRAINT attendance_student_session_unique UNIQUE(student_id, session_id);
    END IF;
END $$;

-- 4. Enable RLS
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to avoid errors during re-run
DROP POLICY IF EXISTS "Students can insert their own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Students can view their own attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can view attendance for their courses" ON public.attendance;
DROP POLICY IF EXISTS "Étudiants peuvent voir leur propre présence" ON public.attendance;
DROP POLICY IF EXISTS "Enseignants peuvent voir les présences" ON public.attendance;
DROP POLICY IF EXISTS "Enseignants peuvent insérer des présences" ON public.attendance;

-- 6. Re-create Policies
-- Students can only insert their own attendance
CREATE POLICY "Students can insert their own attendance" 
ON public.attendance FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = student_id);

-- Students can view their own attendance history
CREATE POLICY "Students can view their own attendance" 
ON public.attendance FOR SELECT 
TO authenticated 
USING (auth.uid() = student_id);

-- Teachers can view attendance for their courses (Dynamic handling of instructor_id/teacher_id)
DO $$ 
DECLARE
    detected_column TEXT;
BEGIN
    -- Detect which column exists in public.courses
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'courses' AND column_name = 'instructor_id') THEN
        detected_column := 'instructor_id';
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'courses' AND column_name = 'teacher_id') THEN
        detected_column := 'teacher_id';
    ELSE
        RAISE EXCEPTION 'Neither instructor_id nor teacher_id found in public.courses table';
    END IF;

    -- Create the policy using the detected column name
    EXECUTE format('
        CREATE POLICY "Teachers can view attendance for their courses" 
        ON public.attendance FOR SELECT 
        TO authenticated 
        USING (
            EXISTS (
                SELECT 1 FROM public.courses 
                WHERE id = attendance.course_id AND %I = auth.uid()
            )
        )
    ', detected_column);
END $$;

-- 1. Create Grades Table
CREATE TABLE IF NOT EXISTS public.grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    grade DECIMAL(5,2), -- e.g. 15.50
    semester INTEGER DEFAULT 1,
    academic_year TEXT DEFAULT '2023-2024',
    status TEXT DEFAULT 'pending', -- 'pending', 'validated', 'retake'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- 3. Policies
CREATE POLICY "Users can view their own grades" ON public.grades
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can manage grades for their courses" ON public.grades
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = grades.course_id AND instructor_id = auth.uid()
        )
    );

-- 4. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.grades;

-- 5. Helper Function for GPA (Optional, can be done client-side)
-- But we can add a view or function if needed for global stats

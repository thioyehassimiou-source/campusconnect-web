-- Migration: Create Assignments table
-- Description: Supports real data for homework/assignments in the student dashboard.

CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  deadline TIMESTAMPTZ NOT NULL,
  type TEXT CHECK (type IN ('report', 'code')) DEFAULT 'report',
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own assignments" ON public.assignments
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can manage assignments for their courses" ON public.assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE id = assignments.course_id AND instructor_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all assignments" ON public.assignments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

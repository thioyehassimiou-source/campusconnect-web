-- Migration: University of Labé Hierarchy

-- 1. Create Faculties Table
CREATE TABLE IF NOT EXISTS public.faculties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id UUID REFERENCES public.faculties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Classes / Levels Table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL, -- 'L1', 'L2', 'L3', 'M1', 'M2'
  semester_count INTEGER DEFAULT 6,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Update existing tables to link to these
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES public.classes(id);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES public.classes(id);

-- RLS for new tables
CREATE POLICY "Faculties are viewable by everyone" ON public.faculties FOR SELECT USING (true);
CREATE POLICY "Departments are viewable by everyone" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Classes are viewable by everyone" ON public.classes FOR SELECT USING (true);

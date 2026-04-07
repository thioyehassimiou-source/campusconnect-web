-- Migration: Enrich Courses Schema with Academic Structure
-- 20260401_enrich_courses.sql

-- 1. Add missing link columns to courses
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS level TEXT; -- e.g., 'L1', 'L2', 'M1'

-- 2. Add sample data to make the dashboard alive
-- We'll link these to the departments created in seed.sql (INF, MIA, etc.)

DO $$ 
DECLARE
    info_dept_id UUID;
    prof_id UUID;
BEGIN
    SELECT id INTO info_dept_id FROM public.departments WHERE code = 'INF' LIMIT 1;
    SELECT id INTO prof_id FROM public.profiles WHERE role = 'teacher' LIMIT 1;

    -- If no teacher found, we'll wait for manual signup or use a placeholder if needed
    -- For now, we assume at least one teacher exists or we'll create courses with NULL instructor first
    
    IF info_dept_id IS NOT NULL THEN
        INSERT INTO public.courses (title, code, department_id, level, credits, instructor_id)
        VALUES 
            ('Algorithmique Avancée', 'INF201', info_dept_id, 'L2', 6, prof_id),
            ('Bases de Données Relationnelles', 'INF202', info_dept_id, 'L2', 4, prof_id),
            ('Développement Web Modernes', 'INF203', info_dept_id, 'L2', 5, prof_id)
        ON CONFLICT (code) DO NOTHING;
    END IF;
END $$;

-- Rename 'nom' to 'name' for consistency with seed.sql
-- 1. faculties
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='faculties' AND column_name='nom') THEN
    ALTER TABLE public.faculties RENAME COLUMN nom TO name;
  END IF;
END $$;

-- 2. departments
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='departments' AND column_name='nom') THEN
    ALTER TABLE public.departments RENAME COLUMN nom TO name;
  END IF;
END $$;

-- 3. services
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='nom') THEN
    ALTER TABLE public.services RENAME COLUMN nom TO name;
  END IF;
END $$;

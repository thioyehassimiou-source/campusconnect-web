-- CampusConnect Schema Definition (Seed)

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student',
  student_id TEXT, -- Matricule
  faculty TEXT,
  department TEXT,
  level TEXT,
  service TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- New Tables for University of Labé Structure
-- 1.1 Faculties
CREATE TABLE IF NOT EXISTS public.faculties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.faculties (name, code) VALUES
  ('Faculté des Sciences et Techniques', 'FST'),
  ('Faculté des Sciences Administratives et de Gestion', 'FSAG'),
  ('Faculté des Lettres et Sciences Humaines', 'FLSH')
ON CONFLICT (code) DO NOTHING;

-- 1.2 Departments
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id UUID REFERENCES public.faculties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Departments for FST
INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Informatique', 'INF' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'MIAGE', 'MIA' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Mathématiques Appliquées', 'MAT' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Biologie & Environnement', 'BIO' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Économie Statistique Appliquée', 'ESA' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Chimie & Environnement', 'CHI' FROM public.faculties WHERE code = 'FST' UNION ALL
SELECT id, 'Énergie Photovoltaïque', 'ENV' FROM public.faculties WHERE code = 'FST'
ON CONFLICT (code) DO NOTHING;

-- Insert Departments for FSAG
INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Administration Publique', 'ADM' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Économie', 'ECO' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Gestion', 'GES' FROM public.faculties WHERE code = 'FSAG' UNION ALL
SELECT id, 'Économie Sociale et Solidaire', 'ESS' FROM public.faculties WHERE code = 'FSAG'
ON CONFLICT (code) DO NOTHING;

-- Insert Departments for FLSH
INSERT INTO public.departments (faculty_id, name, code)
SELECT id, 'Sociologie & Anthropologie', 'SOC' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Langue Anglaise', 'ANG' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Langue Arabe', 'ARA' FROM public.faculties WHERE code = 'FLSH' UNION ALL
SELECT id, 'Lettres Modernes', 'LET' FROM public.faculties WHERE code = 'FLSH'
ON CONFLICT (code) DO NOTHING;

-- 1.3 Classes (Levels within departments)
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL, -- e.g., 'L1', 'L2', 'M1'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (department_id, name)
);

-- 1.4 Services (Administrative roles)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Services
INSERT INTO public.services (name) VALUES
  ('Vice-rectorats'),
  ('Service technique et maintenance'),
  ('Service Informatique / IT'),
  ('Service Informatique'),
  ('Service Financier'),
  ('Service des Examens'),
  ('Service des Affaires Académiques'),
  ('Service de la Scolarité'),
  ('Service de la Recherche'),
  ('Service d''ordre'),
  ('Secrétariat général'),
  ('Scolarité'),
  ('Restauration Universitaire'),
  ('Études avancées / post-graduation'),
  ('Éditions universitaires'),
  ('Direction des ressources humaines'),
  ('Direction des affaires administratives et financières'),
  ('Coopération et relations extérieures'),
  ('Contrôle financier'),
  ('Centre médical universitaire'),
  ('Centre informatique'),
  ('Centre des œuvres universitaires'),
  ('Centre de Santé'),
  ('Bureau des Sports'),
  ('Bibliothèque Universitaire'),
  ('Agence comptable'),
  ('Accueil Médecine'),
  ('Accueil Droit')
ON CONFLICT (name) DO NOTHING;
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  category TEXT,
  image TEXT,
  author_id UUID REFERENCES public.profiles(id),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tickets
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Ticket Activities (Messages)
CREATE TABLE IF NOT EXISTS public.ticket_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  type TEXT DEFAULT 'message',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  reference TEXT UNIQUE,
  designation TEXT,
  category TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT '€',
  status TEXT DEFAULT 'pending',
  mode TEXT,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Financial Summaries
CREATE TABLE IF NOT EXISTS public.financial_summaries (
  user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  remaining_balance DECIMAL(10,2) DEFAULT 0,
  total_paid DECIMAL(10,2) DEFAULT 0,
  pending_fees DECIMAL(10,2) DEFAULT 0,
  payment_plan TEXT,
  progress_percentage INTEGER DEFAULT 0,
  next_deadline TEXT,
  currency TEXT DEFAULT '€'
);

-- 7. Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  code TEXT UNIQUE,
  instructor_id UUID REFERENCES public.profiles(id),
  schedule TEXT,
  location TEXT,
  credits INTEGER,
  description TEXT,
  category TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Forum Threads
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_snippet TEXT,
  author_id UUID REFERENCES public.profiles(id),
  category_name TEXT,
  category_slug TEXT,
  reply_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  is_popular BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 9. Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  avatar TEXT,
  is_group BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Conversation Participants
CREATE TABLE IF NOT EXISTS public.conversation_participants (
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (conversation_id, profile_id)
);

-- 11. Messaging Messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Schedule / Calendar
CREATE TABLE IF NOT EXISTS public.schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  course_id UUID REFERENCES public.courses(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  type TEXT DEFAULT 'class', -- 'class', 'exam', 'event'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Rooms
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  building TEXT,
  floor TEXT,
  capacity INTEGER,
  features TEXT[], -- ['projector', 'whiteboard', etc.]
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Room Bookings
CREATE TABLE IF NOT EXISTS public.room_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  purpose TEXT,
  status TEXT DEFAULT 'confirmed', -- 'pending', 'confirmed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Attendance
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id),
  profile_id UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL, -- 'present', 'absent', 'late', 'excused'
  marked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Resources / Documents
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT, -- 'pdf', 'docx', 'xlsx', etc.
  course_id UUID REFERENCES public.courses(id),
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  content TEXT,
  type TEXT, -- 'info', 'warning', 'success', 'error'
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. AI History
CREATE TABLE IF NOT EXISTS public.ai_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Assignments
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

-- RLS Policies Implementation

-- Profiles: Users can view all profiles, but only update their own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Announcements: Viewable by all, editable by 'admin' and 'teacher' roles
CREATE POLICY "Announcements are viewable by everyone" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admins/Teachers can manage announcements" ON public.announcements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher'))
  );

-- Tickets: Students see own, Admins see all
CREATE POLICY "Users can view own tickets" ON public.tickets FOR SELECT USING (auth.uid() = user_id OR auth.uid() = assigned_to);
CREATE POLICY "Admins can view all tickets" ON public.tickets FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can create tickets" ON public.tickets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Conversations: Only participants can view/manage
CREATE POLICY "Users can view their conversations" ON public.conversations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = id AND profile_id = auth.uid())
  );

-- Messages: Only participants of the conversation can view/send
CREATE POLICY "Users can view messages in their conversations" ON public.messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND profile_id = auth.uid())
  );
CREATE POLICY "Users can send messages to their conversations" ON public.messages
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND profile_id = auth.uid())
  );

-- Schedule: Users can view own schedule
CREATE POLICY "Users can view own schedule" ON public.schedule FOR SELECT USING (auth.uid() = profile_id);

-- Rooms: Viewable by all, bookings managed by user or admin
CREATE POLICY "Rooms are viewable by everyone" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Users can manage own bookings" ON public.room_bookings FOR ALL USING (auth.uid() = profile_id);

-- Resources: Students view all, Teachers manage
CREATE POLICY "Resources are viewable by everyone" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Teachers can manage resources" ON public.resources FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'teacher')
);

-- Notifications: Users see only their own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = profile_id);

-- Assignments: Users see own, Teachers manage own courses
CREATE POLICY "Users can view own assignments" ON public.assignments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can manage assignments" ON public.assignments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = assignments.course_id AND instructor_id = auth.uid())
);

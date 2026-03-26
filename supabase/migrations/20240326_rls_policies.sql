-- CampusConnect RLS Policies

-- 1. Profiles (Users)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles."
ON public.profiles FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- 2. Announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view announcements."
ON public.announcements FOR SELECT
USING (true);

-- 3. Tickets (Issues)
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tickets."
ON public.tickets FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view assigned tickets."
ON public.tickets FOR SELECT
USING (auth.uid() = assigned_to);

CREATE POLICY "Admins can view all tickets."
ON public.tickets FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- 4. Payments/Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions."
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions."
ON public.transactions FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

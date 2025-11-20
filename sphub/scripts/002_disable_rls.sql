-- Disable RLS on all tables since we're using credential-based auth, not Supabase auth
-- RLS policies were blocking inserts because auth.uid() returns NULL with credential-based auth

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.upvotes DISABLE ROW LEVEL SECURITY;

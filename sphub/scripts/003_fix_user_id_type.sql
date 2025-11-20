-- Drop existing foreign key constraints and recreate with TEXT type
ALTER TABLE public.posts DROP CONSTRAINT posts_user_id_fkey;
ALTER TABLE public.comments DROP CONSTRAINT comments_user_id_fkey;
ALTER TABLE public.upvotes DROP CONSTRAINT upvotes_user_id_fkey;
ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;

-- Alter column types to TEXT
ALTER TABLE public.profiles ALTER COLUMN id SET DATA TYPE TEXT;
ALTER TABLE public.posts ALTER COLUMN user_id SET DATA TYPE TEXT;
ALTER TABLE public.comments ALTER COLUMN user_id SET DATA TYPE TEXT;
ALTER TABLE public.upvotes ALTER COLUMN user_id SET DATA TYPE TEXT;

-- Drop RLS policies that reference auth.uid()
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;
DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
DROP POLICY IF EXISTS posts_insert_own ON public.posts;
DROP POLICY IF EXISTS posts_update_own ON public.posts;
DROP POLICY IF EXISTS posts_delete_own ON public.posts;
DROP POLICY IF EXISTS comments_insert_own ON public.comments;
DROP POLICY IF EXISTS comments_update_own ON public.comments;
DROP POLICY IF EXISTS comments_delete_own ON public.comments;
DROP POLICY IF EXISTS upvotes_insert_own ON public.upvotes;
DROP POLICY IF EXISTS upvotes_delete_own ON public.upvotes;

-- Disable RLS on all tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.upvotes DISABLE ROW LEVEL SECURITY;

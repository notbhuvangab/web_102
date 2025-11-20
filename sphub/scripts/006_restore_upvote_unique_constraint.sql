-- Restore unique constraint on upvotes to prevent multiple upvotes per user per post
-- This ensures one user can only upvote a post once

-- First, remove any duplicate upvotes (keep the earliest one)
DELETE FROM public.upvotes up1
WHERE EXISTS (
  SELECT 1 FROM public.upvotes up2
  WHERE up2.post_id = up1.post_id
    AND up2.user_id = up1.user_id
    AND up2.id < up1.id
);

-- Add unique constraint on (post_id, user_id)
ALTER TABLE public.upvotes
ADD CONSTRAINT IF NOT EXISTS upvotes_post_id_user_id_key UNIQUE (post_id, user_id);

-- Create composite index for better query performance
CREATE INDEX IF NOT EXISTS upvotes_post_user_idx ON public.upvotes(post_id, user_id);

COMMENT ON CONSTRAINT upvotes_post_id_user_id_key ON public.upvotes IS 
  'Ensures each user can only upvote a post once';


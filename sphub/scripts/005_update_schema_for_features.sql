-- Update schema for stretch features

-- Remove unique constraint on upvotes to allow multiple upvotes per user
ALTER TABLE public.upvotes DROP CONSTRAINT IF EXISTS upvotes_post_id_user_id_key;

-- Add new columns for stretch features
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS flag TEXT CHECK (flag IN ('Question', 'Opinion', NULL)),
ADD COLUMN IF NOT EXISTS referenced_post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS show_content_on_feed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_image_on_feed BOOLEAN DEFAULT false;

-- Create index for flag filtering
CREATE INDEX IF NOT EXISTS posts_flag_idx ON public.posts(flag);

-- Create index for referenced posts (reposts)
CREATE INDEX IF NOT EXISTS posts_referenced_post_id_idx ON public.posts(referenced_post_id);

COMMENT ON COLUMN public.posts.video_url IS 'URL to embedded web video';
COMMENT ON COLUMN public.posts.flag IS 'Post flag: Question or Opinion';
COMMENT ON COLUMN public.posts.referenced_post_id IS 'ID of post being reposted/referenced';
COMMENT ON COLUMN public.posts.show_content_on_feed IS 'Whether to show post content on home feed';
COMMENT ON COLUMN public.posts.show_image_on_feed IS 'Whether to show post image on home feed';


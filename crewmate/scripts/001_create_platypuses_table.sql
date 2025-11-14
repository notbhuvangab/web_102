-- Create platypuses table
CREATE TABLE IF NOT EXISTS platypuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tail_length INTEGER NOT NULL CHECK (tail_length >= 1 AND tail_length <= 10),
  bill_size INTEGER NOT NULL CHECK (bill_size >= 1 AND bill_size <= 10),
  color TEXT NOT NULL,
  speed NUMERIC(3, 1) NOT NULL CHECK (speed >= 0.1 AND speed <= 10.0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- No RLS needed since this is a public app without user auth
ALTER TABLE platypuses DISABLE ROW LEVEL SECURITY;

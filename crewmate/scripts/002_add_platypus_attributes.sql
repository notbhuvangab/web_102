-- Add additional platypus physical characteristics
-- This extends the base table with more customization options

ALTER TABLE platypuses 
ADD COLUMN IF NOT EXISTS tail_length INTEGER DEFAULT 5 CHECK (tail_length >= 1 AND tail_length <= 10),
ADD COLUMN IF NOT EXISTS bill_size INTEGER DEFAULT 5 CHECK (bill_size >= 1 AND bill_size <= 10);

-- Update existing records to have default values
UPDATE platypuses 
SET tail_length = 5, bill_size = 5
WHERE tail_length IS NULL OR bill_size IS NULL;

COMMENT ON COLUMN platypuses.tail_length IS 'Length of the platypus tail (1-10 scale)';
COMMENT ON COLUMN platypuses.bill_size IS 'Size of the platypus bill (1-10 scale)';

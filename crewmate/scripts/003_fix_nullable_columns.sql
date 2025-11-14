-- Make tail_length and bill_size nullable with defaults
ALTER TABLE platypuses 
ALTER COLUMN tail_length DROP NOT NULL,
ALTER COLUMN bill_size DROP NOT NULL;

-- Set defaults for new inserts
ALTER TABLE platypuses 
ALTER COLUMN tail_length SET DEFAULT 5,
ALTER COLUMN bill_size SET DEFAULT 5;

COMMENT ON COLUMN platypuses.tail_length IS 'Length of the platypus tail (1-10 scale, optional)';
COMMENT ON COLUMN platypuses.bill_size IS 'Size of the platypus bill (1-10 scale, optional)';

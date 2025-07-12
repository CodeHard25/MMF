-- Create storage bucket for fashion images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fashion-images',
  'fashion-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view fashion images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;

-- Create simplified RLS policies for the fashion-images bucket
CREATE POLICY "Allow anyone to upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'fashion-images'
);

CREATE POLICY "Allow public to view images" ON storage.objects
FOR SELECT USING (bucket_id = 'fashion-images');

CREATE POLICY "Allow anyone to update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'fashion-images'
);

CREATE POLICY "Allow anyone to delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'fashion-images'
);

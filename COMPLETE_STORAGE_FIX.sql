-- This file is for Author's refference only. 
--Complete Storage Fix for All Upload Components
-- Run this in Supabase Dashboard → SQL Editor

-- ========================================
-- STEP 1: CREATE STORAGE BUCKET
-- ========================================

-- Create the main fashion-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fashion-images',
  'fashion-images',
  true,
  10485760, -- 10MB limit (increased for full-body photos)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- ========================================
-- STEP 2: ENABLE ROW LEVEL SECURITY
-- ========================================

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ========================================
-- STEP 3: DROP ALL EXISTING POLICIES
-- ========================================

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view fashion images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to delete images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public viewing" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete their own images" ON storage.objects;

-- ========================================
-- STEP 4: CREATE COMPREHENSIVE POLICIES
-- ========================================

-- Policy 1: Allow anyone to upload to fashion-images bucket
-- This covers: ImageUpload, VirtualTryOn user photos, VirtualTryOn outfit photos
CREATE POLICY "fashion_images_upload_policy" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'fashion-images'
);

-- Policy 2: Allow public viewing of all images in fashion-images bucket
CREATE POLICY "fashion_images_select_policy" ON storage.objects
FOR SELECT USING (
  bucket_id = 'fashion-images'
);

-- Policy 3: Allow anyone to update images in fashion-images bucket
CREATE POLICY "fashion_images_update_policy" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'fashion-images'
);

-- Policy 4: Allow anyone to delete images in fashion-images bucket
CREATE POLICY "fashion_images_delete_policy" ON storage.objects
FOR DELETE USING (
  bucket_id = 'fashion-images'
);

-- ========================================
-- STEP 5: VERIFY BUCKET CONFIGURATION
-- ========================================

-- Update bucket configuration to ensure it's properly set
UPDATE storage.buckets 
SET 
  public = true,
  file_size_limit = 10485760, -- 10MB
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
WHERE id = 'fashion-images';

-- ========================================
-- STEP 6: CREATE FOLDER STRUCTURE
-- ========================================

-- Note: Folders in Supabase are created automatically when files are uploaded
-- The following paths will be used by the application:
-- 
-- fashion-uploads/           (ImageUpload component)
-- virtual-tryon/user-photos/ (VirtualTryOn user photos)
-- virtual-tryon/outfit-photos/ (VirtualTryOn outfit photos)
-- profile-photos/            (Profile components - future use)

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if bucket exists and is configured correctly
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE id = 'fashion-images';

-- Check policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%fashion_images%';

-- ========================================
-- TROUBLESHOOTING COMMANDS
-- ========================================

-- If you need to completely reset (use with caution):
-- DELETE FROM storage.objects WHERE bucket_id = 'fashion-images';
-- DELETE FROM storage.buckets WHERE id = 'fashion-images';

-- Check current storage usage:
-- SELECT bucket_id, COUNT(*) as file_count, SUM(metadata->>'size')::bigint as total_size
-- FROM storage.objects 
-- WHERE bucket_id = 'fashion-images'
-- GROUP BY bucket_id;

-- Run this in your Supabase SQL Editor

-- 1. Add new columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS dob date,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb;

-- 2. Clean up any existing avatars bucket (optional, but good for fresh start)
-- WARNING: This deletes the bucket and all its contents if it exists. Remove these lines if you want to keep existing data.
-- DELETE FROM storage.objects WHERE bucket_id = 'avatars';
-- DELETE FROM storage.buckets WHERE id = 'avatars';

-- 3. Create the avatars storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Set up Storage Policies for the avatars bucket
-- Allow public access to read avatars
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'avatars' );

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own avatars
CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own avatars
CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

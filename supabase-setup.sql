-- =============================================================
-- Supabase Database Setup for DNM Seva Trust
-- Run this SQL in your Supabase SQL Editor
-- =============================================================

-- 1. Albums Table
CREATE TABLE IF NOT EXISTS albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Gallery Photos Table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  event_date DATE,
  url TEXT,
  album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT,
  email TEXT,
  service TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Contact Messages Table (optional)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- Row Level Security (RLS) Policies
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Albums: Public can read, only authenticated users can write
CREATE POLICY "Albums are viewable by everyone"
  ON albums FOR SELECT
  USING (true);

CREATE POLICY "Albums are editable by authenticated users"
  ON albums FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Gallery Photos: Public can view published, authenticated can manage all
CREATE POLICY "Published photos are viewable by everyone"
  ON gallery_photos FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Photos are editable by authenticated users"
  ON gallery_photos FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Reviews: Public can view approved and submit new, authenticated can manage all
CREATE POLICY "Approved reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (approved = true OR auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit a review"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Reviews are editable by authenticated users"
  ON reviews FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Reviews are deletable by authenticated users"
  ON reviews FOR DELETE
  USING (auth.role() = 'authenticated');

-- Contact Messages: Anyone can submit, only authenticated can read
CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Contact messages are viewable by authenticated users"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- =============================================================
-- Storage Bucket for Gallery Images
-- =============================================================
-- Create a storage bucket named 'gallery' in your Supabase dashboard
-- Set it as public so images can be accessed via URL
-- Add policies to allow authenticated users to upload/delete

-- =============================================================
-- Create Admin User
-- =============================================================
-- Go to Supabase Dashboard > Authentication > Users
-- Click "Add User" and create an admin account with email/password
-- This user will be able to access the admin dashboard


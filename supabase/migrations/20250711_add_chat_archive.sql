-- Add archive functionality to fashion_chats table
-- Run this in Supabase Dashboard → SQL Editor

-- Add archived and archived_at columns to fashion_chats table
ALTER TABLE fashion_chats 
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

-- Create index for better performance when filtering archived chats
CREATE INDEX IF NOT EXISTS idx_fashion_chats_archived 
ON fashion_chats(archived, updated_at DESC) 
WHERE archived IS NOT TRUE;

-- Create index for archived chats
CREATE INDEX IF NOT EXISTS idx_fashion_chats_archived_at 
ON fashion_chats(archived_at DESC) 
WHERE archived = TRUE;

-- Update existing chats to have archived = false (if not already set)
UPDATE fashion_chats 
SET archived = FALSE 
WHERE archived IS NULL;

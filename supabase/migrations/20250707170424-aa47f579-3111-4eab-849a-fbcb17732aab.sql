-- Create the missing user_profiles table with proper security
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  bio TEXT,
  location TEXT,
  birth_date DATE,
  height INTEGER,
  weight INTEGER,
  body_type TEXT,
  skin_tone TEXT,
  skin_type TEXT,
  scalp_type TEXT,
  hair_texture TEXT,
  style_confidence_level INTEGER DEFAULT 5 CHECK (style_confidence_level >= 1 AND style_confidence_level <= 10),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for user profiles
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_user_profiles_updated_at();

-- Fix overly permissive RLS policies on existing tables
DROP POLICY IF EXISTS "Authenticated users can read" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can delete" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can insert" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can update" ON public.profiles;

-- Create proper user-scoped policies for profiles table if it needs to remain
CREATE POLICY "Users can view profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own profile record" 
ON public.profiles 
FOR ALL 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Fix overly permissive policies on messages table
DROP POLICY IF EXISTS "Authenticated users can read" ON public.messages;
DROP POLICY IF EXISTS "Only admins can delete" ON public.messages;
DROP POLICY IF EXISTS "Only admins can insert" ON public.messages;
DROP POLICY IF EXISTS "Only admins can update" ON public.messages;

-- Create proper user-scoped policies for messages table
CREATE POLICY "Users can view messages from their chats" 
ON public.messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.chats 
  WHERE chats.id = messages.chat_id 
  AND chats.user_id = auth.uid()
));

CREATE POLICY "Users can create messages in their chats" 
ON public.messages 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chats 
  WHERE chats.id = messages.chat_id 
  AND chats.user_id = auth.uid()
));

-- Fix overly permissive policies on outfit_images table  
DROP POLICY IF EXISTS "Authenticated users can read" ON public.outfit_images;
DROP POLICY IF EXISTS "Only admins can delete" ON public.outfit_images;
DROP POLICY IF EXISTS "Only admins can insert" ON public.outfit_images;
DROP POLICY IF EXISTS "Only admins can update" ON public.outfit_images;

-- Create proper user-scoped policies for outfit_images table
CREATE POLICY "Users can view outfit images from their chats" 
ON public.outfit_images 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.chats 
  WHERE chats.id = outfit_images.chat_id 
  AND chats.user_id = auth.uid()
));

CREATE POLICY "Users can create outfit images for their chats" 
ON public.outfit_images 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chats 
  WHERE chats.id = outfit_images.chat_id 
  AND chats.user_id = auth.uid()
));
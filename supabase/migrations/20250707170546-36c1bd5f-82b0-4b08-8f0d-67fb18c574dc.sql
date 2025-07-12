-- Fix overly permissive RLS policies on existing tables
DROP POLICY IF EXISTS "Authenticated users can read" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can delete" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can insert" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can update" ON public.profiles;

-- Create proper user-scoped policies for profiles table
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
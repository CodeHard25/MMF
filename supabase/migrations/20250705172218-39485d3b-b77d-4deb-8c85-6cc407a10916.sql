
-- Create table for user chat sessions
CREATE TABLE public.fashion_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL DEFAULT 'Fashion Chat',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE public.fashion_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES public.fashion_chats(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.fashion_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fashion_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for fashion_chats
CREATE POLICY "Users can view their own fashion chats" 
  ON public.fashion_chats 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fashion chats" 
  ON public.fashion_chats 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own fashion chats" 
  ON public.fashion_chats 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own fashion chats" 
  ON public.fashion_chats 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for fashion_messages
CREATE POLICY "Users can view messages from their own chats" 
  ON public.fashion_messages 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.fashion_chats 
    WHERE public.fashion_chats.id = fashion_messages.chat_id 
    AND public.fashion_chats.user_id = auth.uid()
  ));

CREATE POLICY "Users can create messages in their own chats" 
  ON public.fashion_messages 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.fashion_chats 
    WHERE public.fashion_chats.id = fashion_messages.chat_id 
    AND public.fashion_chats.user_id = auth.uid()
  ));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_fashion_chats_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_fashion_chats_updated_at
  BEFORE UPDATE ON public.fashion_chats
  FOR EACH ROW
  EXECUTE FUNCTION update_fashion_chats_updated_at();

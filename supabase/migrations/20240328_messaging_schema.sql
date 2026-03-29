-- Messaging Schema Migration
-- 1. conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT, -- For group chats, null for 1-to-1
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. participants table (junction)
CREATE TABLE IF NOT EXISTS public.participants (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (conversation_id, user_id)
);

-- 3. messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies for conversations
CREATE POLICY "Users can view conversations they participate in" ON public.conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.participants 
            WHERE conversation_id = conversations.id 
            AND user_id = auth.uid()
        )
    );

-- Policies for participants
CREATE POLICY "Users can view participants of their conversations" ON public.participants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.participants p 
            WHERE p.conversation_id = participants.conversation_id 
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can join conversations" ON public.participants
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policies for messages
CREATE POLICY "Users can view messages in their conversations" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.participants 
            WHERE conversation_id = messages.conversation_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can send messages to their conversations" ON public.messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.participants 
            WHERE conversation_id = messages.conversation_id 
            AND user_id = auth.uid()
        )
    );

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

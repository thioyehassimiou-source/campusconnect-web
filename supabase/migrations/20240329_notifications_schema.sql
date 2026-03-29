-- 1. Add read_at to messages
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

-- 2. Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- 'message', 'announcement', 'grade', 'info'
    link TEXT, -- Internal route
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 4. Policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications (mark as read)" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 5. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 6. Trigger for message notifications (Optional but helpful)
-- This function will create a notification when a new message is received 
-- (Note: In a more complex app, this might be handled by an Edge Function)
CREATE OR REPLACE FUNCTION public.handle_new_message_notification()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.notifications (user_id, title, content, type, link)
    SELECT 
        p.user_id, 
        'Nouveau message', 
        LEFT(NEW.content, 50), 
        'message', 
        '/dashboard/' || (SELECT role FROM public.profiles WHERE id = p.user_id) || '/messages'
    FROM public.participants p
    WHERE p.conversation_id = NEW.conversation_id
    AND p.user_id != NEW.sender_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_message_notification
    AFTER INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_message_notification();

-- migration 20260402_messaging_rpc.sql
-- Optmisation N+1 Queries : Récupération des conversations avec compteurs

CREATE OR REPLACE FUNCTION get_user_conversations_with_stats(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  updated_at TIMESTAMPTZ,
  unread_count BIGINT,
  last_message TEXT,
  last_message_time TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH user_convos AS (
    SELECT c.id, c.name, c.updated_at
    FROM conversations c
    JOIN participants p ON p.conversation_id = c.id
    WHERE p.user_id = p_user_id
  )
  SELECT 
    uc.id,
    uc.name,
    uc.updated_at,
    (
      SELECT COUNT(*)
      FROM messages m
      WHERE m.conversation_id = uc.id
      AND m.read_at IS NULL
      AND m.sender_id != p_user_id
    ) AS unread_count,
    (
      SELECT m.content
      FROM messages m
      WHERE m.conversation_id = uc.id
      ORDER BY m.created_at DESC
      LIMIT 1
    ) AS last_message,
    (
      SELECT m.created_at
      FROM messages m
      WHERE m.conversation_id = uc.id
      ORDER BY m.created_at DESC
      LIMIT 1
    ) AS last_message_time
  FROM user_convos uc
  ORDER BY uc.updated_at DESC;
END;
$$;

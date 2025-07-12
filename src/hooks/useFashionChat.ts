import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client.ts"; // Adjust the import path as necessary
import { useAuth } from "../contexts/AuthContext.tsx";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image_url?: string;
  created_at: string;
}

export interface Chat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  archived?: boolean;
  archived_at?: string;
}

export const useFashionChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [archivedChats, setArchivedChats] = useState<Chat[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's chats (excluding archived)
  const fetchChats = async () => {
    if (!user) return;

    try {
      // First try with archived filter (after migration)
      let { data, error } = await supabase
        .from("fashion_chats")
        .select("*")
        .or("archived.is.null,archived.eq.false") // Get non-archived chats
        .order("updated_at", { ascending: false });

      // If archived column doesn't exist, fallback to simple query
      if (error && error.message?.includes("archived does not exist")) {
        console.log("Archived column not found, using fallback query");
        const fallbackResult = await supabase
          .from("fashion_chats")
          .select("*")
          .order("updated_at", { ascending: false });

        data = fallbackResult.data;
        error = fallbackResult.error;
      }

      if (error) {
        console.error("Error fetching chats:", error);
        return;
      }

      setChats(data || []);
    } catch (err) {
      console.error("Error in fetchChats:", err);
    }
  };

  // Fetch archived chats
  const fetchArchivedChats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("fashion_chats")
        .select("*")
        .eq("archived", true)
        .order("archived_at", { ascending: false });

      if (error) {
        console.error("Error fetching archived chats:", error);
        return;
      }

      setArchivedChats(data || []);
    } catch (err) {
      console.error("Error in fetchArchivedChats:", err);
    }
  };

  // Toggle archived chats visibility
  const toggleArchivedView = () => {
    setShowArchived(!showArchived);
    if (!showArchived && archivedChats.length === 0) {
      fetchArchivedChats();
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId: string) => {
    const { data, error } = await supabase
      .from("fashion_messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    // Transform the data to match our Message interface
    const transformedMessages: Message[] = (data || []).map((msg) => ({
      id: msg.id,
      role: msg.role as "user" | "assistant",
      content: msg.content,
      image_url: msg.image_url || undefined,
      created_at: msg.created_at,
    }));

    setMessages(transformedMessages);
  };

  // Create a new chat
  const createChat = async (title: string = "Fashion Chat") => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("fashion_chats")
      .insert([{ user_id: user.id, title }])
      .select()
      .single();

    if (error) {
      console.error("Error creating chat:", error);
      return null;
    }

    await fetchChats();
    return data;
  };

  // Send a message
  const sendMessage = async (
    content: string,
    imageUrl?: string,
    generateImage?: boolean,
    userPhoto?: string,
  ) => {
    if (!currentChat || !user) return;

    setLoading(true);

    // Call AI endpoint (backend will handle saving both user and AI messages)
    try {
      const response = await supabase.functions.invoke("fashion-ai-chat", {
        body: {
          message: content,
          chatId: currentChat.id,
          imageUrl,
          generateImage,
          userPhoto,
        },
      });

      if (response.error) {
        throw response.error;
      }

      // Fetch messages to get both user and AI response
      await fetchMessages(currentChat.id);
    } catch (error) {
      console.error("Error calling AI:", error);
    } finally {
      setLoading(false);
    }
  };

  // Select a chat
  const selectChat = async (chat: Chat) => {
    setCurrentChat(chat);
    await fetchMessages(chat.id);
  };

  // Start a new chat
  const startNewChat = async () => {
    const newChat = await createChat();
    if (newChat) {
      setCurrentChat(newChat);
      setMessages([]);
    }
  };

  // Delete a chat permanently
  const deleteChat = async (chatId: string) => {
    if (!user) return false;

    try {
      // First delete all messages in the chat
      const { error: messagesError } = await supabase
        .from("fashion_messages")
        .delete()
        .eq("chat_id", chatId);

      if (messagesError) {
        console.error("Error deleting messages:", messagesError);
        return false;
      }

      // Then delete the chat itself
      const { error: chatError } = await supabase
        .from("fashion_chats")
        .delete()
        .eq("id", chatId);

      if (chatError) {
        console.error("Error deleting chat:", chatError);
        return false;
      }

      // Update local state
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));

      // If the deleted chat was the current chat, clear it
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }

      return true;
    } catch (error) {
      console.error("Error in deleteChat:", error);
      return false;
    }
  };

  // Archive a chat (soft delete)
  const archiveChat = async (chatId: string) => {
    if (!user) return false;

    try {
      // Add archived flag to the chat
      const { error } = await supabase
        .from("fashion_chats")
        .update({
          archived: true,
          archived_at: new Date().toISOString(),
        })
        .eq("id", chatId);

      if (error) {
        console.error("Error archiving chat:", error);
        return false;
      }

      // Update local state to remove from active chats
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));

      // If the archived chat was the current chat, clear it
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }

      return true;
    } catch (error) {
      console.error("Error in archiveChat:", error);
      return false;
    }
  };

  // Restore an archived chat
  const restoreChat = async (chatId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("fashion_chats")
        .update({
          archived: false,
          archived_at: null,
        })
        .eq("id", chatId);

      if (error) {
        console.error("Error restoring chat:", error);
        return false;
      }

      // Refresh chats to include the restored chat
      await fetchChats();
      return true;
    } catch (error) {
      console.error("Error in restoreChat:", error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  return {
    chats,
    archivedChats,
    showArchived,
    currentChat,
    messages,
    loading,
    sendMessage,
    selectChat,
    startNewChat,
    createChat,
    deleteChat,
    archiveChat,
    restoreChat,
    toggleArchivedView,
    fetchArchivedChats,
  };
};

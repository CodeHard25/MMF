import React, { useEffect, useRef, useState } from "react";

// Temporary fix for missing DOM lib types in some TS setups
// Remove this if ScrollIntoViewOptions is available globally
type ScrollIntoViewOptions = {
  behavior?: "auto" | "instant" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
};
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Card, CardContent } from "./ui/card.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";
import { Avatar, AvatarFallback } from "./ui/avatar.tsx";
// import { Separator } from "./ui/separator.tsx"; // Unused import removed
import { useFashionChat } from "../hooks/useFashionChat.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import {
  Archive,
  Bot,
  Image as ImageIcon,
  LogOut,
  MessageSquare,
  MoreVertical,
  Plus,
  Send,
  Trash2,
  User,
} from "lucide-react";
import ImageUpload from "./ImageUpload.tsx";
import FormattedMessage from "./FormattedMessage.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";

const FashionChatbot: React.FC = () => {
  const { user, signOut } = useAuth();
  const {
    chats,
    archivedChats,
    showArchived,
    currentChat,
    messages,
    loading,
    sendMessage,
    selectChat,
    startNewChat,
    deleteChat,
    archiveChat,
    restoreChat,
    toggleArchivedView,
    fetchArchivedChats,
  } = useFashionChat();
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [generateImages, setGenerateImages] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Deno/SSR-safe: Only call scrollIntoView if running in browser
  // Deno/SSR-safe: Only call scrollIntoView if running in browser
  const scrollToBottom = () => {
    const ref = messagesEndRef.current;
    if (
      typeof window !== "undefined" &&
      ref &&
      typeof (ref as {
          scrollIntoView?: (options?: ScrollIntoViewOptions) => void;
        }).scrollIntoView === "function"
    ) {
      (ref as { scrollIntoView: (options?: ScrollIntoViewOptions) => void })
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    if (!currentChat) {
      await startNewChat();
    }

    await sendMessage(
      inputMessage.trim(),
      uploadedImageUrl || undefined,
      generateImages,
      uploadedImageUrl || undefined,
    );
    setInputMessage("");
    setUploadedImageUrl("");
    setGenerateImages(false);
  };

  return (
    <div className="elevate-chat-container elevate-pattern-herringbone flex h-screen">
      {/* Sidebar */}
      <div className="w-80 elevate-chat-sidebar flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-stone-200/50 dark:border-stone-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="elevate-heading-3">
              ElevateX Style Forge
            </h2>
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="elevate-text-secondary hover:text-amber-700 dark:hover:text-amber-400 elevate-focus p-2 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-3 elevate-caption">
            <Avatar className="elevate-image-avatar w-8 h-8">
              <AvatarFallback className="elevate-caption font-semibold bg-amber-100 text-amber-800">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="elevate-body truncate">{user?.email}</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-6 space-y-4">
          <Button
            onClick={startNewChat}
            className="w-full elevate-button elevate-hover-lift"
          >
            <Plus className="w-5 h-5 mr-3" />
            New Conversation
          </Button>

          {/* Archived Chats Toggle */}
          <Button
            onClick={toggleArchivedView}
            variant="outline"
            className="w-full elevate-button-outline elevate-hover-lift"
          >
            <Archive className="w-5 h-5 mr-3" />
            {showArchived ? "Hide Archived" : "Show Archived"}
          </Button>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 px-6 elevate-scroll">
          <div className="space-y-3">
            {/* Section Header */}
            {showArchived && (
              <div className="elevate-caption font-semibold px-3 py-2 text-stone-600 dark:text-stone-400">
                Archived Conversations ({archivedChats.length})
              </div>
            )}
            {!showArchived && chats.length > 0 && (
              <div className="elevate-caption font-semibold px-3 py-2 text-stone-600 dark:text-stone-400">
                Recent Conversations ({chats.length})
              </div>
            )}

            {/* Display chats based on current view */}
            {(showArchived ? archivedChats : chats).map((chat) => (
              <Card
                key={chat.id}
                className={`elevate-card-glass elevate-hover-lift cursor-pointer ${
                  currentChat?.id === chat.id
                    ? "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => selectChat(chat)}
                    >
                      <p className="elevate-body font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="elevate-caption mt-1">
                        {new Date(chat.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Chat Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-amber-100 dark:hover:bg-amber-800/30 elevate-focus rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4 text-stone-500 hover:text-amber-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 elevate-dropdown"
                      >
                        {showArchived
                          ? (
                            // Options for archived chats
                            <DropdownMenuItem
                              onClick={async (e) => {
                                e.stopPropagation();
                                const success = await restoreChat(chat.id);
                                if (success) {
                                  console.log("Chat restored successfully");
                                  // Refresh archived chats list
                                  fetchArchivedChats();
                                } else {
                                  alert("Failed to restore chat");
                                }
                              }}
                              className="flex items-center space-x-2"
                            >
                              <Archive className="w-4 h-4" />
                              <span>Restore Chat</span>
                            </DropdownMenuItem>
                          )
                          : (
                            // Options for active chats
                            <DropdownMenuItem
                              onClick={async (e) => {
                                e.stopPropagation();
                                const success = await archiveChat(chat.id);
                                if (success) {
                                  console.log("Chat archived successfully");
                                } else {
                                  alert("Failed to archive chat");
                                }
                              }}
                              className="flex items-center space-x-2"
                            >
                              <Archive className="w-4 h-4" />
                              <span>Archive Chat</span>
                            </DropdownMenuItem>
                          )}
                        <DropdownMenuItem
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (
                              confirm(
                                "Are you sure you want to delete this chat? This action cannot be undone.",
                              )
                            ) {
                              const success = await deleteChat(chat.id);
                              if (success) {
                                console.log("Chat deleted successfully");
                              } else {
                                alert("Failed to delete chat");
                              }
                            }
                          }}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Chat</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-stone-50/50 to-amber-50/30 dark:from-stone-800/50 dark:to-stone-900/50">
        {currentChat
          ? (
            <>
              {/* Chat Header */}
              <div className="elevate-card-glass border-b border-stone-200/50 dark:border-stone-700/50 p-6 rounded-none backdrop-blur-sm">
                <h3 className="elevate-heading-3">
                  {currentChat.title}
                </h3>
                <p className="elevate-caption mt-2 text-stone-600 dark:text-stone-400">
                  AI-powered men's fashion recommendations
                </p>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6 elevate-scroll">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] space-x-2 ${
                          message.role === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="elevate-image-avatar w-10 h-10 flex-shrink-0">
                          <AvatarFallback
                            className={`${
                              message.role === "user"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            {message.role === "user"
                              ? <User className="w-5 h-5" />
                              : <Bot className="w-5 h-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`${
                            message.role === "user"
                              ? "elevate-chat-message-user"
                              : "elevate-chat-message-ai"
                          } max-w-full`}
                        >
                          <div className="elevate-body">
                            {message.role === "assistant"
                              ? <FormattedMessage content={message.content} />
                              : <p>{message.content}</p>}
                          </div>
                          {message.image_url && (
                            <div className="mt-4">
                              <img
                                src={message.image_url}
                                alt="Fashion recommendation"
                                className="elevate-image-fashion max-w-sm mx-auto elevate-hover-scale"
                                onError={() => {
                                  console.error(
                                    "❌ Image failed to load:",
                                    message.image_url,
                                  );
                                }}
                                onLoad={() => {
                                  console.log(
                                    "✅ Image loaded successfully:",
                                    message.image_url,
                                  );
                                }}
                              />
                            </div>
                          )}
                          {/* Debug: Show if message has image_url */}
                          {import.meta.env.DEV && (
                            <div className="text-xs text-gray-400 mt-1">
                              Debug: Has image_url:{" "}
                              {message.image_url ? "YES" : "NO"}
                              {message.image_url && (
                                <div>
                                  URL: {message.image_url.substring(0, 50)}...
                                </div>
                              )}
                            </div>
                          )}
                          <p
                            className={`text-xs mt-2 ${
                              message.role === "user"
                                ? "text-white/70"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex space-x-3">
                        <Avatar className="elevate-image-avatar w-10 h-10">
                          <AvatarFallback className="bg-stone-100 text-stone-700">
                            <Bot className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="elevate-chat-message-ai">
                          <div className="flex items-center space-x-2">
                            <div className="elevate-spinner-fashion"></div>
                            <span className="elevate-caption text-stone-600">
                              Crafting your style recommendation...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Image Upload Section */}
              {showImageUpload && (
                <div className="elevate-card-glass border-t border-stone-200/50 dark:border-stone-700/50 p-6 rounded-none">
                  <ImageUpload
                    onImageUpload={setUploadedImageUrl}
                    onImageGenerate={setGenerateImages}
                    disabled={loading}
                  />
                </div>
              )}

              {/* Input */}
              <div className="elevate-card-glass border-t border-stone-200/50 dark:border-stone-700/50 p-6 rounded-none backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="flex space-x-3">
                    <Input
                      value={inputMessage ?? ""}
                      onChange={(e) => {
                        const target = e.target as { value?: string };
                        setInputMessage(target.value ?? "");
                      }}
                      placeholder="Ask me about men's fashion trends, outfit ideas, styling tips..."
                      className="flex-1 elevate-chat-input"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowImageUpload(!showImageUpload)}
                      variant="outline"
                      className="elevate-button-outline px-4 py-3"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !inputMessage.trim()}
                      className="elevate-button elevate-hover-lift px-6"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGenerateImages(true);
                        setInputMessage(
                          "Generate a stylish men's outfit suggestion for me",
                        );
                      }}
                      disabled={loading}
                      className="elevate-button-outline elevate-hover-lift text-xs"
                    >
                      ✨ Generate Outfit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowImageUpload(true);
                        setInputMessage(
                          "Analyze my photo and suggest what would look good on me",
                        );
                      }}
                      disabled={loading}
                      className="elevate-button-outline elevate-hover-lift text-xs"
                    >
                      📸 Style Analysis
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )
          : (
            <div className="flex-1 flex items-center justify-center elevate-pattern-pinstripe">
              <div className="text-center elevate-card-glass p-12 max-w-md mx-6">
                <Bot className="w-20 h-20 text-amber-700 dark:text-amber-400 mx-auto mb-6" />
                <h3 className="elevate-heading-2 mb-4">
                  Welcome to ElevateX Style Forge
                </h3>
                <p className="elevate-body-large mb-8 text-stone-600 dark:text-stone-300">
                  Your personal AI stylist for premium men's fashion. Start a
                  conversation to get personalized outfit recommendations.
                </p>
                <Button
                  onClick={startNewChat}
                  className="elevate-button-accent elevate-hover-lift"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Begin Your Style Journey
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default FashionChatbot;

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, MessageCircle } from "lucide-react";
import type { ChatRoom } from "@/features/chat/types";

interface SidebarProps {
  chatRooms: ChatRoom[];
  selectedChat: ChatRoom | null;
  onChatSelect: (chat: ChatRoom) => void;
}

export const Sidebar = ({
  chatRooms,
  selectedChat,
  onChatSelect,
}: SidebarProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-chat-online";
      case "away":
        return "bg-chat-away";
      case "offline":
        return "bg-chat-offline";
      default:
        return "bg-chat-offline";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="p-2 space-y-1">
        {chatRooms.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={cn(
              "w-full p-3 rounded-lg text-left hover:bg-muted/50 transition-all duration-200",
              selectedChat?.id === chat.id &&
                "bg-accent/20 border border-accent/30"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                {chat.type === "group" ? (
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                ) : (
                  <>
                    <Avatar className="w-12 h-12 border border-border/50">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(chat.participants[0]?.name || chat.name)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.type === "direct" && (
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                          getStatusColor(
                            chat.participants[0]?.status || "offline"
                          )
                        )}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Chat info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-card-foreground truncate">
                    {chat.name}
                  </h3>
                  {chat.unreadCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center"
                    >
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>

                {chat.lastMessage && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {chat.lastMessage.isOwn ? "You: " : ""}
                      {chat.lastMessage.content}
                    </p>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {chat.lastMessage.timestamp}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}

        {/* Empty state */}
        {chatRooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground">
              Start a new chat to begin
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

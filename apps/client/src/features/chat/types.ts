export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: "direct" | "group";
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  status?: "online" | "offline";
}

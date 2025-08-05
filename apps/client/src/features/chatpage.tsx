import UserListSidebar from "./chat/components/sidebar";

import type { Contact } from "./chat/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Crown, Search, Plus, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth, UserButton } from "@clerk/clerk-react";

const contacts: Contact[] = [
  {
    id: "klein",
    name: "Klein Moretti",
    avatar: "KM",
    lastMessage: "The fool that doesn't belong to this era...",
    timestamp: "10:30 AM",
    unread: 2,
    status: "online",
  },
  {
    id: "tarot",
    name: "Tarot Club",
    avatar: "🔮",
    lastMessage: "Mr. Fool, I have a question...",
    timestamp: "9:45 AM",
    unread: 5,
    status: "online",
  },
  {
    id: "audrey",
    name: "Audrey Hall",
    avatar: "AH",
    lastMessage: "You: How are your psychic abilities...",
    timestamp: "Yesterday",
    status: "offline",
  },
  {
    id: "alger",
    name: "Alger Wilson",
    avatar: "AW",
    lastMessage: "The Hanged Man seeks knowledge...",
    timestamp: "2 hours ago",
    status: "online",
  },
  {
    id: "derrick",
    name: "Derrick Berg",
    avatar: "DB",
    lastMessage: "The Sun shines upon the City of Silver...",
    timestamp: "5 hours ago",
    status: "offline",
  },
];

const ChatPage = () => {
  const { getToken } = useAuth();

  const callBackendAPI = async () => {
    const token = await getToken();

    console.log("token", token);

    const response = await fetch("http://localhost:8080/health", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  useEffect(() => {
    callBackendAPI();
  }, []);

  const [selectedContact, setSelectedContact] = useState("klein");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Animated mystical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Left Sidebar - Chat List */}
      <div className="w-80 bg-slate-800/80 backdrop-blur-xl border-r border-amber-500/20 shadow-2xl shadow-amber-500/5 relative">
        {/* Header with mystical styling */}
        <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="h-8 w-8 text-amber-400 animate-pulse" />
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Mystical Nexus
                </h1>
                <p className="text-xs text-slate-400">Beyond the Veil</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-300"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-300"
              >
                <UserButton />
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search the mystical realm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600/50 focus:border-amber-500/50 focus:ring-amber-500/20 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Status indicator */}
        <div className="px-4 py-2 bg-gradient-to-r from-emerald-600/10 to-emerald-500/10 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300">
                Connected to the Gray Fog
              </span>
            </div>
            <Crown className="h-4 w-4 text-amber-400" />
          </div>
        </div>

        {/* Contacts list */}
        <UserListSidebar
          contacts={contacts.filter(
            (contact) =>
              contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              contact.lastMessage
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />

        {/* Add new contact button */}
        <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-700/30">
          <Button className="w-full bg-[#EFC139] hover:bg-[#EFC139] text-slate-900 font-semibold shadow-lg shadow-amber-500/25 transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            Join a Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

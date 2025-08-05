import type { Contact } from "../types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";

interface UserListSidebarProps {
  contacts: Contact[];
  selectedContact: string;
  setSelectedContact: (id: string) => void;
}

const UserListSidebar = ({
  contacts,
  selectedContact,
  setSelectedContact,
}: UserListSidebarProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-2 flex flex-col space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              selectedContact === contact.id
                ? "bg-slate-700"
                : "hover:bg-slate-700/50"
            }`}
            onClick={() => setSelectedContact(contact.id)}
          >
            <div className="relative">
              <Avatar className="w-18 h-18">
                <AvatarFallback className="bg-amber-600 p-2 rounded-full text-slate-900 font-semibold">
                  {contact.avatar}
                </AvatarFallback>
              </Avatar>
              {contact.status === "online" && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800" />
              )}
              {contact.status === "offline" && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-800" />
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-100 truncate">
                  {contact.name}
                </p>
                {contact.unread && (
                  <Badge className="bg-amber-600 text-slate-900 text-xs">
                    {contact.unread}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">
                {contact.lastMessage}
              </p>
              <p className="text-xs text-slate-500 mt-1">{contact.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UserListSidebar;

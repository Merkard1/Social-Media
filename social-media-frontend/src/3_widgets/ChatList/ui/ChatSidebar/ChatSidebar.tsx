import { useCallback, useState } from "react";

import { UserSearch } from "@/4_features/UserSearch";

import { User } from "@/5_entities/User";

import { VStack } from "@/6_shared/ui/Stack";

import { ChatPreviewList } from "../ChatPreviewList/ChatPreviewList";
import { SearchResults } from "../SearchResults/SearchResults";

interface ChatSidebarProps {
 className?: string
 currentUser: User
}

export const ChatSidebar = (props : ChatSidebarProps) => {
  const { className, currentUser } = props;
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = useCallback((isTyping: boolean) => {
    setIsSearching(isTyping);
  }, []);

  return (
    <VStack max gap="16">
      <UserSearch onSearchChange={handleSearchChange} />
      {isSearching
        ? <SearchResults currentUser={currentUser!} />
        : <ChatPreviewList currentUser={currentUser!} />}
    </VStack>
  );
};

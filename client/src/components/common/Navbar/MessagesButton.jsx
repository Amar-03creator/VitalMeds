// src/components/common/Navbar/MessagesButton.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const MessagesButton = ({ isSearchExpanded }) => {
  return (
    !isSearchExpanded && (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 hidden md:inline-flex bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => {}}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    )
  );
};

export default MessagesButton;

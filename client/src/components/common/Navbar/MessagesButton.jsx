// src/components/common/Navbar/MessagesButton.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
// Optional: import { useNavigate } from 'react-router-dom'; if adding navigation

const MessagesButton = ({ isSearchExpanded }) => {
  // Optional: const navigate = useNavigate(); for routing

  return (
    isSearchExpanded && (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 hidden md:inline-flex !bg-gray-600 hover:!bg-gray-700"
        // onClick={() => navigate('/messages')} // Uncomment and adjust path if needed
        onClick={() => {}}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
    )
  );
};

export default MessagesButton;

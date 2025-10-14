// src/components/common/Navbar/NotificationsButton.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const NotificationsButton = ({ isSearchExpanded }) => {
  return (
    !isSearchExpanded && (
      <Button variant="ghost" size="icon" className="relative hidden md:inline-flex">
        <Bell className="h-5 w-5" />
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          2
        </Badge>
      </Button>
    )
  );
};

export default NotificationsButton;

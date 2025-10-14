// src/components/common/Navbar/ProfileDropdown.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { User, Shield, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  const getUserInitials = () => {
    const name = user?.ownerName || user?.shopName || 'User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-sm font-medium">{user?.shopName || "Dr. R. Sharma's Pharmacy"}</span>
            <span className="text-xs text-green-600 dark:text-green-400">
              Verified • GSTIN {user?.gstin?.slice(-8) || '1234A1ZX'}
            </span>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={user?.ownerName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-background/50 backdrop-blur-lg border shadow-xl"
      >
        <DropdownMenuLabel className="bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex flex-col py-2">
            <span className="font-semibold">{user?.ownerName || 'John Smith'}</span>
            <span className="text-xs font-medium text-muted-foreground mt-1">
              {user?.shopName || "Medical Store"}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
              GSTIN: {user?.gstin?.slice(-8) || '1234A1ZX'}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="focus:bg-accent">
          <Link to="/profile" className="flex items-center py-2">
            <User className="mr-2 h-4 w-4" />
            <span className="font-medium">Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="focus:bg-accent">
          <Link to="/documents" className="flex items-center py-2">
            <Shield className="mr-2 h-4 w-4" />
            <span className="font-medium">Documents</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:bg-destructive/50 focus:text-destructive-foreground py-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="font-medium">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
// src/components/common/Navbar.jsx
// Refactored to use subcomponents

import React, { useState } from 'react';
import Logo from './Navbar/Logo';
import DesktopNav from './Navbar/DesktopNav';
import SearchForm from './Navbar/SearchForm';
import NotificationsButton from './Navbar/NotificationsButton';
import MessagesButton from './Navbar/MessagesButton';
import NewOrderButton from './Navbar/NewOrderButton';
import ThemeToggle from './Navbar/ThemeToggle';
import ProfileDropdown from './Navbar/ProfileDropdown';
import MobileMenu from './Navbar/MobileMenu';
import MobileSearch from './Navbar/MobileSearch';
import {
  Package,
  ShoppingCart,
  RotateCcw,
  Percent,
  FileText,
  HeadphonesIcon,
  Settings
} from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navItems = [
    { title: 'Products', path: '/products', icon: Package },
    { title: 'My Orders', path: '/orders', icon: ShoppingCart },
    { title: 'Quick Reorder', path: '/reorder', icon: RotateCcw },
    { title: 'Offers', path: '/offers', icon: Percent },
    { title: 'Stock Requests', path: '/stock-requests', icon: FileText },
    { title: 'Support', path: '/support', icon: HeadphonesIcon },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/40 backdrop-blur-xl shadow-sm">
      <div className="w-full px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <DesktopNav isSearchExpanded={isSearchExpanded} />
          </div>

          <SearchForm 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchExpanded={isSearchExpanded}
            setIsSearchExpanded={setIsSearchExpanded}
          />

          <div className="flex items-center gap-2 shrink-0">
            <MobileSearch />

            <NotificationsButton isSearchExpanded={isSearchExpanded} />
            <MessagesButton isSearchExpanded={isSearchExpanded} />
            <NewOrderButton isSearchExpanded={isSearchExpanded} />

            <ThemeToggle />

            <ProfileDropdown />

            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
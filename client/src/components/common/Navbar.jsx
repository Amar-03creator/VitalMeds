import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Plus,
  Package,
  ShoppingCart,
  RotateCcw,
  Percent,
  FileText,
  HeadphonesIcon,
  Settings,
  User,
  Shield,
  LogOut,
  ChevronDown,
  X,
  Moon,
  Sun
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Navigation items for sidebar/mobile
  const navItems = [
    { title: 'Products', path: '/products', icon: Package },
    { title: 'My Orders', path: '/orders', icon: ShoppingCart },
    { title: 'Quick Reorder', path: '/reorder', icon: RotateCcw },
    { title: 'Offers', path: '/offers', icon: Percent },
    { title: 'Stock Requests', path: '/stock-requests', icon: FileText },
    { title: 'Support', path: '/support', icon: HeadphonesIcon },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchExpanded(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = () => {
    const name = user?.ownerName || user?.shopName || 'User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-700/40 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-sm shadow-black/5">

      <div className="w-full px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section - Logo (clickable home button) */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex flex-col items-start shrink-0">
              <div className="text-2xl font-bold text-primary">VitalMEDS</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium -mt-1 whitespace-nowrap">
                ✓ Verified Distributor
              </div>
            </Link>

            {/* Desktop Navigation - Without Home */}
            <nav className={`hidden lg:flex items-center gap-6 transition-all duration-500 ease-in-out ${isSearchExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {navItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center Section - Smooth Width-only Expanding Search */}
          <div
            className={`hidden md:flex mx-4 items-center ${isSearchExpanded ? 'flex-1' : ''}`}
          >
            <form onSubmit={handleSearch} className="relative w-full" aria-label="Search form">
              <div
                // animate width only for smoother transition
                style={{
                  width: isSearchExpanded ? 'min(60vw, 900px)' : '320px',
                  willChange: 'width, box-shadow'
                }}
                className={`mx-auto rounded-full overflow-hidden transition-[width] duration-[380ms] ease-in-out ${isSearchExpanded ? 'shadow-2xl ring-2 ring-primary/30' : 'shadow-sm'}`}
              >
                <div className="relative">
                  {/* Left icon — animate transform (GPU) */}
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-out ${isSearchExpanded ? 'scale-110 text-primary' : 'scale-100 text-muted-foreground'}`} aria-hidden>
                    <Search className="h-5 w-5" onClick={handleSearch} />
                  </div>

                  <Input
                    type="search"
                    placeholder={
                      isSearchExpanded
                        ? 'Search SKU, Product name, Company, Salt...'
                        : 'Search medicines...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => {
                      if (!searchQuery) {
                        setTimeout(() => setIsSearchExpanded(false), 300);
                      }
                    }}
                    className={`pl-12 pr-12 border-0 bg-white/90 dark:bg-gray-800/90 transition-[padding,color] duration-300 ease-in-out ${isSearchExpanded ? 'h-12 text-base' : 'h-10 text-sm'}`}
                  />

                  {/* subtle focus overlay */}
                  <div
                    className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${isSearchExpanded ? 'opacity-20' : 'opacity-0'}`}
                    style={{ boxShadow: isSearchExpanded ? '0 10px 30px rgba(16, 185, 129, 0.12)' : 'none' }}
                  />

                  {/* Clear/Close button — fade/scale */}
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-250 ease-out ${isSearchExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                    {searchQuery ? (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchExpanded(false);
                        }}
                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="Close search"
                        onClick={() => setIsSearchExpanded(false)}
                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Icon for Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications - Hidden when search expanded */}
            {!isSearchExpanded && (
              <Button variant="ghost" size="icon" className="relative hidden md:inline-flex">
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  2
                </Badge>
              </Button>
            )}

            {/* Messages/Support - Hidden when search expanded */}
            {!isSearchExpanded && (
              <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
                <MessageSquare className="h-5 w-5" />
              </Button>
            )}

            {/* New Order Button - Hidden when search expanded */}
            {!isSearchExpanded && (
              <Button size="sm" className="hidden lg:inline-flex">
                <Plus className="h-4 w-4 mr-1" />
                New Order
              </Button>
            )}

            {/* Dark Mode Toggle - Shows current theme icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-amber-500" />
              )}
            </Button>

            {/* Profile Dropdown */}
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
                className="w-64 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-gray-200 dark:border-gray-700 shadow-xl"
              >
                <DropdownMenuLabel className="bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex flex-col py-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{user?.ownerName || 'John Smith'}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1">
                      {user?.shopName || "Medical Store"}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                      GSTIN: {user?.gstin?.slice(-8) || '1234A1ZX'}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-300/50 dark:bg-gray-600/50" />
                <DropdownMenuItem asChild className="focus:bg-gray-200/50 dark:focus:bg-gray-700/50">
                  <Link to="/profile" className="flex items-center py-2 text-gray-900 dark:text-gray-100">
                    <User className="mr-2 h-4 w-4" />
                    <span className="font-medium">Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-gray-200/50 dark:focus:bg-gray-700/50">
                  <Link to="/documents" className="flex items-center py-2 text-gray-900 dark:text-gray-100">
                    <Shield className="mr-2 h-4 w-4" />
                    <span className="font-medium">Documents</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-300/50 dark:bg-gray-600/50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 focus:bg-red-100/50 dark:focus:bg-red-900/30 py-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="text-lg font-semibold">Navigation</div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'My Orders', path: '/orders' },
    { title: 'Quick Reorder', path: '/reorder' },
    { title: 'Offers', path: '/offers' },
    { title: 'Support', path: '/support' },
  ];

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <Link to="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            VitalMEDS
          </Link>

          {/* Center: Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.title} 
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Right Side: Search, Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Input type="search" placeholder="Search..." className="w-40 lg:w-64" />
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">0</Badge>
            </Button>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link to="/" className="font-bold text-primary">VitalMEDS</Link>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.title} 
                      to={link.path} 
                      className={`transition-colors hover:text-primary ${
                        location.pathname === link.path 
                          ? 'text-primary' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.title}
                    </Link>
                  ))}
                  <Link to="/login">
                    <Button className="mt-4 w-full">Login / Register</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

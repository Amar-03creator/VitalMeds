// src/components/common/Navbar/DesktopNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, ShoppingCart, RotateCcw } from 'lucide-react';

const DesktopNav = ({ isSearchExpanded }) => {
  const location = useLocation();
  const navItems = [
    { title: 'Products', path: '/products', icon: Package },
    { title: 'My Orders', path: '/orders', icon: ShoppingCart },
    { title: 'Quick Reorder', path: '/reorder', icon: RotateCcw },
  ];

  return (
    <nav className={`hidden lg:flex items-center gap-6 transition-all duration-500 ease-in-out ${isSearchExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
      {navItems.map((item) => {
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
  );
};

export default DesktopNav;
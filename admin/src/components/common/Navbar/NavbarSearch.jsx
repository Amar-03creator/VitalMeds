import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const NavbarSearch = ({ searchQuery, setSearchQuery }) => {
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  return (
    <>
      {/* MOBILE: Search Button */}
      <div className="lg:hidden flex-1 min-w-0">
        {mobileSearchActive ? (
          <div className="fixed inset-0 z-50 bg-background flex items-center gap-2 px-4 top-0">
            <Search className="text-muted-foreground flex-shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground text-sm"
            />
            <button
              onClick={() => {
                setMobileSearchActive(false);
                setSearchQuery('');
              }}
              className="p-2 text-foreground flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMobileSearchActive(true)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg"
          >
            <Search size={16} className="text-muted-foreground flex-shrink-0" />
          </button>
        )}
      </div>

      {/* DESKTOP: Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-lg">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default NavbarSearch;

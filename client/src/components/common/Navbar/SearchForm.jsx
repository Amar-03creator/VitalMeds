// src/components/common/Navbar/SearchForm.jsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ searchQuery, setSearchQuery, isSearchExpanded, setIsSearchExpanded }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
    setIsSearchExpanded(false);
  };

  return (
    <div className={`hidden md:flex mx-4 items-center ${isSearchExpanded ? 'flex-1' : ''}`}>
      <form onSubmit={handleSearch} className="relative w-full" aria-label="Search form">
        <div
          className={`mx-auto rounded-full overflow-hidden transition-[width] duration-[380ms] ease-in-out ${isSearchExpanded ? 'w-[min(60vw,900px)] shadow-2xl ring-2 ring-primary/30' : 'w-80 shadow-sm'}`}
        >
          <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-out ${isSearchExpanded ? 'scale-110 text-primary' : 'scale-100 text-muted-foreground'}`} aria-hidden>
              <Search className="h-5 w-5" />
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
              className={`pl-12 pr-12 border-0 bg-background/90 transition-[padding,color] duration-300 ease-in-out ${isSearchExpanded ? 'h-12 text-base' : 'h-10 text-sm'}`}
            />

            <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-250 ease-out ${isSearchExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
              {searchQuery ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchExpanded(false);
                  }}
                  className="rounded-full p-1 hover:bg-accent"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setIsSearchExpanded(false)}
                  className="rounded-full p-1 hover:bg-accent"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
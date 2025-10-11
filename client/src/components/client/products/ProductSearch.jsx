import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const ProductSearch = ({ onSearch, isDark }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="mb-6">
      <div className="relative max-w-2xl">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search
            className="w-5 h-5"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          />
        </div>
        <Input
          type="text"
          placeholder="Search by medicine name, SKU, company, or composition..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-12 text-base"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#475569' : '#cbd5e1',
            color: isDark ? '#f1f5f9' : '#0f172a'
          }}
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
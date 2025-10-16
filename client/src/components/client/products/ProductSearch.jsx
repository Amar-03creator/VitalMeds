import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const ProductSearch = ({ onSearch }) => {
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
          <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by medicine name, SKU, company, or composition..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 h-12 text-base bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-slate-500 dark:text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;

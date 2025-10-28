import React from 'react';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const ProductsToolbar = ({ 
  productsCount, 
  sortBy, 
  onSortChange, 
  onOpenFilterModal, 
  isDrawerOpen 
}) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onOpenFilterModal}
          className="w-full bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Show Filters
        </Button>
      </div>

      {/* Products count and sort */}
      <div className={`flex items-center justify-between mb-4 transition-all duration-300 ${
        isDrawerOpen ? 'lg:pr-[350px]' : ''
      }`}>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing <span className="font-semibold">{productsCount}</span> products
        </p>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 rounded-lg text-sm border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </>
  );
};

export default ProductsToolbar;

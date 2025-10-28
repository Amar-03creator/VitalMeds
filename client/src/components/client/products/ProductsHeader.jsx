import React from 'react';
import { Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductsHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
          Medicine Catalog
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Browse our extensive collection of authentic pharmaceutical products
        </p>
      </div>

      {/* View Mode Toggle - Hidden on mobile */}
      <div className="hidden sm:flex gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="icon"
          className={viewMode === 'grid'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }
          onClick={() => setViewMode('grid')}
        >
          <Grid3x3 className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="icon"
          className={viewMode === 'list'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
          }
          onClick={() => setViewMode('list')}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductsHeader;

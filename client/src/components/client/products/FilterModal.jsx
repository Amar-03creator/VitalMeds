import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ProductFilters from './ProductFilters';

const FilterModal = ({ isOpen, onClose, filters, onFilterChange, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-600 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-4">
          <ProductFilters
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Button
            onClick={onApply}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

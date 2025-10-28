import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ActiveFilters = ({ filters, onFilterChange, onClearAll }) => {
  const hasActiveFilters = filters.company.length > 0 || filters.category.length > 0 || filters.inStock;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Active Filters:
      </span>
      {filters.company.map((company) => (
        <Badge
          key={company}
          variant="secondary"
          className="cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={() => {
            onFilterChange({
              company: filters.company.filter(c => c !== company)
            });
          }}
        >
          {company} ×
        </Badge>
      ))}
      {filters.category.map((cat) => (
        <Badge
          key={cat}
          variant="secondary"
          className="cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={() => {
            onFilterChange({
              category: filters.category.filter(c => c !== cat)
            });
          }}
        >
          {cat} ×
        </Badge>
      ))}
      {filters.inStock && (
        <Badge
          variant="secondary"
          className="cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={() => onFilterChange({ inStock: false })}
        >
          In Stock Only ×
        </Badge>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
        onClick={onClearAll}
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;

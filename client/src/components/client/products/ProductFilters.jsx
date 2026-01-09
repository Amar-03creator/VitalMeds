// src/components/client/products/ProductFilters.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';

// ✅ CHANGE: Add filterOptions prop
const ProductFilters = ({ filters, onFilterChange, filterOptions }) => {
  // ❌ REMOVE: Hardcoded arrays
  // const companies = ['Company A', 'Company B', 'Company C', 'Company D'];
  // const categories = [...];
  
  // ✅ ADD: Use dynamic data from API (with fallback to empty array)
  const companies = filterOptions?.companies || [];
  const categories = filterOptions?.categories || [];
  const maxPrice = filterOptions?.priceRange?.max || 1000;

  const handleCompanyToggle = (company) => {
    const newCompanies = filters.company.includes(company)
      ? filters.company.filter(c => c !== company)
      : [...filters.company, company];
    onFilterChange({ company: newCompanies });
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    onFilterChange({ category: newCategories });
  };

  const handleMinPriceIncrement = () => {
    const newMin = Math.min(filters.priceRange[0] + 50, filters.priceRange[1] - 50);
    onFilterChange({ priceRange: [newMin, filters.priceRange[1]] });
  };

  const handleMinPriceDecrement = () => {
    const newMin = Math.max(filters.priceRange[0] - 50, 0);
    onFilterChange({ priceRange: [newMin, filters.priceRange[1]] });
  };

  const handleMaxPriceIncrement = () => {
    const newMax = Math.min(filters.priceRange[1] + 50, maxPrice); // ✅ Use dynamic maxPrice
    onFilterChange({ priceRange: [filters.priceRange[0], newMax] });
  };

  const handleMaxPriceDecrement = () => {
    const newMax = Math.max(filters.priceRange[1] - 50, filters.priceRange[0] + 50);
    onFilterChange({ priceRange: [filters.priceRange[0], newMax] });
  };

  return (
    <Card className="sticky top-20 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-y-auto max-h-[calc(100vh-6rem)] scrollbar-hide">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-slate-900 dark:text-white">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stock Status */}
        <div>
          <h3 className="font-semibold mb-3 text-sm text-slate-800 dark:text-slate-200">
            Availability
          </h3>
          <label
            htmlFor="inStock"
            className="flex items-center p-2 -m-2 rounded-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => onFilterChange({ inStock: checked })}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
              In Stock Only
            </span>
          </label>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 text-sm text-slate-800 dark:text-slate-200">
            Price Range
          </h3>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange({ priceRange: value })}
              max={maxPrice}
              step={50}
              className="mb-4"
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Min Price with Arrows */}
              <div>
                <label className="text-xs mb-1.5 block text-slate-600 dark:text-slate-400">
                  Min Price
                </label>
                <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-lg overflow-hidden">
                  <span className="pl-3 pr-1 text-sm text-white dark:text-slate-300">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={filters.priceRange[1] - 50}
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value) || 0;
                      if (newMin < filters.priceRange[1]) {
                        onFilterChange({ priceRange: [newMin, filters.priceRange[1]] });
                      }
                    }}
                    className="w-full py-2 text-sm text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex flex-col border-l border-slate-700">
                    <button
                      onClick={handleMinPriceIncrement}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors"
                    >
                      <ChevronUp className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={handleMinPriceDecrement}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors border-t border-slate-700"
                    >
                      <ChevronDown className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Max Price with Arrows */}
              <div>
                <label className="text-xs mb-1.5 block text-slate-600 dark:text-slate-400">
                  Max Price
                </label>
                <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-lg overflow-hidden">
                  <span className="pl-3 pr-1 text-sm text-white dark:text-slate-300">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={filters.priceRange[0] + 50}
                    max={maxPrice} 
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value) || maxPrice;
                      if (newMax > filters.priceRange[0]) {
                        onFilterChange({ priceRange: [filters.priceRange[0], newMax] });
                      }
                    }}
                    className="w-full py-2 text-sm text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="flex flex-col border-l border-slate-700">
                    <button
                      onClick={handleMaxPriceIncrement}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors"
                    >
                      <ChevronUp className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={handleMaxPriceDecrement}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors border-t border-slate-700"
                    >
                      <ChevronDown className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Filter */}
        <div>
          <h3 className="font-semibold mb-3 text-sm text-slate-800 dark:text-slate-200">
            Company
          </h3>
          {/* ✅ ADD: Loading state */}
          {companies.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-2">
              Loading companies...
            </p>
          ) : (
            <div className="space-y-1">
              {companies.map((company) => (
                <label
                  key={company}
                  htmlFor={`company-${company}`}
                  className="flex items-center p-2 -m-2 rounded-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <Checkbox
                    id={`company-${company}`}
                    checked={filters.company.includes(company)}
                    onCheckedChange={() => handleCompanyToggle(company)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                    {company}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-3 text-sm text-slate-800 dark:text-slate-200">
            Category
          </h3>
          {/* ✅ ADD: Loading state */}
          {categories.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-2">
              Loading categories...
            </p>
          ) : (
            <div className="space-y-1 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
              {categories.map((category) => (
                <label
                  key={category}
                  htmlFor={`category-${category}`} 
                  className="flex items-center p-2 -m-2 rounded-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;

// src/components/client/products/ProductFilters.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

const ProductFilters = ({ filters, onFilterChange, isDark }) => {
  const companies = ['Company A', 'Company B', 'Company C', 'Company D'];
  const categories = [
    'Pain Relief',
    'Antibiotics',
    'Antihistamine',
    'Gastro',
    'Diabetes',
    'Cardiovascular',
    'Respiratory',
    'Dermatology'
  ];

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

  // Checkbox styles for light/dark mode
  const getCheckboxStyle = (isChecked) => ({
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: isChecked
      ? (isDark ? '#3b82f6' : '#2563eb')
      : (isDark ? '#475569' : '#cbd5e1'),
    backgroundColor: isChecked
      ? (isDark ? '#3b82f6' : '#2563eb')
      : (isDark ? '#0f172a' : '#ffffff'),
    transition: 'all 0.2s ease'
  });

  return (
    <>
      {/* Add CSS for hover effects */}
      <style jsx>{`
        .filter-item {
          display: flex;
          align-items: center;
          padding: 6px 8px;
          margin: -6px -8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-item:hover {
          background-color: ${isDark
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(37, 99, 235, 0.05)'};
        }

        .filter-item:hover .custom-checkbox {
          box-shadow: ${isDark
          ? '0 0 0 3px rgba(59, 130, 246, 0.3)'
          : '0 0 0 3px rgba(37, 99, 235, 0.2)'};
          border-color: ${isDark ? '#60a5fa' : '#3b82f6'} !important;
        }

        .custom-checkbox {
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .filter-label {
          margin-left: 12px;
          flex: 1;
        }
      `}</style>

      <Card
        className="sticky top-20"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <CardHeader>
          <CardTitle
            className="flex items-center text-lg"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stock Status */}
          <div>
            <h3
              className="font-semibold mb-3 text-sm"
              style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
            >
              Availability
            </h3>
            <label
              htmlFor="inStock"
              className="filter-item"
            >
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => onFilterChange({ inStock: checked })}
                className="custom-checkbox"
                style={getCheckboxStyle(filters.inStock)}
              />
              <span
                className="filter-label text-sm cursor-pointer"
                style={{ color: isDark ? '#cbd5e1' : '#475569' }}
              >
                In Stock Only
              </span>
            </label>
          </div>


          {/* Price Range */}
          <div>
            <h3
              className="font-semibold mb-3 text-sm"
              style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
            >
              Price Range
            </h3>
            <div className="px-2">
              {/* Slider */}
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => onFilterChange({ priceRange: value })}
                max={1000}
                step={50}
                className="mb-4"
              />

              {/* Manual Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="text-xs mb-1.5 block"
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  >
                    Min Price
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                      style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                    >
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
                      className="w-full pl-7 pr-2 py-2 text-sm rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      style={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        borderColor: isDark ? '#475569' : '#cbd5e1',
                        color: isDark ? '#f1f5f9' : '#0f172a'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="text-xs mb-1.5 block"
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  >
                    Max Price
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                      style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      min={filters.priceRange[0] + 50}
                      max={1000}
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value) || 1000;
                        if (newMax > filters.priceRange[0]) {
                          onFilterChange({ priceRange: [filters.priceRange[0], newMax] });
                        }
                      }}
                      className="w-full pl-7 pr-2 py-2 text-sm rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      style={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        borderColor: isDark ? '#475569' : '#cbd5e1',
                        color: isDark ? '#f1f5f9' : '#0f172a'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Company Filter */}
          <div>
            <h3
              className="font-semibold mb-3 text-sm"
              style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
            >
              Company
            </h3>
            <div className="space-y-1">
              {companies.map((company) => (
                <label
                  key={company}
                  htmlFor={company}
                  className="filter-item"
                >
                  <Checkbox
                    id={company}
                    checked={filters.company.includes(company)}
                    onCheckedChange={() => handleCompanyToggle(company)}
                    className="custom-checkbox"
                    style={getCheckboxStyle(filters.company.includes(company))}
                  />
                  <span
                    className="filter-label text-sm cursor-pointer"
                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                  >
                    {company}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3
              className="font-semibold mb-3 text-sm"
              style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
            >
              Category
            </h3>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
              {categories.map((category) => (
                <label
                  key={category}
                  htmlFor={category}
                  className="filter-item"
                >
                  <Checkbox
                    id={category}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="custom-checkbox"
                    style={getCheckboxStyle(filters.category.includes(category))}
                  />
                  <span
                    className="filter-label text-sm cursor-pointer"
                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                  >
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductFilters;

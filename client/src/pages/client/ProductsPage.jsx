import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import ProductFilters from '@/components/client/products/ProductFilters';
import ProductGrid from '@/components/client/products/ProductGrid';
import ProductSearch from '@/components/client/products/ProductSearch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'react-router-dom';
import api from '@/services/api';
import {
  Filter,
  Grid3x3,
  List,
  SlidersHorizontal,
  AlertCircle,
  Package
} from 'lucide-react';

const ProductsPage = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    company: [],
    category: [],
    priceRange: [0, 1000],
    inStock: false,
    sortBy: 'name_asc'
  });
  const [searchParams] = useSearchParams();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Mock data - Replace with API call
  useEffect(() => {
    const searchFromURL = searchParams.get('search');
    if (searchFromURL) {
      setFilters(prev => ({ ...prev, search: searchFromURL }));
    }
    fetchProducts();
  }, [searchParams]);

  // Add this new useEffect AFTER the first one
  useEffect(() => {
    fetchProducts();
  }, [filters]); // This will trigger whenever filters change


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Add search
      if (filters.search) params.append('search', filters.search);

      // Add company filter
      if (filters.company.length > 0) {
        params.append('company', filters.company.join(','));
      }

      // Add category filter
      if (filters.category.length > 0) {
        params.append('category', filters.category.join(','));
      }

      // Add price range
      params.append('minPrice', filters.priceRange[0]);
      params.append('maxPrice', filters.priceRange[1]);

      // Add stock filter
      if (filters.inStock) params.append('inStock', 'true');

      // Add sorting
      const [sortField, sortOrder] = filters.sortBy.split('_');
      params.append('sortBy', sortField === 'name' ? 'name' : 'mrp');
      params.append('sortOrder', sortOrder);

      // Add pagination
      params.append('page', 1);
      params.append('limit', 12);

      const response = await api.get(`/products?${params.toString()}`);

      if (response.data.success) {
        setProducts(response.data.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        backgroundColor: isDark ? '#020617' : '#f8fafc'
      }}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                Medicine Catalog
              </h1>
              <p
                className="text-sm"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                Browse our extensive collection of authentic pharmaceutical products
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                style={{
                  backgroundColor: viewMode === 'grid'
                    ? (isDark ? '#3b82f6' : '#2563eb')
                    : 'transparent',
                  color: viewMode === 'grid'
                    ? '#ffffff'
                    : (isDark ? '#cbd5e1' : '#64748b'),
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                style={{
                  backgroundColor: viewMode === 'list'
                    ? (isDark ? '#3b82f6' : '#2563eb')
                    : 'transparent',
                  color: viewMode === 'list'
                    ? '#ffffff'
                    : (isDark ? '#cbd5e1' : '#64748b'),
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* User Status Alert */}
          {user?.status !== 'Approved' && (
            <Alert
              className="mb-4"
              style={{
                backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : '#fef3c7',
                borderColor: isDark ? '#f59e0b' : '#fbbf24',
                color: isDark ? '#fcd34d' : '#92400e'
              }}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your account is pending approval. You can browse products but cannot place orders until verified.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Search Bar */}
        <ProductSearch
          onSearch={(value) => handleFilterChange({ search: value })}
          isDark={isDark}
        />

        {/* Active Filters Display */}
        {(filters.company.length > 0 || filters.category.length > 0 || filters.inStock) && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="text-sm font-medium"
              style={{ color: isDark ? '#cbd5e1' : '#64748b' }}
            >
              Active Filters:
            </span>
            {filters.company.map((company) => (
              <Badge
                key={company}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  handleFilterChange({
                    company: filters.company.filter(c => c !== company)
                  });
                }}
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                  color: isDark ? '#e2e8f0' : '#334155'
                }}
              >
                {company} ×
              </Badge>
            ))}
            {filters.category.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  handleFilterChange({
                    category: filters.category.filter(c => c !== cat)
                  });
                }}
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                  color: isDark ? '#e2e8f0' : '#334155'
                }}
              >
                {cat} ×
              </Badge>
            ))}
            {filters.inStock && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleFilterChange({ inStock: false })}
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                  color: isDark ? '#e2e8f0' : '#334155'
                }}
              >
                In Stock Only ×
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({
                search: '',
                company: [],
                category: [],
                priceRange: [0, 1000],
                inStock: false,
                sortBy: 'name_asc'
              })}
              style={{ color: isDark ? '#ef4444' : '#dc2626' }}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="lg:col-span-1">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                isDark={isDark}
              />
            </div>
          )}

          {/* Products Grid */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Filter Toggle Button for Mobile */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
                style={{
                  backgroundColor: isDark ? 'transparent' : '#ffffff',
                  color: isDark ? '#cbd5e1' : '#334155',
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>
            </div>

            {/* Results Count and Sort */}
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-sm"
                style={{ color: isDark ? '#94a3b8' : '#64748b' }}
              >
                Showing <span className="font-semibold">{products.length}</span> products
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="px-4 py-2 rounded-lg text-sm border"
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  color: isDark ? '#e2e8f0' : '#334155',
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
              >
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Product Grid Component */}
            <ProductGrid
              products={products}
              loading={loading}
              viewMode={viewMode}
              userStatus={user?.status}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductsPage;
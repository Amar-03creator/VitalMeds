import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/useTheme';
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
  Grid3x3,
  List,
  SlidersHorizontal,
  AlertCircle,
  Shield,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const ProductsPage = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.company.length > 0) params.append('company', filters.company.join(','));
      if (filters.category.length > 0) params.append('category', filters.category.join(','));
      params.append('minPrice', filters.priceRange[0]);
      params.append('maxPrice', filters.priceRange[1]);
      if (filters.inStock) params.append('inStock', 'true');
      const [sortField, sortOrder] = filters.sortBy.split('_');
      params.append('sortBy', sortField === 'name' ? 'name' : 'mrp');
      params.append('sortOrder', sortOrder);
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

  useEffect(() => {
    const searchFromURL = searchParams.get('search');
    if (searchFromURL) {
      setFilters(prev => ({ ...prev, search: searchFromURL }));
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      <div
        className="min-h-screen pb-8"
        style={{
          backgroundColor: isDark ? '#020617' : '#f8fafc'
        }}
      >
        <div className="container mx-auto px-4 py-6">
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

          <ProductSearch
            onSearch={(value) => handleFilterChange({ search: value })}
            isDark={isDark}
          />

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

          <div className="grid lg:grid-cols-4 gap-6">
            {showFilters && (
              <div className="lg:col-span-1">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  isDark={isDark}
                />
              </div>
            )}

            <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
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

      {/* Footer Section */}
      <footer className="w-full bg-slate-800 dark:bg-slate-950 border-t border-slate-700">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* VitalMEDS Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">VitalMEDS</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Trusted distributor for pharmacies & clinics. 20+ years industry
                experience delivering quality medicines across India.
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>orders@vitalmeds.example</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>
              </div>
            </div>

            {/* Compliance Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Compliance
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">GSTIN:</span>
                  <span>29ABCDE1234F2Z5</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">Drug License:</span>
                  <span>DL-123456</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium text-gray-200 mr-2">FSSAI:</span>
                  <span>12345678901234</span>
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-xs text-gray-400">
                    © 2025 VitalMEDS. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ProductsPage;

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import api from '@/services/api';

// Product Components
import ProductsHeader from '@/components/client/products/ProductsHeader';
import StatusAlert from '@/components/client/products/StatusAlert';
import ProductSearch from '@/components/client/products/ProductSearch';
import ActiveFilters from '@/components/client/products/ActiveFilters';
import ProductFilters from '@/components/client/products/ProductFilters';
import ProductsToolbar from '@/components/client/products/ProductsToolbar';
import ProductGrid from '@/components/client/products/ProductGrid';
import ProductDetailDrawer from '@/components/client/products/ProductDetailDrawer';
import FilterModal from '@/components/client/products/FilterModal';

// Common Components
import FooterSection from '@/components/common/FooterSection';

// UI Components
import { Button } from '@/components/ui/button';

const ProductsPage = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    company: [],
    category: [],
    priceRange: [0, 1000],
    inStock: false,
    sortBy: 'name_asc'
  });
  const [searchParams] = useSearchParams();

  // Fetch products from API
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

  // Filter handlers
  const handleFilterChange = (newFilters) => {
    if (showFilterModal) {
      setTempFilters({ ...tempFilters, ...newFilters });
    } else {
      setTempFilters({ ...filters, ...newFilters });
    }
  };

  const handleApplyFilters = () => {
    if (tempFilters) {
      setFilters(tempFilters);
    }
    setShowFilterModal(false);
  };

  const handleOpenFilterModal = () => {
    setTempFilters({ ...filters });
    setShowFilterModal(true);
  };

  const handleClearAllFilters = () => {
    setFilters({
      search: '',
      company: [],
      category: [],
      priceRange: [0, 1000],
      inStock: false,
      sortBy: 'name_asc'
    });
  };

  // Product detail handlers
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Get actual view mode (force list on mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const actualViewMode = isMobile ? 'list' : viewMode;

  return (
    <>
      <div className="min-h-screen pb-8 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <ProductsHeader viewMode={viewMode} setViewMode={setViewMode} />
            <StatusAlert userStatus={user?.status} isDrawerOpen={isDrawerOpen} />
          </div>

          <ProductSearch
            onSearch={(value) => setFilters({ ...filters, search: value })}
          />

          <ActiveFilters
            filters={filters}
            onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
            onClearAll={handleClearAllFilters}
          />

          {/* Grid section */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Desktop Filters - Always visible on desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <ProductFilters
                filters={tempFilters || filters}
                onFilterChange={handleFilterChange}
              />
              <Button
                onClick={handleApplyFilters}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Changes
              </Button>
            </div>

            {/* Products Grid Container */}
            <div className="transition-all duration-300 lg:col-span-3">
              <ProductsToolbar
                productsCount={products.length}
                sortBy={filters.sortBy}
                onSortChange={(value) => setFilters({ ...filters, sortBy: value })}
                onOpenFilterModal={handleOpenFilterModal}
                isDrawerOpen={isDrawerOpen}
              />

              {/* ProductGrid wrapper */}
              <div className={`transition-all duration-300 ${
                isDrawerOpen ? 'lg:pr-[350px]' : ''
              }`}>
                <ProductGrid
                  products={products}
                  loading={loading}
                  viewMode={actualViewMode}
                  userStatus={user?.status}
                  onViewDetails={handleViewDetails}
                  isDrawerOpen={isDrawerOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={tempFilters || filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
      />

      {/* Product Detail Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        userStatus={user?.status}
      />

      {/* Footer */}
      <FooterSection />
    </>
  );
};

export default ProductsPage;

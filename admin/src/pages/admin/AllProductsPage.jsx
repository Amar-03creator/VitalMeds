import React, { useEffect, useState, useCallback } from 'react';
import { AlertCircle, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/services/api';

import { ProductStats } from '@/components/admin/products/ProductStats';
import { ProductSearchBar } from '@/components/admin/products/ProductSearchBar';
import { ProductAdvancedFilters } from '@/components/admin/products/ProductAdvancedFilters';
import { ProductTable } from '@/components/admin/products/ProductTable';
import { ProductPagination } from '@/components/admin/products/ProductPagination';
import { ProductDetailModal } from '@/components/admin/products/ProductDetailModal';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedSku, setSelectedSku] = useState('');
  const [expiryMonths, setExpiryMonths] = useState('all');
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');
  const [sortBy, setSortBy] = useState('productName-asc');
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const PAGE_SIZE = 10;

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedCompany !== 'all') params.append('company', selectedCompany);

      const response = await api.get(`/admin/products?${params.toString()}`);

      if (response.data && response.data.length > 0) {
        setProducts(response.data);

        const uniqueCategories = [...new Set(response.data.map((p) => p.category).filter(Boolean))];
        const uniqueCompanies = [...new Set(response.data.map((p) => p.company).filter(Boolean))];
        setCategories(uniqueCategories.sort());
        setCompanies(uniqueCompanies.sort());
      } else {
        setError('No products found in database');
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to fetch products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedCompany]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  useEffect(() => {
    window.addEventListener('product-added', fetchProducts);
    return () => window.removeEventListener('product-added', fetchProducts);
  }, [fetchProducts]);

  // Filter and sort logic
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (selectedSku.trim()) {
      filtered = filtered.filter(p => p.sku && p.sku.toLowerCase().includes(selectedSku.toLowerCase()));
    }
    if (minStock) {
      filtered = filtered.filter(p => p.stock >= parseInt(minStock));
    }
    if (maxStock) {
      filtered = filtered.filter(p => p.stock <= parseInt(maxStock));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'productName-asc':
          return (a.productName || '').localeCompare(b.productName || '');
        case 'productName-desc':
          return (b.productName || '').localeCompare(a.productName || '');
        case 'stock-low':
          return a.stock - b.stock;
        case 'stock-high':
          return b.stock - a.stock;
        case 'price-low':
          return a.mrp - b.mrp;
        case 'price-high':
          return b.mrp - a.mrp;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const stats = {
    total: products.length,
    lowStock: products.filter((p) => p.stock <= 50).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    expiringSoon: products.filter((p) => {
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      return new Date(p.expiryDate) < thirtyDaysFromNow && new Date(p.expiryDate) > now;
    }).length,
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=1200,height=800');
    const html = `
      <html>
        <head>
          <title>All Products Report</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f0f0f0; font-weight: bold; }
            h1 { text-align: center; }
          </style>
        </head>
        <body>
          <h1>VitalMEDS - All Products Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Batch Number</th>
                <th>Expiry Date</th>
                <th>Stock</th>
                <th>Purchase Rate</th>
                <th>MRP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts.map(p =>
                `<tr>
                  <td>${p.productName || 'N/A'}</td>
                  <td>${p.batchNumber || 'N/A'}</td>
                  <td>${new Date(p.expiryDate).toLocaleDateString('en-IN')}</td>
                  <td>${p.stock}</td>
                  <td>₹${(p.purchaseRate || 0).toFixed(2)}</td>
                  <td>₹${(p.mrp || 0).toFixed(2)}</td>
                  <td>${p.stock === 0 ? 'Out of Stock' : p.stock <= 50 ? 'Low Stock' : 'In Stock'}</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCompany('all');
    setSelectedSku('');
    setMinStock('');
    setMaxStock('');
    setExpiryMonths('all');
    setSortBy('productName-asc');
    setPage(1);
  };

  return (
    <div className="space-y-6 pt-6 pb-6">
      {/* Header */}
      <div className="px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage medicines, stock and inventory
            </p>
          </div>
          <Button onClick={handlePrint} className="gap-2 self-start sm:self-auto">
            <Printer className="w-4 h-4" />
            Print All Products
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="px-4 lg:px-8">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Stats */}
      <div className="px-4 lg:px-8">
        <ProductStats stats={stats} categories={categories} />
      </div>

      {/* Search & Filters */}
      <div className="px-4 lg:px-8">
        <ProductSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          categories={categories}
          companies={companies}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          onReset={handleReset}
          setPage={setPage}
        />

        {showAdvancedFilters && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <ProductAdvancedFilters
                selectedSku={selectedSku}
                setSelectedSku={setSelectedSku}
                expiryMonths={expiryMonths}
                setExpiryMonths={setExpiryMonths}
                minStock={minStock}
                setMinStock={setMinStock}
                maxStock={maxStock}
                setMaxStock={setMaxStock}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setPage={setPage}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Table */}
      <div className="px-4 lg:px-8">
        <ProductTable
          loading={loading}
          products={paginatedProducts}
          onView={setSelectedProduct}
          onEdit={() => {}}
          onDelete={() => {}}
        />

        {!loading && filteredProducts.length > 0 && (
          <Card className="mt-0">
            <ProductPagination
              page={page}
              totalPages={totalPages}
              filteredProducts={filteredProducts}
              PAGE_SIZE={PAGE_SIZE}
              onPageChange={setPage}
            />
          </Card>
        )}
      </div>

      {/* Modal */}
      <ProductDetailModal
        selectedProduct={selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default AllProductsPage;

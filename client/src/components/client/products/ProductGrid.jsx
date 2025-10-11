import React from 'react';
import ProductCard from './ProductCard';
import { Package } from 'lucide-react';

const ProductGrid = ({ products, loading, viewMode, userStatus, isDark }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-80 rounded-xl animate-pulse"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9'
            }}
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="text-center py-20 rounded-xl"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <Package
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: isDark ? '#475569' : '#cbd5e1' }}
        />
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          No products found
        </h3>
        <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  const gridClass = viewMode === 'grid' 
    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-4';

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          viewMode={viewMode}
          userStatus={userStatus}
          isDark={isDark}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
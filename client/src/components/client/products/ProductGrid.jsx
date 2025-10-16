import React from 'react';
import ProductCard from './ProductCard';
import { Package } from 'lucide-react';

const ProductGrid = ({ products, loading, viewMode, userStatus }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-80 rounded-xl animate-pulse bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <Package className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-slate-600" />
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
          No products found
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
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
        />
      ))}
    </div>
  );
};

export default ProductGrid;

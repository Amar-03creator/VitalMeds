// src/components/client/dashboard/TopProducts.jsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Star, Heart, ShoppingBag, RotateCcw, IndianRupee, ChevronUp, ChevronDown } from 'lucide-react';

const TopProducts = () => {
  const { user } = useAuth();
  const [hoveredId, setHoveredId] = useState(null);
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });

  const topProducts = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      sku: 'PAR001',
      pack: '10x10',
      price: 45,
      stock: 'In Stock',
      pinned: true,
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      sku: 'AMX002',
      pack: '10x6',
      price: 120,
      stock: 'Low Stock',
      pinned: false,
    },
    {
      id: 3,
      name: 'Ciprofloxacin 500mg',
      sku: 'CIP003',
      pack: '10x10',
      price: 185,
      stock: 'In Stock',
      pinned: true,
    },
    {
      id: 4,
      name: 'Omeprazole 20mg',
      sku: 'OME004',
      pack: '10x10',
      price: 95,
      stock: 'In Stock',
      pinned: false,
    },
  ];

  const handleIncrement = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] - 1) // Minimum 1
    }));
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = parseInt(value) || 1;
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, numValue)
    }));
  };

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-lg dark:rounded-2xl border border-gray-200 dark:border-slate-700 p-5 dark:p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 dark:mb-5">
        <div>
          <h3 className="text-lg dark:text-xl font-semibold dark:font-bold text-gray-900 dark:text-white">
            Top Products
          </h3>
          <p className="text-xs dark:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Frequently ordered items
          </p>
        </div>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 h-8 dark:h-9 px-4 dark:px-5 text-xs dark:text-sm dark:shadow-lg"
        >
          View All
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 dark:gap-4">
        {topProducts.map((product) => {
          const isInStock = product.stock === 'In Stock';
          const isHovered = hoveredId === product.id;
          const quantity = quantities[product.id];

          return (
            <Card
              key={product.id}
              className="relative p-3 dark:p-4 bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700/50 hover:shadow-md dark:hover:border-slate-600 transition-all dark:rounded-xl"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Name */}
              <div className="flex items-start justify-between mb-1.5 dark:mb-2">
                <h4 className="text-sm dark:text-base font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h4>
                {product.pinned ? (
                  <Star className="w-4 h-4 dark:w-5 dark:h-5 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400 flex-shrink-0 ml-2" />
                ) : isHovered ? (
                  <Heart className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                ) : null}
              </div>

              {/* SKU and Pack */}
              <p className="text-xs dark:text-sm text-gray-500 dark:text-slate-400 mb-2 dark:mb-3">
                {product.sku} • {product.pack}
              </p>

              {/* Price and Stock Badge */}
              <div className="flex items-center gap-2 mb-3 dark:mb-3">
                <span className="font-bold text-lg dark:text-xl flex items-center text-blue-600 dark:text-blue-500">
                  <IndianRupee className="w-3.5 h-3.5 dark:w-4 dark:h-4" />
                  {product.price}
                </span>
                <Badge
                  variant="outline"
                  className={
                    isInStock
                      ? 'bg-transparent dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-600 dark:border-green-500/30 hover:bg-transparent dark:hover:bg-green-500/10 text-xs dark:rounded-full dark:px-2.5 py-0'
                      : 'bg-transparent dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-500/30 hover:bg-transparent dark:hover:bg-orange-500/10 text-xs dark:rounded-full dark:px-2.5 py-0'
                  }
                >
                  {product.stock}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Quantity Control with Arrows */}
                <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-lg overflow-hidden">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-12 h-8 dark:h-9 text-xs dark:text-sm text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    min="1"
                  />
                  <div className="flex flex-col border-l border-slate-700">
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors"
                    >
                      <ChevronUp className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors border-t border-slate-700"
                    >
                      <ChevronDown className="w-3 h-3 text-slate-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1 h-8 dark:h-9 text-xs dark:text-sm bg-gray-400 dark:bg-slate-700/50 text-white dark:text-slate-300 hover:bg-gray-500 dark:hover:bg-slate-700 dark:border dark:border-slate-600/50 dark:rounded-lg"
                  disabled={user?.status !== 'Approved'}
                >
                  <ShoppingBag className="w-3.5 h-3.5 dark:w-4 dark:h-4 mr-1.5" />
                  Add
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 dark:h-9 w-8 dark:w-9 bg-gray-400 dark:bg-slate-700/50 text-white dark:text-slate-300 hover:bg-gray-500 dark:hover:bg-slate-700 dark:border dark:border-slate-600/50 dark:rounded-lg"
                  disabled={user?.status !== 'Approved'}
                >
                  <RotateCcw className="w-3.5 h-3.5 dark:w-4 dark:h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopProducts;

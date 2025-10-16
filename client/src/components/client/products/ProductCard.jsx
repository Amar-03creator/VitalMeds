// src/components/client/products/ProductCard.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Package,
  FlaskConical,
  ChevronUp,
  ChevronDown,
  Eye,
  Sparkles
} from 'lucide-react';

const ProductCard = ({ product, viewMode, userStatus, onViewDetails }) => {
  const [quantity, setQuantity] = useState(1);
  const isApproved = userStatus === 'Approved';
  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = (value) => {
    const newQty = Math.max(1, Math.min(99, value));
    setQuantity(newQty);
  };

  const handleIncrement = () => {
    setQuantity(prev => Math.min(99, prev + 1));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-28 h-28 flex items-center justify-center bg-slate-50 dark:bg-slate-900 flex-shrink-0">
            <Package className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>

          <div className="flex-1 p-2 flex flex-col justify-between">
            {/* Product Info */}
            <div>
              <div className="flex items-baseline gap-1.5 flex-wrap mb-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {product.company}
                </span>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {product.name}
                </h3>
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 text-[9px] px-1.5 py-0 h-4">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                    New
                  </Badge>
                )}
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400 text-[10px] px-1.5 py-0 h-4">
                  {product.category}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 flex items-start gap-1 mb-1">
                <FlaskConical className="w-3 h-3 mt-0.5 flex-shrink-0" />
                {product.composition}
              </p>

              <p className="text-[10px] text-slate-500 dark:text-slate-500">
                SKU: {product.sku}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <div>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-500">
                  ₹{product.mrp}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500">
                  {product.packSize}
                </p>
              </div>

              <Badge
                variant={isOutOfStock ? 'destructive' : 'secondary'}
                className={`text-[10px] px-2 py-0.5 ${isOutOfStock
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
                  : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
                  }`}
              >
                {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
              </Badge>

              <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-md overflow-hidden">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-10 py-1 text-xs text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={!isApproved || isOutOfStock}
                />
                <div className="flex flex-col border-l border-slate-700">
                  <button
                    onClick={handleIncrement}
                    disabled={!isApproved || isOutOfStock}
                    className="px-1 py-0.5 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-2.5 h-2.5 text-slate-400 hover:text-white" />
                  </button>
                  <button
                    onClick={handleDecrement}
                    disabled={!isApproved || isOutOfStock}
                    className="px-1 py-0.5 hover:bg-slate-700 transition-colors border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400 hover:text-white" />
                  </button>
                </div>
              </div>

              <Button
                size="sm"
                className={`text-xs h-7 px-3 text-white ${isApproved && !isOutOfStock
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                  }`}
                disabled={!isApproved || isOutOfStock}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-2"
                onClick={() => onViewDetails(product)}
              >
                <Eye className="w-3 h-3 mr-1" />
                View in Detail
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid View Layout
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      {/* Product Image */}
      <div className="h-32 flex items-center justify-center relative bg-slate-50 dark:bg-slate-900">
        <Package className="w-14 h-14 text-slate-300 dark:text-slate-600" />
        {product.isNew && (
          <Badge className="absolute top-2 right-2 text-xs bg-gradient-to-r from-green-600 to-green-700 text-white border-0 px-1.5 py-0.5">
            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
            New
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80">
            <Badge variant="destructive" className="text-xs bg-red-600 dark:bg-red-600/90 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Company Name - 2px left padding */}
      <div className='flex justify-between'>
        <span className="pl-2 pt-0.5 text-[12px] text-slate-500 dark:text-slate-400">
          {product.company}
        </span>
        <span className="pr-2 text-[12px] text-slate-500 dark:text-slate-500">
          {product.packSize}
        </span>
      </div>

      <CardContent className="px-3 pt-0 pb-3 flex flex-col flex-1">
        {/* Product Name and Category - 4px additional left (total pl-4 from card edge) */}
        <div className="flex items-center justify-between gap-2 mb-1 pl-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {product.name}
          </h3>
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400 flex-shrink-0">
            {product.category}
          </Badge>
        </div>

{/* Composition and MRP and View Details */}
<div className='h-20 flex flex-col justify-center'>
  {/* Composition - centered vertically */}
  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 flex items-start gap-1">
    <FlaskConical className="w-3 h-3 mt-0.5 flex-shrink-0" />
    {product.composition}
  </p>
</div>

{/* Price and View in Detail side by side - outside the h-20 div */}
<div className="flex justify-between gap-2 mb-1">
  {/* Left: Price */}
  <div className="flex pb-1 items-baseline gap-1">
    <span className="text-[10px] text-slate-600 dark:text-slate-400">MRP</span>
    <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
      ₹{product.mrp}
    </span>
  </div>

  {/* Right: View in Detail Button */}
  <Button
    size="sm"
    variant="outline"
    className="h-7 text-xs bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 px-2 flex-shrink-0"
    onClick={() => onViewDetails(product)}
  >
    <Eye className="w-3 h-3 mr-1" />
    View in Detail
  </Button>
</div>


        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-md overflow-hidden">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-12 py-1.5 text-xs text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              disabled={!isApproved || isOutOfStock}
            />
            <div className="flex flex-col border-l border-slate-700">
              <button
                onClick={handleIncrement}
                disabled={!isApproved || isOutOfStock}
                className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronUp className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
              <button
                onClick={handleDecrement}
                disabled={!isApproved || isOutOfStock}
                className="px-1.5 py-0.5 hover:bg-slate-700 transition-colors border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronDown className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </div>
          </div>

          <Button
            size="sm"
            className={`flex-1 text-xs h-8 text-white whitespace-nowrap ${isApproved && !isOutOfStock
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
              }`}
            disabled={!isApproved || isOutOfStock}
          >
            <ShoppingCart className="w-3 h-3 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

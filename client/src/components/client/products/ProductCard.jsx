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
// List View Layout - Responsive: Compact for desktop, mobile-friendly stacked
if (viewMode === 'list') {
  return (
    <Card className="w-full hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Desktop Layout - Horizontal compact */}
      <div className="hidden sm:flex gap-3 p-2.5 items-center">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
          <Package className="w-10 h-10 text-slate-300 dark:text-slate-600" />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-center min-w-0 overflow-hidden">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 truncate">
            {product.company}
          </p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-1">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 text-[9px] px-1.5 py-0 h-4">
                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                New
              </Badge>
            )}
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400 text-[9px] px-1.5 py-0 h-4">
              {product.category}
            </Badge>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate flex items-center gap-1">
            <FlaskConical className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{product.composition}</span>
          </p>
          <p className="text-[9px] text-slate-500 dark:text-slate-500 truncate mt-0.5">
            SKU: {product.sku} • Pack: {product.packSize}
          </p>
        </div>

        {/* Price & Stock */}
        <div className="flex flex-col items-end justify-center gap-1.5 flex-shrink-0">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[10px] text-slate-600 dark:text-slate-400">MRP</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ₹{product.mrp}
            </span>
          </div>
          <Badge
            variant={isOutOfStock ? 'destructive' : 'secondary'}
            className={`text-[9px] px-2 py-0.5 ${isOutOfStock
              ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
              : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
              }`}
          >
            {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
          </Badge>
        </div>

        {/* Action Buttons - Desktop vertical stack */}
        <div className="flex flex-col gap-1.5 items-stretch flex-shrink-0 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="flex justify-between bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-md overflow-hidden">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-10 py-1 ml-8 text-xs text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            className={`text-xs h-7 px-3 text-white whitespace-nowrap ${isApproved && !isOutOfStock
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
            className="h-7 px-3 text-xs bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="w-3 h-3 mr-1" />
            Details
          </Button>
        </div>
      </div>

      {/* Mobile Layout - Stacked with horizontal buttons at bottom */}
      <div className="flex sm:hidden flex-col">
        <div className="flex gap-2.5 p-2.5">
          {/* Image */}
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
            <Package className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className='flex justify-between'>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5 truncate">
              {product.company}
            </p>
            {product.isNew && (
                <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 text-[9px] px-1.5 py-0 h-4">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                  New
                </Badge>
              )}
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400 text-[9px] px-1.5 py-0 h-4">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              
              
            </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-1 flex items-start gap-1">
              <FlaskConical className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" />
              <span className="truncate">{product.composition}</span>
            </p>
            <p className="text-[9px] text-slate-500 dark:text-slate-500 truncate mt-0.5">
              SKU: {product.sku}
            </p>
          </div>
        </div>

        {/* Price & Stock - Horizontal */}
        <div className="flex items-center justify-between px-2.5 pb-2">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[10px] text-slate-600 dark:text-slate-400">MRP</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-500">
              ₹{product.mrp}
            </span>
          </div>
          <Badge
            variant={isOutOfStock ? 'destructive' : 'secondary'}
            className={`text-[9px] px-2 py-0.5 ${isOutOfStock
              ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
              : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
              }`}
          >
            {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
          </Badge>
        </div>

        {/* Action Buttons - Mobile horizontal at bottom */}
        <div className="flex items-center gap-2 px-2.5 pb-2.5 border-t border-slate-200 dark:border-slate-700 pt-2">
          {/* Quantity Selector */}
          <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-md overflow-hidden flex-shrink-0">
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-9 py-1.5 text-xs text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

          {/* Add to Cart Button - Grows to fill space */}
          <Button
            size="sm"
            className={`flex-1 text-xs h-8 text-white ${isApproved && !isOutOfStock
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
              }`}
            disabled={!isApproved || isOutOfStock}
          >
            <ShoppingCart className="w-3 h-3 mr-1.5" />
            Add to Cart
          </Button>

          {/* View Details Button */}
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 flex-shrink-0"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="w-3 h-3 mr-1" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}




  // Grid View Layout
  return (
    <Card className="w-full max-w-[360px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
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

        {/* Desktop Layout - Original */}
        <div className="hidden sm:flex justify-between gap-2 mb-1">
          <div className="flex pb-1 items-baseline gap-1">
            <span className="text-[10px] text-slate-600 dark:text-slate-400">MRP</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
              ₹{product.mrp}
            </span>
          </div>
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

        {/* Mobile Layout - Stacked */}
        <div className="sm:hidden space-y-2">
          {/* Price */}
          <div className="flex pb-1 items-baseline gap-1">
            <span className="text-[10px] text-slate-600 dark:text-slate-400">MRP</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
              ₹{product.mrp}
            </span>
          </div>

          {/* View in Detail - Full width on mobile */}
          <Button
            size="sm"
            variant="outline"
            className="w-full h-8 text-xs bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="w-3 h-3 mr-1.5" />
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
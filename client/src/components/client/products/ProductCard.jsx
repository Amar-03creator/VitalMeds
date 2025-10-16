// src/components/client/products/ProductCard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Package,
  Building,
  FlaskConical,
  Plus,
  Minus,
  Eye,
  Sparkles
} from 'lucide-react';

const ProductCard = ({ product, viewMode, userStatus }) => {
  const [quantity, setQuantity] = useState(1);
  const isApproved = userStatus === 'Approved';
  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = (value) => {
    const newQty = Math.max(1, Math.min(99, value));
    setQuantity(newQty);
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row">
          {/* Product Image Placeholder */}
          <div className="md:w-48 h-48 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <Package className="w-16 h-16 text-slate-300 dark:text-slate-600" />
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Building className="w-4 h-4" />
                    {product.company}
                  </span>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-sm flex items-center gap-1 mb-1 text-slate-600 dark:text-slate-400">
                  <FlaskConical className="w-4 h-4" />
                  {product.composition}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  SKU: {product.sku} • Pack: {product.packSize}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold mb-1 text-blue-600 dark:text-blue-500">
                  ₹{product.mrp}
                </div>
                <Badge
                  variant={isOutOfStock ? 'destructive' : 'secondary'}
                  className={isOutOfStock 
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
                  }
                >
                  {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!isApproved || isOutOfStock}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                  disabled={!isApproved || isOutOfStock}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!isApproved || isOutOfStock}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                className={`flex-1 text-white ${
                  isApproved && !isOutOfStock
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                }`}
                disabled={!isApproved || isOutOfStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid View Card
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      {/* Product Image */}
      <div className="h-48 flex items-center justify-center relative bg-slate-50 dark:bg-slate-900">
        <Package className="w-20 h-20 text-slate-300 dark:text-slate-600" />
        {product.isNew && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            New
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80">
            <Badge variant="destructive" className="text-sm bg-red-600 dark:bg-red-600/90 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-1 text-slate-900 dark:text-white">
          {product.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
            <Building className="w-3 h-3" />
            {product.company}
          </span>
          <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400">
            {product.category}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm mb-2 line-clamp-2 flex items-start gap-1 text-slate-600 dark:text-slate-400">
          <FlaskConical className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {product.composition}
        </p>
        <p className="text-xs mb-3 text-slate-500 dark:text-slate-500">
          {product.packSize}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs mb-1 text-slate-600 dark:text-slate-400">
              MRP
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ₹{product.mrp}
            </p>
          </div>
          <Badge
            variant={isOutOfStock ? 'destructive' : 'secondary'}
            className={isOutOfStock 
              ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
              : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
            }
          >
            {isOutOfStock ? 'Out of Stock' : `${product.stock} units`}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 pt-0">
        <div className="flex items-center gap-2 w-full">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={!isApproved || isOutOfStock}
            className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="text-center bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
            disabled={!isApproved || isOutOfStock}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={!isApproved || isOutOfStock}
            className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button
          className={`w-full text-white ${
            isApproved && !isOutOfStock
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
          }`}
          disabled={!isApproved || isOutOfStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full bg-transparent dark:bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

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

const ProductCard = ({ product, viewMode, userStatus, isDark }) => {
  const [quantity, setQuantity] = useState(1);
  const isApproved = userStatus === 'Approved';
  const isOutOfStock = product.stock === 0;

  const handleQuantityChange = (value) => {
    const newQty = Math.max(1, Math.min(99, value));
    setQuantity(newQty);
  };

  if (viewMode === 'list') {
    return (
      <Card
        className="hover:shadow-lg transition-all"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Product Image Placeholder */}
          <div
            className="md:w-48 h-48 flex items-center justify-center"
            style={{
              backgroundColor: isDark ? '#0f172a' : '#f8fafc'
            }}
          >
            <Package
              className="w-16 h-16"
              style={{ color: isDark ? '#475569' : '#cbd5e1' }}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  >
                    {product.name}
                  </h3>
                  {product.isNew && (
                    <Badge
                      style={{
                        background: 'linear-gradient(to right, #10b981, #059669)',
                        color: '#ffffff'
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span
                    className="flex items-center gap-1"
                    style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                  >
                    <Building className="w-4 h-4" />
                    {product.company}
                  </span>
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
                      borderColor: isDark ? '#3b82f6' : '#93c5fd',
                      color: isDark ? '#60a5fa' : '#1e40af'
                    }}
                  >
                    {product.category}
                  </Badge>
                </div>
                <p
                  className="text-sm flex items-center gap-1 mb-1"
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                >
                  <FlaskConical className="w-4 h-4" />
                  {product.composition}
                </p>
                <p
                  className="text-xs"
                  style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                >
                  SKU: {product.sku} • Pack: {product.packSize}
                </p>
              </div>

              <div className="text-right">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                >
                  ₹{product.mrp}
                </div>
                <Badge
                  variant={isOutOfStock ? 'destructive' : 'secondary'}
                  style={{
                    backgroundColor: isOutOfStock 
                      ? (isDark ? 'rgba(220, 38, 38, 0.2)' : '#fee2e2')
                      : (isDark ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'),
                    color: isOutOfStock
                      ? (isDark ? '#fca5a5' : '#991b1b')
                      : (isDark ? '#4ade80' : '#15803d'),
                    borderColor: isOutOfStock
                      ? (isDark ? '#dc2626' : '#fca5a5')
                      : (isDark ? '#16a34a' : '#86efac')
                  }}
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
                  style={{
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: isDark ? '#475569' : '#cbd5e1',
                    color: isDark ? '#cbd5e1' : '#334155'
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  disabled={!isApproved || isOutOfStock}
                  style={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#475569' : '#cbd5e1',
                    color: isDark ? '#f1f5f9' : '#0f172a'
                  }}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!isApproved || isOutOfStock}
                  style={{
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: isDark ? '#475569' : '#cbd5e1',
                    color: isDark ? '#cbd5e1' : '#334155'
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                className="flex-1 text-white"
                disabled={!isApproved || isOutOfStock}
                style={{
                  background: (isApproved && !isOutOfStock)
                    ? (isDark ? 'linear-gradient(to right, #3b82f6, #2563eb)' : 'linear-gradient(to right, #2563eb, #1d4ed8)')
                    : (isDark ? '#334155' : '#cbd5e1'),
                  opacity: (!isApproved || isOutOfStock) ? 0.6 : 1
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                style={{
                  backgroundColor: isDark ? 'transparent' : '#ffffff',
                  color: isDark ? '#cbd5e1' : '#334155',
                  borderColor: isDark ? '#475569' : '#cbd5e1'
                }}
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
    <Card
      className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
      style={{
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        height: '100%'
      }}
    >
      {/* Product Image */}
      <div
        className="h-48 flex items-center justify-center relative"
        style={{
          backgroundColor: isDark ? '#0f172a' : '#f8fafc'
        }}
      >
        <Package
          className="w-20 h-20"
          style={{ color: isDark ? '#475569' : '#cbd5e1' }}
        />
        {product.isNew && (
          <Badge
            className="absolute top-3 right-3"
            style={{
              background: 'linear-gradient(to right, #10b981, #059669)',
              color: '#ffffff'
            }}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            New
          </Badge>
        )}
        {isOutOfStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)'
            }}
          >
            <Badge
              variant="destructive"
              className="text-sm"
              style={{
                backgroundColor: isDark ? 'rgba(220, 38, 38, 0.9)' : '#dc2626',
                color: '#ffffff'
              }}
            >
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle
          className="text-lg line-clamp-1"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          {product.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 flex-wrap">
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: isDark ? '#94a3b8' : '#64748b' }}
          >
            <Building className="w-3 h-3" />
            {product.company}
          </span>
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
              borderColor: isDark ? '#3b82f6' : '#93c5fd',
              color: isDark ? '#60a5fa' : '#1e40af'
            }}
          >
            {product.category}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p
          className="text-sm mb-2 line-clamp-2 flex items-start gap-1"
          style={{ color: isDark ? '#94a3b8' : '#64748b' }}
        >
          <FlaskConical className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {product.composition}
        </p>
        <p
          className="text-xs mb-3"
          style={{ color: isDark ? '#64748b' : '#94a3b8' }}
        >
          {product.packSize}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs mb-1"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              MRP
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
            >
              ₹{product.mrp}
            </p>
          </div>
          <Badge
            variant={isOutOfStock ? 'destructive' : 'secondary'}
            style={{
              backgroundColor: isOutOfStock 
                ? (isDark ? 'rgba(220, 38, 38, 0.2)' : '#fee2e2')
                : (isDark ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7'),
              color: isOutOfStock
                ? (isDark ? '#fca5a5' : '#991b1b')
                : (isDark ? '#4ade80' : '#15803d'),
              borderColor: isOutOfStock
                ? (isDark ? '#dc2626' : '#fca5a5')
                : (isDark ? '#16a34a' : '#86efac')
            }}
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
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#cbd5e1' : '#334155'
            }}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="text-center"
            disabled={!isApproved || isOutOfStock}
            style={{
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#f1f5f9' : '#0f172a'
            }}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={!isApproved || isOutOfStock}
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#cbd5e1' : '#334155'
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button
          className="w-full text-white"
          disabled={!isApproved || isOutOfStock}
          style={{
            background: (isApproved && !isOutOfStock)
              ? (isDark ? 'linear-gradient(to right, #3b82f6, #2563eb)' : 'linear-gradient(to right, #2563eb, #1d4ed8)')
              : (isDark ? '#334155' : '#cbd5e1'),
            opacity: (!isApproved || isOutOfStock) ? 0.6 : 1
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="w-full"
          style={{
            backgroundColor: isDark ? 'transparent' : '#ffffff',
            color: isDark ? '#cbd5e1' : '#334155',
            borderColor: isDark ? '#475569' : '#cbd5e1'
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
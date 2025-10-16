// src/components/client/products/ProductDetailDrawer.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  X,
  ShoppingCart,
  Building2,
  FlaskConical,
  Pill,
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Info,
  Truck,
  Shield,
  Calendar,
  ChevronUp,
  ChevronDown,
  Heart,
  Share2,
} from 'lucide-react';

const ProductDetailDrawer = ({ product, isOpen, onClose, userStatus }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isApproved = userStatus === 'Approved';
  const isOutOfStock = product?.stock === 0;

  // Reset quantity when product changes
  useEffect(() => {
    if (product) {
      setQuantity(product.moq || 1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isOpen || !product) return;

    const images = product?.images && product.images.length > 0
      ? product.images
      : ['https://via.placeholder.com/400x400/3b82f6/ffffff?text=Medicine+1',
        'https://via.placeholder.com/400x400/10b981/ffffff?text=Medicine+2',
        'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Medicine+3'];

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  // Mock images - in real app, these would come from product.images
  const images = product?.images && product.images.length > 0
    ? product.images
    : [
      'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Medicine+1',
      'https://via.placeholder.com/400x400/10b981/ffffff?text=Medicine+2',
      'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Medicine+3',
    ];

  const handleQuantityChange = (value) => {
    const moq = product.moq || 1;
    const newQty = Math.max(moq, value);
    setQuantity(newQty);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + (product.moq || 1));
  };

  const handleDecrement = () => {
    const moq = product.moq || 1;
    setQuantity(prev => Math.max(moq, prev - moq));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`fixed top-16 right-0 bottom-0 w-full lg:w-[450px] xl:w-[500px] bg-white dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Scrollable Container */}
      <div className="h-full overflow-y-auto scrollbar-hide pb-56">
        {/* Compact Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Product Details
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Image Carousel - Auto-rotating, No thumbnails */}
          <div className="relative bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
            <div className="aspect-square flex items-center justify-center relative">
              {/* Current Image with fade animation */}
              <div className="absolute inset-0 transition-opacity duration-500">
                {images[currentImageIndex].startsWith('http') ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="w-24 h-24 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400 dark:text-slate-500">{product.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 transition-colors shadow-lg z-10"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 transition-colors shadow-lg z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${index === currentImageIndex
                          ? 'bg-blue-600 w-6'
                          : 'bg-white/60 dark:bg-slate-600 w-1.5'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Title & Info */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  SKU: <span className="font-medium">{product.sku}</span>
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={isOutOfStock ? 'destructive' : 'secondary'}
                  className={`mb-1 ${isOutOfStock
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700'
                    }`}
                >
                  {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-400 text-xs">
                  <Building2 className="w-3 h-3 mr-1" />
                  {product.company}
                </Badge>
              </div>
            </div>
          </div>

          {/* Price Block */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                  MRP (Maximum Retail Price)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                    ₹{product.mrp}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    per {product.packSize}
                  </span>
                </div>
              </div>
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              * Contact for bulk pricing and special offers
            </p>
          </Card>

          {/* Composition & Formulation */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              Composition & Formulation
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              {product.composition}
            </p>
          </div>

          {/* Usage & Dosage */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <Pill className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              Usage & Dosage
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              {product.usage || 'As prescribed by your healthcare professional. Follow the dosage instructions on the label or as directed by your doctor.'}
            </p>
          </div>

          {/* Category & Pack Size */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Category
              </h4>
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-400">
                {product.category}
              </Badge>
            </div>
            <div>
              <h4 className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Pack Size
              </h4>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {product.packSize}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              Additional Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-xs">
                    Storage Instructions
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Store in a cool, dry place away from direct sunlight
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-xs">
                    Delivery Time
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    2-5 business days depending on location
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-xs">
                    Expiry Date
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {product.expiryDate || 'Minimum 12 months from dispatch'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Warning/Alert */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-amber-900 dark:text-amber-400 mb-1">
                  Important Notice
                </p>
                <p className="text-amber-800 dark:text-amber-500">
                  This is a prescription medicine. A valid prescription is required for dispensing.
                  Not for retail sale. For distribution to licensed pharmacies and healthcare facilities only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer - Order Controls */}
        <div className="fixed bottom-0 right-0 w-full lg:w-[450px] xl:w-[500px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-3 shadow-lg">
          {/* MOQ and Quantity on same line */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Minimum Order Quantity: <span className="font-semibold text-slate-900 dark:text-white">{product.moq || 1} units</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Total: <span className="font-bold text-lg text-slate-900 dark:text-white">₹{(product.mrp * quantity).toLocaleString()}</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center bg-slate-800 dark:bg-slate-800/70 border border-slate-700 rounded-lg overflow-hidden">
              <span className="text-xs text-slate-400 px-2">Qty:</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.moq || 1)}
                className="w-14 py-1.5 text-sm text-center bg-transparent text-white dark:text-slate-300 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min={product.moq || 1}
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 text-xs h-9 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              disabled={!isApproved || isOutOfStock}
            >
              Add to Wishlist
            </Button>
            <Button
              className={`flex-1 text-xs h-9 text-white ${isApproved && !isOutOfStock
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-60'
                }`}
              disabled={!isApproved || isOutOfStock}
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              {isApproved ? (isOutOfStock ? 'Out of Stock' : 'Add to Cart') : 'Pending Approval'}
            </Button>
          </div>

          {!isApproved && (
            <p className="text-xs text-center text-amber-600 dark:text-amber-500 mt-2">
              Your account is pending approval. You cannot place orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDrawer;

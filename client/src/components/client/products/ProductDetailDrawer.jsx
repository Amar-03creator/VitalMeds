// src/components/client/products/ProductDetailDrawer.jsx

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Package,
  Building,
  FlaskConical,
  Pill,
  AlertCircle,
  Shield,
  Check,
  Plus,
  Minus,
} from 'lucide-react';

const ProductDetailDrawer = ({ product, isOpen, onClose, userStatus }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isApproved = userStatus === 'Approved';
  const isOutOfStock = product?.stock === 0;

  // Mock images - replace with actual product images from API
  const productImages = product?.images || [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
  ];

  // Reset state when drawer opens with new product
  React.useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      setQuantity(product?.moq || 1);
    }
  }, [product]);

  const handleQuantityChange = (value) => {
    const moq = product?.moq || 1;
    const newQty = Math.max(moq, Math.min(9999, value));
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (quantity < product?.moq) {
      alert(`Minimum order quantity is ${product.moq} units`);
      return;
    }
    console.log('Adding to cart:', { product, quantity });
    // Implement actual cart logic
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[540px] lg:w-[600px] p-0 overflow-y-auto"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Product Details</SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Carousel Controls */}
            {productImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? 'bg-primary w-6'
                          : 'bg-muted-foreground/30 w-2'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Status Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <Package className="w-3 h-3 mr-1" />
                  New
                </Badge>
              )}
              {isOutOfStock && (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          {/* Product Title & Brand */}
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  {product.company}
                </span>
              </div>
            </div>

            {/* Generic Name & Strength */}
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Pill className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Generic Name & Strength
                  </p>
                  <p className="font-semibold text-foreground">
                    {product.composition}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Block */}
          <div className="bg-muted rounded-lg p-4 border">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  MRP
                </span>
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.mrp}
                </span>
                <span className="text-sm text-muted-foreground">
                  per {product.packSize}
                </span>
              </div>
              {!isApproved && (
                <p className="text-sm text-amber-600 dark:text-amber-500 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Pricing visible after account approval
                </p>
              )}
            </div>
          </div>

          {/* Tabbed Content Section */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="usage">Usage & Dosage</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <FlaskConical className="w-5 h-5" />
                  Composition & Formulation
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <p className="text-sm leading-relaxed text-foreground">
                    {product.description || 
                      `${product.composition} - This pharmaceutical product is formulated with high-quality active ingredients following GMP standards. Each unit contains standardized composition ensuring consistent therapeutic efficacy. The formulation is designed to provide optimal bioavailability and stability.`
                    }
                  </p>
                </div>
              </div>

              {/* Product Information Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1 text-muted-foreground">
                    Category
                  </p>
                  <Badge variant="outline" className="font-semibold">
                    {product.category}
                  </Badge>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1 text-muted-foreground">
                    Pack Size
                  </p>
                  <p className="font-semibold text-foreground">
                    {product.packSize}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1 text-muted-foreground">
                    SKU
                  </p>
                  <p className="font-mono text-sm font-semibold text-foreground">
                    {product.sku}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1 text-muted-foreground">
                    Stock Status
                  </p>
                  <p className={`font-semibold ${isOutOfStock ? 'text-destructive' : 'text-green-500'}`}>
                    {isOutOfStock ? 'Out of Stock' : `${product.stock} units`}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Usage & Dosage Information
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>As prescribed by a registered medical practitioner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Follow dosage instructions carefully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Store in a cool, dry place away from direct sunlight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Do not use if packaging is damaged or expired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-amber-600 dark:text-amber-500 font-medium">
                        Keep out of reach of children
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Regulatory Info */}
              <div className="bg-muted/50 rounded-lg p-4 border">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground">
                  <Shield className="w-4 h-4" />
                  Regulatory Information
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Manufactured under GMP certified facility</li>
                  <li>• Licensed by Drug Controller</li>
                  <li>• Batch tested for quality assurance</li>
                  <li>• Prescription required (Schedule H drug)</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          {/* Minimum Order Quantity Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Minimum Order Quantity (MOQ)
                </p>
                <p className="text-xs mt-1 text-blue-700 dark:text-blue-400">
                  This product requires a minimum order of{' '}
                  <span className="font-bold">{product.moq || 1} units</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="sticky bottom-0 bg-background border-t px-6 py-4 space-y-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              Quantity:
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={!isApproved || isOutOfStock || quantity <= (product.moq || 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-20 text-center"
                disabled={!isApproved || isOutOfStock}
                min={product.moq || 1}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={!isApproved || isOutOfStock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
            disabled={!isApproved || isOutOfStock}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isApproved
              ? isOutOfStock
                ? 'Out of Stock'
                : 'Request Price Quote'
              : 'Account Approval Required'}
          </Button>

          {!isApproved && (
            <p className="text-xs text-center text-amber-600 dark:text-amber-500">
              Your account must be approved to place orders
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetailDrawer;

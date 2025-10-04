import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeProvider';
import { Star, Heart, ShoppingBag, RotateCcw, IndianRupee } from 'lucide-react';

const TopProducts = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

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

  const getStockBadgeColors = (stock) => {
    if (stock === 'In Stock') {
      return {
        light: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
        dark: { bg: '#14532d', text: '#86efac', border: '#166534' },
      };
    }
    return {
      light: { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
      dark: { bg: '#7c2d12', text: '#fdba74', border: '#9a3412' },
    };
  };

  return (
    <Card
      className="shadow-lg"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle style={{ color: isDark ? '#f9fafb' : '#111827' }}>
            Top Products
          </CardTitle>
          <CardDescription style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Frequently ordered items
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          style={{
            backgroundColor: isDark ? '#1e3a8a' : '#eff6ff',
            color: isDark ? '#60a5fa' : '#2563eb',
            borderColor: isDark ? '#1e40af' : '#bfdbfe',
          }}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topProducts.map((product) => {
            const stockColors = getStockBadgeColors(product.stock);
            const colors = isDark ? stockColors.dark : stockColors.light;
            const [isHovered, setIsHovered] = React.useState(false);

            return (
              <Card
                key={product.id}
                className="relative group transition-all"
                style={{
                  backgroundColor: isDark ? '#111827' : '#f9fafb',
                  borderColor: isDark ? '#374151' : '#e5e7eb',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CardContent className="p-2">
                  <div className="pt-2 flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className="font-medium"
                          style={{ color: isDark ? '#f9fafb' : '#111827' }}
                        >
                          {product.name}
                        </h4>
                        {product.pinned && (
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
                        {product.sku} • {product.pack}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="font-semibold text-lg flex items-center"
                          style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
                        >
                          <IndianRupee className="w-4 h-4" />
                          {product.price}
                        </span>
                        <Badge
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            borderColor: colors.border,
                            border: '1px solid',
                            fontSize: '0.75rem',
                          }}
                        >
                          {product.stock}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="transition-opacity"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        color: isDark ? '#9ca3af' : '#6b7280',
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      className="w-16 h-8 text-center"
                      style={{
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        borderColor: isDark ? '#4b5563' : '#d1d5db',
                        color: isDark ? '#f9fafb' : '#111827',
                      }}
                      min="1"
                    />
                    <Button
                      size="sm"
                      className="flex-1"
                      style={{
                        backgroundColor:
                          user?.status !== 'Approved'
                            ? isDark
                              ? '#374151'
                              : '#e5e7eb'
                            : isDark
                            ? '#1e40af'
                            : '#2563eb',
                        color:
                          user?.status !== 'Approved'
                            ? isDark
                              ? '#6b7280'
                              : '#9ca3af'
                            : '#ffffff',
                      }}
                      disabled={user?.status !== 'Approved'}
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      style={{
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        borderColor: isDark ? '#4b5563' : '#d1d5db',
                        color:
                          user?.status !== 'Approved'
                            ? isDark
                              ? '#6b7280'
                              : '#9ca3af'
                            : isDark
                            ? '#f9fafb'
                            : '#111827',
                      }}
                      disabled={user?.status !== 'Approved'}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
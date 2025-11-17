import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ProductAdvancedFilters = ({
  selectedSku,
  setSelectedSku,
  expiryMonths,
  setExpiryMonths,
  minStock,
  setMinStock,
  maxStock,
  setMaxStock,
  sortBy,
  setSortBy,
  setPage,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            SKU
          </label>
          <Input
            type="text"
            placeholder="Filter by SKU..."
            value={selectedSku}
            onChange={(e) => {
              setSelectedSku(e.target.value);
              setPage(1);
            }}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Expiry Within
          </label>
          <Select value={expiryMonths} onValueChange={(val) => {
            setExpiryMonths(val);
            setPage(1);
          }}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="1">1 Month</SelectItem>
              <SelectItem value="2">2 Months</SelectItem>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="4">4 Months</SelectItem>
              <SelectItem value="6">6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={(val) => {
            setSortBy(val);
            setPage(1);
          }}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="stock-low">Stock (Low to High)</SelectItem>
              <SelectItem value="stock-high">Stock (High to Low)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Min Stock
          </label>
          <Input
            type="number"
            placeholder="Minimum stock..."
            value={minStock}
            onChange={(e) => {
              setMinStock(e.target.value);
              setPage(1);
            }}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">
            Max Stock
          </label>
          <Input
            type="number"
            placeholder="Maximum stock..."
            value={maxStock}
            onChange={(e) => {
              setMaxStock(e.target.value);
              setPage(1);
            }}
            className="h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAdvancedFilters;

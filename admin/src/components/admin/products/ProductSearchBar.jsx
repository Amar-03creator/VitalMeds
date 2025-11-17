import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export const ProductSearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCompany,
  setSelectedCompany,
  categories,
  companies,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onReset,
  setPage,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-2 items-center flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 h-9 text-sm"
            />
          </div>

          <Select value={selectedCategory} onValueChange={(val) => {
            setSelectedCategory(val);
            setPage(1);
          }}>
            <SelectTrigger className="w-40 h-9 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCompany} onValueChange={(val) => {
            setSelectedCompany(val);
            setPage(1);
          }}>
            <SelectTrigger className="w-40 h-9 text-sm">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="h-9 text-sm gap-2"
          >
            <Filter className="w-4 h-4" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Filters
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-9 text-sm"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearchBar;

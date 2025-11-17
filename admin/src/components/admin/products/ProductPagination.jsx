import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProductPagination = ({
  page,
  totalPages,
  filteredProducts,
  PAGE_SIZE,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-slate-700 p-4">
      <div className="text-xs text-gray-600 dark:text-gray-400">
        Showing {filteredProducts.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
        {Math.min(page * PAGE_SIZE, filteredProducts.length)} of {filteredProducts.length}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="h-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="px-3 py-1 border rounded-md text-xs">
          Page {page} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="h-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductPagination;

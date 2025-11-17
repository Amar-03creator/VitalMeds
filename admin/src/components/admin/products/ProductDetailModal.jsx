import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const ProductDetailModal = ({ selectedProduct, onOpenChange }) => {
  if (!selectedProduct) return null;

  return (
    <Dialog open={!!selectedProduct} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">SKU</p>
              <p className="font-mono font-semibold text-sm">{selectedProduct.sku}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">HSN</p>
              <p className="font-semibold text-sm">{selectedProduct.hsn || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Company</p>
              <p className="font-semibold text-sm">{selectedProduct.company}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Category</p>
              <p className="font-semibold text-sm">{selectedProduct.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Composition</p>
              <p className="font-semibold text-sm">{selectedProduct.composition}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pack Size</p>
              <p className="font-semibold text-sm">{selectedProduct.packSize}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">MRP</p>
              <p className="font-semibold text-lg">₹{selectedProduct.mrp}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Stock</p>
              <p className="font-semibold text-lg">{selectedProduct.stock} units</p>
            </div>
          </div>

          {selectedProduct.description && (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Description</p>
              <p className="text-sm">{selectedProduct.description}</p>
            </div>
          )}

          {selectedProduct.usageAndDosage && (
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Usage & Dosage</p>
              <p className="text-sm">{selectedProduct.usageAndDosage}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;

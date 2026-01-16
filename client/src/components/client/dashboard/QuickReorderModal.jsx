import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableHeader, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { recentOrders } from '@/data/dummyOrders';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ChevronDown, ChevronUp, ShoppingBag, ShoppingCart, MessageSquare, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';



const QuickReorderModal = ({ isOpen, onClose }) => {

  const [quantities, setQuantities] = useState({});
  const { user } = useAuth();

  // Get unique products based on productName

  const uniqueProducts = Array.from(new Map(recentOrders.map(item => [item.productName, item])).values());

  const handleQuantityChange = (productName, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: parseInt(newQuantity) || 1
    }));
  };

  const handleIncrement = (productName) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: (prev[productName] || 1) + 1
    }));
  };

  const handleDecrement = (productName) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: Math.max((prev[productName] || 1) - 1, 1)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.productName] || 1;
    console.log('🛒 Add to Cart:', { ...product, quantity });
    // Later: Actual cart logic
  };

  const handleAddInquiry = (product) => {
    const quantity = quantities[product.productName] || 1;
    console.log('📝 Add Inquiry:', { ...product, quantity });
    // Later: Inquiry logic
  };




  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[88vh] p-10 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold font-serif">
            Quick Reorder - Recently Ordered Items
          </DialogTitle>

          <div className="border-b border-black mt-2 pb-2"></div>
        </DialogHeader>


        <div className="h-[calc(85vh-120px)] overflow-y-auto">

          <Table>
            {/* ✅ SINGLE Header Row - Outside .map() */}
            <TableHeader>
              <TableRow>
                {/* Dynamic headers from first product object */}
                {uniqueProducts.length > 0 &&
                  Object.keys(uniqueProducts[0]).map((key) => (
                    <TableHead key={key}>
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </TableHead>
                  ))}
                {/* Action Column */}
                <TableHead className="text-center">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            {/* ✅ Body with unique products */}
            <TableBody>
              {uniqueProducts.map((product) => (
                <TableRow key={product.productName}>
                  {/* All product data as cells */}
                  {Object.values(product).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                  {/* Action Column - Fixed size */}
                  <TableCell className=" w-80 p-2 bg-white/5 backdrop-blur-sm sticky right-0 border-l border-white/10">

                    <div className="flex flex-col gap-3 h-full justify-center">
                      {/* Quantity Controls */}

                      <div className="flex items-center justify-center  bg-white/15 hover:bg-white/20 rounded-xl border-black/20">


                        <div
                          type="number"
                          min="1"
                          value={quantities[product.productName] || product.quantity || 1}
                          onChange={(e) => handleQuantityChange(product.productName, e.target.value)}
                          className="flex w-20 h-15 items-center justify-around bg-white/20 border border-white/30 rounded-lg text-lg font-semibold outline-none focus:bg-white/30"
                          placeholder='Qty'
                        >{quantities[product.productName] || product.quantity || 1}
                          <div className='flex flex-col m-0'>


                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-white/20 rounded-lg"
                              onClick={() => handleIncrement(product.productName)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-white/20 rounded-lg"
                              onClick={() => handleDecrement(product.productName)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>


                        </div>


                      </div>


                      {/* Action Buttons - Compact */}
                      <div className="flex gap-1 pt-1">
                        <Button
                          size="sm"
                          className="flex-1 h-11 text-sm text-white shadow-lg font-medium"
                          onClick={() => handleAddToCart(product)}
                          disabled={user?.status !== 'Approved'}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-11 text-sm border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/50 hover:border-black/50 font-medium shadow-sm"
                          onClick={() => handleAddInquiry(product)}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add for Inquiry
                        </Button>
                      </div>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>

      </DialogContent>
    </Dialog >
  )
};


export default QuickReorderModal;


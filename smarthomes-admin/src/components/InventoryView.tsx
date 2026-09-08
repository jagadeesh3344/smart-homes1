import { useState, useEffect } from 'react';
import { Layers, AlertOctagon, CheckCircle, Save, ArrowUpRight, TrendingUp } from 'lucide-react';
import { getProducts, updateProduct, getSystemSettings } from '../utils/db';
import { Product } from '../types';

interface InventoryViewProps {
  filterLowStockOnly?: boolean;
}

export default function InventoryView({ filterLowStockOnly = false }: InventoryViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editStockValue, setEditStockValue] = useState(0);
  
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [toast, setToast] = useState('');

  const loadData = () => {
    const prods = getProducts();
    const settings = getSystemSettings();
    setLowStockThreshold(settings.lowStockThreshold || 10);
    setProducts(prods);
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStartEdit = (id: string, currentStock: number) => {
    setEditingStockId(id);
    setEditStockValue(currentStock);
  };

  const handleSaveStock = (product: Product, isVariant: boolean, variantId?: string) => {
    if (editStockValue < 0) {
      alert('Stock counts cannot be negative numbers.');
      return;
    }

    if (isVariant && variantId) {
      // Find and update variant inside parent product
      const updatedVariants = product.variants.map(v => {
        if (v.id === variantId) {
          return { ...v, stock: editStockValue };
        }
        return v;
      });
      updateProduct(product.id, { variants: updatedVariants });
      triggerToast(`Variant stock updated to ${editStockValue}.`);
    } else {
      // Update parent product base stock
      let status: Product['status'] = product.status;
      if (editStockValue === 0) {
        status = 'Out of Stock';
      } else if (product.status === 'Out of Stock') {
        status = 'Active'; // recover status
      }
      updateProduct(product.id, { stock: editStockValue, status });
      triggerToast(`Base product stock updated to ${editStockValue}.`);
    }

    setEditingStockId(null);
    loadData();
  };

  // Build flattened items of both base products (if no variants) and variants themselves for absolute auditing precision
  const inventoryItems: Array<{
    id: string;
    productName: string;
    sku: string;
    variantName?: string;
    isVariant: boolean;
    variantId?: string;
    stock: number;
    parentProduct: Product;
  }> = [];

  products.forEach(p => {
    if (p.variants && p.variants.length > 0) {
      p.variants.forEach(v => {
        inventoryItems.push({
          id: `${p.id}-${v.id}`,
          productName: p.name,
          sku: v.sku,
          variantName: v.name,
          isVariant: true,
          variantId: v.id,
          stock: v.stock,
          parentProduct: p
        });
      });
    } else {
      inventoryItems.push({
        id: p.id,
        productName: p.name,
        sku: p.sku,
        isVariant: false,
        stock: p.stock,
        parentProduct: p
      });
    }
  });

  // Filters
  const filteredItems = inventoryItems.filter(item => {
    if (filterLowStockOnly) {
      return item.stock <= lowStockThreshold;
    }
    return true;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { name: 'OUT OF STOCK', className: 'bg-red-50 text-red-600 border border-red-100' };
    if (stock <= lowStockThreshold) return { name: 'LOW STOCK', className: 'bg-yellow-50 text-yellow-700 border border-yellow-100' };
    return { name: 'IN STOCK', className: 'bg-green-50 text-green-700 border border-green-200' };
  };

  return (
    <div className="space-y-6" id="inventory-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm" id="inventory-toast">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Overview stats header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">
            {filterLowStockOnly ? 'Low Stock Warnings & Restocks' : 'Warehouse Inventory Ledger'}
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            {filterLowStockOnly 
              ? 'Refill critical SKUs falling below the configured safety threshold' 
              : 'Audit real-time stock status matching catalogued models'}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-gray-50 border border-gray-150 px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-500 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-yellow-500" />
            Safety Threshold: <span className="text-indigo-600 font-black">{lowStockThreshold} units</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            Audited SKUs: <span className="font-black text-indigo-950">{filteredItems.length} entries</span>
          </div>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm font-semibold">
              No inventory entries meet the criteria. All stock levels are healthy!
            </div>
          ) : (
            <table className="w-full text-left border-collapse" id="inventory-data-table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Product Item</th>
                  <th className="py-3.5 px-4">Variant Specifier</th>
                  <th className="py-3.5 px-4">SKU model code</th>
                  <th className="py-3.5 px-4 text-center">Safety Alert Limit</th>
                  <th className="py-3.5 px-4 text-center">Current Quantity</th>
                  <th className="py-3.5 px-4 text-center">Calculated status</th>
                  <th className="py-3.5 px-4 text-right pr-6">Direct adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                {filteredItems.map(item => {
                  const isEditing = editingStockId === item.id;
                  const status = getStockStatus(item.stock);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800 leading-snug">{item.productName}</p>
                        <p className="text-[10px] text-gray-400 capitalize">{item.parentProduct.categoryId.replace('-', ' ')}</p>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-500">
                        {item.isVariant ? (
                          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                            {item.variantName}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Single Base Product</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-indigo-600">
                        {item.sku}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-400 font-bold">
                        {lowStockThreshold}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={editStockValue || ''}
                            onChange={(e) => setEditStockValue(Number(e.target.value))}
                            className="w-20 px-2.5 py-1 border border-gray-300 rounded-lg text-center font-extrabold text-indigo-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 bg-white"
                          />
                        ) : (
                          <span className={`text-sm font-black ${item.stock === 0 ? 'text-red-600' : item.stock <= lowStockThreshold ? 'text-yellow-600' : 'text-gray-800'}`}>
                            {item.stock}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider ${status.className}`}>
                          {status.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right pr-6">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveStock(item.parentProduct, item.isVariant, item.variantId)}
                            className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-1 cursor-pointer font-bold mx-auto text-[10px] uppercase tracking-wide shadow-xs"
                          >
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(item.id, item.stock)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          >
                            Adjust Stock
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

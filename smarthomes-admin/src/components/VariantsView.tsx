import { useState, useEffect } from 'react';
import { getProducts, updateProduct } from '../utils/db';
import { Product, ProductVariant } from '../types';
import { Save, CheckCircle, Edit3, ShieldAlert, Sliders } from 'lucide-react';

export default function VariantsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);

  // Editing values
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  // Toast
  const [toast, setToast] = useState('');

  const loadData = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Flatten products to access variants along with parent information
  const allVariants = products.reduce((acc, product) => {
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach(variant => {
        acc.push({
          ...variant,
          parentProduct: product
        });
      });
    }
    return acc;
  }, [] as (ProductVariant & { parentProduct: Product })[]);

  const handleStartEdit = (v: ProductVariant) => {
    setEditingVariantId(v.id);
    setEditPrice(v.price);
    setEditOriginalPrice(v.originalPrice || v.price);
    setEditStock(v.stock);
  };

  const handleSaveEdit = (v: ProductVariant & { parentProduct: Product }) => {
    if (editPrice < 0 || editOriginalPrice < 0 || editStock < 0) {
      alert('Prices and stock levels cannot be negative values.');
      return;
    }

    const parent = v.parentProduct;
    const updatedVariants = parent.variants.map(item => {
      if (item.id === v.id) {
        return {
          ...item,
          price: editPrice,
          originalPrice: editOriginalPrice,
          stock: editStock
        };
      }
      return item;
    });

    // Update parent product
    updateProduct(parent.id, { variants: updatedVariants });
    setEditingVariantId(null);
    triggerToast(`Variant ${v.sku} pricing and stock updated successfully!`);
    loadData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6" id="variants-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm" id="variant-toast">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Intro info card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Variant Management Hub</h2>
          <p className="text-xs text-gray-400 font-medium">Configure individual sub-SKU prices, stocks, finishes, and specs</p>
        </div>
        <div className="flex gap-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
          <Sliders className="w-4 h-4 text-indigo-500" />
          Total Custom Variants Logged: <span className="text-indigo-700 font-extrabold">{allVariants.length} items</span>
        </div>
      </div>

      {/* Main Table list */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          {allVariants.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm font-medium">
              No product variants exist in the current catalogue. Add variants inside the Products manager.
            </div>
          ) : (
            <table className="w-full text-left border-collapse" id="variants-audit-table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Parent Product</th>
                  <th className="py-3.5 px-4">Variant Spec Name</th>
                  <th className="py-3.5 px-4">Sub-SKU Code</th>
                  <th className="py-3.5 px-4">Color &amp; Material</th>
                  <th className="py-3.5 px-4">Smart</th>
                  <th className="py-3.5 px-4">Original Price</th>
                  <th className="py-3.5 px-4">Selling Price</th>
                  <th className="py-3.5 px-4 text-center">Warehouse Stock</th>
                  <th className="py-3.5 px-4 text-right pr-6">Quick Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                {allVariants.map(v => {
                  const isEditing = editingVariantId === v.id;
                  return (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800">{v.parentProduct.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">{v.parentProduct.categoryId.replace('-', ' ')}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-800">{v.name}</span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-indigo-600">
                        {v.sku}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-700 font-semibold">{v.colour || 'N/A'}</p>
                        <p className="text-[10px] text-gray-400">{v.material || 'N/A'}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase border
                          ${v.smart ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-gray-50 border-gray-200 text-gray-400'}
                        `}>
                          {v.smart ? 'Wi-Fi' : 'Standard'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editOriginalPrice || ''}
                            onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded font-bold"
                          />
                        ) : (
                          <span className="line-through text-gray-400 font-semibold">
                            {formatCurrency(v.originalPrice || v.price)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editPrice || ''}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded font-bold text-indigo-700 focus:ring-1 focus:ring-indigo-500"
                          />
                        ) : (
                          <span className="font-black text-indigo-600">
                            {formatCurrency(v.price)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editStock || ''}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center font-bold"
                          />
                        ) : (
                          <span className={`font-extrabold ${v.stock <= 5 ? 'text-red-500' : 'text-gray-800'}`}>
                            {v.stock}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right pr-6">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveEdit(v)}
                            className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-1 cursor-pointer font-bold mx-auto text-[10px] shadow-xs uppercase tracking-wider"
                          >
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(v)}
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md cursor-pointer transition-colors"
                            title="Edit variant dimensions, pricing or stocks"
                          >
                            <Edit3 className="w-4 h-4" />
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

import { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Calendar, CreditCard, ChevronDown, CheckCircle, Clock, X, Check, Search, RefreshCw, Printer, ExternalLink } from 'lucide-react';
import { getOrders, updateOrderStatus, subscribeToDBChanges } from '../utils/db';
import { getApiBaseUrl } from '../utils/api';
import { Order } from '../types';

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Status updating parameters
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState('');

  // Filtering parameter
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    const loaded = getOrders();
    setOrders(loaded);
    if (selectedOrder) {
      const refreshed = loaded.find(o => o.id === selectedOrder.id);
      if (refreshed) {
        setSelectedOrder(refreshed);
      }
    }
  };

  useEffect(() => {
    loadData();
    const unsub = subscribeToDBChanges(() => {
      loadData();
    });
    return unsub;
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStatusChange = (orderId: string, status: Order['orderStatus']) => {
    setIsUpdating(true);
    let payStatus: Order['paymentStatus'] = 'Pending';
    
    if (status === 'Paid' || status === 'Delivered' || status === 'Shipped') {
      payStatus = 'Captured';
    } else if (status === 'Cancelled') {
      payStatus = 'Failed';
    } else if (status === 'Refunded') {
      payStatus = 'Refunded';
    }

    updateOrderStatus(orderId, status, payStatus);
    triggerToast(`Order status updated to "${status}" successfully.`);
    loadData();
    setIsUpdating(false);
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
      ((o as any).orderNumber && (o as any).orderNumber.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const getOrderStatusBadge = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Paid':
      case 'Delivered':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'Confirmed':
      case 'Processing':
      case 'Shipped':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'Pending Payment':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'Captured':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Pending':
      case 'Authorized':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default:
        return 'bg-red-50 text-red-700 border border-red-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatOrderDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6" id="orders-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm" id="order-toast">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter and overview header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Sales &amp; Order Pipelines</h2>
          <p className="text-xs text-gray-400 font-medium">Real-time sync of store orders, customer addresses, and Razorpay transactions</p>
        </div>

        {/* Filter controls & Search */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer, order #, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl bg-white font-bold text-xs"
            >
              <option value="all">All Orders</option>
              <option value="Paid">Paid</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <button
            onClick={loadData}
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-colors cursor-pointer"
            title="Refresh Orders"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Orders Grid/Table split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders list table column (takes 2/3 space) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm font-semibold">
                No customer orders match the filter configuration.
              </div>
            ) : (
              <table className="w-full text-left border-collapse" id="orders-data-table">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <th className="py-3.5 px-6">ID &amp; Date</th>
                    <th className="py-3.5 px-4">Contact customer</th>
                    <th className="py-3.5 px-4">Total Purchases</th>
                    <th className="py-3.5 px-4">Payment status</th>
                    <th className="py-3.5 px-4 text-center">Fulfillment status</th>
                    <th className="py-3.5 px-4 text-right pr-6">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                  {filteredOrders.map(order => (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? 'bg-indigo-50/30' : ''}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-4 px-6">
                        <p className="font-mono font-black text-indigo-600">{order.orderNumber || order.id}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-800">{order.customerName}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{order.customerPhone || order.customerEmail}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-800">{formatCurrency(order.total ?? (order as any).totalAmount ?? 0)}</p>
                        <p className="text-[9px] text-gray-400">{(order.items || []).reduce((sum, item) => sum + (item.quantity || 1), 0)} items</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-0.5 border rounded-md text-[9px] font-extrabold uppercase ${getPaymentStatusBadge(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold border tracking-wider uppercase ${getOrderStatusBadge(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right pr-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected Order detail panel (takes 1/3 space) */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6 space-y-5">
          {selectedOrder ? (
            <div className="space-y-5 animate-fadeIn" id="order-details-card">
              {/* Card Header details */}
              <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Active Purchase File</span>
                  <h3 className="font-mono text-base font-black text-indigo-600">{selectedOrder.orderNumber || selectedOrder.id}</h3>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {formatOrderDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Status control drop downs */}
              <div className="space-y-1.5 p-3.5 bg-gray-50 rounded-xl border border-gray-150">
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Update Pipeline Status</label>
                <select
                  disabled={isUpdating}
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['orderStatus'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-indigo-700"
                >
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Paid">Paid (Success)</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              {/* Customer contact profiling */}
              <div className="space-y-2 text-xs font-medium text-gray-600">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shipping &amp; Customer Contact</h4>
                <div className="space-y-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-bold text-gray-800">{selectedOrder.customerName}</p>
                  <p className="text-gray-500 font-mono text-[11px]">{selectedOrder.customerEmail} {selectedOrder.customerPhone ? `| ${selectedOrder.customerPhone}` : ''}</p>
                  <p className="text-gray-600 pt-1.5 border-t border-gray-200 leading-relaxed text-[11px]">
                    <span className="font-bold text-gray-400 block text-[9px] uppercase">Destination:</span>
                    {selectedOrder.shippingAddress?.street || (selectedOrder as any).address || 'Concierge Direct Delivery'}
                    {selectedOrder.shippingAddress?.city ? `, ${selectedOrder.shippingAddress.city}` : ((selectedOrder as any).city ? `, ${(selectedOrder as any).city}` : '')}
                    {selectedOrder.shippingAddress?.state ? `, ${selectedOrder.shippingAddress.state}` : ''}
                    {selectedOrder.shippingAddress?.postalCode ? ` - ${selectedOrder.shippingAddress.postalCode}` : ''}
                  </p>
                </div>
              </div>

              {/* Purchase items lists */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Line Items Ordered</h4>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl bg-gray-50/50 p-2 max-h-[160px] overflow-y-auto">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs font-medium">
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-gray-800 truncate">{item.productName}</p>
                        <p className="text-[9px] text-gray-400 truncate">
                          {item.variantName ? `Var: ${item.variantName}` : 'Base Spec'} x {item.quantity || 1}
                        </p>
                      </div>
                      <span className="font-bold text-gray-700 shrink-0">{formatCurrency((item.price || 0) * (item.quantity || 1))}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing totals breakdown */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5 text-xs text-gray-500 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span> 
                  <span className="font-bold text-gray-700">
                    {formatCurrency(selectedOrder.subtotal || Math.round((selectedOrder.total ?? (selectedOrder as any).totalAmount ?? 0) / 1.18))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span> 
                  <span className="font-bold text-gray-700">
                    {formatCurrency(selectedOrder.tax || ((selectedOrder.total ?? (selectedOrder as any).totalAmount ?? 0) - (selectedOrder.subtotal || Math.round((selectedOrder.total ?? (selectedOrder as any).totalAmount ?? 0) / 1.18))))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Customs Shipping</span> 
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                {(selectedOrder.discount || 0) > 0 && (
                  <div className="flex justify-between text-red-500"><span>Campaign Discount</span> <span className="font-extrabold">-{formatCurrency(selectedOrder.discount)}</span></div>
                )}
                <div className="flex justify-between pt-1.5 border-t border-gray-200 text-sm font-black text-gray-800">
                  <span>Grand Total</span>
                  <span className="text-indigo-600 font-black">{formatCurrency(selectedOrder.total ?? (selectedOrder as any).totalAmount ?? 0)}</span>
                </div>
              </div>

              {/* Razorpay Gateway event trace */}
              {selectedOrder.razorpayOrderId && (
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/60 text-[10px] space-y-1 font-mono">
                  <p className="font-bold text-indigo-900 uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> Razorpay Gateway Event
                  </p>
                  <p className="flex justify-between text-indigo-800"><span className="text-indigo-500 font-semibold">RZP Order:</span> <span>{selectedOrder.razorpayOrderId}</span></p>
                  <p className="flex justify-between text-indigo-800"><span className="text-indigo-500 font-semibold">RZP Payment:</span> <span>{selectedOrder.razorpayPaymentId || 'unprocessed'}</span></p>
                  <p className="flex justify-between text-indigo-800"><span className="text-indigo-500 font-semibold">Payment Date:</span> <span>{selectedOrder.paymentDate ? new Date(selectedOrder.paymentDate).toLocaleDateString() : 'Pending'}</span></p>
                </div>
              )}

              {/* Action Button: View / Print Invoice */}
              <button
                type="button"
                onClick={() => {
                  window.open(`${getApiBaseUrl()}/api/orders/${selectedOrder.id}/invoice-html`, '_blank');
                }}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>View / Print Customer Tax Invoice</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-2">
              <ShoppingBag className="w-10 h-10 text-gray-300 stroke-1.5" />
              <div>
                <p className="text-sm font-bold">No Order Inspected</p>
                <p className="text-[10px] max-w-[180px] mx-auto text-gray-400 font-medium mt-1">Select any order from the left panel to modify its status or view details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

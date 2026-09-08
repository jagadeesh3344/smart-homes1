import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Search, RefreshCw, ArrowUpRight, DollarSign, Wallet } from 'lucide-react';
import { getOrders, subscribeToDBChanges, updateOrderStatus } from '../utils/db';
import { Order } from '../types';

export default function PaymentsView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Paid' | 'Pending' | 'Failed'>('all');
  const [toast, setToast] = useState('');

  const loadData = () => {
    setOrders(getOrders());
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

  // Derive Payments from Orders
  const payments = orders.map(order => ({
    id: order.razorpayPaymentId || `PAY-${(order.id || Math.random().toString(36)).slice(-8).toUpperCase()}`,
    orderId: order.id,
    orderNumber: (order as any).orderNumber || order.id,
    customerName: order.customerName || 'Anonymous Customer',
    customerEmail: order.customerEmail || 'No email',
    amount: (order as any).totalAmount ?? order.total ?? 0,
    provider: order.paymentProvider || (order.paymentStatus === 'Pending' ? 'Doorstep Payment' : 'Razorpay'),
    status: (order.paymentStatus === 'Captured' || order.paymentStatus === 'Paid' || order.orderStatus === 'Paid' || order.orderStatus === 'Delivered') 
      ? 'Paid' 
      : (order.paymentStatus === 'Failed' || order.orderStatus === 'Cancelled')
      ? 'Failed'
      : 'Pending',
    date: order.createdAt || new Date().toISOString()
  }));

  const filteredPayments = payments.filter(p => {
    const matchesFilter = statusFilter === 'all' || p.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      (p.orderNumber && p.orderNumber.toLowerCase().includes(q)) ||
      (p.customerName && p.customerName.toLowerCase().includes(q)) ||
      (p.customerEmail && p.customerEmail.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingRevenue = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleMarkAsPaid = (orderId: string) => {
    updateOrderStatus(orderId, 'Paid', 'Captured');
    triggerToast('Payment marked as Paid successfully!');
    loadData();
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6" id="payments-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Payments & Gateway Transactions</h2>
          <p className="text-xs text-gray-400 font-medium font-sans">
            Real-time audit log of Razorpay, Card, UPI, and Doorstep payment collections
          </p>
        </div>
        <button
          onClick={loadData}
          className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
          Sync Transactions
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collected Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{formatINR(totalRevenue)}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Verified & Captured funds</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending / Doorstep Collections</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">{formatINR(pendingRevenue)}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">To be collected upon doorstep delivery</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Transactions</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{payments.length}</div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">Across all order channels</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, Customer, ID..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'Paid', 'Pending', 'Failed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {tab === 'all' ? 'All Payments' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction / Ref</th>
                <th className="py-3.5 px-4">Order Number</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Provider / Method</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 font-medium">
                    No payment records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPayments.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                      {p.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-mono">
                        #{p.orderNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{p.customerName}</div>
                      <div className="text-[11px] text-gray-400">{p.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">
                      {p.provider}
                    </td>
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      {formatINR(p.amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                        p.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {p.status === 'Paid' && <CheckCircle className="w-3 h-3" />}
                        {p.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {p.status === 'Failed' && <AlertCircle className="w-3 h-3" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(p.orderId)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Mark as Paid
                        </button>
                      )}
                      {p.status === 'Paid' && (
                        <span className="text-[11px] text-gray-400 font-medium">Settled</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

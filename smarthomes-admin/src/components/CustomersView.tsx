import { useState, useEffect } from 'react';
import { Users, Eye, CheckCircle, ShieldAlert, X, Search, RefreshCw, ShoppingBag, Phone, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { getCustomers, updateCustomerStatus, getOrders, subscribeToDBChanges } from '../utils/db';
import { Customer, Order } from '../types';

export default function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Suspended'>('all');
  const [toast, setToast] = useState('');

  const loadData = () => {
    const custs = getCustomers();
    const ords = getOrders();
    setCustomers(custs);
    setOrders(ords);
    if (selectedCust) {
      const refreshed = custs.find(c => c.id === selectedCust.id || c.email.toLowerCase() === selectedCust.email.toLowerCase());
      if (refreshed) setSelectedCust(refreshed);
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

  const handleToggleStatus = (c: Customer) => {
    const nextStatus: Customer['accountStatus'] = c.accountStatus === 'Active' ? 'Suspended' : 'Active';
    updateCustomerStatus(c.id, nextStatus);
    triggerToast(`Customer ${c.name} account is now ${nextStatus}.`);
    loadData();
    if (selectedCust?.id === c.id) {
      setSelectedCust(prev => prev ? { ...prev, accountStatus: nextStatus } : null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesFilter = statusFilter === 'all' || c.accountStatus === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q)) ||
      c.id.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const customerOrders = selectedCust
    ? orders.filter(o => 
        (o.customerEmail && o.customerEmail.toLowerCase() === selectedCust.email.toLowerCase()) ||
        (selectedCust.id && (o as any).customerId === selectedCust.id)
      )
    : [];

  return (
    <div className="space-y-6" id="customers-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header with Search & Filter */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Customer Accounts Registry</h2>
          <p className="text-xs text-gray-400 font-medium font-sans">
            Real-time customer directory, lifetime order history, and account status controls
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-xl bg-white font-bold text-xs"
            >
              <option value="all">All ({customers.length})</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <button
            onClick={loadData}
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-colors cursor-pointer"
            title="Refresh Customers"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers Table List */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            {filteredCustomers.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm font-semibold">
                No customer accounts match the filter configuration.
              </div>
            ) : (
              <table className="w-full text-left border-collapse" id="customers-table">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Customer Profile</th>
                    <th className="py-3.5 px-4">Contact Details</th>
                    <th className="py-3.5 px-4 text-center">Orders</th>
                    <th className="py-3.5 px-4">Lifetime Spent</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right pr-6">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                  {filteredCustomers.map(c => (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${selectedCust?.id === c.id ? 'bg-indigo-50/20' : ''}`}
                      onClick={() => setSelectedCust(c)}
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800">{c.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono font-bold">UID: {c.id}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-700 font-semibold">{c.email}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{c.phone || 'No phone'}</p>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-800 font-bold">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-md text-[11px]">
                          {c.numberForOrders || 0}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">
                        {formatCurrency(c.totalPurchaseValue || 0)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border
                          ${c.accountStatus === 'Active' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}
                        `}>
                          {c.accountStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right pr-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCust(c);
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

        {/* Selected Customer Inspect Detail Panel */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6 space-y-5">
          {selectedCust ? (
            <div className="space-y-5 animate-fadeIn" id="customer-profile-card">
              <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider">Account Profile Card</span>
                  <h3 className="text-base font-black text-gray-800">{selectedCust.name}</h3>
                  <p className="text-[10px] text-gray-400 font-mono">UID: {selectedCust.id}</p>
                </div>
                <button
                  onClick={() => setSelectedCust(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Status block toggle controls */}
              <div className={`p-4 rounded-xl border space-y-2 text-center ${
                selectedCust.accountStatus === 'Active' ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
              }`}>
                <span className={`inline-block px-2.5 py-1 rounded text-[9px] font-extrabold uppercase tracking-wide border mb-1 ${
                  selectedCust.accountStatus === 'Active' ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'
                }`}>
                  {selectedCust.accountStatus} Profile
                </span>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  {selectedCust.accountStatus === 'Active' 
                    ? 'Account has full verified access to store checkout and doorstep delivery.' 
                    : 'Account is suspended. User cannot complete checkouts or access private store orders.'}
                </p>
                <button
                  onClick={() => handleToggleStatus(selectedCust)}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl cursor-pointer shadow-xs mt-2 transition-colors ${
                    selectedCust.accountStatus === 'Active' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {selectedCust.accountStatus === 'Active' ? 'SUSPEND CUSTOMER ACCOUNT' : 'RE-ACTIVATE CUSTOMER ACCOUNT'}
                </button>
              </div>

              {/* Customer Contact specs */}
              <div className="space-y-2 text-xs font-medium text-gray-600">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer Details</h4>
                <div className="space-y-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email:</span> 
                    <span className="text-gray-800 font-bold">{selectedCust.email}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone:</span> 
                    <span className="text-gray-800 font-bold">{selectedCust.phone || 'Not provided'}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Member Since:</span> 
                    <span className="text-gray-800 font-bold">{selectedCust.createdAt ? new Date(selectedCust.createdAt).toLocaleDateString() : 'Active Member'}</span>
                  </p>
                </div>
              </div>

              {/* Saved Address */}
              <div className="space-y-2 text-xs font-medium text-gray-600">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Delivery Address
                </h4>
                {selectedCust.addresses && selectedCust.addresses.length > 0 ? (
                  <div className="p-3 border border-gray-200 rounded-xl bg-white leading-relaxed text-[11px] text-gray-600">
                    <p className="font-bold text-gray-800">Default Destination</p>
                    <p className="mt-1">
                      {selectedCust.addresses[0].street}, {selectedCust.addresses[0].city}, {selectedCust.addresses[0].state} - {selectedCust.addresses[0].postalCode}, {selectedCust.addresses[0].country}
                    </p>
                  </div>
                ) : (
                  <p className="p-3 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center text-gray-400 font-semibold italic text-[11px]">
                    Address provided at order checkout
                  </p>
                )}
              </div>

              {/* Statistics details */}
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="text-[9px] font-extrabold text-indigo-500 uppercase tracking-wider">Total Purchases</p>
                  <p className="text-lg font-black text-indigo-950 mt-0.5">{formatCurrency(selectedCust.totalPurchaseValue || 0)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-extrabold text-indigo-500 uppercase tracking-wider">Orders Placed</p>
                  <p className="text-lg font-black text-indigo-950 mt-0.5">{selectedCust.numberForOrders || 0} Orders</p>
                </div>
              </div>

              {/* Customer Order History */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" /> Customer Order History ({customerOrders.length})
                </h4>
                {customerOrders.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    No orders recorded for this account yet.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {customerOrders.map(ord => (
                      <div key={ord.id} className="p-2.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-150 text-xs transition-colors">
                        <div className="flex justify-between items-start font-medium">
                          <div>
                            <span className="font-mono font-bold text-indigo-600">{ord.orderNumber || ord.id}</span>
                            <p className="text-[10px] text-gray-400">{new Date(ord.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-gray-800">{formatCurrency(ord.total ?? (ord as any).totalAmount ?? 0)}</span>
                            <span className="block text-[9px] font-bold text-emerald-600 uppercase">{ord.orderStatus}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-2">
              <Users className="w-10 h-10 text-gray-300 stroke-1.5" />
              <div>
                <p className="text-sm font-bold">No Customer Inspected</p>
                <p className="text-[10px] max-w-[180px] mx-auto text-gray-400 font-medium mt-1">
                  Click on any customer from the table to inspect contact details, order history, or modify account status.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

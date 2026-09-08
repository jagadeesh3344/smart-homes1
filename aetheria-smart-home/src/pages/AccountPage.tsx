/**
 * AccountPage Component - Customer Profile & Order Enquiries History
 * Shifted to light-mode luxury design tokens.
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { User as UserIcon, Mail, Phone, MapPin, Package, LogOut, Clock } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { currentUser, logout, openAuthModal } = useAuth();
  const { navigateTo } = useShop();

  if (!currentUser) {
    return (
      <div className="bg-[#FDFDFD] min-h-screen py-16 text-center text-zinc-900">
        <div className="max-w-md mx-auto px-6 bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
          <UserIcon className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-zinc-900 mb-2 font-serif">Customer Account</h2>
          <p className="text-xs text-zinc-500 mb-6 font-light leading-relaxed">
            Please sign in to view your profile details and automated enquiry history.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  // Load enquiries submitted by this user
  const allOrders = StorageService.getOrders() || [];
  const myEnquiries = (allOrders || []).filter(
    o => o && o.customerEmail && currentUser && currentUser.email && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'My Account' }]} />

        <div className="my-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
              Customer Portal
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed">
              Manage your personal credentials, saved project addresses, and active smart system enquiries.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100/60 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[1.5]" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
          {/* User Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-sm space-y-6">
              <div className="flex items-center gap-4 border-b border-zinc-150 pb-4">
                <div className="w-14 h-14 rounded bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center font-bold text-xl">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 text-lg font-serif">{currentUser.name}</h3>
                  <span className="text-[10px] font-bold text-[#C5A880] bg-zinc-50 px-2.5 py-0.5 rounded border border-zinc-150">
                    Verified Customer
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-650 font-light">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{currentUser.email}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{currentUser.phone || 'No phone added'}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>{currentUser.address || 'No address saved'}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Member Since: {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Enquiry Orders List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-100 pb-3 mb-6 flex items-center justify-between">
                <span>My Smart Home Enquiries ({myEnquiries.length})</span>
                <Package className="w-5 h-5 text-[#C5A880] stroke-[1.5]" />
              </h2>

              {myEnquiries.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded border border-zinc-200 text-zinc-400 text-xs font-light leading-relaxed">
                  You have not submitted any smart home enquiries yet. Browse our catalog or packages and request a bespoke quote.
                </div>
              ) : (
                <div className="space-y-4">
                  {(myEnquiries || []).map(enq => (
                    <div key={enq.id} className="p-5 rounded bg-zinc-50 border border-zinc-200 space-y-3 hover:border-[#C5A880] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-150 pb-3">
                        <div>
                          <span className="font-mono font-bold text-zinc-900 text-sm">#{enq.enquiryNumber}</span>
                          <span className="text-[10px] text-zinc-450 ml-2 font-light">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                          enq.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : enq.status === 'in_progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {enq.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-zinc-650 font-light">
                        {(enq.items || []).map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.productName} (x{item.quantity})</span>
                            <span className="font-semibold text-zinc-900">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-zinc-150 flex justify-between items-center text-xs font-bold text-zinc-900">
                        <span className="text-zinc-400 font-light">Total Proposal Value:</span>
                        <span className="text-[#C5A880] font-mono font-bold text-base">${enq.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

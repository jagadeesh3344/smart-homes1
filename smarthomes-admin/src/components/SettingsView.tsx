import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, Smartphone, Mail, Truck, Calculator, AlertOctagon } from 'lucide-react';
import { getSystemSettings, saveSystemSettings } from '../utils/db';
import { SystemSettings } from '../types';

export default function SettingsView() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setSettings(getSystemSettings());
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleFieldChange = (field: keyof SystemSettings, value: string | number) => {
    if (settings) {
      setSettings({
        ...settings,
        [field]: value
      } as SystemSettings);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      // Validations
      if (settings.taxRate < 0 || settings.taxRate > 100) {
        alert('GST/VAT percentages must rest between 0% and 100%.');
        return;
      }
      if (settings.shippingFeeBase < 0) {
        alert('Base shipping rates cannot be negative values.');
        return;
      }
      if (settings.lowStockThreshold < 1) {
        alert('Low stock warning triggers must exceed 0 units.');
        return;
      }

      saveSystemSettings(settings);
      triggerToast('System properties updated and synced in real-time!');
    }
  };

  if (!settings) {
    return <div className="p-8 text-center text-gray-400 font-semibold font-sans">Loading properties database...</div>;
  }

  return (
    <div className="space-y-6" id="settings-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-gray-800">System Preferences Directory</h2>
          <p className="text-xs text-gray-400 font-medium">Fine-tune hotline redirection numbers, tax levels, or low-stock warning limits</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-150 p-2.5 rounded-xl text-xs font-bold text-indigo-700 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-indigo-500" />
          Gateway Mode: <span className="font-sans font-black text-indigo-950 uppercase">Active Live</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form columns (takes 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Business and hotline info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <Smartphone className="w-4.5 h-4.5 text-indigo-500" /> Business Channels &amp; Hotlines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Company Business Name</label>
                <input
                  type="text"
                  required
                  value={settings.businessName}
                  onChange={(e) => handleFieldChange('businessName', e.target.value)}
                  placeholder="e.g. K Smart Homes"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp Redirect hotline Number</label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
                  placeholder="e.g. +919876543210"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Hotline telephone</label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="e.g. +919876543210"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Business Support Email</label>
                <div className="mt-1 relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={settings.businessEmail}
                    onChange={(e) => handleFieldChange('businessEmail', e.target.value)}
                    placeholder="support@ksmarthomes.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Corporate Physical Office Address</label>
                <textarea
                  rows={2}
                  required
                  value={settings.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="Street, City, State - PIN, Country"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping and Logistics */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <Truck className="w-4.5 h-4.5 text-indigo-500" /> Logistics &amp; Shipping Charges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Shipping Fee Rate (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={settings.shippingFeeBase}
                  onChange={(e) => handleFieldChange('shippingFeeBase', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Currency ISO Code</label>
                <input
                  type="text"
                  required
                  value={settings.currency}
                  onChange={(e) => handleFieldChange('currency', e.target.value)}
                  placeholder="INR"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tax configurations */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <Calculator className="w-4.5 h-4.5 text-indigo-500" /> Checkout Tax Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base GST / VAT Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={settings.taxRate}
                  onChange={(e) => handleFieldChange('taxRate', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          {/* Save button footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
              id="btn-save-settings"
            >
              <Save className="w-4.5 h-4.5" /> SYNC AND APPLY SYSTEM CHANGES
            </button>
          </div>

        </div>

        {/* Right Info warnings (takes 1/3) */}
        <div className="space-y-6">
          {/* Low Stock Configuration Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <AlertOctagon className="w-4.5 h-4.5 text-indigo-500" /> Safety Warehouse Threshold
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Low Stock Warning Trigger</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleFieldChange('lowStockThreshold', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-extrabold text-indigo-700"
                />
              </div>
              <p className="text-[10px] text-gray-400 leading-normal italic pt-1">
                Changing this threshold modifies low-stock metrics on the Dashboard, Products directory, and Warehouse Inventory pages in real-time.
              </p>
            </div>
          </div>

          {/* Secure info card */}
          <div className="bg-indigo-50 border border-indigo-100/60 rounded-2xl p-5 text-xs text-indigo-900 leading-relaxed font-sans space-y-2">
            <h4 className="font-black text-[10px] text-indigo-950 uppercase tracking-widest flex items-center gap-1">
              🔒 SSL Secured Properties Engine
            </h4>
            <p className="opacity-90">
              All properties are immediately parsed, validated, and applied using secure synchronization frameworks. This ensures client-side operations run in safe scopes.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}

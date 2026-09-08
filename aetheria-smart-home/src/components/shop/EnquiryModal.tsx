/**
 * EnquiryModal - Handles WhatsApp, Email, Request Quote, and Phone Enquiries
 */

import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, CreditCard, FileText } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types';
import { ApiService } from '../../services/api';

// Dynamic script loader for Razorpay Checkout
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const EnquiryModal: React.FC = () => {
  const { enquiryModalOpen, closeEnquiryModal, enquiryModalProduct, siteContent, submitEnquiry, cart, clearCart, addToast } = useShop();
  const { currentUser, requireAuth } = useAuth();

  const [activeTab, setActiveTab] = useState<'quote' | 'whatsapp' | 'email' | 'call' | 'payment'>('quote');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [submittedEnquiryNumber, setSubmittedEnquiryNumber] = useState<string | null>(null);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{ orderId: string; paymentId: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
    }
  }, [currentUser, enquiryModalOpen]);

  if (!enquiryModalOpen) return null;

  // Derive products list to enquire
  const enquiryItems = enquiryModalProduct
    ? [{
        productId: enquiryModalProduct.id,
        productName: enquiryModalProduct.name,
        sku: enquiryModalProduct.sku,
        quantity: quantity,
        price: enquiryModalProduct.salePrice || enquiryModalProduct.price,
        image: enquiryModalProduct.images?.[0]
      }]
    : (cart || []).map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        price: item.product.salePrice || item.product.price,
        image: item.product.images?.[0]
      }));

  const totalAmount = enquiryItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleRequestQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    requireAuth({
      type: 'quote_enquiry',
      onSuccess: () => {
        const created = submitEnquiry({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          type: 'quote',
          items: enquiryItems,
          totalAmount: totalAmount,
          address: address,
          notes: notes,
        });

        setSubmittedEnquiryNumber(created.enquiryNumber);
        if (!enquiryModalProduct) {
          clearCart();
        }
      }
    });
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      addToast('Name, Email, Phone number, and Delivery Address are required for secure checkout.', 'error');
      alert('Please fill in Name, Email, Phone, and Delivery Address to complete the purchase.');
      return;
    }

    requireAuth({
      type: 'checkout',
      onSuccess: async () => {
        setIsProcessingPayment(true);
        try {
          const orderData = await ApiService.createRazorpayOrder({
            amount: totalAmount,
            currency: 'INR',
            receipt: 'rcpt_' + Date.now().toString(36),
            items: enquiryItems
          });
          if (orderData.error) {
            throw new Error(orderData.error);
          }

          const loaded = await loadRazorpayScript();
          if (!loaded) {
            throw new Error('Could not load Razorpay client SDK. Please verify your connection.');
          }

          if (orderData.simulated) {
            setTimeout(async () => {
              try {
                const verifyData = await ApiService.verifyRazorpayPayment({
                  razorpay_order_id: orderData.id,
                  razorpay_payment_id: 'pay_simulated_' + Math.random().toString(36).substring(2, 12),
                  razorpay_signature: 'simulated_signature_ok',
                  simulated: true
                });
                if (verifyData.success) {
                  const created = submitEnquiry({
                    customerName: name,
                    customerEmail: email,
                    customerPhone: phone,
                    type: 'purchase',
                    items: enquiryItems,
                    totalAmount: totalAmount,
                    address: address,
                    notes: notes ? notes + ' (Direct Payment Checkout)' : 'Direct Payment Checkout',
                    paymentStatus: 'Paid',
                    paymentOrderId: orderData.id,
                    paymentId: 'pay_sim_success',
                    paymentSignature: 'sim_sig'
                  });
                  setSubmittedEnquiryNumber(created.enquiryNumber);
                  setPaymentSuccessData({ orderId: orderData.id, paymentId: 'pay_sim_success' });
                  if (!enquiryModalProduct) {
                    clearCart();
                  }
                  addToast('Payment successful & verified (Demo Mode)!', 'success');
                } else {
                  addToast('Payment verification failed.', 'error');
                }
              } catch (err: any) {
                addToast('Payment verification failed: ' + err.message, 'error');
              } finally {
                setIsProcessingPayment(false);
              }
            }, 1000);
          } else {
            const options = {
              key: orderData.key,
              amount: orderData.amount,
              currency: orderData.currency,
              name: siteContent.businessName || 'Aetheria Smart Homes',
              description: enquiryModalProduct ? `Purchase: ${enquiryModalProduct.name}` : 'Aetheria Products Purchase',
              order_id: orderData.id,
              handler: async function (response: any) {
                try {
                  const verifyData = await ApiService.verifyRazorpayPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    simulated: false
                  });
                  if (verifyData.success) {
                    const created = submitEnquiry({
                      customerName: name,
                      customerEmail: email,
                      customerPhone: phone,
                      type: 'purchase',
                      items: enquiryItems,
                      totalAmount: totalAmount,
                      address: address,
                      notes: notes,
                      paymentStatus: 'Paid',
                      paymentOrderId: response.razorpay_order_id,
                      paymentId: response.razorpay_payment_id,
                      paymentSignature: response.razorpay_signature
                    });
                    setSubmittedEnquiryNumber(created.enquiryNumber);
                    setPaymentSuccessData({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id });
                    if (!enquiryModalProduct) {
                      clearCart();
                    }
                    addToast('Payment successfully processed and verified!', 'success');
                  } else {
                    addToast('Signature verification failed.', 'error');
                  }
                } catch (err: any) {
                  addToast('Verification process failed: ' + err.message, 'error');
                } finally {
                  setIsProcessingPayment(false);
                }
              },
              modal: {
                ondismiss: function() {
                  setIsProcessingPayment(false);
                  addToast('Payment session dismissed by client.', 'info');
                }
              },
              prefill: {
                name: name,
                email: email,
                contact: phone
              },
              theme: {
                color: '#0d9488'
              }
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (resp: any) {
              addToast('Payment failed: ' + (resp.error?.description || 'Declined'), 'error');
              setIsProcessingPayment(false);
            });
            rzp.open();
          }
        } catch (err: any) {
          addToast('Order generation failed: ' + err.message, 'error');
          setIsProcessingPayment(false);
        }
      }
    });
  };

  const handleWhatsAppEnquiry = () => {
    requireAuth({
      type: 'whatsapp_enquiry',
      onSuccess: () => {
        // Record enquiry in local storage
        const created = submitEnquiry({
          customerName: name || currentUser?.name || 'Valued Customer',
          customerEmail: email || currentUser?.email || '',
          customerPhone: phone || currentUser?.phone || '',
          type: 'whatsapp',
          items: enquiryItems,
          totalAmount: totalAmount,
          notes: notes,
        });

        // Format WhatsApp Message
        const itemsListText = enquiryItems.map(i => `• ${i.productName} (Qty: ${i.quantity}, Price: $${i.price})`).join('\n');
        const text = `Hello *${siteContent.businessName}*,\n\nI would like to place an enquiry for:\n${itemsListText}\n\n*Total Estimate:* $${totalAmount}\n*Customer Name:* ${name || currentUser?.name}\n*Phone:* ${phone || currentUser?.phone}\n*Email:* ${email || currentUser?.email}\n*Notes:* ${notes || 'None'}\n\n*Enquiry Ref:* #${created.enquiryNumber}`;

        const whatsappUrl = `https://wa.me/${siteContent.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        closeEnquiryModal();
      }
    });
  };

  const handleEmailEnquiry = () => {
    requireAuth({
      type: 'email_enquiry',
      onSuccess: () => {
        const created = submitEnquiry({
          customerName: name || currentUser?.name || 'Valued Customer',
          customerEmail: email || currentUser?.email || '',
          customerPhone: phone || currentUser?.phone || '',
          type: 'email',
          items: enquiryItems,
          totalAmount: totalAmount,
          notes: notes,
        });

        const itemsListText = enquiryItems.map(i => `- ${i.productName} (Qty: ${i.quantity}, Price: $${i.price})`).join('\n');
        const subject = `Smart Home Product Enquiry - #${created.enquiryNumber}`;
        const body = `Dear ${siteContent.businessName},\n\nI am requesting information & pricing details for:\n${itemsListText}\n\nTotal Estimated Value: $${totalAmount}\nCustomer Name: ${name || currentUser?.name}\nPhone: ${phone || currentUser?.phone}\nEmail: ${email || currentUser?.email}\nNotes: ${notes || 'None'}`;

        window.location.href = `mailto:${siteContent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        closeEnquiryModal();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="bg-slate-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-800 relative max-h-[92vh] flex flex-col text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={closeEnquiryModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Official Product Enquiry
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {enquiryModalProduct ? `Enquire about ${enquiryModalProduct.name}` : 'Submit Smart Home Order Enquiry'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            No payment required. Our architectural automation specialists will reach out to fulfill your request.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedEnquiryNumber ? (
            <div className="py-4 space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto mb-3 border border-teal-500/30 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-1">Quote Request Sent!</h3>
                <p className="text-xs text-teal-400 font-mono">Reference: #{submittedEnquiryNumber}</p>
              </div>

              {/* Email Notification Confirmation Badge */}
              <div className="p-4 bg-slate-950 border border-teal-500/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span>Email Notifications Dispatched</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A copy of this itemized quote and total estimate has been sent to:
                </p>
                <div className="text-xs font-semibold space-y-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Website Owner:</span>
                    <span className="font-mono text-teal-400 font-bold">{siteContent.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Customer Email:</span>
                    <span className="font-mono text-white font-bold">{email || currentUser?.email || 'Customer'}</span>
                  </div>
                </div>
              </div>

              {/* Itemized Quote Breakdown */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex justify-between">
                  <span>Itemized Order / Invoice Details</span>
                  <span>Amount</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(enquiryItems || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-slate-800/80 last:border-0">
                      <div>
                        <div className="font-bold text-white">{item.productName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Qty: {item.quantity} × ₹{Number(item.price).toLocaleString('en-IN')}</div>
                      </div>
                      <div className="font-black text-teal-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black text-white">
                  <span>Grand Total Amount:</span>
                  <span className="text-teal-400 text-base font-mono">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Formal Payment & Doorstep Delivery Message */}
              <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Payment & Doorstep Delivery Notice</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Please feel free to contact our concierge for payment processing or immediate assistance at:
                  <a href={`tel:${siteContent.phone || '+91 98765 43210'}`} className="font-bold text-amber-300 underline ml-1">
                    {siteContent.phone || '+91 98765 43210'}
                  </a>.
                </p>
                <p className="text-[11.5px] text-amber-300/85 leading-relaxed">
                  📦 <strong>Pay on Doorstep Delivery:</strong> Alternatively, upon receiving your smart home package at your doorstep, you may conveniently pay the invoice bill amount directly to our authorized delivery personnel via <strong>Cash, UPI QR, or Card</strong>.
                </p>
              </div>

              {/* View Online Invoice Button */}
              <a
                href={`${ApiService.getBaseUrl()}/api/orders/${submittedEnquiryNumber}/invoice-html`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-700/60 shadow-md cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>View & Print Official Invoice (HTML)</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${siteContent.email}?subject=${encodeURIComponent(`Quote #${submittedEnquiryNumber} Confirmation`)}&body=${encodeURIComponent(
                    `Hello ${siteContent.businessName},\n\nI have placed an order for:\n` +
                    enquiryItems.map(i => `• ${i.productName} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`).join('\n') +
                    `\n\nTotal Amount: ₹${totalAmount}\nCustomer: ${name} (${email}, ${phone})`
                  )}`}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-700/60 shadow-md"
                >
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span>Open Email Draft</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedEnquiryNumber(null);
                    closeEnquiryModal();
                  }}
                  className="py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Enquiry Type Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl mb-6 text-xs font-semibold border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('quote')}
                  className={`flex-1 min-w-[95px] py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'quote' ? 'bg-slate-800 text-teal-400 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-teal-400" />
                  Quote Form
                </button>

                {totalAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('payment')}
                    className={`flex-1 min-w-[95px] py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'payment' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    Pay & Buy
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab('whatsapp')}
                  className={`flex-1 min-w-[95px] py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'whatsapp' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className={`flex-1 min-w-[95px] py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'email' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  Email
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('call')}
                  className={`flex-1 min-w-[95px] py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'call' ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  Call Now
                </button>
              </div>

              {/* Items Summary Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Items in Enquiry</div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {(enquiryItems || []).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-white truncate">{item.productName}</span>
                        <span className="text-slate-500 font-mono">(x{item.quantity})</span>
                      </div>
                      <span className="font-bold text-teal-400">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-extrabold text-white">
                  <span>Estimated Total:</span>
                  <span className="text-teal-400 font-mono">${totalAmount}</span>
                </div>
              </div>

              {/* TAB CONTENT: FORM */}
              {activeTab === 'quote' && (
                <form onSubmit={handleRequestQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Delivery Address / City</label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Street Address, City, State"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Custom Notes / Requirements</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Specify room details, existing hubs, or preferred installation dates..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Submit Request for Quote
                  </button>
                </form>
              )}

              {/* TAB CONTENT: PAY & SECURE CHECKOUT */}
              {activeTab === 'payment' && (
                <form onSubmit={handlePayNow} className="space-y-4">
                  <div className="p-3.5 bg-amber-950/20 rounded-2xl border border-amber-500/20 text-amber-400 text-xs flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Secure Instant Purchase</strong>
                      Pay securely via international standard payment networks processed in INR using Razorpay. Complete your delivery information below to checkout.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Enter complete shipping address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Delivery Instructions (Optional)</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Add gate codes, preferred time, or notes..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm focus:outline-none focus:border-teal-500 bg-slate-950 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <CreditCard className="w-4 h-4" />
                    {isProcessingPayment ? 'Processing Secure Payment...' : `Secure Checkout (${totalAmount > 0 ? `$${totalAmount}` : ''})`}
                  </button>
                </form>
              )}

              {/* TAB CONTENT: WHATSAPP */}
              {activeTab === 'whatsapp' && (
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-emerald-300 text-xs leading-relaxed text-left">
                    Clicking below will launch official WhatsApp with pre-formatted product specifications & customer reference. Login required for security.
                  </div>

                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Enquire on WhatsApp ({siteContent.whatsappNumber})
                  </button>
                </div>
              )}

              {/* TAB CONTENT: EMAIL */}
              {activeTab === 'email' && (
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 bg-blue-950/40 rounded-2xl border border-blue-500/30 text-blue-300 text-xs leading-relaxed text-left">
                    Generates an official email draft to <span className="font-bold text-white">{siteContent.email}</span> with your selected items and saves an enquiry record in your account.
                  </div>

                  <button
                    onClick={handleEmailEnquiry}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email Enquiry
                  </button>
                </div>
              )}

              {/* TAB CONTENT: CALL NOW */}
              {activeTab === 'call' && (
                <div className="text-center py-6 space-y-4">
                  <p className="text-sm text-slate-400">
                    Speak directly with a Senior Smart Automation Consultant:
                  </p>
                  <a
                    href={`tel:${siteContent.phone}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-lg shadow-xl shadow-teal-500/20 transition-all"
                  >
                    <Phone className="w-5 h-5 text-slate-950" />
                    {siteContent.phone}
                  </a>
                  <p className="text-xs text-slate-500">{siteContent.workingHours}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ContactPage Component - Light Mode Luxury Style
 */

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteContent, addToast, openEnquiryModal } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message sent! An automation architect will respond within 4 business hours.');
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif leading-tight">
            Connect with Aetheria
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed">
            Reach our architectural automation division for custom project consultation, technical support, or partnership enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 my-8">
          {/* Left Business Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-50 rounded-xl p-8 border border-zinc-200 shadow-sm space-y-6">
              <h3 className="text-lg font-semibold border-b border-zinc-200 pb-4 text-[#C5A880] font-serif">
                Corporate Headquarters
              </h3>

              <div className="space-y-4 text-xs text-zinc-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-800 block">Main Office & Experience Center</span>
                    <span className="leading-relaxed font-light">{siteContent.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-800 block">Direct Phone Line</span>
                    <a href={`tel:${siteContent.phone}`} className="hover:text-[#C5A880] font-mono transition-colors font-light">
                      {siteContent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-800 block">Official Email</span>
                    <a href={`mailto:${siteContent.email}`} className="hover:text-[#C5A880] transition-colors font-light">
                      {siteContent.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-800 block">Working Hours</span>
                    <span className="font-light">{siteContent.workingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200">
                <button
                  onClick={() => openEnquiryModal()}
                  className="w-full py-4 rounded bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                  <span>Launch WhatsApp Consultation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-8 border border-zinc-200 shadow-lg">
              <h2 className="text-lg font-semibold text-zinc-900 mb-6 font-serif">Send an Executive Message</h2>

              {submitted ? (
                <div className="p-8 text-center bg-zinc-50 rounded border border-zinc-200 text-zinc-800">
                  <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-zinc-900 font-serif">Message Received</h3>
                  <p className="text-xs text-zinc-550 mt-2 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you for reaching out to Aetheria. Our architectural team has logged your query and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Project Enquiry / Quote"
                        className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Specify your floorplan size, required automation modules, or question..."
                      className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded bg-[#C5A880] hover:bg-[#b0946f] text-white font-bold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Map Section matching Screen 06 */}
        <div className="bg-zinc-50 rounded-xl p-6 sm:p-8 border border-zinc-200 shadow-sm my-8">
          <h3 className="text-lg font-light text-zinc-900 mb-4 flex items-center gap-2 font-serif">
            <MapPin className="w-5 h-5 text-[#C5A880]" />
            <span>Find Our Smart Home Experience Center</span>
          </h3>
          <div className="w-full h-80 rounded overflow-hidden bg-zinc-100 relative border border-zinc-200 shadow-inner">
            <iframe
              title="Experience Center Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?q=San+Francisco+California&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full filter contrast-100 brightness-100"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

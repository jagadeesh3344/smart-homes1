/**
 * ConsultationPage - Smart Home Automation Consultation Booking System
 * Elegant Architectural Luxury Redesign for light-mode.
 */

import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, User, Mail, Phone, 
  CheckCircle2, MessageSquare, Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { generateProposalPDF } from '../services/pdfGenerator';

export const ConsultationPage: React.FC = () => {
  const { submitEnquiry, showToast, navigateTo } = useShop();
  const siteContent = StorageService.getSiteContent();

  const [consultationType, setConsultationType] = useState<'Virtual Consultation' | 'Site Visit' | 'Smart Home Design Consultation'>('Smart Home Design Consultation');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('Villa');
  const [city, setCity] = useState<string>('');
  const [propertySize, setPropertySize] = useState<string>('2,500–5,000 sq.ft.');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('Afternoon (2:00 PM – 5:00 PM)');
  const [requirements, setRequirements] = useState<string[]>([
    'Smart Lighting & Keypads',
    'Motorized Curtains & Shading',
    'Whole-Home Acoustic Audio',
    'Biometrics & Security'
  ]);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedEnquiryNumber, setSubmittedEnquiryNumber] = useState<string | null>(null);

  const availableRequirements = [
    'Smart Lighting & Keypads',
    'Motorized Curtains & Shading',
    'Whole-Home Acoustic Audio',
    'Private Dolby Atmos Cinema',
    'Multi-Zone Climate Control',
    'Biometrics & Security',
    'Energy Management & Solar Sync',
    'Full Architectural Wiring Blueprint'
  ];

  const toggleRequirement = (req: string) => {
    setRequirements(prev =>
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      showToast('Please fill in your name, phone number, and email', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const enquiry = await submitEnquiry({
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        city: city.trim(),
        notes: `[Consultation Request - ${consultationType}]\nPreferred Date: ${preferredDate || 'Earliest Available'} | Time: ${preferredTime}\nProperty: ${propertyType} (~${propertySize})\nInterested Systems: ${requirements.join(', ')}\nClient Message: ${notes}`,
        type: 'consultation',
        consultationType,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTime,
        propertyType,
        propertySize,
        selectedSystems: requirements,
        items: requirements.map((req, idx) => ({
          productId: `consultation_req_${idx}`,
          productName: req,
          sku: 'CONS-SCOPE-' + (idx + 1),
          quantity: 1,
          price: 0
        })),
        totalAmount: 0
      });

      setSubmittedEnquiryNumber(enquiry.enquiryNumber);
      showToast('Consultation request booked successfully!', 'success');

      // Auto-trigger PDF confirmation receipt
      setTimeout(() => {
        generateProposalPDF({
          referenceNumber: enquiry.enquiryNumber,
          date: new Date().toLocaleDateString('en-IN'),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
          customerName: fullName.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          location: city.trim(),
          consultationType,
          propertyType,
          propertySize,
          notes: `Consultation confirmed for ${preferredDate || 'Upcoming Session'} (${preferredTime}). Areas of interest: ${requirements.join(', ')}.`,
          items: requirements.map(r => ({
            name: r,
            category: 'Consultation Scope',
            specifications: 'Included in architectural design assessment',
            quantity: 1,
            unitPrice: 0,
            totalPrice: 0
          })),
          subtotal: 0,
          installationEstimate: 0,
          totalAmount: 0
        });
      }, 500);

    } catch (err) {
      showToast('Failed to submit consultation request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationTypes = [
    {
      id: 'Virtual Consultation',
      title: 'Virtual Consultation',
      badge: 'Online Video Session',
      desc: '30-minute high-definition session with a senior smart home architect reviewing custom floorplans.'
    },
    {
      id: 'Site Visit',
      title: 'On-Site Walkthrough',
      badge: 'Physical Inspection',
      desc: 'In-person site survey and electrical layout feasibility assessment at your primary residence.'
    },
    {
      id: 'Smart Home Design Consultation',
      title: 'Comprehensive Design Suite',
      badge: 'Turnkey Blueprinting',
      desc: 'Complete architectural schematic CAD designs, equipment schedule, lux level modeling, and investment estimates.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 py-12 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[#C5A880] text-[10px] font-bold uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            Bespoke Architecture Advisory
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Book a Smart Home Consultation
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-3 max-w-xl mx-auto leading-relaxed">
            Partner with Aetheria’s Automation Engineers to design the ideal intelligence ecosystem tailored to your lifestyle and architectural blueprints.
          </p>
        </div>

        {!submittedEnquiryNumber ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Consultation Type Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded bg-[#C5A880] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                <span>Select Consultation Format</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {consultationTypes.map(type => {
                  const isSelected = consultationType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setConsultationType(type.id as any)}
                      className={`p-5 rounded border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-zinc-50 border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-sm'
                          : 'bg-white border-zinc-200 hover:border-[#C5A880]/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-100 text-[#C5A880]">
                            {type.badge}
                          </span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-300'}`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm text-zinc-900 font-serif mt-2">{type.title}</h3>
                        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">{type.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Customer & Property Parameters */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 space-y-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#C5A880] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                <span>Contact & Property Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Sterling"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    City / Project Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Bengaluru, Delhi"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Property Archetype
                  </label>
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-xs text-zinc-800 focus:border-[#C5A880] focus:outline-none transition-colors"
                  >
                    <option value="Villa">Independent Villa</option>
                    <option value="Penthouse">Luxury Penthouse</option>
                    <option value="Apartment">Modern Apartment</option>
                    <option value="Farmhouse">Estate / Farmhouse</option>
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Other">Other Unique Space</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Approximate Size
                  </label>
                  <select
                    value={propertySize}
                    onChange={e => setPropertySize(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-xs text-zinc-800 focus:border-[#C5A880] focus:outline-none transition-colors"
                  >
                    <option value="Under 1,500 sq.ft.">Under 1,500 sq.ft.</option>
                    <option value="1,500–2,500 sq.ft.">1,500–2,500 sq.ft.</option>
                    <option value="2,500–5,000 sq.ft.">2,500–5,000 sq.ft.</option>
                    <option value="5,000–8,000 sq.ft.">5,000–8,000 sq.ft.</option>
                    <option value="8,000+ sq.ft.">8,000+ sq.ft. (Estate)</option>
                  </select>
                </div>
              </div>

              {/* Schedule Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-150">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-xs text-zinc-800 focus:border-[#C5A880] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-xs text-zinc-800 focus:border-[#C5A880] focus:outline-none transition-colors"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Areas of Interest & Notes */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 space-y-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded bg-[#C5A880] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                <span>Systems of Interest & Project Scope</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableRequirements.map(req => {
                  const isChecked = requirements.includes(req);
                  return (
                    <label
                      key={req}
                      onClick={() => toggleRequirement(req)}
                      className={`p-3.5 rounded border flex items-center gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#C5A880]/5 border-[#C5A880]/60 text-zinc-900 font-medium'
                          : 'bg-white border-zinc-200 text-zinc-500 hover:border-[#C5A880]/40'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-300 bg-white'}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>
                      <span className="text-xs">{req}</span>
                    </label>
                  );
                })}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                  Project Notes or Architectural Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding ceiling heights, interior themes, current construction stage, or special requirements..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#C5A880] focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-zinc-150">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Scheduling Consultation...</span>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-[#C5A880]" />
                      <span>Confirm & Book Consultation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="bg-white rounded-xl border border-zinc-200 p-8 sm:p-12 text-center shadow-md space-y-6">
            <div className="w-16 h-16 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 font-serif">
                Consultation Request Confirmed
              </h2>
              <p className="text-zinc-550 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                Thank you, <strong>{fullName}</strong>. Your consultation reference is{' '}
                <span className="font-mono text-[#C5A880] font-bold">{submittedEnquiryNumber}</span>. Our design engineering team has been notified and will contact you directly to coordinate your design session.
              </p>
            </div>

            <div className="bg-zinc-50 p-6 rounded border border-zinc-200 max-w-md mx-auto text-left space-y-2 text-xs font-light text-zinc-650">
              <div className="flex justify-between">
                <span className="text-zinc-400">Format:</span>
                <strong className="text-zinc-900 font-semibold">{consultationType}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Target Date:</span>
                <strong className="text-zinc-900 font-semibold">{preferredDate || 'Earliest Slot'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Time Window:</span>
                <strong className="text-[#C5A880] font-semibold">{preferredTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Property:</span>
                <strong className="text-zinc-900 font-semibold">{propertyType} ({city})</strong>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${siteContent.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Aetheria,%20I%20have%20booked%20a%20consultation%20(Ref:%20${submittedEnquiryNumber}).`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => navigateTo('home')}
                className="w-full sm:w-auto px-6 py-3 rounded bg-zinc-50 hover:bg-zinc-100 text-zinc-500 font-bold text-[10px] uppercase tracking-widest border border-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

/**
 * SmartHomeConfigurator - "Build Your Smart Home" Guided 5-Step Configurator
 * Calculates realistic architectural smart home investment estimates and outputs PDF proposals & enquiries.
 * Refined with Premium Light-Mode Luxury Architectural Theme.
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, Check, ChevronRight, ChevronLeft, 
  Minus, Plus, Download, Send, RefreshCw, 
  Sliders, CheckCircle2, AlertCircle, Phone, Mail, User, MapPin
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { ConfiguratorSettings, ProposalData } from '../types';
import { generateProposalPDF, formatCurrencyINR } from '../services/pdfGenerator';

export const ConfiguratorPage: React.FC = () => {
  const { submitEnquiry, showToast, navigateTo } = useShop();

  // Settings from storage
  const [settings, setSettings] = useState<ConfiguratorSettings>(() => StorageService.getConfiguratorSettings());

  // Current Step (1 to 5, and 6 = Results)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // User Selections
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('villa');
  const [selectedSizeRange, setSelectedSizeRange] = useState<string>('2000_3500');
  const [customSqFt, setCustomSqFt] = useState<number>(2800);

  // Rooms Selection with counts
  const [roomCounts, setRoomCounts] = useState<{ [roomId: string]: number }>({
    living: 1,
    master_bedroom: 1,
    bedroom: 2,
    kitchen: 1,
    dining: 1,
    bathroom: 2,
    home_office: 0,
    cinema_room: 0,
    garden_outdoor: 0,
    garage: 0,
    other: 0,
  });

  // Selected Systems
  const [selectedSystems, setSelectedSystems] = useState<string[]>([
    'smart_lighting',
    'motorized_curtains',
    'climate_control',
    'security',
    'smart_locks',
    'multi_room_audio',
    'whole_home_automation'
  ]);

  // Selected Automation Tier
  const [selectedTier, setSelectedTier] = useState<'Essential' | 'Luxury' | 'Architectural'>('Luxury');

  // Customer Contact Modal / State for Detailed Proposal
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCity, setCustomerCity] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedEnquiryNumber, setSubmittedEnquiryNumber] = useState<string | null>(null);

  // Reload settings if updated
  useEffect(() => {
    setSettings(StorageService.getConfiguratorSettings());
  }, []);

  // Update approximate sqft when size range changes
  const handleSizeRangeSelect = (rangeId: string) => {
    setSelectedSizeRange(rangeId);
    const range = settings.sizeRanges.find(r => r.id === rangeId);
    if (range) {
      setCustomSqFt(range.avgSqFt);
    }
  };

  // Toggle room count
  const updateRoomCount = (roomId: string, delta: number) => {
    setRoomCounts(prev => {
      const current = prev[roomId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [roomId]: next };
    });
  };

  // Toggle system selection
  const toggleSystem = (systemId: string) => {
    setSelectedSystems(prev => 
      prev.includes(systemId)
        ? prev.filter(id => id !== systemId)
        : [...prev, systemId]
    );
  };

  // Calculation Algorithm
  const calculateEstimate = () => {
    const propTypeObj = settings.propertyTypes.find(p => p.id === selectedPropertyType) || settings.propertyTypes[0];
    const tierObj = settings.tiers.find(t => t.id === selectedTier) || settings.tiers[1];
    const sqft = customSqFt || 2000;

    // 1. Base rooms cost
    let roomsTotal = 0;
    let totalRoomsCount = 0;
    settings.availableRooms.forEach(room => {
      const count = roomCounts[room.id] || 0;
      roomsTotal += count * room.costPerUnit;
      totalRoomsCount += count;
    });

    // 2. Systems cost based on selected systems and sqft
    let systemsTotal = 0;
    settings.availableSystems.forEach(sys => {
      if (selectedSystems.includes(sys.id)) {
        systemsTotal += sys.costPerSqFt * sqft;
      }
    });

    // 3. Raw hardware subtotal
    const rawSubtotal = (roomsTotal + systemsTotal) * propTypeObj.multiplier * tierObj.multiplier;

    // 4. Installation & Calibration (approx 18%)
    const installationEstimate = rawSubtotal * (settings.installationRatePercentage / 100);

    // 5. Min and Max Range (+- 12% tolerance for hardware variances)
    const totalEstimate = rawSubtotal + installationEstimate;
    const minEstimate = Math.round((totalEstimate * 0.90) / 1000) * 1000;
    const maxEstimate = Math.round((totalEstimate * 1.15) / 1000) * 1000;

    return {
      subtotal: Math.round(rawSubtotal),
      installationEstimate: Math.round(installationEstimate),
      minEstimate,
      maxEstimate,
      totalRoomsCount,
      propTypeObj,
      tierObj
    };
  };

  const estimate = calculateEstimate();

  // Create Proposal Object for PDF or Enquiry
  const getProposalDataObject = (): ProposalData => {
    const refNum = 'AETH-CFG-' + Date.now().toString(36).toUpperCase();
    const propName = settings.propertyTypes.find(p => p.id === selectedPropertyType)?.name || 'Residence';
    
    // Convert rooms to breakdown
    const roomsBreakdown = settings.availableRooms
      .filter(r => (roomCounts[r.id] || 0) > 0)
      .map(r => ({ name: r.name, count: roomCounts[r.id] }));

    // Systems
    const sysIncluded = settings.availableSystems
      .filter(s => selectedSystems.includes(s.id))
      .map(s => s.name);

    const items = settings.availableSystems
      .filter(s => selectedSystems.includes(s.id))
      .map(s => ({
        name: s.name,
        category: s.category,
        specifications: s.description,
        quantity: 1,
        unitPrice: Math.round(s.costPerSqFt * customSqFt * estimate.propTypeObj.multiplier * estimate.tierObj.multiplier),
        totalPrice: Math.round(s.costPerSqFt * customSqFt * estimate.propTypeObj.multiplier * estimate.tierObj.multiplier)
      }));

    return {
      referenceNumber: refNum,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      customerName: customerName || 'Smart Home Client',
      customerEmail: customerEmail || 'client@example.com',
      customerPhone: customerPhone || 'Not specified',
      location: customerCity || 'India',
      propertyType: propName,
      propertySize: `${customSqFt.toLocaleString()} sq.ft.`,
      automationTier: `${estimate.tierObj.name} (${selectedTier})`,
      notes: customerNotes || `Custom ${selectedTier} smart home configuration for ${propName} (${customSqFt} sq.ft.) across ${estimate.totalRoomsCount} active zones.`,
      items,
      systemsIncluded: sysIncluded,
      roomsBreakdown,
      subtotal: estimate.subtotal,
      installationEstimate: estimate.installationEstimate,
      estimatedTotalMin: estimate.minEstimate,
      estimatedTotalMax: estimate.maxEstimate,
      totalAmount: Math.round((estimate.minEstimate + estimate.maxEstimate) / 2)
    };
  };

  // Download PDF Handler
  const handleDownloadPDF = () => {
    const proposalData = getProposalDataObject();
    generateProposalPDF(proposalData);
    showToast('Proposal PDF generated successfully', 'success');
  };

  // Submit Proposal Enquiry to Admin
  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    const proposalData = getProposalDataObject();

    try {
      const enquiry = await submitEnquiry({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || 'not_provided@aetheria.com',
        customerPhone: customerPhone.trim(),
        city: customerCity.trim(),
        notes: `Configurator Concept Submission: ${estimate.tierObj.name} tier for ${proposalData.propertyType} (${customSqFt} sq.ft.). Estimated Investment: ${formatCurrencyINR(estimate.minEstimate)} - ${formatCurrencyINR(estimate.maxEstimate)}. Notes: ${customerNotes}`,
        type: 'configurator',
        propertyType: proposalData.propertyType,
        propertySize: proposalData.propertySize,
        selectedSystems: proposalData.systemsIncluded,
        proposalRef: proposalData.referenceNumber,
        configuratorSummary: {
          propertyType: proposalData.propertyType || '',
          propertySize: proposalData.propertySize || '',
          rooms: proposalData.roomsBreakdown || [],
          systems: proposalData.systemsIncluded || [],
          tier: selectedTier,
          estimatedMin: estimate.minEstimate,
          estimatedMax: estimate.maxEstimate
        },
        items: proposalData.items.map(item => ({
          productId: 'cfg_' + (item.category || 'system').toLowerCase(),
          productName: item.name,
          sku: 'SYS-' + item.name.replace(/\s+/g, '-').toUpperCase(),
          quantity: 1,
          price: item.totalPrice || 0
        })),
        totalAmount: proposalData.totalAmount
      });

      setSubmittedEnquiryNumber(enquiry.enquiryNumber);
      showToast('Your smart home proposal request has been submitted!', 'success');
      
      // Auto-trigger PDF download for the client as well!
      setTimeout(() => {
        generateProposalPDF({
          ...proposalData,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
          location: customerCity.trim(),
          referenceNumber: enquiry.enquiryNumber
        });
      }, 600);

    } catch (err) {
      showToast('Failed to submit proposal request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Property Type' },
    { num: 2, title: 'Size & Area' },
    { num: 3, title: 'Rooms & Zones' },
    { num: 4, title: 'Smart Systems' },
    { num: 5, title: 'Automation Tier' },
    { num: 6, title: 'Your Proposal' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 py-12 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] text-xs font-bold uppercase tracking-widest mb-4">
            <Sliders className="w-3.5 h-3.5 stroke-[1.5]" />
            Interactive System Architect
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 font-serif">
            Build Your Smart Home
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Design your bespoke architectural automation package step-by-step, review the investment estimate, and receive an instant PDF proposal.
          </p>
        </div>

        {/* Progress Stepper Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-zinc-200 mb-8 shadow-sm">
          <div className="grid grid-cols-6 gap-2">
            {steps.map(step => {
              const isCurrent = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`text-left transition-all p-2 rounded flex flex-col sm:flex-row items-center sm:items-start gap-2 cursor-pointer ${
                    isCurrent
                      ? 'bg-zinc-50 border border-zinc-150 text-[#C5A880]'
                      : isCompleted
                      ? 'text-zinc-700 hover:bg-zinc-50'
                      : 'text-zinc-400 opacity-60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      isCurrent
                        ? 'bg-[#C5A880] text-white'
                        : isCompleted
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[9px] uppercase font-bold tracking-widest opacity-60">Step {step.num}</div>
                    <div className="text-[11px] font-semibold truncate max-w-[100px]">{step.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 1: PROPERTY TYPE */}
        {currentStep === 1 && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-1 font-serif">
                Step 1: Select Your Property Archetype
              </h2>
              <p className="text-zinc-500 text-sm font-light">
                Choose the architectural structure of your residence or commercial workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.propertyTypes.map(type => {
                const isSelected = selectedPropertyType === type.id;
                return (
                  <div
                    key={type.id}
                    id={`prop-type-${type.id}`}
                    onClick={() => setSelectedPropertyType(type.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-zinc-50/40 border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]/20'
                        : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded ${isSelected ? 'bg-zinc-100 text-[#C5A880]' : 'bg-zinc-50 text-zinc-400'}`}>
                        <Building2 className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-200'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 font-serif">{type.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">{type.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Property Size</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY SIZE */}
        {currentStep === 2 && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-1 font-serif">
                Step 2: Property Area & Dimensions
              </h2>
              <p className="text-zinc-500 text-sm font-light">
                Select your approximate built-up area to compute wiring topology, signal repeaters, and hub requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.sizeRanges.map(range => {
                const isSelected = selectedSizeRange === range.id;
                return (
                  <div
                    key={range.id}
                    id={`size-range-${range.id}`}
                    onClick={() => handleSizeRangeSelect(range.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-zinc-50/40 border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]/20'
                        : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#C5A880]">~{range.avgSqFt} sq.ft. avg</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-200'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 font-serif">{range.label}</h3>
                    <p className="text-xs text-zinc-400 mt-1 font-light">Calibrated for multi-zone distribution</p>
                  </div>
                );
              })}
            </div>

            {/* Custom Area Adjustment */}
            <div className="bg-zinc-50 p-5 rounded-lg border border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-700 block">
                    Custom Exact Square Footage (Optional)
                  </label>
                  <p className="text-xs text-zinc-400 mt-0.5 font-light">
                    Enter precise carpet or super-built-up area if known
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="300"
                    max="50000"
                    step="50"
                    value={customSqFt}
                    onChange={e => setCustomSqFt(Number(e.target.value))}
                    className="w-36 bg-white border border-zinc-200 rounded px-4 py-2 text-zinc-800 font-mono text-sm focus:border-[#C5A880] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-zinc-500 font-mono">sq.ft.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Rooms</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ROOMS & ZONES */}
        {currentStep === 3 && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-1 font-serif">
                  Step 3: Select & Configure Rooms
                </h2>
                <p className="text-zinc-500 text-sm font-light">
                  Specify the quantity of each room zone in your residence to calculate keypad and sensor density.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] font-mono text-xs font-bold shrink-0">
                Total Active Zones: {estimate.totalRoomsCount}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.availableRooms.map(room => {
                const count = roomCounts[room.id] || 0;
                const isActive = count > 0;
                return (
                  <div
                    key={room.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-zinc-50/50 border-zinc-300 shadow-sm'
                        : 'bg-white border-zinc-200 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-sm text-zinc-900 font-serif">{room.name}</div>
                      <span className="text-[10px] font-mono text-zinc-450 font-semibold uppercase">
                        {formatCurrencyINR(room.costPerUnit)}/zone
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-150">
                      <span className="text-xs text-zinc-400 font-light">Quantity</span>
                      <div className="flex items-center gap-3 bg-white px-2 py-1 rounded border border-zinc-200">
                        <button
                          type="button"
                          onClick={() => updateRoomCount(room.id, -1)}
                          disabled={count === 0}
                          className="w-6 h-6 rounded bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 flex items-center justify-center text-zinc-650 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-sm w-4 text-center text-zinc-800">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateRoomCount(room.id, 1)}
                          className="w-6 h-6 rounded bg-zinc-900 text-white hover:bg-zinc-850 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Smart Systems</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SMART SYSTEMS */}
        {currentStep === 4 && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-1 font-serif">
                  Step 4: Choose Integrated Smart Systems
                </h2>
                <p className="text-zinc-500 text-sm font-light">
                  Select which automation sub-systems to engineer into your space. All systems operate via local Matter & Thread mesh protocols.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] font-mono text-xs font-bold shrink-0">
                {selectedSystems.length} of {settings.availableSystems.length} Selected
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.availableSystems.map(system => {
                const isSelected = selectedSystems.includes(system.id);
                return (
                  <div
                    key={system.id}
                    id={`system-card-${system.id}`}
                    onClick={() => toggleSystem(system.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-zinc-50/40 border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]/20'
                        : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-zinc-100 text-[#C5A880]">
                        {system.category}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-200'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 mt-2 font-serif">{system.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed font-light">{system.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Automation Level</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: AUTOMATION LEVEL */}
        {currentStep === 5 && (
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-1 font-serif">
                Step 5: Select Your Automation Tier
              </h2>
              <p className="text-zinc-500 text-sm font-light">
                Choose the refinement depth, hardware material grade, and engineering redundancy level.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {settings.tiers.map(tier => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    id={`tier-card-${tier.id}`}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-zinc-50/20 border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/35'
                        : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-zinc-900 text-white font-bold text-[9px] uppercase tracking-widest shadow-sm">
                        Selected Tier
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                          Tier {tier.id === 'Essential' ? 'I' : tier.id === 'Luxury' ? 'II' : 'III'}
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#C5A880] bg-[#C5A880] text-white' : 'border-zinc-200'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <h3 className="font-semibold text-xl text-zinc-900 font-serif">{tier.name}</h3>
                      <p className="text-xs text-zinc-550 mt-2 leading-relaxed font-light">{tier.description}</p>

                      <div className="my-5 pt-4 border-t border-zinc-150 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Features Included:</div>
                        {tier.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-650 font-light">
                            <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-150 mt-4 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-[#C5A880]' : 'text-zinc-400'}`}>
                        {tier.tagline}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(6)}
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Calculate & View Proposal</span>
                <Check className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: RESULTS SCREEN */}
        {currentStep === 6 && (
          <div className="space-y-8">
            
            {/* Main Result Card */}
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] text-xs font-bold uppercase tracking-widest mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.5]" />
                    Configuration Complete
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 font-serif">
                    Your Smart Home Concept Summary
                  </h2>
                  <p className="text-zinc-500 text-sm font-light mt-1">
                    Bespoke architectural specification for {estimate.propTypeObj.name} ({customSqFt.toLocaleString()} sq.ft.)
                  </p>
                </div>

                {/* Investment Estimate Box */}
                <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-200 text-center lg:text-right">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-1">
                    Estimated Investment Range
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-zinc-900">
                    {formatCurrencyINR(estimate.minEstimate)} – {formatCurrencyINR(estimate.maxEstimate)}
                  </div>
                  <div className="text-[10px] text-zinc-450 mt-1 font-light">
                    Includes hardware + white-glove installation calibration
                  </div>
                </div>
              </div>

              {/* Specification Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-zinc-200">
                
                {/* Column 1: Property & Tier */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                    Architecture & Level
                  </h3>
                  <div className="bg-zinc-50 p-4 rounded border border-zinc-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-light">Property Type:</span>
                      <strong className="text-zinc-800 font-semibold">{estimate.propTypeObj.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-light">Configured Area:</span>
                      <strong className="text-zinc-800 font-semibold font-mono">{customSqFt.toLocaleString()} sq.ft.</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-light">Automation Tier:</span>
                      <strong className="text-[#C5A880] font-bold">{estimate.tierObj.name}</strong>
                    </div>
                  </div>
                </div>

                {/* Column 2: Rooms */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                    Configured Rooms ({estimate.totalRoomsCount} Zones)
                  </h3>
                  <div className="bg-zinc-50 p-4 rounded border border-zinc-200 max-h-36 overflow-y-auto space-y-1.5 text-xs">
                    {settings.availableRooms
                      .filter(r => (roomCounts[r.id] || 0) > 0)
                      .map(r => (
                        <div key={r.id} className="flex justify-between text-zinc-700">
                          <span className="font-light">{r.name}</span>
                          <span className="font-mono text-zinc-900 font-bold">{roomCounts[r.id]}x</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 3: Systems */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                    Selected Sub-Systems ({selectedSystems.length})
                  </h3>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                    {settings.availableSystems
                      .filter(s => selectedSystems.includes(s.id))
                      .map(s => (
                        <span key={s.id} className="text-[10px] px-2.5 py-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-650 font-light">
                          {s.name}
                        </span>
                      ))}
                  </div>
                </div>

              </div>

              {/* Mandatory Pricing Disclaimer */}
              <div className="mt-6 p-4 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3 leading-relaxed font-light">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Estimated luxury smart residential investment. Final pricing depends on brand choices, detailed site assessments, customized architectural keypad choices, and cable layout.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-zinc-200">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-5 py-3 rounded bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Modify Configuration</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full sm:w-auto px-6 py-3 rounded bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-[10px] uppercase tracking-widest border border-zinc-200 flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#C5A880]"
                  >
                    <Download className="w-4 h-4 text-[#C5A880]" />
                    <span>Download PDF Proposal</span>
                  </button>

                  <button
                    onClick={() => setShowProposalModal(true)}
                    className="w-full sm:w-auto px-7 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#C5A880]" />
                    <span>Request Turnkey Quote</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODAL: Request Detailed Proposal / Contact Form */}
        {showProposalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-900/40 backdrop-blur-sm">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-xl relative">
              
              {!submittedEnquiryNumber ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-zinc-900 font-serif">
                      Request Detailed System Proposal
                    </h3>
                    <button
                      onClick={() => setShowProposalModal(false)}
                      className="text-zinc-400 hover:text-zinc-900 text-sm font-bold font-mono p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 mb-6 font-light leading-relaxed">
                    Our Smart Automation Architects will review your {estimate.propTypeObj.name} configuration and prepare a comprehensive turnkey proposal.
                  </p>

                  <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alexander Vance"
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-sm text-zinc-800 focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={customerPhone}
                            onChange={e => setCustomerPhone(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-sm text-zinc-800 focus:border-[#C5A880] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            placeholder="alexander@example.com"
                            value={customerEmail}
                            onChange={e => setCustomerEmail(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-sm text-zinc-800 focus:border-[#C5A880] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                        City / Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Mumbai, Delhi, Bengaluru"
                          value={customerCity}
                          onChange={e => setCustomerCity(e.target.value)}
                          className="w-full bg-white border border-zinc-200 rounded pl-10 pr-4 py-2.5 text-sm text-zinc-800 focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 block mb-1">
                        Specific Architectural Notes or Timeline
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Under construction, expected handover date, specific brand preferences..."
                        value={customerNotes}
                        onChange={e => setCustomerNotes(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded px-4 py-2.5 text-sm text-zinc-800 focus:border-[#C5A880] focus:outline-none resize-none font-light"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#C5A880]" />
                            <span>Submit & Request Turnkey Proposal</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#C5A880]/10 border border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 font-serif">Proposal Request Received</h3>
                  <p className="text-xs text-zinc-550 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you, <strong>{customerName}</strong>. Your reference ID is{' '}
                    <span className="font-mono text-[#C5A880] font-bold">{submittedEnquiryNumber}</span>. Your PDF proposal has been downloaded automatically.
                  </p>
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full py-2.5 rounded bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-850 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#C5A880]" />
                      <span>Re-download Proposal PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProposalModal(false);
                        setSubmittedEnquiryNumber(null);
                      }}
                      className="w-full py-2.5 rounded bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-widest cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

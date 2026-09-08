/**
 * LocalStorage Data Management Engine for Smart Home Systems & Architectural Automation
 * Full CRUD, JSON Import/Export, Snapshots, Seed Database, and Activity Logging.
 */

import {
  Product,
  Category,
  OrderEnquiry,
  User,
  FAQItem,
  SiteContent,
  YouTubeVideo,
  SeoSettings,
  BackupItem,
  ActivityLog,
  SolutionService,
  ProjectApplication,
  Offer,
  Testimonial,
  NewsletterSubscriber,
  ConfiguratorSettings
} from '../types';

import { initialCategories, initialProducts } from '../data/catalogueData';
import { initialServices } from '../data/servicesData';
import { initialProjects } from '../data/projectsData';
import { FirebaseService } from './firebaseService';

const STORAGE_KEYS = {
  PRODUCTS: 'smarthome_products_v2',
  CATEGORIES: 'smarthome_categories_v2',
  SERVICES: 'smarthome_services_v2',
  PROJECTS: 'smarthome_projects_v2',
  ORDERS: 'smarthome_orders_v2',
  USERS: 'smarthome_users_v2',
  CURRENT_USER: 'smarthome_current_user_v2',
  ADMIN_PIN: 'smarthome_admin_pin_v2',
  FAQS: 'smarthome_faqs_v2',
  SITE_CONTENT: 'smarthome_site_content_v2',
  NEWSLETTER: 'smarthome_newsletter_v2',
  WISHLIST: 'smarthome_wishlist_v2',
  CART: 'smarthome_cart_v2',
  COMPARE: 'smarthome_compare_v2',
  VIDEOS: 'smarthome_videos_v2',
  SEO_SETTINGS: 'smarthome_seo_settings_v2',
  BACKUPS: 'smarthome_backups_v2',
  ACTIVITY_LOGS: 'smarthome_activity_logs_v2',
  FAILED_LOGINS: 'smarthome_failed_logins_v2',
  OFFERS: 'smarthome_offers_v2',
  TESTIMONIALS: 'smarthome_testimonials_v2',
  CONFIGURATOR_SETTINGS: 'smarthome_configurator_settings_v2',
};

export const defaultConfiguratorSettings: ConfiguratorSettings = {
  baseSquareFootRateINR: 180,
  roomCostDefaults: {
    'living_room': 45000,
    'master_bedroom': 38000,
    'bedroom_2': 28000,
    'bedroom_3': 25000,
    'kitchen': 22000,
    'dining': 24000,
    'home_theatre': 85000,
    'balcony_terrace': 18000,
    'foyer_entrance': 32000,
    'bathroom': 12000,
    'garden_outdoor': 45000,
  },
  systemFactorMultipliers: {
    'smart_lighting': 1.0,
    'smart_switches': 1.0,
    'smart_retrofit': 0.85,
    'curtain_automation': 1.2,
    'biometric_security': 1.3,
    'hvac_climate': 1.15,
    'video_door_phone': 1.1,
    'ajax_security': 1.25,
    'multiroom_audio': 1.4,
    'motorized_pergola': 1.8,
  },
  tierMultipliers: {
    'essential': 0.75,
    'premium': 1.0,
    'luxury_ultra': 1.45,
  },
  propertyTypeDefaults: {
    'Luxury Villa': { typicalRooms: ['foyer_entrance', 'living_room', 'master_bedroom', 'bedroom_2', 'bedroom_3', 'kitchen', 'dining', 'home_theatre', 'balcony_terrace', 'garden_outdoor'], defaultSqft: 4500 },
    'Apartment': { typicalRooms: ['foyer_entrance', 'living_room', 'master_bedroom', 'bedroom_2', 'kitchen', 'dining', 'balcony_terrace'], defaultSqft: 2200 },
    'Penthouse': { typicalRooms: ['foyer_entrance', 'living_room', 'master_bedroom', 'bedroom_2', 'bedroom_3', 'kitchen', 'dining', 'home_theatre', 'balcony_terrace'], defaultSqft: 5000 },
    'Commercial / Office': { typicalRooms: ['foyer_entrance', 'living_room', 'dining'], defaultSqft: 3500 },
    'Industrial': { typicalRooms: ['foyer_entrance', 'garden_outdoor'], defaultSqft: 8000 },
    'Other': { typicalRooms: ['living_room', 'master_bedroom'], defaultSqft: 2000 }
  },

  // Rich configurator fields
  baseHardwareRate: 180,
  installationRatePercentage: 18,
  availableRooms: [
    { id: 'living', name: 'Grand Living Salon', costPerUnit: 45000, defaultCount: 1 },
    { id: 'master_bedroom', name: 'Master Suite', costPerUnit: 38000, defaultCount: 1 },
    { id: 'bedroom', name: 'Bedroom', costPerUnit: 28000, defaultCount: 2 },
    { id: 'kitchen', name: 'Smart Kitchen', costPerUnit: 22000, defaultCount: 1 },
    { id: 'dining', name: 'Dining Area', costPerUnit: 24000, defaultCount: 1 },
    { id: 'bathroom', name: 'En-suite Bathroom', costPerUnit: 12000, defaultCount: 2 },
    { id: 'home_office', name: 'Executive Home Office', costPerUnit: 32000, defaultCount: 0 },
    { id: 'cinema_room', name: 'Acoustic Cinema Room', costPerUnit: 85000, defaultCount: 0 },
    { id: 'garden_outdoor', name: 'Garden & Terrace', costPerUnit: 45000, defaultCount: 0 },
    { id: 'garage', name: 'Automated Garage', costPerUnit: 20000, defaultCount: 0 }
  ],
  availableSystems: [
    { id: 'smart_lighting', name: 'Tunable Circadian Lighting', category: 'LIGHTING', costPerSqFt: 65, description: 'Deep anti-glare downlights, low-voltage magnetic tracks with Kelvin temperature tuning.' },
    { id: 'motorized_curtains', name: 'Motorized Shading & Curtains', category: 'SHADING', costPerSqFt: 45, description: 'Whisper-quiet motorized tracks with soft-start haptic touch overrides.' },
    { id: 'climate_control', name: 'Automated HVAC & Climate', category: 'CLIMATE', costPerSqFt: 30, description: 'Integrated thermostat controls for VRF/VRV units and ventilation.' },
    { id: 'security', name: 'Perimeter Defense & CCTV', category: 'SECURITY', costPerSqFt: 50, description: 'Contactless sensors, exterior laser beams, and smart 4K cameras.' },
    { id: 'smart_locks', name: 'Biometric & Palm-Vein Locks', category: 'LOCKS', costPerSqFt: 25, description: '3D structured face recognition gates, palm-vein readers and backup PIN keypads.' },
    { id: 'multi_room_audio', name: 'Audiophile Multi-Zone Audio', category: 'AUDIO', costPerSqFt: 55, description: 'Dolby Atmos living areas, weatherproof outdoor terrace acoustics, and local streaming servers.' },
    { id: 'whole_home_automation', name: 'Unified Core Orchestration', category: 'CORE', costPerSqFt: 20, description: 'Zero-latency local mesh hubs, modular touch switchboards and offline Voice control.' }
  ],
  tiers: [
    { id: 'Essential', name: 'Essential Automation', multiplier: 0.75, tagline: 'Intelligent controls, manual-override modular switches, standard secure mesh. Ideal for retrofit apartments.', features: ['Modular smart switches', 'App & Voice control', 'Standard motion automation', 'Single core controller'] },
    { id: 'Luxury', name: 'Luxury Architecture', multiplier: 1.0, tagline: 'Capacitive glass touchplates, high CRI circadian light profiles, motorized drapery and robust local mesh network.', features: ['Capacitive glass panels', 'Circadian CCT lighting', 'Motorized blinds & drapery', 'Active biometric door gates'] },
    { id: 'Architectural', name: 'Prestigious Estate', multiplier: 1.45, tagline: 'Custom brushed-metal rotary control dials, Dolby Atmos spatial acoustic designs, motorized pergolas, and active biometric security perimeters.', features: ['Solid metal tactile buttons', 'Precision 48V magnetic spot tracks', 'Dolby Atmos spatial sound arrays', 'Full 3D structured light access gates'] }
  ],
  propertyTypes: [
    { id: 'villa', name: 'Luxury Villa / Estate', description: 'Spacious detached residence with multi-zone security, landscape lighting, and independent outdoor theaters.', multiplier: 1.25 },
    { id: 'apartment', name: 'Modern Apartment / Flat', description: 'Compact urban living unit featuring space-optimized in-wall retrofits and circadian indoor lighting grids.', multiplier: 0.95 },
    { id: 'penthouse', name: 'Elite Penthouse', description: 'High-rise living space featuring panoramic automated motorized shades, multi-room audio, and smart climate controls.', multiplier: 1.15 },
    { id: 'commercial', name: 'Commercial Space / Office', description: 'Intelligent workspaces utilizing automated occupancy power savings and centralized scheduling portals.', multiplier: 1.10 }
  ],
  sizeRanges: [
    { id: '1000_2000', name: '1,000 – 2,000 sq.ft.', avgSqFt: 1500 },
    { id: '2000_3500', name: '2,000 – 3,500 sq.ft.', avgSqFt: 2800 },
    { id: '3500_5000', name: '3,500 – 5,000 sq.ft.', avgSqFt: 4200 },
    { id: '5000_8000', name: '5,000 – 8,000 sq.ft.', avgSqFt: 6500 },
    { id: '8000_plus', name: '8,000+ sq.ft. (Elite Estate)', avgSqFt: 11000 }
  ]
};

export const defaultSiteContent: SiteContent = {
  businessName: 'Smart Systems Automation',
  tagline: 'Smart Living. Seamless Automation.',
  heroHeading: 'Smart Living. Seamless Automation.',
  heroSubheading: 'End-to-End Smart Home Automation, Architectural Lighting, Biometric Security & Motorized Access Systems for Luxury Residences and Commercial Architecture.',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  phone: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  email: 'contact@smartsystemsautomation.com',
  address: 'Plot No. 42, Jubilee Enclave, Hitec City, Hyderabad, Telangana 500081',
  workingHours: 'Monday – Saturday: 9:30 AM – 7:30 PM IST',
  aboutText: 'Smart Systems Automation is a premier smart home technology and architectural automation provider. We deliver end-to-end solutions spanning Titan smart modular switches, capacitive touch boards, retrofit in-wall modules, smart downlights and magnetic tracks, motorized curtain systems, 3D face recognition digital door locks, video door phones, Ajax intrusion alarms, switchable privacy glass, motorized gates, and aluminum louvered pergolas for residential and commercial architecture.',
  aboutMission: 'To engineer seamless, intuitive, and visually pristine smart environments that elevate living comfort, energy efficiency, and total security.',
  aboutVision: 'To set the benchmark for modern architectural automation through zero-latency mesh networking, premium hardware craftsmanship, and white-glove engineering support.',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  youtubeUrl: 'https://youtube.com',
  logoUrl: '',
  faviconUrl: '',
  primaryColor: '#0ea5e9',
  googleMapsUrl: 'https://maps.google.com/?q=Hitec+City+Hyderabad',
  privacyPolicy: `## Privacy & Data Protection Policy

At Smart Systems Automation, customer privacy and system security are fundamental tenets.

### 1. Information Collection
We collect customer contact details (name, email, phone number, installation address, property type) exclusively for providing automation consultations, quotations, project execution, and post-installation support. We do not sell or monetize personal customer records.

### 2. Local Mesh & Hardware Security
Our Zigbee 3.0 and Matter automation controllers execute automations locally. Sensitive biometric facial and fingerprint profiles are stored encrypted on-device.

### 3. Contact & Rights
For any inquiries regarding your stored information, please contact our Data Officer at privacy@smartsystemsautomation.com.`,
  termsAndConditions: `## Terms & Conditions of Service

### 1. Quotations & Validity
System designs and cost quotations are valid for 30 calendar days from the date of issuance.

### 2. Professional Installation
All smart panels, motorized curtain tracks, high-voltage drivers, and gate motors must be installed by certified automation engineers to ensure manufacturer warranty coverage.

### 3. Warranty Coverage
Products carry manufacturer-backed warranty periods (typically 2 to 3 years) against electrical defects under normal operating conditions.`
};

export const defaultSeoSettings: SeoSettings = {
  pageTitle: 'Smart Systems Automation | Smart Living. Seamless Automation.',
  metaDescription: 'End-to-end luxury smart home automation, Titan smart switches, retrofit micro modules, smart lighting, motorized curtains, biometric door locks, and CCTV surveillance.',
  keywords: 'smart home automation, titan smart switch, retrofit automation, smart door locks, motorized curtain tracks, magnetic track lights, zigbee gateway, video door phone, ajax alarm',
  ogImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  canonicalUrl: 'https://smartsystemsautomation.com',
  robotsIndex: true,
  schemaJson: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Smart Systems Automation",
    "url": "https://smartsystemsautomation.com",
    "logo": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
    "telephone": "+91-98765-43210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 42, Jubilee Enclave, Hitec City",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN"
    }
  }, null, 2),
  googleAnalyticsId: 'G-SMART2026',
  googleSearchConsoleVerification: 'gsc-verification-smart-systems',
};

export const defaultFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the difference between Titan Smart Switches and Smart Retrofit Modules?',
    answer: 'Titan Smart Switches replace your existing switch plates entirely with premium architectural modular plates featuring tactile push-buttons, precision rotary knobs for fan/dimming control, and customizable laser engraving. Smart Retrofit Modules, on the other hand, are micro modules installed discreetly inside the wall behind your existing switchboards, keeping your current switch plates and manual switches while unlocking app, voice, and timer automation.',
    category: 'switches'
  },
  {
    id: 'faq-2',
    question: 'Can I automate an existing home without breaking walls or damaging interior painting?',
    answer: 'Yes! Our Smart Retrofit Series (1CH, 2CH, 3CH, 4CH, and 2CH Curtain) is specifically engineered for existing occupied homes. They fit inside standard backboxes behind your current switch plates in 15 minutes per switchboard with zero wall chipping, zero rewiring, and zero repaint required.',
    category: 'retrofit'
  },
  {
    id: 'faq-3',
    question: 'How do Zigbee 3.0 and Matter Gateways work in multi-floor homes?',
    answer: 'Zigbee 3.0 forms a self-healing mesh network where each powered device (such as Titan switches, touch boards, and smart drivers) acts as a repeater to extend signal coverage across rooms. For multi-floor villas or large penthouses, our Wired Pro+ Gateway connects to your local LAN and coordinates up to 200 devices with zero cloud latency and Apple HomeKit / Matter compatibility.',
    category: 'protocols'
  },
  {
    id: 'faq-4',
    question: 'What curtain motor load capacities and track lengths do you support?',
    answer: 'We provide heavy-duty whisper-quiet motors in 1.2Nm (loads up to 50kg), 1.5Nm (loads up to 75kg), and 2.0Nm (loads up to 80kg). We supply DIY expandable tracks up to 15 ft and custom precision motorized tracks up to 25 ft with manual pull-to-start, mobile app, and multi-channel remote controls.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'How does the S3 Pro Smart Door Lock operate and how is it powered?',
    answer: 'The S3 Pro features 3D structured light facial recognition, semiconductor fingerprint reader, scrambled anti-peep PIN passcode, RFID cards, temporary OTPs, and an emergency mechanical key. It is powered by a high-capacity rechargeable lithium battery that lasts 8–12 months per charge, with an external USB emergency jumpstart port.',
    category: 'security'
  },
  {
    id: 'faq-6',
    question: 'What types of architectural lighting fixtures are available?',
    answer: 'Our catalogue includes a vast array of architectural fixtures: Deep Panel Round/Square, Glowria, Glowon, Shineo, Spira, Nova, Sharpx, Prism, Glowlust, Flix, Value COB, Radius, Fleura, Grammy, Prod, Flato, Pinhole Laser, Delta Plus, Tiltable Laser, Aura, Experia, Eccentric, Vizion, Slimo Trimless, Surface Cylinder, and Luma Drop downlights, 48V low-voltage magnetic track lighting systems, CCT Tunable LED strip combos with 24V SMPS, and smart DIP switch drivers.',
    category: 'lighting'
  },
  {
    id: 'faq-7',
    question: 'How do I request a consultation or quotation for my project?',
    answer: 'You can submit a consultation request directly on our website, click "Request Quote" on any product or solution, or click the WhatsApp button to chat directly with our Smart Automation Architects. We review your floor plans and provide a comprehensive itemized solution.',
    category: 'general'
  }
];

export const defaultVideos: YouTubeVideo[] = [
  {
    id: 'vid_1',
    title: 'Titan Smart Switch Series with Rotary Knob In-Depth Walkthrough',
    youtubeUrl: 'https://www.youtube.com/watch?v=28I6M9iTByo',
    youtubeId: '28I6M9iTByo',
    description: 'Explore the 2M, 4M, 6M, 8M Titan smart modular switch configurations, precision rotary fan speed regulation, and multi-scene execution.',
    category: 'Product Demonstrations',
    isFeatured: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    duration: '08:45',
    createdAt: new Date().toISOString()
  },
  {
    id: 'vid_2',
    title: 'Smart Retrofit Module Installation in Standard Switchboards',
    youtubeUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    youtubeId: 'J---aiyznGQ',
    description: 'Step-by-step demonstration of installing 1CH, 2CH, and 4CH micro modules behind existing switchboards without wall damage.',
    category: 'Installation',
    isFeatured: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    duration: '10:15',
    createdAt: new Date().toISOString()
  },
  {
    id: 'vid_3',
    title: '48V Low-Voltage Magnetic Track Lighting & CCT Tunable LED Strips',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Architectural lighting overview highlighting magnetic click-in spots, linear diffusers, and seamless circadian rhythm automation.',
    category: 'Lighting',
    isFeatured: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    duration: '07:30',
    createdAt: new Date().toISOString()
  },
  {
    id: 'vid_4',
    title: 'S3 Pro 3D Face Recognition Smart Lock & Video Intercom Demo',
    youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeId: '3JZ_D3ELwOQ',
    description: 'Testing 3D facial recognition speed, video doorbell live streaming, mobile app remote unlock, and emergency power backup.',
    category: 'Security',
    isFeatured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    duration: '06:50',
    createdAt: new Date().toISOString()
  }
];

export function extractYoutubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) return match[1];
  if (url.trim().length === 11 && !url.includes('/')) return url.trim();
  return '';
}

const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    const parsed = JSON.parse(data);
    if (parsed === null || parsed === undefined) return defaultValue;
    if (Array.isArray(defaultValue) && !Array.isArray(parsed)) return defaultValue;
    return parsed;
  } catch (err) {
    console.error(`Error loading key ${key} from storage:`, err);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key} to storage:`, err);
  }
};

export const StorageService = {
  // PRODUCTS
  getProducts: (): Product[] => {
    const parsed = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return Array.isArray(parsed) ? parsed : [];
  },
  saveProducts: (products: Product[]) => setItem(STORAGE_KEYS.PRODUCTS, products || []),
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const products = StorageService.getProducts();
    const newProduct: Product = {
      ...productData,
      id: 'prod_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    StorageService.saveProducts(products);
    FirebaseService.saveProduct(newProduct.id, newProduct);
    StorageService.logActivity('Added Product', `Created product "${newProduct.name}" (SKU: ${newProduct.sku})`, 'product');
    return newProduct;
  },
  updateProduct: (id: string, productData: Partial<Product>): Product | null => {
    const products = StorageService.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...products[index], ...productData, updatedAt: new Date().toISOString() };
    products[index] = updated;
    StorageService.saveProducts(products);
    FirebaseService.saveProduct(id, updated);
    StorageService.logActivity('Updated Product', `Modified product "${updated.name}"`, 'product');
    return updated;
  },
  deleteProduct: (id: string): boolean => {
    const products = StorageService.getProducts();
    const prod = products.find(p => p.id === id);
    const filtered = products.filter(p => p.id !== id);
    StorageService.saveProducts(filtered);
    FirebaseService.deleteProduct(id);
    if (prod) {
      StorageService.logActivity('Deleted Product', `Removed product "${prod.name}"`, 'product');
    }
    return filtered.length !== products.length;
  },
  duplicateProduct: (id: string): Product | null => {
    const products = StorageService.getProducts();
    const original = products.find(p => p.id === id);
    if (!original) return null;
    const clone: Product = {
      ...original,
      id: 'prod_' + Date.now().toString(36),
      name: `${original.name} (Copy)`,
      sku: `${original.sku}-COPY-${Math.floor(Math.random() * 1000)}`,
      slug: `${original.slug}-copy-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(clone);
    StorageService.saveProducts(products);
    FirebaseService.saveProduct(clone.id, clone);
    StorageService.logActivity('Duplicated Product', `Cloned product "${original.name}" as "${clone.name}"`, 'product');
    return clone;
  },

  // CATEGORIES
  getCategories: (): Category[] => {
    const parsed = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    return Array.isArray(parsed) ? parsed : [];
  },
  saveCategories: (categories: Category[]) => setItem(STORAGE_KEYS.CATEGORIES, categories || []),
  addCategory: (categoryData: Omit<Category, 'id' | 'createdAt'>): Category => {
    const categories = StorageService.getCategories();
    const newCategory: Category = {
      ...categoryData,
      id: 'cat_' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    StorageService.saveCategories(categories);
    FirebaseService.saveCategory(newCategory.id, newCategory);
    StorageService.logActivity('Added Category', `Created category "${newCategory.name}"`, 'category');
    return newCategory;
  },
  updateCategory: (id: string, categoryData: Partial<Category>): Category | null => {
    const categories = StorageService.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = { ...categories[index], ...categoryData };
    categories[index] = updated;
    StorageService.saveCategories(categories);
    FirebaseService.saveCategory(id, updated);
    StorageService.logActivity('Updated Category', `Modified category "${updated.name}"`, 'category');
    return updated;
  },
  deleteCategory: (id: string): boolean => {
    const categories = StorageService.getCategories();
    const cat = categories.find(c => c.id === id);
    const filtered = categories.filter(c => c.id !== id);
    StorageService.saveCategories(filtered);
    FirebaseService.deleteCategory(id);
    if (cat) {
      StorageService.logActivity('Deleted Category', `Removed category "${cat.name}"`, 'category');
    }
    return filtered.length !== categories.length;
  },

  // SOLUTIONS / SERVICES
  getServices: (): SolutionService[] => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.SERVICES) : null;
    if (raw === null) {
      StorageService.saveServices(initialServices);
      return initialServices;
    }
    const parsed = getItem<SolutionService[]>(STORAGE_KEYS.SERVICES, initialServices);
    return Array.isArray(parsed) ? parsed : initialServices;
  },
  saveServices: (services: SolutionService[]) => setItem(STORAGE_KEYS.SERVICES, services || []),
  addService: (serviceData: Omit<SolutionService, 'id'>): SolutionService => {
    const services = StorageService.getServices();
    const newService: SolutionService = {
      ...serviceData,
      id: 'srv_' + Date.now().toString(36),
    };
    services.push(newService);
    StorageService.saveServices(services);
    StorageService.logActivity('Added Solution Service', `Created solution "${newService.title}"`, 'service');
    return newService;
  },
  updateService: (id: string, serviceData: Partial<SolutionService>): SolutionService | null => {
    const services = StorageService.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    const updated = { ...services[index], ...serviceData };
    services[index] = updated;
    StorageService.saveServices(services);
    StorageService.logActivity('Updated Solution Service', `Modified solution "${updated.title}"`, 'service');
    return updated;
  },
  deleteService: (id: string): boolean => {
    const services = StorageService.getServices();
    const filtered = services.filter(s => s.id !== id);
    StorageService.saveServices(filtered);
    return filtered.length !== services.length;
  },

  // PROJECTS & APPLICATIONS
  getProjects: (): ProjectApplication[] => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.PROJECTS) : null;
    if (raw === null) {
      StorageService.saveProjects(initialProjects);
      return initialProjects;
    }
    const parsed = getItem<ProjectApplication[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    return Array.isArray(parsed) ? parsed : initialProjects;
  },
  saveProjects: (projects: ProjectApplication[]) => setItem(STORAGE_KEYS.PROJECTS, projects || []),
  addProject: (projectData: Omit<ProjectApplication, 'id'>): ProjectApplication => {
    const projects = StorageService.getProjects();
    const newProject: ProjectApplication = {
      ...projectData,
      id: 'proj_' + Date.now().toString(36),
    };
    projects.push(newProject);
    StorageService.saveProjects(projects);
    StorageService.logActivity('Added Project Application', `Added project showcase "${newProject.title}"`, 'system');
    return newProject;
  },
  updateProject: (id: string, projectData: Partial<ProjectApplication>): ProjectApplication | null => {
    const projects = StorageService.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projects[index], ...projectData };
    projects[index] = updated;
    StorageService.saveProjects(projects);
    return updated;
  },
  deleteProject: (id: string): boolean => {
    const projects = StorageService.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    StorageService.saveProjects(filtered);
    return filtered.length !== projects.length;
  },

  // ORDERS & ENQUIRIES
  getOrders: (): OrderEnquiry[] => {
    const orders = getItem<OrderEnquiry[]>(STORAGE_KEYS.ORDERS, []);
    return Array.isArray(orders) ? orders : [];
  },
  saveOrders: (orders: OrderEnquiry[]) => setItem(STORAGE_KEYS.ORDERS, orders || []),
  createOrderEnquiry: (enquiryData: Omit<OrderEnquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'updatedAt' | 'status'>): OrderEnquiry => {
    const orders = StorageService.getOrders();
    const refNum = 'ENQ-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderEnquiry = {
      ...enquiryData,
      id: 'enq_' + Date.now().toString(36),
      enquiryNumber: refNum,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    StorageService.saveOrders(orders);
    FirebaseService.saveEnquiry(newOrder.id, newOrder);
    StorageService.logActivity('New Lead / Enquiry', `Received quotation request from ${newOrder.customerName} (${refNum})`, 'enquiry');
    return newOrder;
  },
  updateOrderStatus: (id: string, status: OrderEnquiry['status']): OrderEnquiry | null => {
    const orders = StorageService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    StorageService.saveOrders(orders);
    FirebaseService.saveEnquiry(id, orders[index]);
    StorageService.logActivity('Updated Enquiry Status', `Set enquiry ${orders[index].enquiryNumber} status to "${status}"`, 'enquiry');
    return orders[index];
  },
  deleteOrder: (id: string): boolean => {
    const orders = StorageService.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    StorageService.saveOrders(filtered);
    FirebaseService.deleteEnquiry(id);
    return filtered.length !== orders.length;
  },

  // CONFIGURATOR SETTINGS
  getConfiguratorSettings: (): ConfiguratorSettings => {
    const saved = getItem<ConfiguratorSettings>(STORAGE_KEYS.CONFIGURATOR_SETTINGS, defaultConfiguratorSettings);
    return {
      ...defaultConfiguratorSettings,
      ...saved,
      availableRooms: saved?.availableRooms || defaultConfiguratorSettings.availableRooms,
      availableSystems: saved?.availableSystems || defaultConfiguratorSettings.availableSystems,
      tiers: saved?.tiers || defaultConfiguratorSettings.tiers,
      propertyTypes: saved?.propertyTypes || defaultConfiguratorSettings.propertyTypes,
      sizeRanges: saved?.sizeRanges || defaultConfiguratorSettings.sizeRanges,
    };
  },
  saveConfiguratorSettings: (settings: ConfiguratorSettings) => {
    setItem(STORAGE_KEYS.CONFIGURATOR_SETTINGS, settings);
    FirebaseService.saveSettingsDoc('configuratorSettings', settings);
    StorageService.logActivity('Configurator Settings Updated', 'Updated custom automation pricing rules and room definitions', 'system');
  },
  updateConfiguratorSettings: (settingsData: Partial<ConfiguratorSettings>): ConfiguratorSettings => {
    const current = StorageService.getConfiguratorSettings();
    const updated = { ...current, ...settingsData };
    StorageService.saveConfiguratorSettings(updated);
    return updated;
  },

  // OFFERS
  getOffers: (): Offer[] => {
    const offers = getItem<Offer[]>(STORAGE_KEYS.OFFERS, []);
    return Array.isArray(offers) ? offers : [];
  },
  saveOffers: (offers: Offer[]) => setItem(STORAGE_KEYS.OFFERS, offers || []),
  addOffer: (offer: Omit<Offer, 'id'>): Offer => {
    const offers = StorageService.getOffers();
    const newOffer: Offer = {
      ...offer,
      id: 'off_' + Date.now().toString(36),
    };
    offers.unshift(newOffer);
    StorageService.saveOffers(offers);
    FirebaseService.saveOffer(newOffer.id, newOffer);
    return newOffer;
  },
  deleteOffer: (id: string): boolean => {
    const offers = StorageService.getOffers();
    const filtered = offers.filter(o => o.id !== id);
    StorageService.saveOffers(filtered);
    FirebaseService.deleteOffer(id);
    return filtered.length !== offers.length;
  },

  // TESTIMONIALS
  getTestimonials: (): Testimonial[] => {
    const defaultTestimonials: Testimonial[] = [
      {
        id: 'tst-1',
        clientName: 'Alexander Vance',
        role: 'Managing Partner',
        company: 'Vance Architecture Studio',
        comment: 'Smart Systems completely revolutionized our residential penthouse automation. The Titan smart switch series and touchless biometric locks are unmatched in precision.',
        rating: 5,
        projectType: 'Luxury Villa Automation',
        isFeatured: true
      },
      {
        id: 'tst-2',
        clientName: 'Sophia Lin',
        role: 'Interior Design Director',
        company: 'Lumière Living Concepts',
        comment: 'The architectural lighting controls and tuneable circadian rhythm strips allow us to craft magical lighting atmospheres for our ultra-high net worth clients.',
        rating: 5,
        projectType: 'Circadian Lighting Design',
        isFeatured: true
      }
    ];
    const testimonials = getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
    return Array.isArray(testimonials) ? testimonials : defaultTestimonials;
  },
  saveTestimonials: (testimonials: Testimonial[]) => setItem(STORAGE_KEYS.TESTIMONIALS, testimonials || []),
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
    const testimonials = StorageService.getTestimonials();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: 'tst_' + Date.now().toString(36),
    };
    testimonials.unshift(newTestimonial);
    StorageService.saveTestimonials(testimonials);
    return newTestimonial;
  },

  // NEWSLETTER
  getNewsletterSubscribers: (): NewsletterSubscriber[] => {
    const subscribers = getItem<NewsletterSubscriber[]>(STORAGE_KEYS.NEWSLETTER, []);
    return Array.isArray(subscribers) ? subscribers : [];
  },
  subscribeNewsletter: (email: string): boolean => {
    const subscribers = StorageService.getNewsletterSubscribers();
    const lower = email.toLowerCase().trim();
    if (subscribers.some(s => s.email.toLowerCase() === lower)) return false;
    subscribers.push({
      id: 'sub_' + Date.now().toString(36),
      email: lower,
      subscribedAt: new Date().toISOString()
    });
    setItem(STORAGE_KEYS.NEWSLETTER, subscribers);
    return true;
  },

  // SITE CONTENT & CONTACT INFO
  getSiteContent: (): SiteContent => getItem<SiteContent>(STORAGE_KEYS.SITE_CONTENT, defaultSiteContent),
  saveSiteContent: (content: SiteContent) => {
    setItem(STORAGE_KEYS.SITE_CONTENT, content);
    FirebaseService.saveSettingsDoc('siteContent', content);
    StorageService.logActivity('Updated Site Content', 'Modified brand, contact, and policy configurations', 'system');
  },

  // FAQS
  getFAQs: (): FAQItem[] => getItem<FAQItem[]>(STORAGE_KEYS.FAQS, defaultFAQs),
  saveFAQs: (faqs: FAQItem[]) => setItem(STORAGE_KEYS.FAQS, faqs || []),
  addFAQ: (faq: Omit<FAQItem, 'id'>): FAQItem => {
    const faqs = StorageService.getFAQs();
    const newFAQ: FAQItem = {
      ...faq,
      id: 'faq_' + Date.now().toString(36),
    };
    faqs.push(newFAQ);
    StorageService.saveFAQs(faqs);
    FirebaseService.saveFAQ(newFAQ.id, newFAQ);
    return newFAQ;
  },
  updateFAQ: (id: string, faqData: Partial<FAQItem>): FAQItem | null => {
    const faqs = StorageService.getFAQs();
    const index = faqs.findIndex(f => f.id === id);
    if (index === -1) return null;
    const updated = { ...faqs[index], ...faqData };
    faqs[index] = updated;
    StorageService.saveFAQs(faqs);
    FirebaseService.saveFAQ(id, updated);
    return updated;
  },
  deleteFAQ: (id: string): boolean => {
    const faqs = StorageService.getFAQs();
    const filtered = faqs.filter(f => f.id !== id);
    StorageService.saveFAQs(filtered);
    FirebaseService.deleteFAQ(id);
    return filtered.length !== faqs.length;
  },

  // VIDEOS
  getVideos: (): YouTubeVideo[] => getItem<YouTubeVideo[]>(STORAGE_KEYS.VIDEOS, defaultVideos),
  saveVideos: (videos: YouTubeVideo[]) => setItem(STORAGE_KEYS.VIDEOS, videos || []),
  addVideo: (videoData: Omit<YouTubeVideo, 'id' | 'youtubeId' | 'createdAt'>): YouTubeVideo => {
    const videos = StorageService.getVideos();
    const yId = extractYoutubeId(videoData.youtubeUrl);
    const newVideo: YouTubeVideo = {
      ...videoData,
      id: 'vid_' + Date.now().toString(36),
      youtubeId: yId,
      createdAt: new Date().toISOString(),
    };
    videos.unshift(newVideo);
    StorageService.saveVideos(videos);
    FirebaseService.saveVideo(newVideo.id, newVideo);
    StorageService.logActivity('Added Video', `Added YouTube video "${newVideo.title}"`, 'system');
    return newVideo;
  },
  deleteVideo: (id: string): boolean => {
    const videos = StorageService.getVideos();
    const filtered = videos.filter(v => v.id !== id);
    StorageService.saveVideos(filtered);
    FirebaseService.deleteVideo(id);
    return filtered.length !== videos.length;
  },

  // USERS & AUTH
  getUsers: (): User[] => {
    const users = getItem<User[]>(STORAGE_KEYS.USERS, []);
    return Array.isArray(users) ? users : [];
  },
  saveUsers: (users: User[]) => setItem(STORAGE_KEYS.USERS, users || []),
  getCurrentUser: (): User | null => getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (user: User | null) => setItem(STORAGE_KEYS.CURRENT_USER, user),
  getAdminPin: (): string => getItem<string>(STORAGE_KEYS.ADMIN_PIN, '8888'),
  setAdminPin: (pin: string) => {
    setItem(STORAGE_KEYS.ADMIN_PIN, pin);
    StorageService.logActivity('Updated Admin PIN', 'Admin authorization master PIN changed', 'security');
  },
  getFailedLogins: (): { count: number; lockedUntil: number } => {
    return getItem<{ count: number; lockedUntil: number }>(STORAGE_KEYS.FAILED_LOGINS, { count: 0, lockedUntil: 0 });
  },
  recordFailedLogin: (): { locked: boolean; isLocked: boolean; count: number; remainingSeconds: number } => {
    const current = StorageService.getFailedLogins();
    const count = current.count + 1;
    let lockedUntil = 0;
    if (count >= 5) {
      lockedUntil = Date.now() + 30000;
    }
    setItem(STORAGE_KEYS.FAILED_LOGINS, { count, lockedUntil });
    return { locked: count >= 5, isLocked: count >= 5, count, remainingSeconds: count >= 5 ? 30 : 0 };
  },
  resetFailedLogins: () => {
    setItem(STORAGE_KEYS.FAILED_LOGINS, { count: 0, lockedUntil: 0 });
  },
  isAccountLocked: (): { locked: boolean; remainingSeconds: number } => {
    const record = StorageService.getFailedLogins();
    if (record.lockedUntil > Date.now()) {
      const remainingSeconds = Math.ceil((record.lockedUntil - Date.now()) / 1000);
      return { locked: true, remainingSeconds };
    }
    return { locked: false, remainingSeconds: 0 };
  },

  // SEO SETTINGS
  getSeoSettings: (): SeoSettings => getItem<SeoSettings>(STORAGE_KEYS.SEO_SETTINGS, defaultSeoSettings),
  saveSeoSettings: (seo: SeoSettings) => {
    setItem(STORAGE_KEYS.SEO_SETTINGS, seo);
    StorageService.logActivity('SEO Settings', 'Updated meta tags and SEO configuration', 'system');
  },

  // ACTIVITY LOGS
  getActivityLogs: (): ActivityLog[] => {
    const logs = getItem<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, []);
    return Array.isArray(logs) ? logs : [];
  },
  logActivity: (action: string, details: string, type: ActivityLog['type'] = 'system') => {
    const logs = StorageService.getActivityLogs();
    const newLog: ActivityLog = {
      id: 'log_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
      action,
      details,
      timestamp: new Date().toISOString(),
      type,
    };
    logs.unshift(newLog);
    setItem(STORAGE_KEYS.ACTIVITY_LOGS, logs.slice(0, 100));
  },

  // BACKUP SYSTEM & SNAPSHOTS
  getBackups: (): BackupItem[] => {
    const backups = getItem<BackupItem[]>(STORAGE_KEYS.BACKUPS, []);
    return Array.isArray(backups) ? backups : [];
  },
  createBackup: (label?: string): BackupItem => {
    const backups = StorageService.getBackups();
    const dump = StorageService.exportFullDatabase();
    const jsonStr = JSON.stringify(dump);
    const sizeKb = Math.round((jsonStr.length * 2) / 1024) || 1;

    const newBackup: BackupItem = {
      id: 'bkp_' + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      label: label || `Snapshot ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      sizeKb,
      data: dump,
    };
    backups.unshift(newBackup);
    setItem(STORAGE_KEYS.BACKUPS, backups.slice(0, 10));
    StorageService.logActivity('Created Backup', `Generated system snapshot "${newBackup.label}" (${sizeKb} KB)`, 'system');
    return newBackup;
  },
  restoreBackupItem: (id: string): boolean => {
    const backups = StorageService.getBackups();
    const backup = backups.find(b => b.id === id);
    if (!backup || !backup.data) return false;
    const success = StorageService.importFullDatabase(backup.data);
    if (success) {
      StorageService.logActivity('Restored Backup', `Restored system state from snapshot "${backup.label}"`, 'system');
    }
    return success;
  },
  deleteBackupItem: (id: string): boolean => {
    const backups = StorageService.getBackups();
    const filtered = backups.filter(b => b.id !== id);
    setItem(STORAGE_KEYS.BACKUPS, filtered);
    return filtered.length !== backups.length;
  },

  // FULL DATABASE EXPORT & IMPORT (JSON)
  exportFullDatabase: () => {
    return {
      version: '2026.2',
      exportedAt: new Date().toISOString(),
      products: StorageService.getProducts(),
      categories: StorageService.getCategories(),
      services: StorageService.getServices(),
      projects: StorageService.getProjects(),
      orders: StorageService.getOrders(),
      siteContent: StorageService.getSiteContent(),
      faqs: StorageService.getFAQs(),
      videos: StorageService.getVideos(),
      offers: StorageService.getOffers(),
      testimonials: StorageService.getTestimonials(),
      subscribers: StorageService.getNewsletterSubscribers(),
      seoSettings: StorageService.getSeoSettings(),
      configuratorSettings: StorageService.getConfiguratorSettings(),
    };
  },
  importFullDatabase: (data: any): boolean => {
    if (!data || typeof data !== 'object') return false;
    if (Array.isArray(data.products)) StorageService.saveProducts(data.products);
    if (Array.isArray(data.categories)) StorageService.saveCategories(data.categories);
    if (Array.isArray(data.services)) StorageService.saveServices(data.services);
    if (Array.isArray(data.projects)) StorageService.saveProjects(data.projects);
    if (Array.isArray(data.orders)) StorageService.saveOrders(data.orders);
    if (data.siteContent && typeof data.siteContent === 'object') StorageService.saveSiteContent(data.siteContent);
    if (Array.isArray(data.faqs)) StorageService.saveFAQs(data.faqs);
    if (Array.isArray(data.videos)) StorageService.saveVideos(data.videos);
    if (Array.isArray(data.offers)) StorageService.saveOffers(data.offers);
    if (Array.isArray(data.testimonials)) StorageService.saveTestimonials(data.testimonials);
    if (data.seoSettings && typeof data.seoSettings === 'object') StorageService.saveSeoSettings(data.seoSettings);
    if (data.configuratorSettings && typeof data.configuratorSettings === 'object') StorageService.saveConfiguratorSettings(data.configuratorSettings);
    
    StorageService.logActivity('Imported Database', 'Imported full dataset from external JSON backup', 'system');
    return true;
  },

  resetToSampleData: () => {
    StorageService.seedSampleCatalog();
    StorageService.saveSiteContent(defaultSiteContent);
    StorageService.saveFAQs(defaultFAQs);
    StorageService.saveVideos(defaultVideos);
    StorageService.saveConfiguratorSettings(defaultConfiguratorSettings);
  },

  clearAllData: () => {
    StorageService.saveProducts([]);
    StorageService.saveCategories([]);
    StorageService.saveServices([]);
    StorageService.saveProjects([]);
    StorageService.saveVideos([]);
    StorageService.saveFAQs([]);
    StorageService.saveOrders([]);
    StorageService.saveOffers([]);
  },

  // WISHLIST, CART, COMPARE
  getWishlist: (): string[] => {
    const wishlist = getItem<string[]>(STORAGE_KEYS.WISHLIST, []);
    return Array.isArray(wishlist) ? wishlist : [];
  },
  saveWishlist: (ids: string[]) => setItem(STORAGE_KEYS.WISHLIST, ids || []),
  getCart: (): { productId: string; quantity: number }[] => {
    const cart = getItem<{ productId: string; quantity: number }[]>(STORAGE_KEYS.CART, []);
    return Array.isArray(cart) ? cart : [];
  },
  saveCart: (cart: { productId: string; quantity: number }[]) => setItem(STORAGE_KEYS.CART, cart || []),
  getCompare: (): string[] => {
    const compare = getItem<string[]>(STORAGE_KEYS.COMPARE, []);
    return Array.isArray(compare) ? compare : [];
  },
  saveCompare: (ids: string[]) => setItem(STORAGE_KEYS.COMPARE, ids || []),

  updateSiteContent: (content: Partial<SiteContent>): SiteContent => {
    const current = StorageService.getSiteContent();
    const updated = { ...current, ...content };
    StorageService.saveSiteContent(updated);
    return updated;
  },

  toggleArchiveOrder: (id: string): OrderEnquiry | null => {
    const orders = StorageService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    orders[index].isArchived = !orders[index].isArchived;
    orders[index].updatedAt = new Date().toISOString();
    StorageService.saveOrders(orders);
    return orders[index];
  },

  bulkDeleteProducts: (ids: string[]): boolean => {
    const products = StorageService.getProducts();
    const filtered = products.filter(p => !ids.includes(p.id));
    StorageService.saveProducts(filtered);
    StorageService.logActivity('Bulk Deleted Products', `Removed ${ids.length} products`, 'product');
    return filtered.length !== products.length;
  },

  toggleFeatureProject: (id: string): ProjectApplication | null => {
    const projects = StorageService.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    projects[index].isFeatured = !projects[index].isFeatured;
    StorageService.saveProjects(projects);
    return projects[index];
  },

  updateVideo: (id: string, videoData: Partial<YouTubeVideo>): YouTubeVideo | null => {
    const videos = StorageService.getVideos();
    const index = videos.findIndex(v => v.id === id);
    if (index === -1) return null;
    const yId = videoData.youtubeUrl ? extractYoutubeId(videoData.youtubeUrl) : videos[index].youtubeId;
    const updated = { 
      ...videos[index], 
      ...videoData, 
      youtubeId: yId,
    };
    videos[index] = updated;
    StorageService.saveVideos(videos);
    FirebaseService.saveVideo(id, updated);
    return updated;
  },

  loginUser: (email: string, pass: string): { success: boolean; user?: User; message: string } => {
    const users = StorageService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }
    if (user.passwordHash !== pass) {
      return { success: false, message: 'Invalid email or password.' };
    }
    StorageService.setCurrentUser(user);
    return { success: true, user, message: 'Login successful.' };
  },

  registerUser: (userData: { name: string; email: string; phone: string; password: string }): { success: boolean; user?: User; message: string } => {
    const users = StorageService.getUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser: User = {
      id: 'usr_' + Date.now().toString(36),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      passwordHash: userData.password,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    StorageService.saveUsers(users);
    StorageService.setCurrentUser(newUser);
    return { success: true, user: newUser, message: 'Registration successful.' };
  },

  logoutUser: () => {
    StorageService.setCurrentUser(null);
  },

  addOrderEnquiry: (enquiryData: any): OrderEnquiry => {
    return StorageService.createOrderEnquiry(enquiryData);
  },

  // SEED CATALOG HELPER
  seedSampleCatalog: () => {
    // Disabled to prevent overwriting Firestore with initialProducts or using local cache as source of truth.
  }
};

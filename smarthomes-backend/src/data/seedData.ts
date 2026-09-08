import { Product, Category, Offer, FAQ, Video, HomepageConfig, SystemSettings, SEOConfig } from '../types/index.js';

export const initialCategories: Category[] = [
  {
    id: 'cat-switches',
    name: 'Architectural Switches & Keypads',
    slug: 'architectural-switches',
    description: 'Bespoke mechanical keypads, tactile glass switches, and custom back-lit architectural controllers.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    sortOrder: 1,
    displayOrder: 1,
    active: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-lighting',
    name: 'Circadian Smart Lighting',
    slug: 'circadian-lighting',
    description: 'Tuneable white track spots, hidden cove lighting, and human-centric circadian illumination systems.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    sortOrder: 2,
    displayOrder: 2,
    active: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-audio',
    name: 'High-Fidelity Multi-Room Audio',
    slug: 'multi-room-audio',
    description: 'Architectural in-wall invisible speakers, synchronized zone amplifiers, and bespoke cinema sound stages.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    sortOrder: 3,
    displayOrder: 3,
    active: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-shading',
    name: 'Motorized Architectural Shading',
    slug: 'motorized-shading',
    description: 'Ultra-silent motorized roller shades, Roman drapes, and skylight solar control fabrics.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sortOrder: 4,
    displayOrder: 4,
    active: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-security',
    name: 'Biometric Access & Smart Security',
    slug: 'security-access',
    description: 'Facial recognition entrance locks, perimeter mmWave radar sensors, and secure zero-trust cameras.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    sortOrder: 5,
    displayOrder: 5,
    active: true,
    featured: false,
    createdAt: new Date().toISOString()
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-lutron-palladiom',
    name: 'Lutron Palladiom Architectural Keypad',
    slug: 'lutron-palladiom-keypad',
    sku: 'LUT-PAL-4B-AL',
    brand: 'Lutron',
    categoryId: 'cat-switches',
    categoryName: 'Architectural Switches & Keypads',
    shortDescription: 'Minimalist metallic keypad with tactile backlit buttons and dynamic status engraving.',
    description: 'The Lutron Palladiom keypad features aesthetic precision with flush architectural mounting, customizable ambient backlighting, and integration into Lutron HomeWorks and QSX processors.',
    price: 38500,
    originalPrice: 42000,
    salePrice: 38500,
    stock: 24,
    status: 'Active',
    featured: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { id: 'var-1', name: 'Brushed Brass 4-Button', sku: 'LUT-PAL-4B-BB', price: 41000, originalPrice: 45000, stock: 12, smart: true, finish: 'Brushed Brass' },
      { id: 'var-2', name: 'Matte Satin Nickel 4-Button', sku: 'LUT-PAL-4B-SN', price: 38500, originalPrice: 42000, stock: 12, smart: true, finish: 'Satin Nickel' }
    ],
    specifications: [
      { key: 'Protocol', value: 'Clear Connect Type X / Wired QS' },
      { key: 'Voltage', value: '24-36V DC' },
      { key: 'Material', value: 'Architectural Grade Solid Milled Brass' },
      { key: 'Mounting', value: 'Standard 1-gang UK/EU or US Backbox' }
    ],
    specificationsMap: {
      'Protocol': 'Clear Connect Type X / Wired QS',
      'Voltage': '24-36V DC',
      'Material': 'Architectural Grade Solid Milled Brass'
    },
    features: ['Backlit Engraved Buttons', 'Dynamic Ambient Light Sensing', 'Silent Tactile Travel'],
    compatibility: ['Apple Home', 'Crestron Home', 'Control4', 'Home Assistant'],
    protocol: 'Clear Connect',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-bang-beosound',
    name: 'Bang & Olufsen Beosound Stage Soundbar',
    slug: 'beosound-stage-soundbar',
    sku: 'BO-STG-OAK-01',
    brand: 'Bang & Olufsen',
    categoryId: 'cat-audio',
    categoryName: 'High-Fidelity Multi-Room Audio',
    shortDescription: 'Crafted natural smoked oak speaker system with Dolby Atmos 3-channel spatial performance.',
    description: 'Experience room-filling acoustic brilliance with 11 custom driver amplifiers, HDMI eARC connectivity, AirPlay 2, and Chromecast built-in.',
    price: 185000,
    originalPrice: 199000,
    salePrice: 185000,
    stock: 8,
    status: 'Active',
    featured: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { id: 'var-bo-1', name: 'Smoked Oak & Grey Fabric', sku: 'BO-STG-OAK', price: 185000, stock: 5, smart: true },
      { id: 'var-bo-2', name: 'Natural Aluminium & Black Fabric', sku: 'BO-STG-ALU', price: 165000, stock: 3, smart: true }
    ],
    specifications: [
      { key: 'Amplifiers', value: '4 x 50W Class D for Woofers, 4 x 50W for Mid-range, 3 x 50W for Tweeters' },
      { key: 'Wireless', value: 'Wi-Fi 802.11ac, Bluetooth 5.1, AirPlay 2, Beolink Multiroom' },
      { key: 'Dimensions', value: '110.4 x 17 x 7.7 cm' }
    ],
    features: ['Dolby Atmos Acoustic Staging', 'HDMI eARC & 4K Passthrough', 'Multi-room Wireless Sync'],
    compatibility: ['AirPlay 2', 'Spotify Connect', 'Chromecast', 'Matter'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-somfy-glydea',
    name: 'Somfy Glydea Ultra Smart Motorized Drapery',
    slug: 'somfy-glydea-ultra-motor',
    sku: 'SMF-GLYD-60E',
    brand: 'Somfy',
    categoryId: 'cat-shading',
    categoryName: 'Motorized Architectural Shading',
    shortDescription: 'Acoustically isolated motorized curtain track capable of effortlessly pulling up to 60kg fabric.',
    description: 'Featuring Somfy silent motor technology (<38 dBA) with soft start/stop, manual touch motion override, and native Zigbee 3.0 / RTS control integration.',
    price: 49500,
    originalPrice: 55000,
    salePrice: 49500,
    stock: 18,
    status: 'Active',
    featured: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { id: 'var-smf-1', name: '4-Meter Straight Track Kit', sku: 'SMF-GLYD-4M', price: 49500, stock: 10, smart: true },
      { id: 'var-smf-2', name: '6-Meter Straight Track Kit', sku: 'SMF-GLYD-6M', price: 62000, stock: 8, smart: true }
    ],
    specifications: [
      { key: 'Load Capacity', value: '60 kg' },
      { key: 'Noise Level', value: '< 38 dBA (Whisper Quiet)' },
      { key: 'Control Protocols', value: 'Zigbee 3.0 & RTS 433 MHz' }
    ],
    features: ['Soft Start and Soft Stop', 'Touch Motion Manual Override', 'Adjustable Speed Curves'],
    compatibility: ['Crestron', 'Lutron', 'KNX', 'Zigbee 3.0'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-crestron-horizon',
    name: 'Crestron Horizon Architectural Keypad',
    slug: 'crestron-horizon-keypad',
    sku: 'CRE-HZ-KP-BK',
    brand: 'Crestron',
    categoryId: 'cat-switches',
    categoryName: 'Architectural Switches & Keypads',
    shortDescription: 'Luxury custom-engraved designer keypad with multi-color programmable LED lightbars.',
    description: 'The Horizon keypad collection offers peak residential control luxury. Custom engraved button combinations with top-and-bottom controllable RGB accent trims.',
    price: 44000,
    originalPrice: 48000,
    salePrice: 44000,
    stock: 15,
    status: 'Active',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { id: 'var-cre-1', name: 'Matte Anthracite Black', sku: 'CRE-HZ-BLK', price: 44000, stock: 10, smart: true },
      { id: 'var-cre-2', name: 'Polar White Finish', sku: 'CRE-HZ-WHT', price: 44000, stock: 5, smart: true }
    ],
    specifications: [
      { key: 'Protocol', value: 'CrescoNet Wired / Horizon Wireless' },
      { key: 'Backlight', value: 'Full RGB Spectrum per Button' }
    ],
    features: ['Custom Icon Engraving', 'RGB Edge Lighting', 'Proximity Sensor Wake-up'],
    compatibility: ['Crestron Home', 'Crestron SIMPL Windows'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialOffers: Offer[] = [
  {
    id: 'off-architectural-2026',
    title: 'Architectural Villa Automation Suite',
    code: 'AETHERIA10',
    description: '10% exclusive project reduction on entire whole-home Lutron & Bang & Olufsen ecosystem orchestrations.',
    discountType: 'Percentage',
    discountValue: 10,
    discountPercentage: 10,
    active: true,
    isActive: true,
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    createdAt: new Date().toISOString()
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How does Aetheria integrate with existing home electrical wiring?',
    answer: 'Our solutions offer both non-invasive wireless retrofit retrofits (via Zigbee 3.0 & Thread) and high-end wired bus architectures (KNX & Lutron HomeWorks) that require zero wall tearing for modern villas.',
    category: 'general',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'faq-2',
    question: 'Can I control the smart home systems from my iPhone and Android phones simultaneously?',
    answer: 'Yes! Both Apple HomeKit, Google Home, and our dedicated Aetheria mobile app provide real-time multi-user synchronization across all iOS and Android devices.',
    category: 'switches',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialVideos: Video[] = [
  {
    id: 'vid-1',
    title: 'Luxury Villa Smart Lighting & Circadian Walkthrough',
    description: 'A deep look into human-centric tuneable architectural spotlighting and motorized sheer drape integration.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'Showcases',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialHomepageConfig: HomepageConfig = {
  heroTitle: 'Absolute Intelligent Architecture',
  heroSubtitle: 'Luxury Smart Home Automation Systems, Architectural Switches, and Acoustic Orchestrations.',
  heroDescription: 'Transforming luxury residences with state-of-the-art Lutron lighting, Crestron automation, and Bang & Olufsen acoustic staging.',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  heroButtonText: 'Explore Collection',
  heroButtonDestination: 'shop',
  promotionalText: 'Engineered for seamless elegance. Visit our private architectural experience center.',
  bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  bannerLink: 'configurator'
};

export const initialSystemSettings: SystemSettings = {
  businessName: 'Aetheria Smart Home Systems',
  businessEmail: 'concierge@aetheriasmarthome.com',
  phone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  address: 'Plot 42, Jubilee Hills, Luxury Design Corridor, Hyderabad, India',
  currency: 'INR (₹)',
  taxRate: 18,
  shippingFeeBase: 0,
  lowStockThreshold: 5,
  socialFacebook: 'https://facebook.com',
  socialInstagram: 'https://instagram.com',
  socialYoutube: 'https://youtube.com'
};

export const initialSEOConfigs: SEOConfig[] = [
  {
    page: 'Home',
    title: 'Aetheria Smart Home | Absolute Intelligent Architecture',
    metaDescription: 'Discover bespoke residential automation, tuneable circadian lighting, and multi-room acoustic systems.',
    keywords: 'smart home, luxury home automation, lutron, crestron, bang olufsen, hyderabad'
  }
];

import { Product, Category, FAQ, Video, Offer, SEOConfig, AdminUser, HomepageConfig, SystemSettings, Order, Customer } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'smart-switches',
    name: 'Smart Touch Switch Boards',
    slug: 'smart-touch-switch-boards',
    description: 'Glossy premium capacitive touch switches and luxurious smart display switchboards with Wi-Fi connectivity.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 1,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'lighting-solutions',
    name: 'Lighting Solutions',
    slug: 'lighting-solutions',
    description: 'Smart LED lighting, designer profile lights, magnetic track lighting, and dimming control setups.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=400&q=80',
    displayOrder: 2,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'security-systems',
    name: 'Security Systems',
    slug: 'security-systems',
    description: 'High-end smart locks, video doorbells, IP door phones, and advanced motion sensors.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 3,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'gate-automation',
    name: 'Entrance & Gate Automation',
    slug: 'gate-automation',
    description: 'Motorized automatic sliding gate motors, swing operators, and smart entrance systems.',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80',
    displayOrder: 4,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'climate-control',
    name: 'Climate & Curtains',
    slug: 'climate-curtains',
    description: 'Smart thermostats and remote-controlled smart curtain tracks for comprehensive environmental control.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    displayOrder: 5,
    active: true,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'retro-fit-devices',
    name: 'Smart Retro-Fit Devices',
    slug: 'smart-retro-fit-devices',
    description: 'Miniature Zigbee automation nodes designed to fit neatly behind standard non-smart switchboards.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 6,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'gateways',
    name: 'Zigbee Gateways',
    slug: 'zigbee-gateways',
    description: 'Pro and Matter-compatible smart hub controllers that unify lights, switches, locks, and sensors.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 7,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'scene-controllers',
    name: 'Scene Controllers',
    slug: 'scene-controllers',
    description: 'Wireless smart rotary knobs and multi-button remote scene activators with battery options.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 8,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'luxury-touch-panels',
    name: 'Luxury Touch Panels',
    slug: 'luxury-touch-panels',
    description: 'High-definition 3.5", 4", and 5" glass touch screen panel boards with inbuilt Alexa & Zigbee.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    displayOrder: 9,
    active: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialProducts: Product[] = [
  {
    id: 'firebase-connection-test',
    name: 'Firebase Connection Test',
    slug: 'firebase-connection-test',
    sku: 'TEST-001',
    brand: 'SmartHomes',
    categoryId: 'smart-switches',
    shortDescription: 'Test product for Firebase synchronization',
    description: 'Test product for Firebase synchronization',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
    ],
    price: 18000,
    originalPrice: 20000,
    discountPercentage: 10,
    stock: 10,
    status: 'Active',
    featured: true,
    cataloguePage: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: ['Firebase Connection Verification'],
    specifications: {
      'Purpose': 'Test Sync'
    },
    variants: []
  },
  {
    id: 'titan-smart-switch',
    name: 'Titan Smart Touch Switch Board',
    slug: 'titan-smart-touch-switch-board',
    sku: 'KSH-SW-TITAN',
    brand: 'K Smart Homes',
    categoryId: 'smart-switches',
    shortDescription: '12-Modular premium capacitive touch board with Wi-Fi control, dimmers, and app scheduling.',
    description: 'The Titan Smart Touch Switch Board represents the ultimate in modern home electrical control. Equipped with a luxurious glass surface and ultra-responsive capacitive touch sensors, it lets you control lights, fans, and high-power appliances locally or via voice control and smartphone apps.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    price: 18000,
    originalPrice: 20000,
    discountPercentage: 10,
    stock: 15,
    status: 'Active',
    featured: true,
    cataloguePage: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Capacitive glass touch controls',
      'Wi-Fi and Zigbee compatible',
      'Integration with Google Assistant & Alexa',
      '10A load per switch, 16A for power socket'
    ],
    specifications: {
      'Modular Size': '12 Modular',
      'Control Layout': '6 Switches, 2 Sockets, 1 Fan Regulator',
      'Rated Current': '16A Power / 10A Standard',
      'Operating Voltage': '110V - 240V AC',
      'Connectivity': 'Wi-Fi 2.4GHz / Zigbee'
    },
    compatibility: ['Google Home', 'Amazon Alexa', 'SmartLife App'],
    applications: ['Living Rooms', 'Master Bedrooms', 'Conference Rooms'],
    warranty: '2 Years Comprehensive',
    tags: ['smart switch', 'capacitive touch', 'luxury board', 'wifi switch'],
    variants: [
      {
        id: 'titan-alum-12',
        name: '4S + 1SK - Premium Aluminium Finish',
        sku: 'KSH-SW-TITAN-AL-12',
        price: 19999,
        originalPrice: 22000,
        stock: 8,
        material: 'Aluminium Alloy',
        colour: 'Brushed Silver',
        finish: 'Metallic Matte',
        smart: true,
        specifications: {
          'Gang': '4-Switch + 1-Socket',
          'Chassis': 'Premium Space Aluminium'
        }
      },
      {
        id: 'titan-poly-12',
        name: '4S + 1SK - Polycarbonate Elite Finish',
        sku: 'KSH-SW-TITAN-PC-12',
        price: 15799,
        originalPrice: 17500,
        stock: 12,
        material: 'Polycarbonate',
        colour: 'Glossy White',
        finish: 'Tempered Gloss',
        smart: true,
        specifications: {
          'Gang': '4-Switch + 1-Socket',
          'Chassis': 'Shatterproof Polycarbonate'
        }
      }
    ]
  },
  {
    id: 'yale-digital-lock',
    name: 'Yale Digital Smart Lock Pro',
    slug: 'yale-digital-smart-lock-pro',
    sku: 'KSH-SEC-YALE-PRO',
    brand: 'Yale (K-Integrate)',
    categoryId: 'security-systems',
    shortDescription: 'State-of-the-art biological fingerprint & PIN lock with dual-bolt mechanical security.',
    description: 'Ensure absolute peace of mind for your villa or apartment with the Yale Digital Smart Lock Pro. Featuring swift fingerprint recognition, PIN code access, RFID card entry, and emergency physical keys, this smart lock integrates seamlessly with your automated home setup.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
    ],
    price: 44999,
    originalPrice: 49999,
    discountPercentage: 10,
    stock: 5,
    status: 'Active',
    featured: true,
    cataloguePage: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      '3D capacitive fingerprint sensor',
      'Dual mechanism physical key bypass',
      'Automatic locking on shut',
      'Real-time access logs and intrusion alarms'
    ],
    specifications: {
      'Access Modes': 'Fingerprint, PIN, Card, Bluetooth, Physical Key',
      'User Capacity': '100 Fingerprints, 30 PIN Codes',
      'Power Source': '4x AA Alkaline Batteries',
      'Emergency Power': 'USB-C Backup Port',
      'Body Material': 'Zinc Die-Cast Alloy'
    },
    compatibility: ['Yale Access App', 'Google Assistant', 'Apple HomeKit'],
    applications: ['Main Doors', 'Office Entrance Doors', 'Private Suites'],
    warranty: '3 Years Warranty',
    tags: ['smart lock', 'yale', 'biometric security', 'fingerprint lock'],
    variants: [
      {
        id: 'yale-lock-copper',
        name: 'Antique Copper Finish',
        sku: 'KSH-SEC-YALE-COP',
        price: 46999,
        originalPrice: 52000,
        stock: 3,
        colour: 'Antique Copper',
        finish: 'Brushed Patina',
        smart: true
      },
      {
        id: 'yale-lock-black',
        name: 'Matte Obsidian Black',
        sku: 'KSH-SEC-YALE-BLK',
        price: 44999,
        originalPrice: 49999,
        stock: 5,
        colour: 'Obsidian Black',
        finish: 'Satin Powder Coat',
        smart: true
      }
    ]
  },
  {
    id: 'led-profile-light',
    name: 'Aluminium LED Profile Light',
    slug: 'aluminium-led-profile-light',
    sku: 'KSH-LT-PROF-AL',
    brand: 'K Smart Homes',
    categoryId: 'lighting-solutions',
    shortDescription: 'Flexible customizable LED profile channel light with custom opal diffuser (Price per meter).',
    description: 'Craft beautiful structural accent lines inside ceilings, cupboards, and walls. Our high-grade architectural aluminium profiles deliver a continuous, hot-spot-free light line when paired with high-density LED strips and custom opal PMMA diffusers.',
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80'
    ],
    price: 550,
    originalPrice: 650,
    discountPercentage: 15.38,
    stock: 250,
    status: 'Active',
    featured: false,
    cataloguePage: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Seamless dot-free illumination with opal diffusers',
      'High heat-dissipation grade aluminium',
      'Dimmable & CCT tuneable options',
      'Cuttable to any specified length'
    ],
    specifications: {
      'Profile Width': '16mm',
      'Profile Depth': '12mm',
      'Material': '6063-T5 Architectural Aluminium',
      'Diffuser Type': 'Opal Polycarbonate PMMA',
      'Mounting': 'Recessed or Surface Mount'
    },
    warranty: '1 Year',
    tags: ['led profile', 'accent lighting', 'linear diffuser', 'ceiling lighting'],
    variants: [
      {
        id: 'prof-warm-white',
        name: 'Warm White (3000K) - Recessed 1M',
        sku: 'KSH-LT-PROF-WW',
        price: 550,
        originalPrice: 650,
        stock: 120,
        colour: 'Warm White',
        wattage: '15W/M',
        smart: false
      },
      {
        id: 'prof-cct-tuneable',
        name: 'Tuneable CCT (3000K-6000K) - Recessed 1M',
        sku: 'KSH-LT-PROF-CCT',
        price: 850,
        originalPrice: 1000,
        stock: 80,
        colour: 'Tuneable White',
        wattage: '18W/M',
        smart: true
      }
    ]
  },
  {
    id: 'smart-curtain-track',
    name: 'Smart Remote Curtain Track',
    slug: 'smart-remote-curtain-track',
    sku: 'KSH-CL-CURT-M',
    brand: 'K Smart Homes',
    categoryId: 'climate-control',
    shortDescription: 'Heavy-duty silent motorized curtain track with smartphone app schedules & touch start.',
    description: 'Upgrade your drapes with the ultimate luxury. The Smart Remote Curtain Track is a robust, motorized rail that glides silently. Features gentle manual-pull activation, scheduled timer controls, obstacle detection safety, and deep integration with smart home automation.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
    ],
    price: 18999,
    originalPrice: 21999,
    discountPercentage: 13.64,
    stock: 8,
    status: 'Active',
    featured: true,
    cataloguePage: 34,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Ultra-silent 1.2Nm motor (less than 30dB)',
      'Touch-motion start: pull gently to trigger automatic opening',
      'Manual operation during power cuts',
      'App and RF wireless remote controls'
    ],
    specifications: {
      'Track Length': 'Up to 5 Meters customizable',
      'Load Capacity': 'Up to 50 kg curtain weight',
      'Motor Power': '40W',
      'Speed': '14cm / second',
      'Voltage': '100-240V AC'
    },
    compatibility: ['Tuya / SmartLife App', 'Siri Shortcuts', 'Google Assistant'],
    warranty: '5 Years Motor Warranty',
    tags: ['motorized curtain', 'smart drape', 'silent motor', 'home climate'],
    variants: [
      {
        id: 'curt-3m',
        name: 'Motorized Track System (3 Meters)',
        sku: 'KSH-CL-CURT-3M',
        price: 16999,
        originalPrice: 19999,
        stock: 5,
        length: '3 Meters',
        smart: true
      },
      {
        id: 'curt-5m',
        name: 'Motorized Track System (5 Meters)',
        sku: 'KSH-CL-CURT-5M',
        price: 18999,
        originalPrice: 21999,
        stock: 3,
        length: '5 Meters',
        smart: true
      }
    ]
  },
  {
    id: 'sliding-gate-motor',
    name: 'Automatic Sliding Gate Operator',
    slug: 'automatic-sliding-gate-operator',
    sku: 'KSH-GATE-SLIDE-1000',
    brand: 'K Smart Homes',
    categoryId: 'gate-automation',
    shortDescription: 'Heavy-duty industrial grade automatic motor for gates up to 1000 kg with remote fob.',
    description: 'Ensure smooth, secure access to your home or estate. This automatic gate motor handles sliding gates weighing up to 1000 kg with total safety. Equipped with anti-crush safety sensors, auto-close timers, and instant mechanical key release.',
    images: [
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=600&q=80'
    ],
    price: 75000,
    originalPrice: 85000,
    discountPercentage: 11.76,
    stock: 4,
    status: 'Active',
    featured: false,
    cataloguePage: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Thermally protected heavy oil bath motor',
      'Pedestrian width open mode',
      'Dual safety photoelectric safety beams',
      'Remote range up to 50 meters'
    ],
    specifications: {
      'Gate Weight Capacity': '1000 kg Max',
      'Motor Speed': '12 meters / minute',
      'Limit Switch Type': 'Magnetic Spring Switch',
      'Operational Temp': '-20°C to +55°C',
      'Emergency Key': 'Yes, 2 Mechanical Override Keys'
    },
    warranty: '3 Years Warranty',
    tags: ['gate automation', 'sliding gate motor', 'heavy gate', 'perimeter safety'],
    variants: [
      {
        id: 'gate-slide-800',
        name: '800kg Gate Rating - Residential',
        sku: 'KSH-GATE-SLIDE-800',
        price: 65000,
        originalPrice: 72000,
        stock: 3,
        capacity: '800 kg',
        smart: true
      },
      {
        id: 'gate-slide-1200',
        name: '1200kg Gate Rating - High Traffic',
        sku: 'KSH-GATE-SLIDE-1200',
        price: 75000,
        originalPrice: 85000,
        stock: 1,
        capacity: '1200 kg',
        smart: true
      }
    ]
  },
  {
    id: 'pir-motion-sensor',
    name: 'Wireless PIR Motion Sensor',
    slug: 'wireless-pir-motion-sensor',
    sku: 'KSH-SEC-PIR',
    brand: 'K Smart Homes',
    categoryId: 'security-systems',
    shortDescription: 'High precision passive infrared motion sensor for safety alerts and light automation.',
    description: 'Automate your lighting or trigger intrusion alerts using our high-precision PIR Sensor. Featuring dual-sensor elements for extreme accuracy, pet immunity up to 20kg, and low power sleep cycles, it connects reliably to any Zigbee hub.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
    ],
    price: 950,
    originalPrice: 1250,
    discountPercentage: 24,
    stock: 0,
    status: 'Out of Stock',
    featured: false,
    cataloguePage: 29,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      '120 degree wide angle sensing range',
      'Pet-immunity up to 20kg prevents false alerts',
      'Adhesive magnetic base for swift rotation',
      'Integrates directly with lights for motion-trigger lighting'
    ],
    specifications: {
      'Detection Distance': '8-10 Meters',
      'Detection Angle': '120° Horizontal, 60° Vertical',
      'Protocol': 'Zigbee 3.0',
      'Battery Type': 'CR123A Lithium (lasts 2 Years)'
    },
    warranty: '1 Year Warranty',
    tags: ['motion sensor', 'pir sensor', 'home automation', 'pet immune'],
    variants: []
  },
  {
    id: 'touch-smart-switch',
    name: 'Glass Touch Smart Switch Series',
    slug: 'glass-touch-smart-switch-series',
    sku: 'KSH-SW-TOUCH',
    brand: 'K Smart Homes',
    categoryId: 'smart-switches',
    shortDescription: 'Luxurious 2.5D tempered glass panels with backlight and CNC curved metal bezel.',
    description: 'Elevate your walls with premium Touch Smart Switch boards. Designed with premium 2.5D curved front glass, subtle ambient backlight indicator, and high-quality CNC metal bezel, these switches offer tactile elegance combined with Wi-Fi & Zigbee intelligence.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 9199,
    originalPrice: 11000,
    discountPercentage: 16.3,
    stock: 25,
    status: 'Active',
    featured: true,
    cataloguePage: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      '2.5D Curved Front Plate (Tempered Glass)',
      'CNC Curved Metal Bezel accent line',
      'In-built Ambient Light Sensor for automatic backlight dimming',
      'Curtain, Fan Speed, and Scene activation support'
    ],
    specifications: {
      'Front Plate Material': '2.5D Curved Tempered Glass',
      'Bezel Options': 'Anodized Black, Silver, Brushed Gold',
      'Gang Box Compatibility': '2M / 4M / 6M / 8M / 12M Standard Boxes',
      'Wireless Connectivity': 'Zigbee 3.0 & WiFi Dual-Protocol'
    },
    warranty: '2 Years Comprehensive',
    variants: [
      {
        id: 'touch-4s-2m',
        name: '4S (4 Switches) - 2M',
        sku: 'KSH-SW-TOUCH-4S-2M',
        price: 9199,
        originalPrice: 11000,
        stock: 15,
        smart: true,
        specifications: { 'Size': '2 Modular', 'Layout': '4 Switches' }
      },
      {
        id: 'touch-2s1c-2m',
        name: '2S + 1C (2 Switches + 1 Curtain) - 2M',
        sku: 'KSH-SW-TOUCH-2S1C-2M',
        price: 9199,
        originalPrice: 11000,
        stock: 10,
        smart: true,
        specifications: { 'Size': '2 Modular', 'Layout': '2 Switches + 1 Curtain Control' }
      },
      {
        id: 'touch-2s1f-2m',
        name: '2S + 1F (2 Switches + 1 Fan Speed Control) - 2M',
        sku: 'KSH-SW-TOUCH-2S1F-2M',
        price: 9599,
        originalPrice: 11500,
        stock: 12,
        smart: true,
        specifications: { 'Size': '2 Modular', 'Layout': '2 Switches + 1 Stepless Fan' }
      },
      {
        id: 'touch-8s-4m',
        name: '8S (8 Switches) - 4M',
        sku: 'KSH-SW-TOUCH-8S-4M',
        price: 11999,
        originalPrice: 14000,
        stock: 8,
        smart: true,
        specifications: { 'Size': '4 Modular', 'Layout': '8 Smart Switches' }
      },
      {
        id: 'touch-4s1sk-4m',
        name: '4S + 1SK (4 Switches + 1 Socket) - 4M',
        sku: 'KSH-SW-TOUCH-4S1SK-4M',
        price: 11699,
        originalPrice: 13500,
        stock: 14,
        smart: true,
        specifications: { 'Size': '4 Modular', 'Layout': '4 Switches + 5-Pin Socket' }
      },
      {
        id: 'touch-10s-6m8m',
        name: '10S (10 Switches) - 6M/8M',
        sku: 'KSH-SW-TOUCH-10S-6M8M',
        price: 15999,
        originalPrice: 19000,
        stock: 5,
        smart: true,
        specifications: { 'Size': '6M or 8M Modular', 'Layout': '10 Smart Switches' }
      },
      {
        id: 'touch-4i8s-6m',
        name: '4I + 8S (4 Inch HD Touch Screen + 8 Switches) - 6M',
        sku: 'KSH-SW-TOUCH-4I8S-6M',
        price: 53999,
        originalPrice: 59999,
        stock: 3,
        smart: true,
        specifications: { 'Size': '6 Modular', 'Display': '4" Capacitive IPS LCD' }
      }
    ]
  },
  {
    id: 'retro-fit-device',
    name: 'Smart Retro-Fit Automation Nodes',
    slug: 'smart-retro-fit-automation-nodes',
    sku: 'KSH-NOD-RETRO',
    brand: 'K Smart Homes',
    categoryId: 'retro-fit-devices',
    shortDescription: 'In-wall hidden automation nodes that convert standard switch boards into smart ones.',
    description: 'Preserve your existing designer premium switchboards with K Smart Retro-Fit micro-controllers. Neatly hidden behind standard gang boxes, these heavy-duty relays enable instant voice and app control while keeping your tactile switches fully operational.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 4399,
    originalPrice: 4999,
    discountPercentage: 12,
    stock: 120,
    status: 'Active',
    featured: false,
    cataloguePage: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Micro form-factor fits inside standard modular metal boxes',
      'Dual Protocol support: Zigbee 3.0 Mesh technology',
      'Retains traditional physical switch actions seamlessly',
      'In-app timer scheduling, scene associations, and countdowns'
    ],
    specifications: {
      'Input Voltage': '100V - 240V AC (50/60Hz)',
      'Wireless Range': '30m indoor, 100m open air (mesh network)',
      'Security Standards': 'WPA/WPA2 Personal & AES-128 Encryption',
      'Certification': 'RoHS, CE, BEE Compliance'
    },
    warranty: '2 Years Comprehensive',
    variants: [
      {
        id: 'retro-1ch',
        name: '1 Channel Retro-Fit (40A Heavy Load)',
        sku: 'KSH-NOD-RETRO-1CH',
        price: 4399,
        originalPrice: 4999,
        stock: 45,
        smart: true,
        specifications: { 'Max Load': '4500W', 'Amperage': '40A', 'Type': 'Heavy appliance (AC/Geyser)' }
      },
      {
        id: 'retro-2ch',
        name: '2 Channel Retro-Fit (16A / Channel)',
        sku: 'KSH-NOD-RETRO-2CH',
        price: 4399,
        originalPrice: 4999,
        stock: 50,
        smart: true,
        specifications: { 'Max Load': '1000W Each', 'Amperage': '16A', 'Channels': '2 Channels' }
      },
      {
        id: 'retro-3ch',
        name: '3 Channel Retro-Fit (16A / Channel)',
        sku: 'KSH-NOD-RETRO-3CH',
        price: 4399,
        originalPrice: 4999,
        stock: 35,
        smart: true,
        specifications: { 'Max Load': '500W Each', 'Amperage': '16A', 'Channels': '3 Channels' }
      },
      {
        id: 'retro-4ch',
        name: '4 Channel Retro-Fit (16A / Channel)',
        sku: 'KSH-NOD-RETRO-4CH',
        price: 4399,
        originalPrice: 4999,
        stock: 40,
        smart: true,
        specifications: { 'Max Load': '500W Each', 'Amperage': '16A', 'Channels': '4 Channels' }
      },
      {
        id: 'retro-2curt',
        name: '2 Channel Curtain Retro-Fit (3A Motor Relay)',
        sku: 'KSH-NOD-RETRO-2CURT',
        price: 4399,
        originalPrice: 4999,
        stock: 20,
        smart: true,
        specifications: { 'Current Rating': '3A', 'Type': 'Curtain open/close calibration' }
      }
    ]
  },
  {
    id: 'zigbee-gateway',
    name: 'Zigbee Gateways & Controllers',
    slug: 'zigbee-gateways-and-controllers',
    sku: 'KSH-GW-ZIGBEE',
    brand: 'K Smart Homes',
    categoryId: 'gateways',
    shortDescription: 'Central smart hubs unifying local mesh control without an active internet connection.',
    description: 'Form the core backbone of your automation systems. The K Smart Gateways enable seamless connection, reliable mesh networking, and quick local response triggers for up to 200+ connected smart devices including lights, switches, and locks.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 6900,
    originalPrice: 7500,
    discountPercentage: 8,
    stock: 40,
    status: 'Active',
    featured: true,
    cataloguePage: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Allows offline local automation scenes & schedules',
      'Dual WiFi + Bluetooth + Thread/Matter capability on pro models',
      'Power Over Ethernet (PoE) support on Max editions',
      'Takes only 1 single IP address on your home WiFi'
    ],
    specifications: {
      'Protocol Stack': 'Zigbee 3.0 Mesh, BLE 5.0, Matter-Thread',
      'Operating System': 'Real-Time Embedded Linux OS',
      'Security': 'Hardware Secure Element with AES encryption',
      'Power Input': 'Micro-USB 5V/1A or RJ45 PoE'
    },
    warranty: '2 Years Comprehensive',
    variants: [
      {
        id: 'gw-wireless',
        name: 'Wireless Zigbee Adopter Gateway (Up to 50 Devices)',
        sku: 'KSH-GW-ADOPT',
        price: 6900,
        originalPrice: 7500,
        stock: 15,
        smart: true,
        specifications: { 'Capacity': '50 Devices Max', 'Range': '50m radius', 'Chassis': 'Compact Socket Plug' }
      },
      {
        id: 'gw-wired-pro',
        name: 'Wired Zigbee Pro Gateway (Up to 100 Devices)',
        sku: 'KSH-GW-PRO',
        price: 16500,
        originalPrice: 18000,
        stock: 12,
        smart: true,
        specifications: { 'Capacity': '100 Devices', 'Matter Support': 'Apple HomeKit, Matter enabled' }
      },
      {
        id: 'gw-wired-pro-plus',
        name: 'Wired Zigbee Pro+ Dual Gateway (Up to 200 Devices)',
        sku: 'KSH-GW-PRO-PLUS',
        price: 22000,
        originalPrice: 24000,
        stock: 8,
        smart: true,
        specifications: { 'Capacity': '200 Devices', 'Range': 'Long 200m dual antenna range' }
      },
      {
        id: 'gw-wired-pro-max',
        name: 'Wired Zigbee Pro Max Flagship (WiFi + LAN + 4G + POE)',
        sku: 'KSH-GW-PRO-MAX',
        price: 28000,
        originalPrice: 30000,
        stock: 5,
        smart: true,
        specifications: { 'Capacity': '200+ Devices', 'Network Fallback': 'Wired LAN + 4G SIM + WiFi dual band' }
      }
    ]
  },
  {
    id: 'scene-controller',
    name: 'Smart Scene Controllers & Rotary Knobs',
    slug: 'smart-scene-controllers',
    sku: 'KSH-SC-KNOB',
    brand: 'K Smart Homes',
    categoryId: 'scene-controllers',
    shortDescription: 'Multi-button wireless scene switch boards and magnetic premium rotary knobs.',
    description: 'Command pre-calibrated lighting, entertainment, and cooling modes with a single click or a natural twist. Paired with battery-powered Zigbee mobility, these premium controllers can be wall-mounted magnetically or placed on your coffee table.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 7999,
    originalPrice: 9000,
    discountPercentage: 11.1,
    stock: 50,
    status: 'Active',
    featured: false,
    cataloguePage: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'One Click, Double Click, or Long Press presets',
      'Stepless dimming and tuneable temperature control (rotary)',
      'Highly portable with matching premium magnetic wall bases',
      'Up to 18 custom scenes with custom lettering options'
    ],
    specifications: {
      'Power Source': 'Rechargeable Li-Ion or CR2032 Replaceable Battery',
      'Enclosure Material': 'Tempered Glass & Metallic Rotary Rings',
      'Integration': 'Controls curtains, dimmers, climate, and sound systems',
      'Mounting': 'Drill-Free Magnetic Wall Mount Bracket'
    },
    warranty: '3 Years Comprehensive Warranty',
    variants: [
      {
        id: 'sc-curved-knob',
        name: 'Curved Rotary Knob (Black & Gold, Rechargeable)',
        sku: 'KSH-SC-CRV-KNB',
        price: 15299,
        originalPrice: 17000,
        stock: 12,
        smart: true,
        specifications: { 'Control': '4 Buttons + Twist Knob', 'Tuning': 'Dimming and CCT Temp' }
      },
      {
        id: 'sc-text-knob',
        name: 'Textured Rotary Knob (Silver & Gold, Deluxe)',
        sku: 'KSH-SC-TXT-KNB',
        price: 21999,
        originalPrice: 24000,
        stock: 8,
        smart: true,
        specifications: { 'Control': '4 Buttons + Textured Twist Knob', 'Finish': 'Diamond knurled finish' }
      },
      {
        id: 'sc-flat-knob',
        name: 'Flat Rotary Knob (Gold & Black Finish)',
        sku: 'KSH-SC-FLT-KNB',
        price: 12999,
        originalPrice: 15000,
        stock: 15,
        smart: true,
        specifications: { 'Control': '4 Buttons + Low Profile Flat Ring' }
      },
      {
        id: 'sc-4b-recharge',
        name: '4-Button Scene Controller (12-Scenes, Rechargeable)',
        sku: 'KSH-SC-4B-RCH',
        price: 8799,
        originalPrice: 10000,
        stock: 20,
        smart: true,
        specifications: { 'Buttons': '4 Buttons', 'Actions': '12 Scenes', 'Power': 'Li-Ion USB-C' }
      },
      {
        id: 'sc-4b-replace',
        name: '4-Button Scene Controller (12-Scenes, Replaceable Cell)',
        sku: 'KSH-SC-4B-RPL',
        price: 7999,
        originalPrice: 9000,
        stock: 25,
        smart: true,
        specifications: { 'Buttons': '4 Buttons', 'Actions': '12 Scenes', 'Power': 'CR2032 Cell' }
      },
      {
        id: 'sc-6b-pro',
        name: '6-Button Scene Controller (18-Scenes, Custom Text)',
        sku: 'KSH-SC-6B-PRO',
        price: 17999,
        originalPrice: 20000,
        stock: 10,
        smart: true,
        specifications: { 'Buttons': '6 Buttons', 'Actions': '18 Scenes', 'Label': 'Custom text labels' }
      }
    ]
  },
  {
    id: 'luxury-touch-panel',
    name: 'Luxury Touch Screen Display Boards',
    slug: 'luxury-touch-screen-display-boards',
    sku: 'KSH-SW-PANEL',
    brand: 'K Smart Homes',
    categoryId: 'luxury-touch-panels',
    shortDescription: 'High-definition intelligent IPS touch panels with inbuilt Alexa and gateways.',
    description: 'Transform traditional switch zones into command centers. Our Luxury touch screens display real-time climate telemetry, active lighting levels, door lock status, and background music queues, housing a local Zigbee gateway inside.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 12500,
    originalPrice: 14000,
    discountPercentage: 10.7,
    stock: 20,
    status: 'Active',
    featured: true,
    cataloguePage: 14,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Vivid HD IPS multi-touch screen displays',
      'Inbuilt Amazon Alexa Voice Engine & Zigbee antenna',
      'Real-time weather station, clock, and camera stream display',
      'Plug+USB+Type-C dimming modules on smart variants'
    ],
    specifications: {
      'Operating System': 'Android Enterprise IoT Platform',
      'CPU / Core': 'Quad-Core 1.5GHz ARM processor',
      'Resolution': 'Multi-Touch Capacitive IPS (320-1080p)',
      'Installation': 'Fits in standard deep modular back boxes'
    },
    warranty: '2 Years Comprehensive',
    variants: [
      {
        id: 'pan-glass-4b',
        name: 'Glass 4B (4 Button Smart Capacitive)',
        sku: 'KSH-SW-PAN-GLS4',
        price: 12500,
        originalPrice: 14000,
        stock: 12,
        smart: true,
        specifications: { 'Display': 'Glass Front Plate', 'Sensing': 'Capacitive switches' }
      },
      {
        id: 'pan-glass-8b',
        name: 'Glass 8B (4 Button Switch + 4 Button Scene Controller)',
        sku: 'KSH-SW-PAN-GLS8',
        price: 15000,
        originalPrice: 17000,
        stock: 8,
        smart: true,
        specifications: { 'Sensing': '8 Capacitive zones', 'Chassis': 'Elite Tempered Front' }
      },
      {
        id: 'pan-knob-dim',
        name: 'Knob Dimmer Glass (with physical knob control)',
        sku: 'KSH-SW-PAN-DKNB',
        price: 16000,
        originalPrice: 18000,
        stock: 6,
        smart: true,
        specifications: { 'Hardware': 'Rotary Dimmer + 4 Capacitive' }
      },
      {
        id: 'pan-disp-35-3b',
        name: '3.5 inch Display 3B (3 Smart Buttons)',
        sku: 'KSH-SW-PAN-DISP35-3B',
        price: 25000,
        originalPrice: 28000,
        stock: 5,
        smart: true,
        specifications: { 'Display Size': '3.5 inch HD Screen', 'Buttons': '3 Smart Touch Buttons' }
      },
      {
        id: 'pan-disp-35-4b',
        name: '3.5 inch Display 4B (4 Smart Buttons)',
        sku: 'KSH-SW-PAN-DISP35-4B',
        price: 21000,
        originalPrice: 24000,
        stock: 7,
        smart: true,
        specifications: { 'Display Size': '3.5 inch HD Screen', 'Buttons': '4 Smart Touch Buttons' }
      },
      {
        id: 'pan-disp-4-alexa',
        name: '4 inch Display (Inbuilt Zigbee Gateway + Alexa)',
        sku: 'KSH-SW-PAN-DISP4',
        price: 31500,
        originalPrice: 35000,
        stock: 4,
        smart: true,
        specifications: { 'Display Size': '4.0 inch Full Touch', 'Antenna': 'Inbuilt Zigbee/Alexa' }
      },
      {
        id: 'pan-disp-5-alexa',
        name: '5 inch Display (Inbuilt Zigbee Gateway + Alexa)',
        sku: 'KSH-SW-PAN-DISP5',
        price: 45500,
        originalPrice: 50000,
        stock: 3,
        smart: true,
        specifications: { 'Display Size': '5.0 inch Premium Screen', 'Antenna': 'Inbuilt Zigbee/Alexa' }
      }
    ]
  },
  {
    id: 'smart-door-lock',
    name: 'Biometric Face & Palm Smart Locks',
    slug: 'biometric-face-and-palm-smart-locks',
    sku: 'KSH-SEC-LOCK',
    brand: 'K Smart Homes',
    categoryId: 'security-systems',
    shortDescription: 'Military-grade 3D Face recognition, Palm recognition, and fingerprint secure door locks.',
    description: 'Step into the future of security. Housing automatic deadbolt locking, high-fidelity two-way audio communications, and automatic lithium battery cells, these high-end door locks trigger instant alerts to your smartphone during door activity.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 11999,
    originalPrice: 13500,
    discountPercentage: 11.1,
    stock: 28,
    status: 'Active',
    featured: true,
    cataloguePage: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Swift 3D Infrared Face Recognition (Fast unlock under 1.2s)',
      'Sub-epidermal Palm Print recognition sensor',
      'Dual-camera video doorbell integration with mobile feed',
      'High capacity lithium cells with instant Type-C emergency power'
    ],
    specifications: {
      'Access Types': '3D Face, Palm, Fingerprint, Passcode, Card, WiFi, Key',
      'Deadbolt Material': '304 High-Tensile Stainless Steel',
      'Locking Mechanism': 'Fully-Automatic Triple Claw Deadbolt',
      'Camera Sensor': 'Dual 2MP with night vision and wide viewing angles'
    },
    warranty: '3 Years Replacement Warranty',
    variants: [
      {
        id: 'lock-s1',
        name: 'S1 Smart Door Lock (WiFi, Fingerprint, Cards)',
        sku: 'KSH-SEC-LOCK-S1',
        price: 11999,
        originalPrice: 13500,
        stock: 10,
        smart: true,
        specifications: { 'Power': 'AA Batteries', 'Camera': 'No', 'Fingerprint': 'Capacitive standard' }
      },
      {
        id: 'lock-s2',
        name: 'S2 Smart Door Lock (WiFi, Fingerprint, Video Doorbell)',
        sku: 'KSH-SEC-LOCK-S2',
        price: 13099,
        originalPrice: 15000,
        stock: 8,
        smart: true,
        specifications: { 'Power': 'AA Batteries', 'Camera': 'Video Doorbell Integrated' }
      },
      {
        id: 'lock-s3-pro',
        name: 'S3 Pro Smart Door Lock (3D Face, Palm, Lithium, VDB)',
        sku: 'KSH-SEC-LOCK-S3PRO',
        price: 20999,
        originalPrice: 23000,
        stock: 5,
        smart: true,
        specifications: { 'Sensing': '3D Face + Palm', 'Power': 'Rechargeable Lithium Pack' }
      },
      {
        id: 'lock-s3-slim',
        name: 'S3 Pro Slim Smart Door Lock (Slim Profile, Lithium)',
        sku: 'KSH-SEC-LOCK-S3SLM',
        price: 20999,
        originalPrice: 23000,
        stock: 4,
        smart: true,
        specifications: { 'Design': 'Sleek narrow profile for designer doors' }
      },
      {
        id: 'lock-s4',
        name: 'S4 Smart Door Lock (Infrared 3D Face + Video Feed)',
        sku: 'KSH-SEC-LOCK-S4',
        price: 36999,
        originalPrice: 40000,
        stock: 3,
        smart: true,
        specifications: { 'Display': 'Inbuilt LCD inside face' }
      },
      {
        id: 'lock-s4-pro',
        name: 'S4 Pro Smart Door Lock (Flagship Face & Palm)',
        sku: 'KSH-SEC-LOCK-S4PRO',
        price: 44999,
        originalPrice: 48000,
        stock: 2,
        smart: true,
        specifications: { 'Unlock': 'Premium 3D Face, Palm & Active WiFi Feed' }
      },
      {
        id: 'lock-k301',
        name: 'K301 Premium Door Lock with Indoor Screen',
        sku: 'KSH-SEC-LOCK-K301',
        price: 44999,
        originalPrice: 48000,
        stock: 2,
        smart: true,
        specifications: { 'Display': '4" Indoor IPS screen with automatic call' }
      },
      {
        id: 'lock-k703',
        name: 'K703 Smart Door Lock (3D Face, Lithium, Pro Shell)',
        sku: 'KSH-SEC-LOCK-K703',
        price: 39999,
        originalPrice: 44000,
        stock: 4,
        smart: true,
        specifications: { 'Chassis': 'Reinforced Anti-Drill Zinc Alloy Shell' }
      }
    ]
  },
  {
    id: 'video-door-phone',
    name: 'HD Video Door Phones & Lobby Stations',
    slug: 'hd-video-door-phones',
    sku: 'KSH-SEC-VDP',
    brand: 'K Smart Homes',
    categoryId: 'security-systems',
    shortDescription: 'High definition handsfree video door intercom systems with mobile app integration.',
    description: 'Authenticate and communicate with front door visitors safely. Combining bright IPS monitors, vandal-proof outdoors cameras with night vision, and deep electric lock actuators, our intercom system keeps your perimeter secure.',
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
    price: 19999,
    originalPrice: 22000,
    discountPercentage: 9.1,
    stock: 12,
    status: 'Active',
    featured: false,
    cataloguePage: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'High Definition 2MP Door Camera with night vision',
      '7-inch bright color screen inside station',
      'Vandal Proof IK08 / Weather Proof IP65 housing',
      'Supports SD Card recording up to 256GB with 100 image storage base'
    ],
    specifications: {
      'Monitor Screen': '7-inch High Definition IPS LCD',
      'Intercom Support': 'Room-to-room intercom and call forwarding',
      'Mobile App Access': 'Panasonic SmartWiFi app integration',
      'Door Lock Control': 'Relay controls for NO/NC electric doors and sliding gates'
    },
    warranty: '2 Years Manufacturer Warranty',
    variants: [
      {
        id: 'vdp-hybrid-kit',
        name: 'Hybrid Video Door Phone Kit with Mobile App',
        sku: 'KSH-SEC-VDP-HYB',
        price: 19999,
        originalPrice: 22000,
        stock: 7,
        smart: true,
        specifications: { 'Inclusions': '7" Monitor, 2MP Outdoor Bell, Power Adaptor' }
      },
      {
        id: 'vdp-lobby-station',
        name: 'SIP Lobby Display Station with 7" IPS Screen',
        sku: 'KSH-SEC-VDP-LOBBY',
        price: 29999,
        originalPrice: 32000,
        stock: 5,
        smart: true,
        specifications: { 'Intercom Stack': 'IP SIP protocol, up to 10000 face database' }
      }
    ]
  },
  {
    id: 'deep-panel-downlight',
    name: 'Smart Dimmable and Tunable Downlights',
    slug: 'smart-dimmable-downlights',
    sku: 'KSH-LT-COB',
    brand: 'K Smart Homes',
    categoryId: 'lighting-solutions',
    shortDescription: 'High color rendering (CRI 90+) smart dimmable & temperature tunable COB Downlights.',
    description: 'Transform your architectural lighting with K Smart Dimmable downlights. Engineered with clean internal reflectors, premium deep-seated anti-glare baffles, and Zigbee 3.0 driver boards, these lights adjust from warm sunset 2700K to bright daylight 6500K.',
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80'],
    price: 3199,
    originalPrice: 3800,
    discountPercentage: 15.8,
    stock: 250,
    status: 'Active',
    featured: false,
    cataloguePage: 26,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Dimmable and Tunable CCT color temperature spectrum',
      'High-end anti-glare housing (UGR < 16)',
      'Rich natural colors with CRI > 90',
      'Zigbee 3.0 mesh protocol for multi-group coordination'
    ],
    specifications: {
      'Color Temperature': '2700K to 6500K dynamic tuning',
      'Reflector Colors': 'Mirror Chrome, Deep Black, Soft White, Rose Gold',
      'Body Frame': 'Heavy Die-cast Aluminium with passive heatsink',
      'Smart Protocols': 'Zigbee 3.0 / Philips Hue & SmartLife mesh compliant'
    },
    warranty: '2 Years Replacement Warranty',
    variants: [
      {
        id: 'lt-deep-round-12w',
        name: 'Deep Panel Round 12W Smart Downlight',
        sku: 'KSH-LT-COB-DPR-12W',
        price: 3799,
        originalPrice: 4500,
        stock: 45,
        smart: true,
        specifications: { 'Cutout': '100mm', 'Wattage': '12W', 'Reflector': 'Same as Body' }
      },
      {
        id: 'lt-deep-sq-12w',
        name: 'Deep Panel Square 12W Smart Downlight',
        sku: 'KSH-LT-COB-DPS-12W',
        price: 3799,
        originalPrice: 4500,
        stock: 35,
        smart: true,
        specifications: { 'Cutout': '100mm', 'Wattage': '12W', 'Reflector': 'Same as Body' }
      },
      {
        id: 'lt-glowon-12w',
        name: 'Glowon 12W Smart Anti-Glare Downlight',
        sku: 'KSH-LT-COB-GLW-12W',
        price: 3199,
        originalPrice: 3800,
        stock: 50,
        smart: true,
        specifications: { 'Cutout': '105mm', 'Wattage': '12W', 'Body Color': 'Black/White' }
      },
      {
        id: 'lt-shineo-7w',
        name: 'Shineo 7W Miniature Downlight',
        sku: 'KSH-LT-COB-SHN-7W',
        price: 3899,
        originalPrice: 4300,
        stock: 30,
        smart: true,
        specifications: { 'Cutout': '35mm', 'Wattage': '7W', 'Reflector': 'Custom Metallic' }
      },
      {
        id: 'lt-glowria-12w',
        name: 'Glowria 12W Glass Finish Downlight',
        sku: 'KSH-LT-COB-GLR-12W',
        price: 4599,
        originalPrice: 5200,
        stock: 25,
        smart: true,
        specifications: { 'Cutout': '93mm', 'Reflector': 'Shadow Black' }
      },
      {
        id: 'lt-spira-7w',
        name: 'Spira 7W Curved Downlight',
        sku: 'KSH-LT-COB-SPR-7W',
        price: 3599,
        originalPrice: 4000,
        stock: 40,
        smart: true,
        specifications: { 'Cutout': '55mm', 'Wattage': '7W' }
      },
      {
        id: 'lt-nova-2x7w',
        name: 'Nova Double 2x7W Adjustable Spotlight',
        sku: 'KSH-LT-COB-NOV-2X7W',
        price: 7499,
        originalPrice: 8500,
        stock: 15,
        smart: true,
        specifications: { 'Cutout': '113x55mm', 'Wattage': '14W (2x7W)' }
      },
      {
        id: 'lt-prism-12w',
        name: 'Prism 12W Multi-Reflector Spotlight',
        sku: 'KSH-LT-COB-PRM-12W',
        price: 4399,
        originalPrice: 4900,
        stock: 20,
        smart: true,
        specifications: { 'Cutout': '78mm', 'Reflector': 'Rose Gold/Chrome' }
      }
    ]
  },
  {
    id: 'smart-led-strip',
    name: 'Smart LED Strip Combos & Controllers',
    slug: 'smart-led-strip-combos',
    sku: 'KSH-LT-STP',
    brand: 'K Smart Homes',
    categoryId: 'lighting-solutions',
    shortDescription: 'Complete 5M and 10M Smart LED strip combos with power supplies and Zigbee drivers.',
    description: 'Create luxurious diffuse cove ceilings with plug-and-play Smart LED Strip sets. Available in warm CCT tunable white (2700K - 6500K) or full RGB + CCT multi-color, these bundles come packed with heavy-duty Zigbee controllers and power SMPS modules.',
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80'],
    price: 6999,
    originalPrice: 8000,
    discountPercentage: 12.5,
    stock: 150,
    status: 'Active',
    featured: false,
    cataloguePage: 33,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'High density LED chips for zero spotting',
      'Stepless dimming and tuneable temperature control',
      'Dual Tuya / Zigbee Mesh smartphone sync',
      'Complete kits with heavy-duty power transformer included'
    ],
    specifications: {
      'Input Voltage': '24V Low Voltage safety standard',
      'Controller type': 'Tuya Smart Zigbee Controller',
      'SMPS Transformer': 'Pre-calibrated silent SMPS power adapter',
      'Adhesive Backing': 'High-performance 3M structural double-side adhesive'
    },
    warranty: '2 Years Complete System Warranty',
    variants: [
      {
        id: 'stp-5m-cct',
        name: '5 Meter LED Strip Combo (24V CCT Tunable, 100W Power)',
        sku: 'KSH-LT-STP-5MCCT',
        price: 6999,
        originalPrice: 8000,
        stock: 35,
        smart: true,
        specifications: { 'Length': '5 Meters', 'Power Supply': '24V 100W Smart SMPS', 'CCT spectrum': 'Tuneable' }
      },
      {
        id: 'stp-10m-cct',
        name: '10 Meter LED Strip Combo (24V CCT Tunable, 200W Power)',
        sku: 'KSH-LT-STP-10MCCT',
        price: 10799,
        originalPrice: 12000,
        stock: 25,
        smart: true,
        specifications: { 'Length': '10 Meters', 'Power Supply': '24V 200W Smart SMPS' }
      },
      {
        id: 'stp-5m-rgb',
        name: '5 Meter LED Strip RGB+CCT Combo (Smart Tuya Bundle)',
        sku: 'KSH-LT-STP-5MRGB',
        price: 9999,
        originalPrice: 11000,
        stock: 30,
        smart: true,
        specifications: { 'Length': '5 Meters', 'Spectrum': 'RGB + CCT Tunable spectrum', 'Power': '24V 6.25A' }
      },
      {
        id: 'stp-10m-rgb',
        name: '10 Meter LED Strip RGB+CCT Combo (Smart Tuya Bundle)',
        sku: 'KSH-LT-STP-10MRGB',
        price: 16999,
        originalPrice: 18500,
        stock: 20,
        smart: true,
        specifications: { 'Length': '10 Meters', 'Spectrum': 'RGB + CCT Tunable spectrum', 'Power': '24V 12A' }
      },
      {
        id: 'stp-drv-cct',
        name: 'Smart Tunable LED Controller - CCT Single',
        sku: 'KSH-LT-STP-DRVCCT',
        price: 2599,
        originalPrice: 3000,
        stock: 40,
        smart: true,
        specifications: { 'Voltage': '5V - 24V Range', 'Capacity': 'Supports up to 10M strip length' }
      }
    ]
  },
  {
    id: 'magnetic-track',
    name: 'Ultra Thin Surface Magnetic Tracks',
    slug: 'ultra-thin-magnetic-tracks',
    sku: 'KSH-LT-TRK',
    brand: 'K Smart Homes',
    categoryId: 'lighting-solutions',
    shortDescription: 'Super low-profile 24V surface and recessed magnetic click-in tracking systems.',
    description: 'Re-invent downlighting with high-performance low-profile magnetic tracks. These 24V rails allow track heads (including diffused, Spot, and grilles) to be clicked in, moved, or updated instantly without tools.',
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=600&q=80'],
    price: 999,
    originalPrice: 1200,
    discountPercentage: 16.7,
    stock: 80,
    status: 'Active',
    featured: true,
    cataloguePage: 37,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      'Ultra thin surface profiles (Only 5mm depth looks fully recessed)',
      'Direct click-in snap-lock modular design',
      'WiFi + Smart App controlled dynamic dimming on track heads',
      'Continuous copper busbars provide absolute electrical contact'
    ],
    specifications: {
      'Track Voltage': '24V low-voltage safety',
      'Body Finish': 'Satin Anodized Obsidian Black',
      'Contact Lines': 'Pure continuous copper lines',
      'Mounting Methods': 'Surface Mount, Ceiling Recessed, Suspend'
    },
    warranty: '2 Years Structural Warranty',
    variants: [
      {
        id: 'trk-body-1m',
        name: 'Ultra Thin Surface Magnetic Track Rail - 1 Meter',
        sku: 'KSH-LT-TRK-1M',
        price: 999,
        originalPrice: 1200,
        stock: 30,
        smart: false,
        specifications: { 'Length': '1M (30x5x1000mm)', 'Colour': 'Satin Black' }
      },
      {
        id: 'trk-body-2m',
        name: 'Ultra Thin Surface Magnetic Track Rail - 2 Meter',
        sku: 'KSH-LT-TRK-2M',
        price: 1999,
        originalPrice: 2400,
        stock: 20,
        smart: false,
        specifications: { 'Length': '2M (30x5x2000mm)', 'Colour': 'Satin Black' }
      },
      {
        id: 'trk-head-diffused-12w',
        name: 'Linear Diffused Magnetic Track Head - 12W Smart',
        sku: 'KSH-LT-TRK-HD12W',
        price: 2299,
        originalPrice: 2600,
        stock: 15,
        smart: true,
        specifications: { 'Wattage': '12W', 'Angle': '105° wide angle', 'Reflector': 'Diffuse PMMA' }
      },
      {
        id: 'trk-head-grille-10w',
        name: 'Grille Click-In Track Spotlight - 10W Smart',
        sku: 'KSH-LT-TRK-GRL10W',
        price: 2999,
        originalPrice: 3500,
        stock: 12,
        smart: true,
        specifications: { 'Wattage': '10W', 'Angle': '30° beam spotlight' }
      },
      {
        id: 'trk-head-spot-7w',
        name: 'Spot Click-In Rotational Track Spotlight - 7W Smart',
        sku: 'KSH-LT-TRK-SPT7W',
        price: 3699,
        originalPrice: 4200,
        stock: 18,
        smart: true,
        specifications: { 'Wattage': '7W', 'Angle': '24° directional spotlight' }
      },
      {
        id: 'trk-power-100w',
        name: 'Integrated Smart Track Power Supply - 100W',
        sku: 'KSH-LT-TRK-PWR100W',
        price: 6999,
        originalPrice: 7500,
        stock: 8,
        smart: true,
        specifications: { 'Output': '24V 100W transformer' }
      }
    ]
  },
  {
    id: 'pir-motion-sensor',
    name: 'Wireless PIR Motion Sensor',
    slug: 'wireless-pir-motion-sensor',
    sku: 'KSH-SEC-PIR',
    brand: 'K Smart Homes',
    categoryId: 'security-systems',
    shortDescription: 'High precision passive infrared motion sensor for safety alerts and light automation.',
    description: 'Automate your lighting or trigger intrusion alerts using our high-precision PIR Sensor. Featuring dual-sensor elements for extreme accuracy, pet immunity up to 20kg, and low power sleep cycles, it connects reliably to any Zigbee hub.',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
    ],
    price: 950,
    originalPrice: 1250,
    discountPercentage: 24,
    stock: 0,
    status: 'Out of Stock',
    featured: false,
    cataloguePage: 29,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    features: [
      '120 degree wide angle sensing range',
      'Pet-immunity up to 20kg prevents false alerts',
      'Adhesive magnetic base for swift rotation',
      'Integrates directly with lights for motion-trigger lighting'
    ],
    specifications: {
      'Detection Distance': '8-10 Meters',
      'Detection Angle': '120° Horizontal, 60° Vertical',
      'Protocol': 'Zigbee 3.0',
      'Battery Type': 'CR123A Lithium (lasts 2 Years)'
    },
    warranty: '1 Year Warranty',
    tags: ['motion sensor', 'pir sensor', 'home automation', 'pet immune'],
    variants: []
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do smart switches communicate with my home network?',
    answer: 'K Smart Homes touch switches contain high-fidelity Wi-Fi or Zigbee modules. If using Wi-Fi, they connect directly to your 2.4GHz router. If using Zigbee, they connect through our central Smart Hub, which reduces traffic load on your home Wi-Fi network.',
    category: 'Smart Switches',
    displayOrder: 1,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'faq-2',
    question: 'What happens to my curtains or gates during a power failure?',
    answer: 'All K Smart Homes motorized systems include physical overrides. Curtain tracks feature a gentle manual pull system which slides the drapes easily. Sliding gate motors come with two heavy-duty custom mechanical keys to disengage the gears for manual gate operation.',
    category: 'Gate Automation',
    displayOrder: 2,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'faq-3',
    question: 'Do I need to rewire my entire house to install smart switchboards?',
    answer: 'No, our touch switchboards fit directly inside standard modular metal boxes. They use the same standard wiring phase, neutral, and ground, meaning zero damage to walls and no extensive rewiring required.',
    category: 'Installation',
    displayOrder: 3,
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialVideos: Video[] = [
  {
    id: 'vid-1',
    title: 'Titan Smart Switchboard Walkthrough',
    description: 'Discover the features, capacitive touch feedback, and ambient LED configurations of our premium switch board series.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
    category: 'Smart Switches',
    displayOrder: 1,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'vid-2',
    title: 'Automatic Sliding Gate Motor Field Test',
    description: 'See the heavy-duty 1000kg motor sliding heavy steel gates and testing the infrared auto-stop safety beams.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80',
    category: 'Gate Automation',
    displayOrder: 2,
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialOffers: Offer[] = [
  {
    id: 'off-diwali',
    title: 'Diwali Festive Light Automation Offer',
    description: 'Enjoy 15% flat off on our premium CCT tuneable LED profiles and profile light channels.',
    type: 'Category',
    targetId: 'lighting-solutions',
    discountType: 'Percentage',
    discountValue: 15,
    couponCode: 'FESTIVELIGHTS',
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'off-titan',
    title: 'Titan Switch Board Combo Deal',
    description: 'Flat ₹2,000 discount on purchasing the flagship Space Aluminium variant.',
    type: 'Product',
    targetId: 'titan-smart-switch',
    discountType: 'Fixed',
    discountValue: 2000,
    couponCode: 'TITANSWITCH',
    startDate: '2026-08-20',
    endDate: '2026-09-30',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialSEOConfigs: SEOConfig[] = [
  {
    page: 'Home',
    title: 'K Smart Homes - Premium Luxury Touch Switchboards & Automation',
    metaDescription: 'Welcome to K Smart Homes. We deliver world-class automation systems, luxury capacitive touch switchboards, smart locks, and gate automation systems across India.',
    keywords: 'smart homes, luxury switches, touch switchboard, automatic gate, yale lock, home automation bangalore',
    canonicalUrl: 'https://ksmarthomes.com',
    ogTitle: 'K Smart Homes | Luxury Home Automation Integrators',
    ogDescription: 'Experience modern living with smart switches, security sensors, and premium gate automation solutions.',
    ogImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    robotsIndex: true
  },
  {
    page: 'Catalogue',
    title: 'Smart Automation Product Catalogue - K Smart Homes',
    metaDescription: 'Browse the official K Smart Homes product catalogue. Explore touch switchboards, biometric smart locks, silent curtain tracks, and gate systems.',
    keywords: 'home automation products, smart locks list, remote curtains, automatic gate price',
    canonicalUrl: 'https://ksmarthomes.com/catalogue',
    ogTitle: 'Official Smart Automation Catalogue | K Smart Homes',
    ogDescription: 'View price lists, variants, and specifications of premium home automation controllers.',
    ogImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    robotsIndex: true
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'admin-super',
    email: 'admin@smarthomes.com',
    name: 'Ketan Patel',
    role: 'Super Admin',
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'admin-catalogue',
    email: 'manager@smarthomes.com',
    name: 'Aishwarya Roy',
    role: 'Catalogue Manager',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialHomepageConfig: HomepageConfig = {
  heroTitle: 'Step Into the Future of Living',
  heroDescription: 'Indulge in unmatched elegance and safety. Discover capacitive glass touch panels, biometric secure locks, and silent gate operations customized for premium villas and smart offices.',
  heroImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  heroButtonText: 'Explore Catalogue',
  heroButtonDestination: '/catalogue',
  promotionalText: 'Upgrade your living experience today. Contact our engineers for a custom-tailored 3D lighting design layout.',
  bannerImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1200&q=80',
  bannerLink: '/offers'
};

export const initialSystemSettings: SystemSettings = {
  businessName: 'K Smart Homes Automation',
  businessEmail: 'info@ksmarthomes.com',
  phone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  address: 'No. 45, 1st Cross, Indiranagar Double Road, Bangalore - 560038, Karnataka, India',
  socialFacebook: 'https://facebook.com/ksmarthomes',
  socialInstagram: 'https://instagram.com/ksmarthomes',
  socialYoutube: 'https://youtube.com/ksmarthomes',
  currency: 'INR',
  taxRate: 18,
  shippingFeeBase: 150,
  lowStockThreshold: 10
};

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Amit Sharma',
    email: 'amit.sharma@gmail.com',
    phone: '+91 99001 12233',
    numberForOrders: 2,
    totalPurchaseValue: 63799,
    lastOrderDate: '2026-08-25T14:22:10.000Z',
    accountStatus: 'Active',
    createdAt: '2026-01-15T09:00:00.000Z',
    addresses: [
      {
        street: 'Penthouse B, Sky Heights Apartments, Whitefield',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560066',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Priyanka Sen',
    email: 'priyanka.sen@outlook.com',
    phone: '+91 98860 55443',
    numberForOrders: 1,
    totalPurchaseValue: 18000,
    lastOrderDate: '2026-08-26T10:15:30.000Z',
    accountStatus: 'Active',
    createdAt: '2026-03-10T11:45:00.000Z',
    addresses: [
      {
        street: 'Villa #18, Prestige Silver Oak, ECC Road',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560066',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'Rajesh Malhotra',
    email: 'rajesh.m@yahoo.com',
    phone: '+91 97412 88776',
    numberForOrders: 0,
    totalPurchaseValue: 0,
    accountStatus: 'Active',
    createdAt: '2026-05-20T16:10:00.000Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-982341',
    customerName: 'Amit Sharma',
    customerEmail: 'amit.sharma@gmail.com',
    customerPhone: '+91 99001 12233',
    shippingAddress: {
      street: 'Penthouse B, Sky Heights Apartments, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560066',
      country: 'India'
    },
    items: [
      {
        productId: 'titan-smart-switch',
        productName: 'Titan Smart Touch Switch Board',
        variantId: 'titan-alum-12',
        variantName: '4S + 1SK - Premium Aluminium Finish',
        quantity: 1,
        price: 19999,
        discount: 2000,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'yale-digital-lock',
        productName: 'Yale Digital Smart Lock Pro',
        variantId: 'yale-lock-black',
        variantName: 'Matte Obsidian Black',
        quantity: 1,
        price: 44999,
        discount: 5000,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 64998,
    tax: 11699.64,
    shippingFee: 150,
    discount: 7000,
    total: 69847.64,
    orderStatus: 'Paid',
    paymentStatus: 'Captured',
    paymentProvider: 'Razorpay',
    razorpayOrderId: 'order_O8a3Hdg71kS93L',
    razorpayPaymentId: 'pay_O8a3Ksh92mW49V',
    paymentDate: '2026-08-25T14:25:00.000Z',
    createdAt: '2026-08-25T14:22:10.000Z',
    updatedAt: '2026-08-25T14:25:00.000Z'
  },
  {
    id: 'ORD-128475',
    customerName: 'Priyanka Sen',
    customerEmail: 'priyanka.sen@outlook.com',
    customerPhone: '+91 98860 55443',
    shippingAddress: {
      street: 'Villa #18, Prestige Silver Oak, ECC Road',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560066',
      country: 'India'
    },
    items: [
      {
        productId: 'titan-smart-switch',
        productName: 'Titan Smart Touch Switch Board',
        variantId: 'titan-poly-12',
        variantName: '4S + 1SK - Polycarbonate Elite Finish',
        quantity: 1,
        price: 15799,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 15799,
    tax: 2843.82,
    shippingFee: 150,
    discount: 0,
    total: 18792.82,
    orderStatus: 'Confirmed',
    paymentStatus: 'Captured',
    paymentProvider: 'Razorpay',
    razorpayOrderId: 'order_P9z4Kla02pL72N',
    razorpayPaymentId: 'pay_P9z4Mnq33xP82Z',
    paymentDate: '2026-08-26T10:18:00.000Z',
    createdAt: '2026-08-26T10:15:30.000Z',
    updatedAt: '2026-08-26T10:18:00.000Z'
  }
];

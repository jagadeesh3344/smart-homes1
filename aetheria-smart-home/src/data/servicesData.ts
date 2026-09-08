/**
 * Solutions & Services Database
 * Detailed architecture for all 16 smart home, automation & building services
 */

import { SolutionService } from '../types';

export const initialServices: SolutionService[] = [
  {
    id: 'srv_touch_switches',
    title: 'Smart Touch Switch Boards',
    slug: 'smart-touch-switch-boards',
    shortDescription: 'Architectural Titan switches, capacitive crystal glass touch plates, and rotary knobs with Zigbee 3.0 mesh and scene automation.',
    fullDescription: 'Elevate your wall aesthetics with precision capacitive glass touch switchboards and modular Titan series switches. Enjoy intuitive touch control, manual override, smartphone app management, customized scene execution, and precision rotary knobs for fan speed regulation and light dimming.',
    heroImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'ToggleLeft',
    keyFeatures: [
      'Titan modular switches in 2M, 4M, 6M, 8M up to 18-switch configurations',
      'Toughened crystal glass and polycarbonate capacitive touch boards',
      'Precision rotary knob regulation for fan speed and lighting levels',
      'Programmable tactile buttons with multi-scene execution',
      'Integrated high-speed USB Type-A / Type-C fast charging ports',
      'Customized laser-engraved button iconography and room labels'
    ],
    applications: [
      'Luxury Villas and Mansions',
      'Modern High-Rise Apartments',
      'Executive Corporate Boardrooms',
      'Boutique Hospitality Suites'
    ],
    benefits: [
      'Seamless architectural integration with modular backboxes',
      'Operates locally and over cloud without latency',
      'Full voice control compatibility with Alexa and Google Assistant',
      'Gentle LED night-locating backlights'
    ],
    relatedCategoryIds: ['cat_switches'],
    sortOrder: 1,
    isFeatured: true
  },
  {
    id: 'srv_retrofit_automation',
    title: 'Smart Retrofit Automation',
    slug: 'smart-retrofit-automation',
    shortDescription: 'In-wall micro smart modules installed behind existing switchboards with zero wall chipping or rewiring required.',
    fullDescription: 'Convert any traditional home into an intelligent smart space in hours without altering existing designer switch plates or breaking walls. Our 1CH, 2CH, 3CH, 4CH, and 2CH Curtain micro modules fit behind existing switchboards, keeping regular manual switch operation while unlocking app control, voice automation, and automated timers.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Cpu',
    keyFeatures: [
      'Available in 1 Channel, 2 Channel, 3 Channel, 4 Channel, and 2 Channel Curtain variants',
      'Full retention of manual physical switches and socket functionality',
      'Both Zigbee 3.0 and Wi-Fi communication variants available',
      'Fits inside standard 35mm / 45mm electrical backboxes',
      'Programmable schedulers, countdown timers, and sunrise/sunset sync',
      'High-wattage heavy load support for air conditioners and water heaters'
    ],
    applications: [
      'Existing Residential Homes and Apartments',
      'Heritage Bungalows and Renovation Projects',
      'Leased Commercial Offices and Retail Outlets',
      'Completed Interior Architecture with Existing Wiring'
    ],
    benefits: [
      'Zero structural damage or wall repainting needed',
      'Ultra-fast installation in less than 15 minutes per switchboard',
      'Family members can continue using manual physical switches normally',
      'Expand room-by-room on demand'
    ],
    relatedCategoryIds: ['cat_retrofit'],
    sortOrder: 2,
    isFeatured: true
  },
  {
    id: 'srv_smart_lighting',
    title: 'Smart Architectural Lighting Solutions',
    slug: 'smart-lighting-solutions',
    shortDescription: 'High-CRI downlights, COB spot lights, 48V magnetic track systems, CCT tunable LED strips, and smart drivers.',
    fullDescription: 'Transform living spaces with museum-grade architectural lighting and circadian illumination. We deliver complete lighting design and hardware, including anti-glare downlights, deep COB spotlights, 48V low-voltage magnetic track lighting systems, CCT Tunable LED strips, and intelligent DIP switch drivers.',
    heroImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Lightbulb',
    keyFeatures: [
      'Extensive catalogue models: Deep Panel, Glowria, Glowon, Shineo, Spira, Nova, Sharpx, Prism, Glowlust, Flix, Value COB, Radius, Fleura, Grammy, Prod, Flato, Pinhole Laser, Delta Plus, Tiltable Laser, Aura, Experia, Eccentric, Vizion, Slimo Trimless, Pinhole Surface, Surface Cylinder, Luma Drop',
      'Smart Tunable White (CCT 2700K - 6500K) and 0-100% flicker-free dimming',
      '48V low-voltage magnetic track lighting (Linear diffused, spots, rotatable grilles, elfin spots)',
      'Pre-matched 5M and 10M CCT & RGB+CCT smart LED strip combos with 24V SMPS',
      'High Color Rendering Index (CRI > 90) for natural color fidelity',
      'Multiple reflector finishes (Black, White, Rose Gold, Chrome, Gunmetal, Gold)'
    ],
    applications: [
      'Luxury Living and Dining Halls',
      'Architectural False Ceiling Coves',
      'Art Galleries and Display Showcases',
      'Commercial Showrooms and Hotels'
    ],
    benefits: [
      'Circadian rhythm support matches natural daylight transitions',
      'Anti-glare deep baffles (UGR < 19) protect visual comfort',
      'Modular magnetic fixtures can be repositioned effortlessly without tools',
      'Energy efficient with long-life thermal heat sinking'
    ],
    relatedCategoryIds: ['cat_lighting'],
    sortOrder: 3,
    isFeatured: true
  },
  {
    id: 'srv_curtain_automation',
    title: 'Curtain & Shading Automation',
    slug: 'curtain-shading-automation',
    shortDescription: 'Whisper-quiet motorized drapery motors up to 80kg, DIY expandable tracks, custom motorized tracks, and multi-channel remotes.',
    fullDescription: 'Experience effortless motorized shading and natural daylight harvesting. Our curtain automation lineup includes 1.2Nm (50kg load), 1.5Nm (75kg load), and 2.0Nm (80kg load) motors with App, Remote, and Manual pull-to-start control. Tracks range from DIY expandable systems up to 15ft to precision custom tracks up to 25ft.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Blinds',
    keyFeatures: [
      'Motor capacities: 1.2Nm (50kg), 1.5Nm (75kg), and 2.0Nm (80kg)',
      'DIY Curtain Tracks (up to 10ft & 15ft) and Custom Tracks (up to 25ft)',
      'Multi-channel remote tracks supporting 2-channel and 6-channel controls',
      'Manual pull-to-start: gently tug the curtain to initiate full motorized movement',
      'Automatic and manual limit settings for precise travel boundaries',
      'Sunrise, sunset, and solar radiation automated schedules'
    ],
    applications: [
      'Master Bedrooms and Guest Suites',
      'Double-Height Living Room Glazing',
      'Private Home Cinema Darkening',
      'Hotel Guest Rooms'
    ],
    benefits: [
      'Ultra-quiet operation below 30dB',
      'Manual override functions during power interruptions',
      'Protects luxury upholstery from harsh UV sun exposure',
      'Synchronized multi-curtain opening for dramatic views'
    ],
    relatedCategoryIds: ['cat_curtains'],
    sortOrder: 4,
    isFeatured: true
  },
  {
    id: 'srv_smart_door_locks',
    title: 'Smart Door Locks & Biometrics',
    slug: 'smart-door-locks-biometrics',
    shortDescription: 'Keyless biometric digital locks with 3D face recognition, palm recognition, fingerprint, RFID, passcode, and video doorbell binding.',
    fullDescription: 'Fortify your main residence entrance with intelligent biometric security. Our catalogue includes S1, S2, S3 Pro, S3 Pro Slim (for aluminum & narrow profile doors), S4, S4 Pro, K301, and K703 locks featuring 3D structured light face recognition, palm vein unlock, semiconductor fingerprint sensors, OTP codes, emergency keys, and two-way audio with VDB binding.',
    heroImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Lock',
    keyFeatures: [
      '3D structured face recognition unlock in under 0.3 seconds',
      'Palm vein recognition and semiconductor biometric fingerprint reader',
      'Scrambled anti-peep passcode input and temporary One-Time Passwords (OTP)',
      'Ultra-slim S3 Pro Slim model tailored for narrow-stile aluminum doors',
      'Rechargeable high-capacity lithium battery with USB emergency jumpstart',
      'Two-way audio communication and Video Doorbell (VDB) integration'
    ],
    applications: [
      'Luxury Villa Main Entrances',
      'Apartment Front Doors',
      'Executive Office Cabins',
      'Private Master Bedroom Suites'
    ],
    benefits: [
      '100% keyless convenience for the entire family',
      'Instant smartphone alerts on door unlock or tampering attempts',
      'Grade-1 commercial drill-proof mortise mechanics',
      'Grant temporary access to guests or domestic staff remotely'
    ],
    relatedCategoryIds: ['cat_locks'],
    sortOrder: 5,
    isFeatured: true
  },
  {
    id: 'srv_video_door_phones',
    title: 'Video Door Phones & Intercom Systems',
    slug: 'video-door-phones-intercom',
    shortDescription: '7-inch IPS touchscreen monitors, 2MP wide-angle cameras, IC card, QR access, SIP integration, and mobile app call forwarding.',
    fullDescription: 'Screen visitors with crystal-clear high-definition video and two-way audio. Includes Hybrid Video Door Phone Kits (indoor 7" IPS touchscreen + outdoor 2MP night-vision station) and outdoor Lobby Display Stations with facial recognition, IC card, QR code, and SIP room-to-room intercom.',
    heroImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Video',
    keyFeatures: [
      '7-inch IPS high-definition color touchscreen indoor display',
      '2MP wide-angle outdoor camera with infrared night vision',
      'Lobby Display Station with Face ID, IC card, QR code, and password access',
      'SIP protocol compatibility and room-to-room audio/video intercom',
      'Remote smartphone answering and electric lock release from anywhere',
      'Multiple lock support (electric strikes, magnetic locks, motorized gates)'
    ],
    applications: [
      'Gated Villa Entrances',
      'Multi-Apartment Complexes & Gated Communities',
      'Commercial Reception Desks',
      'Corporate Office Entrances'
    ],
    benefits: [
      'Never miss a visitor or parcel delivery when away from home',
      'Integrated security snapshots stored on local SD card memory',
      'Vandal-proof IP65 weather-resistant outdoor construction',
      'View CCTV cameras directly on the indoor touchscreen monitor'
    ],
    relatedCategoryIds: ['cat_vdp'],
    sortOrder: 6,
    isFeatured: true
  },
  {
    id: 'srv_cctv_security',
    title: 'Security, CCTV & Burglar Alarm Systems',
    slug: 'cctv-security-burglar-alarms',
    shortDescription: 'PTZ, Dome, Eyeball, and Thermal CCTV surveillance paired with wireless Ajax intrusion alarm sensors and outdoor sirens.',
    fullDescription: 'Comprehensive active security protecting property perimeters and interiors. CCTV solutions cover PTZ auto-tracking, Dome, Eyeball, Bullet, Analytics-enabled, and Thermal cameras from supported leaders. The wireless Ajax intrusion alarm ecosystem includes Hub 2 Plus, MotionCam Outdoor (with instant photo verification), StreetSiren Double Deck, DoorProtect Plus, and KeyPad Plus.',
    heroImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    iconName: 'ShieldCheck',
    keyFeatures: [
      'CCTV Camera Types: PTZ, Dome, Eyeball, Bullet, AI Analytics, Thermal Imaging',
      'Supported CCTV Brands: CP Plus, Hikvision, Tiandy, Hi-Focus',
      'Ajax Alarm Hubs: Hub, Hub Plus, Hub 2, Hub 2 Plus (Ethernet + Wi-Fi + 2x LTE)',
      'MotionCam Outdoor: Captures animated photo series during perimeter intrusion',
      'StreetSiren Double Deck: 113dB acoustic alarm with visual LED flash',
      'DoorProtect Plus (vibration & tilt detection) and GlassProtect (acoustic break detection)'
    ],
    applications: [
      'Residential Villa Perimeters & Gardens',
      'Apartments and Penthouses',
      'Jewellery Showrooms and Financial Branches',
      'Commercial Warehouses and IT Campuses'
    ],
    benefits: [
      'Immediate photo verification eliminates false alarms',
      'Triple-redundant communication via Ethernet, Wi-Fi, and Dual SIM LTE',
      'Operates up to 16 hours during power outages via internal backup battery',
      'Military-grade Jeweller wireless protocol with anti-jamming encryption'
    ],
    relatedCategoryIds: ['cat_security'],
    sortOrder: 7,
    isFeatured: true
  },
  {
    id: 'srv_home_entertainment',
    title: 'Home Entertainment & Multi-Room Audio',
    slug: 'home-entertainment-multiroom-audio',
    shortDescription: 'Dedicated home theatre design, room acoustic calibration, multi-room high-resolution audio distribution, and AV automation.',
    fullDescription: 'Immerse yourself in cinematic brilliance and whole-home musical harmony. We provide complete home theatre design, room acoustic treatment planning, high-fidelity multi-room streaming audio, architectural in-ceiling/in-wall speakers, and centralized AV media automation synchronized with smart lighting and motorized shading.',
    heroImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Speaker',
    keyFeatures: [
      'Custom Home Theatre design and acoustic room treatment planning',
      'High-resolution multi-room audio distribution with independent zone control',
      'Architectural flush-mount in-ceiling and invisible in-wall speakers',
      'One-touch "Movie Scene": Dims lights, closes blackout curtains, powers projector',
      'Lossless streaming from Spotify, Apple AirPlay 2, Tidal, and local media servers',
      'Outdoor weatherproof landscape audio systems for gardens and pool decks'
    ],
    applications: [
      'Dedicated Private Home Theatres',
      'Living and Entertainment Lounges',
      'Master Bedrooms and Bathrooms',
      'Outdoor Terraces, Patios, and Poolside Pavilions'
    ],
    benefits: [
      'Studio-grade acoustic calibration tailored to room geometry',
      'Zero visual clutter with architectural flush-mount speaker grilles',
      'Seamless unified control from in-wall touch panels or mobile devices',
      'Party mode links all rooms for synchronized whole-home audio'
    ],
    relatedCategoryIds: ['cat_entertainment'],
    sortOrder: 8,
    isFeatured: true
  },
  {
    id: 'srv_smart_glass',
    title: 'Smart Switchable Glass Solutions',
    slug: 'smart-switchable-glass-solutions',
    shortDescription: 'Instant electronic privacy glass transitioning from transparent to frosted via phone app, remote, switch, or voice.',
    fullDescription: 'Architectural switchable PDLC privacy glass for luxury residences and corporate boardrooms. Switches between optical crystal clarity and frosted opaque privacy in less than 10 milliseconds. Controllable via smartphone app, RF remote, wall touch switch, and voice assistants.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Sparkles',
    keyFeatures: [
      'Instant transparency switching in under 10 milliseconds',
      'Controllable through Smartphone App, Remote Control, Wall Switch, or Voice',
      'Blocks over 99% of harmful ultraviolet (UV) radiation',
      'Enhances thermal insulation and acoustic sound dampening',
      'Available as custom laminated glass or adhesive retrofit PDLC film'
    ],
    applications: [
      'Master Bathroom Shower and Tub Partitions',
      'Executive Corporate Boardrooms and Conference Cabins',
      'Villa Facade Windows and Skylights',
      'Hospitality Suites and VIP Lounges'
    ],
    benefits: [
      'Eliminates the need for dusty curtains or blinds in wet and sterile areas',
      'Maximizes natural light while guaranteeing complete on-demand privacy',
      'Serves as an ultra-high definition rear-projection screen when frosted',
      'Extremely low electrical power consumption'
    ],
    relatedCategoryIds: ['cat_glass'],
    sortOrder: 9,
    isFeatured: true
  },
  {
    id: 'srv_entrance_automation',
    title: 'Entrance & Motorized Gate Automation',
    slug: 'entrance-motorized-gate-automation',
    shortDescription: 'Heavy-duty motorized sliding gates, swing gates, rolling shutters, garage doors, boom barriers, and automatic glass doors.',
    fullDescription: 'Motorized access automation for residential estates and commercial entrances. Products include heavy-duty sliding gate motors up to 2000kg, articulated/linear swing gate arms, automated rolling shutters, high-speed boom barriers, sectional overhead garage doors, and radar-activated glass sliding doors.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    iconName: 'DoorOpen',
    keyFeatures: [
      'Sliding gate automation with soft start/stop and obstacle safety sensors',
      'Telescopic and articulated swing gate arms with hydraulic cushioning',
      'Automated high-torque rolling shutter motors',
      'High-speed residential and commercial boom barriers with LED booms',
      'Whisper-quiet belt-driven overhead garage door openers',
      'Radar-activated microwave automatic glass sliding doors'
    ],
    applications: [
      'Private Villa Gates and Driveways',
      'Gated Residential Communities',
      'Commercial Office Entrances and Basements',
      'Retail Showrooms and Hotel Lobbies'
    ],
    benefits: [
      'Open gates automatically via vehicle RFID tags or smartphone geofencing',
      'Infrared photocells prevent gate closure on vehicles or pedestrians',
      'Emergency manual mechanical release keys for power failures',
      'Heavy-duty all-weather electro-mechanical durability'
    ],
    relatedCategoryIds: ['cat_entrance'],
    sortOrder: 10,
    isFeatured: true
  },
  {
    id: 'srv_industrial_access',
    title: 'Industrial Access Control & Turnstiles',
    slug: 'industrial-access-control-turnstiles',
    shortDescription: 'Full height turnstiles, tripod gates, swing speed gates, flap barriers, and heavy-duty parking & fencing boom barriers.',
    fullDescription: 'Enterprise pedestrian and vehicle traffic management engineered for high-throughput security. Features Full Height Turnstiles for perimeter security, stainless steel Tripod Turnstiles, optical Flap and Swing Barrier speed gates, and high-frequency parking and fencing boom barriers for commercial and industrial facilities.',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building',
    keyFeatures: [
      'Full Height Turnstiles with bi-directional rotation for perimeter security',
      'SUS304 Stainless Steel Tripod Turnstile gates for high-throughput pedestrian control',
      'Optical Swing Barrier & Flap Barrier speed gates with anti-tailgating sensors',
      'Heavy-duty Parking Boom Barriers and Fencing Boom Barriers with loop detectors',
      'Seamless integration with biometric face ID, RFID cards, and QR code ticketing'
    ],
    applications: [
      'IT Tech Parks and Corporate Campuses',
      'Industrial Factories and Manufacturing Plants',
      'Gated Township Entrances',
      'Commercial Towers and Metro/Transit Stations'
    ],
    benefits: [
      'Strict anti-tailgating algorithms prevent unauthorized pedestrian entry',
      'High-speed throughput processes up to 40 persons per minute',
      'Emergency fire alarm automatic fail-safe release for swift evacuation',
      'Robust SUS304 weather-resistant construction'
    ],
    relatedCategoryIds: ['cat_industrial'],
    sortOrder: 11,
    isFeatured: true
  },
  {
    id: 'srv_louvered_pergola',
    title: 'Premium Louvered Pergola Systems',
    slug: 'premium-louvered-pergola-systems',
    shortDescription: 'Motorized rotating louvers, integrated linear LED lighting, frameless sliding glass walls, and motorized roller shades.',
    fullDescription: 'Architectural outdoor living systems engineered with motorized 0°–135° rotating aluminum louvers, hidden rainwater column drainage, integrated dimmable linear LED perimeter lighting, frameless sliding glass enclosures, and motorized wind/glare roller zip shades.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Maximize2',
    keyFeatures: [
      'Motorized 0° to 135° adjustable louvers for sunlight and ventilation control',
      'Integrated linear LED lighting along louver blades and frame perimeter',
      'Frameless sliding glass wall integration for year-round climate protection',
      'Heavy-duty architectural powder-coated aluminum structure (6063-T5 alloy)',
      'Integrated motorized zip roller shades for wind and privacy',
      'Automated rain and wind sensors: automatically close louvers during downpours'
    ],
    applications: [
      'Villa Rooftop Terraces & Penthouses',
      'Poolside Lounges & Garden Pavilions',
      'Luxury Restaurant & Cafe Al Fresco Dining',
      'Resort Cabanas and Clubhouse Decks'
    ],
    benefits: [
      'Creates an all-weather luxury outdoor entertainment space',
      '100% internal column water drainage prevents patio splashing',
      'Controlled via smartphone app, remote control, or automated weather sensors',
      'Engineered to withstand high wind loads and harsh weather'
    ],
    relatedCategoryIds: ['cat_pergola'],
    sortOrder: 12,
    isFeatured: true
  },
  {
    id: 'srv_parking_management',
    title: 'Parking Management Systems',
    slug: 'parking-management-systems',
    shortDescription: 'Automatic boom barriers, RFID long-range vehicle tags, ANPR license plate recognition, and multi-lane controllers.',
    fullDescription: 'Streamline vehicle flow and perimeter parking control with intelligent parking systems. Includes high-speed automated boom barriers, UHF long-range RFID windshield tags for seamless hands-free entry, Automatic Number Plate Recognition (ANPR) cameras, and multi-lane parking management software.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Car',
    keyFeatures: [
      'High-speed automated boom barriers with brushless DC motors',
      'UHF long-range RFID vehicle reader antennas (6m to 12m read range)',
      'Automatic Number Plate Recognition (ANPR) 4K cameras with optical OCR',
      'Under-vehicle loop detectors and anti-crush safety infrared sensors',
      'Centralized parking software with visitor management and audit logs'
    ],
    applications: [
      'Gated Villa Townships and Residential Communities',
      'Commercial Office Parking Basements',
      'Shopping Malls and Multiplexes',
      'Industrial and Logistics Parking Hubs'
    ],
    benefits: [
      'Hands-free barrier opening for registered resident and executive vehicles',
      'Eliminates vehicle bottlenecks during morning and evening rush hours',
      'Accurate real-time parking occupancy tracking and analytics',
      'Durable all-weather IP65 hardware'
    ],
    relatedCategoryIds: ['cat_industrial', 'cat_services'],
    sortOrder: 13,
    isFeatured: false
  },
  {
    id: 'srv_electrical_wiring',
    title: 'Electrical Wiring & Smart Integration Services',
    slug: 'electrical-wiring-integration-services',
    shortDescription: 'Conduit planning, smart DB dressing, structured CAT6/fiber cabling, on-site commissioning, and certified engineer support.',
    fullDescription: 'Flawless smart automation begins with proper electrical foundation. We provide end-to-end electrical design, conduit layout planning, smart distribution board (DB) dressing, structured CAT6/fiber networking, automation module testing, and post-handover engineer support for both new constructions and retrofits.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Wrench',
    keyFeatures: [
      'Architectural electrical conduit routing and junction box placement drawings',
      'Smart Automation Distribution Board (DB) dressing and DIN-rail wiring',
      'Structured high-speed CAT6A / Fiber Optic network cabling',
      'Pre-wiring testing, load balancing, and surge protection integration',
      'Certified automation engineers conduct system commissioning and testing'
    ],
    applications: [
      'New Villa and Bungalow Constructions',
      'Commercial Building Electrical Infrastructure',
      'Luxury Apartment Interior Fit-Outs',
      'Hospitality and Resort Electrical Architecture'
    ],
    benefits: [
      'Guarantees zero interference between high-voltage power and data buses',
      'Neat, labeled, and documented electrical distribution panels',
      'Ensures compliance with national electrical safety and grounding standards',
      'White-glove commissioning ensures all smart scenes work flawlessly'
    ],
    relatedCategoryIds: ['cat_services'],
    sortOrder: 14,
    isFeatured: false
  }
];

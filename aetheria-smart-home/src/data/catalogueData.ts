/**
 * Product Catalogue Database - Structured from KSH Catalogue
 * Concise and complete dataset representing every product model and variant as a separate product.
 */

import { Product, Category } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat_switches',
    name: 'Smart Switches & Touch Boards',
    slug: 'smart-switches',
    description: 'Titan modular switches, capacitive glass touch switchboards, scene controllers, and luxury wall panels.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    sortOrder: 1,
    isPublished: true,
    subcategories: [
      { id: 'sub_titan', name: 'Titan Smart Switches', slug: 'titan-smart-switches' },
      { id: 'sub_touch', name: 'Touch Smart Switches', slug: 'touch-smart-switches' },
      { id: 'sub_scene_knobs', name: 'Scene Controllers & Knobs', slug: 'scene-controllers-knobs' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_retrofit',
    name: 'Smart Retrofit Automation',
    slug: 'retrofit-automation',
    description: 'In-wall micro modules that fit behind standard switchboards, adding Zigbee & Wi-Fi app/voice control while keeping existing manual switches.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    sortOrder: 2,
    isPublished: true,
    subcategories: [
      { id: 'sub_retrofit_switch', name: 'Multi-Channel Retrofit Modules', slug: 'multi-channel-retrofit' },
      { id: 'sub_retrofit_curtain', name: 'Curtain Retrofit Modules', slug: 'curtain-retrofit' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_gateways',
    name: 'Smart Gateways & Hubs',
    slug: 'smart-gateways',
    description: 'Multi-protocol coordinators supporting Zigbee 3.0, Matter, Thread, Apple HomeKit, Bluetooth, LAN, PoE, and 4G backup.',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=800&q=80',
    sortOrder: 3,
    isPublished: true,
    subcategories: [
      { id: 'sub_wireless_gw', name: 'Wireless Gateways', slug: 'wireless-gateways' },
      { id: 'sub_wired_gw', name: 'Wired Pro Gateways', slug: 'wired-pro-gateways' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_display_panels',
    name: 'Smart Display & Touch Panels',
    slug: 'display-touch-panels',
    description: 'Centralized in-wall touchscreen consoles from 3.5-inch to 10-inch with built-in Zigbee gateway, IR blaster, audio, and HVAC climate controls.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    sortOrder: 4,
    isPublished: true,
    subcategories: [
      { id: 'sub_compact_display', name: '3.5" to 5" Display Panels', slug: 'compact-displays' },
      { id: 'sub_large_display', name: '6" to 10" Touch Panels', slug: 'large-touch-panels' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_lighting',
    name: 'Smart Architectural Lighting',
    slug: 'smart-lighting',
    description: 'Smart & non-smart downlights, COB spot lights, magnetic track systems, CCT tunable LED strips, drivers, and SMPS power supplies.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    sortOrder: 5,
    isPublished: true,
    subcategories: [
      { id: 'sub_downlights', name: 'Downlights & COB Spotlights', slug: 'downlights-cob' },
      { id: 'sub_led_strips', name: 'Smart LED Strip Combos', slug: 'smart-led-strips' },
      { id: 'sub_magnetic_tracks', name: 'Magnetic Track Lighting Systems', slug: 'magnetic-track-lighting' },
      { id: 'sub_drivers_smps', name: 'Smart Drivers & SMPS Supplies', slug: 'drivers-smps' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_curtains',
    name: 'Curtain & Shading Automation',
    slug: 'curtain-automation',
    description: 'Heavy-duty motorized curtain motors up to 80kg, DIY expandable tracks, custom motorized tracks, and multi-channel remotes.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sortOrder: 6,
    isPublished: true,
    subcategories: [
      { id: 'sub_curtain_motors', name: 'Smart Curtain Motors', slug: 'curtain-motors' },
      { id: 'sub_curtain_tracks', name: 'Motorized Curtain Tracks', slug: 'curtain-tracks' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_locks',
    name: 'Smart Door Locks',
    slug: 'smart-door-locks',
    description: 'High-security digital locks featuring 3D structured light facial recognition, palm vein unlock, biometric fingerprint, RFID, and video doorbell binding.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    sortOrder: 7,
    isPublished: true,
    subcategories: [
      { id: 'sub_face_locks', name: '3D Face Recognition Locks', slug: 'face-recognition-locks' },
      { id: 'sub_biometric_locks', name: 'Biometric & Push-Pull Locks', slug: 'biometric-locks' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_vdp',
    name: 'Video Door Phones & Intercom',
    slug: 'video-door-phones',
    description: 'High-definition 7-inch IPS touchscreen indoor units, 2MP wide-angle outdoor lobby stations with IC card, QR code, face ID, and mobile app integration.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    sortOrder: 8,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_security',
    name: 'Security & Surveillance',
    slug: 'security-surveillance',
    description: 'Comprehensive CCTV surveillance (PTZ, Dome, Eyeball, Thermal) and wireless Ajax intrusion alarm systems with photo verification and outdoor sirens.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    sortOrder: 9,
    isPublished: true,
    subcategories: [
      { id: 'sub_cctv', name: 'CCTV Surveillance Cameras', slug: 'cctv-cameras' },
      { id: 'sub_ajax_alarm', name: 'Ajax Burglar Alarm Ecosystem', slug: 'ajax-alarm-systems' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_entertainment',
    name: 'Home Entertainment & Multi-Room Audio',
    slug: 'home-entertainment',
    description: 'Custom home theatre design, acoustic planning, high-fidelity multi-room streaming audio, and centralized AV media automation.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    sortOrder: 10,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_glass',
    name: 'Smart Switchable Glass',
    slug: 'smart-switchable-glass',
    description: 'Instant electronic PDLC privacy glass transitioning from transparent to frosted via smartphone app, wall switch, remote, or voice commands.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sortOrder: 11,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_entrance',
    name: 'Entrance & Gate Automation',
    slug: 'entrance-automation',
    description: 'Motorized sliding gates, swing gates, rolling shutters, garage doors, automatic glass sliding doors, and residential boom barriers.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    sortOrder: 12,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_industrial',
    name: 'Industrial Access Control & Turnstiles',
    slug: 'industrial-access-control',
    description: 'Enterprise turnstiles, tripod gates, swing barrier gates, flap barriers, and heavy-duty parking & fencing boom barriers for commercial facilities.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    sortOrder: 13,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_pergola',
    name: 'Architectural Louvered Pergola',
    slug: 'louvered-pergola',
    description: 'Premium heavy-duty aluminum outdoor pergolas featuring motorized adjustable louvers, integrated linear LED illumination, frameless glass walls, and roller shades.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    sortOrder: 14,
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat_services',
    name: 'Electrical & Integration Services',
    slug: 'electrical-integration-services',
    description: 'Professional structured wiring, DB conduit planning, smart automation integration, testing, and parking management system deployment.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    sortOrder: 15,
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

// Helper to make clean standard objects quickly
function makeProduct(data: Partial<Product>): Product {
  return {
    id: data.id || '',
    name: data.name || '',
    slug: data.slug || '',
    sku: data.sku || '',
    categoryId: data.categoryId || '',
    categoryName: data.categoryName || '',
    subcategoryId: data.subcategoryId || '',
    subcategoryName: data.subcategoryName || '',
    brand: data.brand || 'KSH Systems',
    priceOnRequest: data.priceOnRequest !== false,
    shortDescription: data.shortDescription || '',
    description: data.description || '',
    images: data.images || ['IMAGE REQUIRES SOURCE ASSET'],
    features: data.features || [],
    specifications: data.specifications || [],
    protocol: data.protocol || 'Zigbee 3.0',
    status: 'active',
    rating: data.rating || 5,
    reviewCount: data.reviewCount || 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  };
}

export const initialProducts: Product[] = [
  // ==========================================
  // 1. SMART DOOR LOCKS
  // ==========================================
  makeProduct({
    id: 'prod_lock_s1',
    name: 'S1 Smart Door Lock',
    slug: 's1-smart-door-lock',
    sku: 'KSH-LOCK-S1',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_biometric_locks',
    shortDescription: 'High-security slim biometric door lock with semiconductor sensor.',
    description: 'S1 series digital smart lock engineered with precise biometric semiconductor fingerprint recognition, emergency mechanical overrides, and low power alert systems.',
    features: ['High-speed biometric scanner', 'Emergency mechanical cylinder', 'Anti-pry alarms', 'Low battery indication'],
    specifications: [{ key: 'Mortise', value: 'Standard Multi-point Mortise' }, { key: 'Power', value: '4x AA Alkaline' }, { key: 'Biometric Capacity', value: '100 Fingerprints' }],
    protocol: 'BLE'
  }),
  makeProduct({
    id: 'prod_lock_s2',
    name: 'S2 Smart Door Lock',
    slug: 's2-smart-door-lock',
    sku: 'KSH-LOCK-S2',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_biometric_locks',
    shortDescription: 'Premium biometric lock with virtual passcode protection.',
    description: 'S2 heavy-duty smart gate lock featuring semiconductor biometric readers, anti-peep decoy numeric passcode entry, and mechanical override keys.',
    features: ['Decoy decoy virtual passcode', 'Robust aluminum alloy chassis', 'Micro-USB backup power', 'Silent operation mode'],
    specifications: [{ key: 'Passcode Length', value: '6-12 Digits' }, { key: 'Emergency Power', value: '5V Micro-USB Port' }, { key: 'Users', value: 'Up to 300 Users' }],
    protocol: 'BLE'
  }),
  makeProduct({
    id: 'prod_lock_s3_pro',
    name: 'S3 Pro Smart Door Lock',
    slug: 's3-pro-smart-door-lock',
    sku: 'KSH-LOCK-S3PRO',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_face_locks',
    shortDescription: 'Flagship 3D structured light face recognition smart lock.',
    description: 'S3 Pro leverages sophisticated 3D structured light face recognition to map facial features with precision, allowing hands-free instantaneous unlocking.',
    features: ['3D Structured Light Facial Recognition', 'In-built video doorbell', 'Ultra-fast infrared dark-room mapping', 'Biometric vein reading'],
    specifications: [{ key: 'Face recognition speed', value: '< 1 second' }, { key: 'Operating Humidity', value: '10% - 93% RH' }, { key: 'Biometric False Rate', value: '< 0.0001%' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_lock_s3_pro_slim',
    name: 'S3 Pro Slim Smart Door Lock',
    slug: 's3-pro-slim-smart-door-lock',
    sku: 'KSH-LOCK-S3SLIM',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_face_locks',
    shortDescription: 'Ultra-thin architectural 3D face recognition smart lock.',
    description: 'Engineered for luxury narrow-frame doors. Features high-precision 3D structured light face scan and slim aesthetic profile.',
    features: ['Ultra-slim 45mm frame design', '3D structured light scan', 'Rechargeable lithium battery pack', 'Voice guidelines'],
    specifications: [{ key: 'Frame Width Compatibility', value: '>= 55mm narrow profiles' }, { key: 'Battery Capacity', value: '4200mAh Lithium' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_lock_s4',
    name: 'S4 Smart Door Lock',
    slug: 's4-smart-door-lock',
    sku: 'KSH-LOCK-S4',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_face_locks',
    shortDescription: 'Advanced biometric smart lock with digital video peephole.',
    description: 'High-end push-pull smart lock integrating biometric fingerprint, digital passcode, physical card, and a built-in high-definition screen.',
    features: ['Built-in HD internal screen', 'Push-pull fully automatic mechanism', 'Real-time video streaming', 'Tamper alarm notifications'],
    specifications: [{ key: 'Camera Resolution', value: '1080P Full HD' }, { key: 'Screen Size', value: '3.5-inch IPS Screen' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_lock_s4_pro',
    name: 'S4 Pro Smart Door Lock',
    slug: 's4-pro-smart-door-lock',
    sku: 'KSH-LOCK-S4PRO',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_face_locks',
    shortDescription: 'Flagship smart lock with 3D face recognition and live intercom.',
    description: 'S4 Pro is KSH flagship door security system, offering 3D facial authentication, continuous cloud recording, and bidirectional audio intercom.',
    features: ['3D Structured Light Facial Recognition', '2-Way Audio Intercom', 'Fully automatic mortise rotation', 'Emergency power override'],
    specifications: [{ key: 'Intercom Latency', value: '< 200ms' }, { key: 'Cylinder Level', value: 'Super C-Class Security' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_lock_k301',
    name: 'K301 Smart Door Lock',
    slug: 'k301-smart-door-lock',
    sku: 'KSH-LOCK-K301',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_biometric_locks',
    shortDescription: 'Industrial-grade dual-side biometric smart door lock.',
    description: 'A dual-sided fingerprint and PIN keypad door lock optimized for high-security commercial offices and residential main gates exposed to weather.',
    features: ['IP65 weather resistant structural design', 'Bi-directional fingerprint scanner', 'Heavy-duty steel bolt mortise'],
    specifications: [{ key: 'Ingress Protection', value: 'IP65 Rated' }, { key: 'Chassis Material', value: 'High Strength Steel alloy' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_lock_k703',
    name: 'K703 Smart Door Lock',
    slug: 'k703-smart-door-lock',
    sku: 'KSH-LOCK-K703',
    categoryId: 'cat_locks',
    categoryName: 'Smart Door Locks',
    subcategoryId: 'sub_biometric_locks',
    shortDescription: 'Architectural heavy-duty biometric lock with custom premium finishes.',
    description: 'Precision engineered smart lock featuring advanced semiconductor biometric, RFID cards, remote App controls, and a bespoke champagne gold finish.',
    features: ['Semiconductor fast fingerprint detection', 'Bespoke champagne gold coating', 'Real-time entry notifications'],
    specifications: [{ key: 'Biometric Error Rate', value: '0.001%' }, { key: 'RFID Standard', value: '13.56 MHz MiFare' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 2. SMART CURTAIN AUTOMATION
  // ==========================================
  makeProduct({
    id: 'prod_curtain_motor_12',
    name: 'Smart Curtain Motor (1.2Nm)',
    slug: 'smart-curtain-motor-1-2nm',
    sku: 'KSH-CURT-M12',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_motors',
    shortDescription: 'Whisper-quiet smart curtain motor with 1.2Nm torque capacity.',
    description: 'Quiet motorized curtain actuator with 1.2Nm output torque, supporting touch-start, obstacle stop, manual pull control, and precise position presets.',
    features: ['Touch-start manual override', 'Whisper-quiet silent motor (<30dB)', 'Obstacle jam safety automatic stop'],
    specifications: [{ key: 'Torque Output', value: '1.2Nm' }, { key: 'Speed', value: '14cm/s' }, { key: 'Weight Limit', value: '45kg Curtain weight' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_curtain_motor_15',
    name: 'Smart Curtain Motor (1.5Nm)',
    slug: 'smart-curtain-motor-1-5nm',
    sku: 'KSH-CURT-M15',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_motors',
    shortDescription: 'Heavy-duty whisper-quiet smart curtain motor with 1.5Nm torque.',
    description: 'Motorized curtain motor with 1.5Nm torque to actuate medium to heavy curtains. Supports percentage open/close configurations.',
    features: ['Percentage slider precise positioning', 'Internal thermal protection', 'Direct RF remote pairing'],
    specifications: [{ key: 'Torque Output', value: '1.5Nm' }, { key: 'Speed', value: '16cm/s' }, { key: 'Weight Limit', value: '60kg Curtain weight' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_curtain_motor_20',
    name: 'Smart Curtain Motor (2.0Nm)',
    slug: 'smart-curtain-motor-2-0nm',
    sku: 'KSH-CURT-M20',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_motors',
    shortDescription: 'Flagship industrial-grade smart curtain motor with 2.0Nm torque.',
    description: 'Bespoke high-capacity curtain actuator with 2.0Nm torque, designed for double-height ceilings, theatrical auditoriums, and grand banquet glass facades.',
    features: ['High-torque heavy duty operation', 'Manual power-cut release', 'Dual track drive support'],
    specifications: [{ key: 'Torque Output', value: '2.0Nm' }, { key: 'Speed', value: '12cm/s' }, { key: 'Weight Limit', value: '80kg Curtain weight' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_curtain_track_diy',
    name: 'DIY Smart Curtain Track',
    slug: 'diy-smart-curtain-track',
    sku: 'KSH-CURT-TDIY',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_tracks',
    shortDescription: 'Flexible expandable DIY smart curtain track bundle.',
    description: 'An expandable motorized curtain rail structure with quick-joint connector plates. Installs easily with basic tools without custom cutting.',
    features: ['Expandable track lengths up to 4.5m', 'Interlocking high-tensile joint bars', 'Stainless steel carrier run wheels'],
    specifications: [{ key: 'Maximum Length', value: '4.5 Meters' }, { key: 'Material', value: 'Anodized Extruded Aluminum' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_curtain_track_custom',
    name: 'Customized Smart Curtain Track',
    slug: 'customized-smart-curtain-track',
    sku: 'KSH-CURT-TCUST',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_tracks',
    shortDescription: 'Precision cut-to-measure premium smart curtain track.',
    description: 'Architectural heavy-duty motorized curtain track, custom engineered, milled, and curved on-site to fit double-height windows and bay corners.',
    features: ['Bespoke length and custom curve angles', 'Zero friction belt mechanics', 'Direct ceiling or wall bracket installation'],
    specifications: [{ key: 'Customizable Length', value: 'Up to 12.0 Meters' }, { key: 'Curves Supported', value: '90° and 135° Bay bends' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_curtain_motor_track',
    name: 'Smart Curtain Motor Track Package',
    slug: 'smart-curtain-motor-track-package',
    sku: 'KSH-CURT-MTP',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_tracks',
    shortDescription: 'Integrated custom track and 1.2Nm silent motor combo.',
    description: 'A pre-configured package combining a high-performance 1.2Nm smart curtain motor and custom track brackets.',
    features: ['Single-box complete package', 'Fully integrated remote coordination', 'Simple App registration'],
    specifications: [{ key: 'Motor Torque', value: '1.2Nm' }, { key: 'Available Options', value: 'One-side or Center partition opening' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_curtain_motor_track_diy',
    name: 'DIY Smart Curtain Motor Track Package',
    slug: 'diy-smart-curtain-motor-track-package',
    sku: 'KSH-CURT-MTPDIY',
    categoryId: 'cat_curtains',
    categoryName: 'Curtain & Shading Automation',
    subcategoryId: 'sub_curtain_tracks',
    shortDescription: 'All-in-one DIY box of expandable track and 1.5Nm motor.',
    description: 'Ready-to-assemble DIY modular package. Includes an expandable high-grade aluminum track and a high-torque 1.5Nm Zigbee motor.',
    features: ['No tools cutting required', 'High-quality timing belt inside', 'Voice command compatible'],
    specifications: [{ key: 'Expandable bounds', value: '2.0m to 5.2m' }, { key: 'Load capacity', value: '55kg maximum weight' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 3. SMART GATEWAYS & HUBS
  // ==========================================
  makeProduct({
    id: 'prod_gw_ble_64',
    name: 'Zigbee + BLE Gateway (64 Devices)',
    slug: 'zigbee-ble-gateway-64-devices',
    sku: 'KSH-GW-BLE64',
    categoryId: 'cat_gateways',
    categoryName: 'Smart Gateways & Hubs',
    subcategoryId: 'sub_wireless_gw',
    shortDescription: 'Compact wireless dual-protocol gateway supporting 64 accessory connections.',
    description: 'Dual band coordinator designed to seamlessly aggregate Zigbee 3.0 and Bluetooth Low Energy sensors and switches under one unified local API control.',
    features: ['Zigbee 3.0 & BLE Dual protocol support', 'Aggregates 64 device terminals', 'USB Type-C power input'],
    specifications: [{ key: 'Device capacity', value: '64 node connections' }, { key: 'Wireless protocol', value: '2.4GHz Wi-Fi, Zigbee 3.0, BLE' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_gw_wireless_adapter',
    name: 'Wireless Zigbee Adapter Gateway',
    slug: 'wireless-zigbee-adapter-gateway',
    sku: 'KSH-GW-WADAP',
    categoryId: 'cat_gateways',
    categoryName: 'Smart Gateways & Hubs',
    subcategoryId: 'sub_wireless_gw',
    shortDescription: 'Plug-and-play USB wireless Zigbee range adapter.',
    description: 'High-performance USB transceiver working as a coordinator or router extension, boosting signal range across vast luxury layouts.',
    features: ['Compact dongle format', 'Broad coverage up to 50 device endpoints', 'Auto mesh configuration'],
    specifications: [{ key: 'Hardware platform', value: 'EFR32MG21 High Gain module' }, { key: 'Transmit power', value: '20dBm' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_gw_pro_wired',
    name: 'Wired Zigbee Pro Gateway (100 Devices)',
    slug: 'wired-zigbee-pro-gateway-100-devices',
    sku: 'KSH-GW-PRO100',
    categoryId: 'cat_gateways',
    categoryName: 'Smart Gateways & Hubs',
    subcategoryId: 'sub_wired_gw',
    shortDescription: 'High-stability RJ45 wired local coordinator for 100 devices.',
    description: 'Industrial-grade wired Zigbee 3.0 coordinator equipped with high-speed RJ45 Ethernet connection, providing absolute reliability by bypassing local Wi-Fi congestion.',
    features: ['Direct RJ45 Ethernet connection', 'Up to 100 device configurations', 'Local automation engine'],
    specifications: [{ key: 'Device limit', value: '100 nodes' }, { key: 'Interface', value: 'RJ45 Fast Ethernet Port' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_gw_pro_plus',
    name: 'Wired Zigbee Pro+ Gateway (200 Devices)',
    slug: 'wired-zigbee-pro-plus-gateway-200-devices',
    sku: 'KSH-GW-PROPLUS',
    categoryId: 'cat_gateways',
    categoryName: 'Smart Gateways & Hubs',
    subcategoryId: 'sub_wired_gw',
    shortDescription: 'Enterprise local server with dual radio and Matter compatibility.',
    description: 'Enterprise wired server integrating Zigbee 3.0, Matter-over-Thread, and Apple HomeKit support, designed for grand architectural properties requiring zero-latency local operations.',
    features: ['Matter and Apple HomeKit compatibility', 'Support for 200 node devices', 'Dual-radio chip integration'],
    specifications: [{ key: 'Supported Nodes', value: '200 maximum' }, { key: 'CPU', value: 'ARM Cortex-A7 Quad-Core' }],
    protocol: 'Matter'
  }),
  makeProduct({
    id: 'prod_gw_pro_max',
    name: 'Wired Zigbee Pro Max Gateway',
    slug: 'wired-zigbee-pro-max-gateway',
    sku: 'KSH-GW-PROMAX',
    categoryId: 'cat_gateways',
    categoryName: 'Smart Gateways & Hubs',
    subcategoryId: 'sub_wired_gw',
    shortDescription: 'Flagship gateway with PoE, Thread, and 4G LTE cellular backup.',
    description: 'The definitive enterprise smart home gateway. Combines Power-over-Ethernet (PoE), massive 200 device coordination, local Zigbee & Thread, and 4G LTE SIM backup slots.',
    features: ['PoE 802.3af power delivery', '4G LTE micro SIM backup slot', 'Thread coordinator radio'],
    specifications: [{ key: 'Nodes limit', value: '200 active devices' }, { key: 'Backup connection', value: '4G LTE SIM fallback' }],
    protocol: 'Thread'
  }),

  // ==========================================
  // 4. SMART DISPLAY & TOUCH PANELS
  // ==========================================
  makeProduct({
    id: 'prod_panel_35_3b',
    name: '3.5-inch Display Touch Panel (3 Buttons)',
    slug: '3-5-inch-display-touch-panel-3-buttons',
    sku: 'KSH-PNL-353B',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_compact_display',
    shortDescription: 'Central wall console with 3.5" IPS screen and 3 mechanical buttons.',
    description: 'Hybrid in-wall console featuring a sleek 3.5-inch IPS touchscreen interface paired with 3 physical high-feedback scene pushbuttons.',
    features: ['IPS High density touch display', '3 Mechanical tactical buttons', 'Fits standard 86-type switch box'],
    specifications: [{ key: 'Screen Size', value: '3.5 inches' }, { key: 'Resolution', value: '480x480 Pixels' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_panel_35_4b',
    name: '3.5-inch Display Touch Panel (4 Buttons)',
    slug: '3-5-inch-display-touch-panel-4-buttons',
    sku: 'KSH-PNL-354B',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_compact_display',
    shortDescription: 'In-wall central controller with 3.5" screen and 4 mechanical buttons.',
    description: 'Modular central controller combining a 3.5" capacitive screen and 4 configurable tactile buttons for lightning fast physical scene execution.',
    features: ['4 Customizable tactile push-buttons', 'Capacitive responsive touchscreen', 'Integrated temperature sensor'],
    specifications: [{ key: 'Resolution', value: '480x480' }, { key: 'Input voltage', value: '220V AC' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_panel_4in',
    name: '4-inch Display Touch Panel',
    slug: '4-inch-display-touch-panel',
    sku: 'KSH-PNL-4IN',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_compact_display',
    shortDescription: 'In-wall capacitive 4-inch touch panel.',
    description: 'Frameless 4-inch high-density IPS touch panel. Controls HVAC thermostats, background multi-room music, curtains, and lighting scenes from one unified screen.',
    features: ['Frameless multi-touch screen', 'Built-in Zigbee Gateway chip', 'Dual 2W high-fidelity speaker output'],
    specifications: [{ key: 'Resolution', value: '480x480 IPS' }, { key: 'Audio output', value: '2x 2W Channels' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_panel_5in',
    name: '5-inch Display Touch Panel',
    slug: '5-inch-display-touch-panel',
    sku: 'KSH-PNL-5IN',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_compact_display',
    shortDescription: 'Bespoke rectangular 5-inch architectural touch screen.',
    description: 'Rectangular 5-inch smart home display with integrated Android operating system, background music control, and ambient light auto-dimming.',
    features: ['Rectangular format', 'Android OS with customizable interface', 'Ambient sensor auto-brightness'],
    specifications: [{ key: 'Screen aspect', value: '16:9 widescreen' }, { key: 'RAM/Storage', value: '1GB RAM / 8GB ROM' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_panel_6in',
    name: '6-inch Display Touch Panel',
    slug: '6-inch-display-touch-panel',
    sku: 'KSH-PNL-6IN',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_large_display',
    shortDescription: 'Luxury in-wall 6-inch smart console.',
    description: 'Architectural-grade 6-inch vertical wall mount control station, integrating thermostat controls, smart relays, and multi-zone background speaker drives.',
    features: ['Dual-channel 5A relay output onboard', 'Built-in digital microphone array', 'Wired RJ45 Ethernet backup option'],
    specifications: [{ key: 'Resolution', value: '720x1280 HD' }, { key: 'Power consumption', value: '<5W' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_panel_8in_knob',
    name: '8-inch Display Touch Panel (With Knob)',
    slug: '8-inch-display-touch-panel-with-knob',
    sku: 'KSH-PNL-8KNB',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_large_display',
    shortDescription: 'Central 8" console with a precision CNC aluminum rotary dial knob.',
    description: 'Flagship 8-inch high-resolution control panel featuring an integrated rotary encoder dial, allowing tactile analog adjustments for HVAC, volume, and dimming.',
    features: ['CNC milled aluminum rotary knob encoder', '1280x800 high definition display', 'Direct video intercom lobby station binding'],
    specifications: [{ key: 'Resolution', value: '1280x800' }, { key: 'Operating OS', value: 'Linux Secure RTOS' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_panel_8in_noknob',
    name: '8-inch Display Touch Panel (Without Knob)',
    slug: '8-inch-display-touch-panel-without-knob',
    sku: 'KSH-PNL-8NOK',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_large_display',
    shortDescription: 'Frameless 8-inch capacitive multi-touch wall screen.',
    description: 'All-glass ultra-slim 8-inch central screen for comprehensive video monitoring of CCTV feeds and control of home automation scenes.',
    features: ['Sleek all-glass flat touch interface', 'CCTV live RTSP feed aggregator', 'Multi-room intercom coordinator'],
    specifications: [{ key: 'Format', value: 'Landscape standard' }, { key: 'Ethernet', value: '1x RJ45 Port' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_panel_10in',
    name: '10-inch Flagship Display Touch Panel',
    slug: '10-inch-flagship-display-touch-panel',
    sku: 'KSH-PNL-10IN',
    categoryId: 'cat_display_panels',
    categoryName: 'Smart Display & Touch Panels',
    subcategoryId: 'sub_large_display',
    shortDescription: 'Ultimate 10.1" in-wall central command console.',
    description: 'The absolute pinnacle of wall automation terminals, a 10.1-inch IPS landscape panel running high-performance graphics to map your whole house layout.',
    features: ['Full-house visual floor plan mapping', 'HDMI output for secondary monitoring', 'High performance Octa-Core CPU'],
    specifications: [{ key: 'Screen Size', value: '10.1-inch diagonal' }, { key: 'Resolution', value: '1920x1200 Full HD' }],
    protocol: 'Wi-Fi'
  }),

  // ==========================================
  // 5. ARCHITECTURAL LIGHTING
  // ==========================================
  makeProduct({
    id: 'prod_light_deep_panel',
    name: 'Deep Panel Downlight',
    slug: 'deep-panel-downlight',
    sku: 'KSH-LGT-DPNL',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Architectural recessed deep glare-cut panel light.',
    description: 'Specially recessed panel design that limits direct visual sight of the LED chip, eliminating eye strain while providing clean ambient lighting.',
    features: ['Deep-set glare cut design', 'High CRI > 90', 'Premium aluminum casing'],
    specifications: [{ key: 'Power Options', value: '12W / 18W / 24W' }, { key: 'Color Temp', value: '3000K / 4000K / 6000K' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_glowria',
    name: 'Glowria COB Spotlight',
    slug: 'glowria-cob-spotlight',
    sku: 'KSH-LGT-GLWR',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'High-performance architectural COB spotlight with precise optics.',
    description: 'Bespoke spotlight designed for gallery walls and texture projection, featuring a modular lens system and a heavy-duty heat sink structure.',
    features: ['High-precision focus lens', '360 degree rotatable axis', 'Perfect color consistency'],
    specifications: [{ key: 'CRI', value: '95 Ra' }, { key: 'Beam angle', value: '15° / 24° / 36°' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_glowon',
    name: 'Glowon Recessed Downlight',
    slug: 'glowon-recessed-downlight',
    sku: 'KSH-LGT-GLWON',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Bespoke circular deep recessed spotlight.',
    description: 'A luxurious deep recessed downlight with black baffle architecture to offer completely glare-free illumination for luxury corridors and lobbies.',
    features: ['Low UGR < 13 glare-free control', 'Sleek black architectural inner baffle', 'Die-cast aluminum frame'],
    specifications: [{ key: 'Power', value: '8W / 12W' }, { key: 'Cutout', value: '75mm standard' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_shineo',
    name: 'Shineo Anti-Glare Spotlight',
    slug: 'shineo-anti-glare-spotlight',
    sku: 'KSH-LGT-SHINEO',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Advanced low-glare commercial grade spotlight.',
    description: 'Shineo is engineered with custom micro-reflector optics, maximizing luminous flux output while keeping the light source completely comfortable to look at.',
    features: ['Premium micro-reflectors', 'High lumen efficiency', 'IP44 rated protection'],
    specifications: [{ key: 'Efficiency', value: '110 lm/W' }, { key: 'IP Rating', value: 'IP44' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_spira',
    name: 'Spira Architectural Downlight',
    slug: 'spira-architectural-downlight',
    sku: 'KSH-LGT-SPIRA',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Bespoke curved bezel deep recessed spot.',
    description: 'Bespoke lighting designed to integrate into smooth gypsum ceiling systems, offering beautiful circular gradients on walls without visible rims.',
    features: ['Curved bezelless bezel integration', 'High CRI > 92', 'Optimal passive heat sink'],
    specifications: [{ key: 'Milling', value: 'Bezelless mud-in frame' }, { key: 'Power limits', value: '10W / 15W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_nova',
    name: 'Nova Precision COB Spot',
    slug: 'nova-precision-cob-spot',
    sku: 'KSH-LGT-NOVA',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'High CRI 98 precision COB spotlight.',
    description: 'A flagship premium spotlight intended for luxury showrooms, hotels, and high-end residences where perfect color reproduction is mandatory.',
    features: ['Ultra high CRI 98 Ra', 'Anodized gold and black interior reflectors', 'Zero-flicker performance'],
    specifications: [{ key: 'CRI Rating', value: '98 Ra' }, { key: 'Luminous consistency', value: '2-Step MacAdam Ellipse' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_sharpx',
    name: 'Sharpx High-CRI Spot',
    slug: 'sharpx-high-cri-spot',
    sku: 'KSH-LGT-SHRPX',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Narrow-beam high CRI spotlight.',
    description: 'A sharp, narrow beam spotlight that creates a clean dramatic cone of light, perfect for highlighting sculptures, dining tables, or focal points.',
    features: ['Super narrow 10 degree beam angle option', 'Adjustable dynamic optic filters', 'Rugged textured paint casing'],
    specifications: [{ key: 'Beam Option', value: '10° / 15°' }, { key: 'CRI', value: '95 Ra' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_prism',
    name: 'Prism Multi-Faceted Downlight',
    slug: 'prism-multi-faceted-downlight',
    sku: 'KSH-LGT-PRISM',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Multi-faceted architectural low-glare spotlight.',
    description: 'Prism uses a segmented reflector array to project uniform, shadow-free beams of light, making it ideal for luxurious reception halls and open lounges.',
    features: ['Segmented faceted reflector core', 'Excellent color uniformity', 'Simple snap-fit installation'],
    specifications: [{ key: 'Reflector', value: 'Faceted polycarbonate' }, { key: 'Wattage', value: '12W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_glowlust',
    name: 'Glowlust Luxury Downlight',
    slug: 'glowlust-luxury-downlight',
    sku: 'KSH-LGT-GWLST',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'High-end hospitality trimless architectural spotlight.',
    description: 'Designed for absolute luxury. Fits seamlessly trimless into the ceiling plaster, offering elegant lighting with zero visible frame margins.',
    features: ['Mud-in trimless plaster design', 'Warm-dimming tech support', 'Anti-dust protection sleeve'],
    specifications: [{ key: 'Mounting', value: 'Trimless Gypsum Mud-in' }, { key: 'Power options', value: '10W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_pinhole',
    name: 'Pinhole Laser Mini-Spot',
    slug: 'pinhole-laser-mini-spot',
    sku: 'KSH-LGT-PNHL',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Tiny 1-inch aperture pinhole recessed spotlight.',
    description: 'Creates high drama. The light source is invisible, projecting a razor-sharp beam of light through a tiny 1-inch (25mm) ceiling aperture.',
    features: ['Tiny 1-inch visible aperture', 'Completely hidden ceiling profile', 'Ultra narrow focus cone'],
    specifications: [{ key: 'Cutout size', value: '30mm' }, { key: 'Wattage', value: '3W / 5W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_tiltable',
    name: 'Tiltable Laser Adjustable Spot',
    slug: 'tiltable-laser-adjustable-spot',
    sku: 'KSH-LGT-TLTL',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Mini adjustable laser spot with 30-degree tilt axis.',
    description: 'Miniature pinhole adjustable spot light with a 30-degree gimbal tilt. Perfect for angled walls, paintings, and focal display alcoves.',
    features: ['30 degree smooth gimbal tilt axis', 'Invisible recessed source technology', 'Precise focus beam'],
    specifications: [{ key: 'Tilt Range', value: '0° - 30°' }, { key: 'Aperture', value: '35mm' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_slimo',
    name: 'Slimo Trimless Flush-Mount Downlight',
    slug: 'slimo-trimless-flush-mount-downlight',
    sku: 'KSH-LGT-SLMO',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Sleek trimless flush-mount spotlight with linear aesthetic.',
    description: 'Extremely thin, low-profile trimless downlight designed to integrate flush into modular linear wooden ceilings or standard gypsum panels.',
    features: ['Zero-bezel trimless flush mount', 'Extremely slim outer casing', 'Uniform light diffusion'],
    specifications: [{ key: 'Thickness', value: '38mm ultra-low' }, { key: 'Cutout', value: '70mm' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_surface_cylinder',
    name: 'Surface Cylinder Light',
    slug: 'surface-cylinder-light',
    sku: 'KSH-LGT-SCYL',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Premium ceiling-mounted cylinder spotlight.',
    description: 'Sleek cylindrical spotlight designed for concrete or wooden ceilings where recessed downlights are physically impossible to install.',
    features: ['Direct ceiling surface mount', 'Minimalist architectural cylinder body', 'High purity aluminum construction'],
    specifications: [{ key: 'Mounting Type', value: 'Surface Mount' }, { key: 'Dimensions', value: '60mm x 150mm' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_light_luma_drop',
    name: 'Luma Drop Suspended Pendant Light',
    slug: 'luma-drop-suspended-pendant-light',
    sku: 'KSH-LGT-LDROP',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_downlights',
    shortDescription: 'Luxury suspended linear pendant spotlight.',
    description: 'An elegant suspended pencil pendant spot, providing custom direct spotlighting over dining counters, bars, and premium executive desks.',
    features: ['Sleek suspended wire structure', 'Adjustable suspension height up to 1.5m', 'Minimalist glare-free reflector lens'],
    specifications: [{ key: 'Length', value: '300mm / 500mm' }, { key: 'Diameter', value: '32mm pencil slim' }],
    protocol: 'Non-Smart'
  }),

  // ==========================================
  // 6. SMART LED STRIPS & COMBOS
  // ==========================================
  makeProduct({
    id: 'prod_strip_5m_cct',
    name: '5m CCT Tunable LED Strip Combo',
    slug: '5m-cct-tunable-led-strip-combo',
    sku: 'KSH-STP-5MCCT',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_led_strips',
    shortDescription: 'Smart CCT tunable (2700K - 6500K) 5m LED strip kit with power supply.',
    description: 'Complete plug-and-play smart kit including a 5-meter high-density COB CCT LED strip, a Zigbee driver, and a certified 24V power supply unit.',
    features: ['Smooth CCT Tunable (2700K to 6500K)', 'Seamless dot-free COB technology', 'All-in-one boxed kit'],
    specifications: [{ key: 'Length', value: '5.0 Meters' }, { key: 'LED Density', value: '640 LEDs/m' }, { key: 'Power Consumption', value: '14W/m' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_strip_10m_cct',
    name: '10m CCT Tunable LED Strip Combo',
    slug: '10m-cct-tunable-led-strip-combo',
    sku: 'KSH-STP-10MCCT',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_led_strips',
    shortDescription: 'Smart CCT tunable (2700K-6500K) 10m LED strip kit with driver.',
    description: 'Premium dual-injection 10m CCT tunable COB strip bundle. Provides continuous high-lumen dot-free lighting for architectural tray ceilings.',
    features: ['10m continuous run with zero voltage drop', 'Seamless CCT tuning', 'Professional heavy-duty power box'],
    specifications: [{ key: 'Length', value: '10.0 Meters' }, { key: 'Voltage Input', value: '24V DC' }, { key: 'CRI', value: '90 Ra' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_strip_5m_rgbcct',
    name: '5m RGB+CCT Tunable LED Strip Combo',
    slug: '5m-rgbcct-tunable-led-strip-combo',
    sku: 'KSH-STP-5MRGBCCT',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_led_strips',
    shortDescription: 'Smart RGB + CCT Tunable (16 Million Colors) 5m LED strip kit.',
    description: 'Ultimate color and ambient mood kit, featuring 16 million colors plus dedicated, tunable warm-to-cool white LED chips for architectural applications.',
    features: ['16 Million color choices plus clean whites', 'Sync with music and screen colors', 'Complete smart driver and 100W SMPS boxed'],
    specifications: [{ key: 'Length', value: '5.0 Meters' }, { key: 'CCT Range', value: '2200K - 6500K' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_strip_10m_rgbcct',
    name: '10m RGB+CCT Tunable LED Strip Combo',
    slug: '10m-rgbcct-tunable-led-strip-combo',
    sku: 'KSH-STP-10MRGBCCT',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_led_strips',
    shortDescription: 'Smart RGB + CCT Tunable (16 Million Colors) 10m LED strip kit.',
    description: 'Double-length flagship color and architectural white COB lighting kit. Designed for home theatres, banquet trays, and vast facades.',
    features: ['10m high density RGB+CCT', 'Zero visible color fading', 'Dual-driver heavy-duty control pack'],
    specifications: [{ key: 'Length', value: '10.0 Meters' }, { key: 'SMPS Power', value: '200W Output' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 7. SMART DRIVERS, CONTROLLERS & SMPS
  // ==========================================
  makeProduct({
    id: 'prod_driver_cob',
    name: 'Smart Tunable COB Driver',
    slug: 'smart-tunable-cob-driver',
    sku: 'KSH-DRV-COB',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_drivers_smps',
    shortDescription: 'Smart Zigbee constant current tunable downlight driver.',
    description: 'Advanced constant-current dimmable and CCT tunable smart driver, compatible with non-smart COB spotlights to enable complete smart functionality.',
    features: ['Constant current output adjustment', 'Flicker-free deep dimming to 0.1%', 'Soft start/stop transition'],
    specifications: [{ key: 'Input', value: '180V - 240V AC' }, { key: 'Output', value: '250mA - 700mA DC (Selectable)' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_driver_dip',
    name: 'CCT Tunable & Dimmable DIP Driver',
    slug: 'cct-tunable-dimmable-dip-driver',
    sku: 'KSH-DRV-DIP',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_drivers_smps',
    shortDescription: 'Smart LED driver with physical DIP switches for current selection.',
    description: 'Highly versatile smart driver featuring physical DIP switches to configure output current, designed to match various premium COB lights.',
    features: ['DIP switches for multiple mA outputs', 'Deep dimming capabilities', 'Integrated over-voltage safeguards'],
    specifications: [{ key: 'mA Selection', value: '150mA / 250mA / 350mA / 500mA' }, { key: 'Dimming range', value: '0.1% - 100%' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_controller_led',
    name: 'Smart Tunable LED Controller',
    slug: 'smart-tunable-led-controller',
    sku: 'KSH-CTRL-LED',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_drivers_smps',
    shortDescription: 'Multi-protocol low-voltage smart LED strip controller.',
    description: 'High-capacity low-voltage (5V-24V DC) LED strip controller. Automates standard analog CCT or RGB LED strips with smartphone app/voice controls.',
    features: ['Supports CCT, RGB, and RGBW analog strips', 'Sleek push-terminal wire connectors', 'Local group mesh controls'],
    specifications: [{ key: 'Input Voltage', value: '5V - 24V DC' }, { key: 'Output Current', value: '6A per Channel (Max 15A total)' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_smps_100w',
    name: '24V 100W Smart Zigbee CCT SMPS',
    slug: '24v-100w-smart-zigbee-cct-smps',
    sku: 'KSH-SMPS-100W',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_drivers_smps',
    shortDescription: 'Integrated 100W smart transformer power supply.',
    description: 'A revolutionary integrated metal cage power supply unit combining a high-efficiency 100W SMPS transformer and a Zigbee CCT controller inside one module.',
    features: ['Integrated SMPS and CCT Controller', 'No separate controller wiring needed', 'Silent coil-free operation'],
    specifications: [{ key: 'Power Output', value: '100W, 24V DC' }, { key: 'Efficiency', value: '89%' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_smps_200w',
    name: '24V 200W Smart Zigbee CCT SMPS',
    slug: '24v-200w-smart-zigbee-cct-smps',
    sku: 'KSH-SMPS-200W',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_drivers_smps',
    shortDescription: 'Integrated 200W smart transformer power supply.',
    description: 'High-capacity 200W smart transformer designed to power double-run LED strips, with complete integrated Zigbee dimming and color temperature controls.',
    features: ['Heavy-duty steel mesh cage', 'Integrated 200W SMPS and CCT driver', 'Smart overload and short-circuit recovery'],
    specifications: [{ key: 'Power Output', value: '200W, 24V DC' }, { key: 'Active Cooling', value: 'Fanless passive dissipation' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 8. MAGNETIC TRACK LIGHTING SYSTEMS
  // ==========================================
  makeProduct({
    id: 'prod_mag_linear',
    name: 'Magnetic Linear Diffused Light',
    slug: 'magnetic-linear-diffused-light',
    sku: 'KSH-MAG-LIND',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Sleek 48V magnetic linear track module with diffuse lens.',
    description: 'Snaps instantly into 48V magnetic track profiles, providing clean, uniform ambient light over large spaces.',
    features: ['Tool-free magnetic click mounting', 'Seamless diffused lens', 'Safe 48V low voltage operation'],
    specifications: [{ key: 'Input Voltage', value: '48V DC' }, { key: 'Power', value: '15W / 30W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_mag_spot',
    name: 'Magnetic Track Spot Light',
    slug: 'magnetic-track-spot-light',
    sku: 'KSH-MAG-SPOT',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Gimbal rotatable 48V magnetic track spotlight.',
    description: 'Snaps into magnetic track rails. Features a full 360° rotation and 90° tilt gimbal to precisely light up art pieces.',
    features: ['360° dynamic rotation', 'Instant magnetic snap action', 'Interchangeable baffle colors'],
    specifications: [{ key: 'Power Options', value: '10W / 18W' }, { key: 'Beam Angle', value: '24° / 36°' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_mag_rotatable',
    name: 'Rotatable Round Grille Spot Module',
    slug: 'rotatable-round-grille-spot-module',
    sku: 'KSH-MAG-RGRIL',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Multi-head rotatable track grille module.',
    description: 'Magnetic track insert comprising multiple independent gimbal-controlled round spotlight heads, offering perfect accent lighting.',
    features: ['Independently adjustable spotlight heads', 'High CRI > 93', 'Compact track snap profile'],
    specifications: [{ key: 'Heads count', value: '5-Heads / 10-Heads' }, { key: 'Power', value: '12W / 24W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_mag_elfin',
    name: 'Elfin Spot Module',
    slug: 'elfin-spot-module',
    sku: 'KSH-MAG-ELFIN',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Micro miniature magnetic track spot module.',
    description: 'Designed for absolute minimalism. Provides an extremely compact spot light footprint that sits almost completely flush inside the track profile.',
    features: ['Aesthetic micro-compact body', 'Instant snap-fit mechanism', 'Anti-glare black baffles'],
    specifications: [{ key: 'Dimensions', value: '30mm x 55mm' }, { key: 'Wattage', value: '6W' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_mag_folded',
    name: 'Folded Grille Round Spot Module',
    slug: 'folded-grille-round-spot-module',
    sku: 'KSH-MAG-FOLD',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Hinged pull-out magnetic track spot module.',
    description: 'Snaps into magnetic tracks and features a hinged folding arm. Pulls out and tilts to transform from flat downlight to angled spot.',
    features: ['Unique hinged fold-out arm', 'Multi-directional focus angles', 'Uniform glare-free light grids'],
    specifications: [{ key: 'Power', value: '10W' }, { key: 'Gimbal tilt bounds', value: '0° to 110°' }],
    protocol: 'Non-Smart'
  }),
  makeProduct({
    id: 'prod_mag_profile_surface',
    name: 'Ultra Thin Surface Track Profile',
    slug: 'ultra-thin-surface-track-profile',
    sku: 'KSH-MAG-PRSURF',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Low profile surface mount magnetic track rail.',
    description: 'Surface-mounted anodized black magnetic track rail. Features an ultra-thin 5mm visible profile for a clean modern aesthetic.',
    features: ['Ultra-low 5.5mm visible thickness', 'Robust extruded aluminum construction', 'Integrated copper conductor strip'],
    specifications: [{ key: 'Length Options', value: '1m / 2m / 3m' }, { key: 'Color', value: 'Satin Black anodized' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_mag_profile_recessed',
    name: 'Ultra Thin Recessed Track Profile',
    slug: 'ultra-thin-recessed-track-profile',
    sku: 'KSH-MAG-PRREC',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Trimless mud-in recessed magnetic track profile.',
    description: 'Trimless recessed magnetic track rail. Installs into gypsum ceilings to provide a completely flush linear light track.',
    features: ['Plaster-in trimless mud margin', 'Perfect flush visual integration', 'Heavy-duty suspension supports'],
    specifications: [{ key: 'Track Width', value: '26mm standard slot' }, { key: 'Finish', value: 'Sanded Black' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_mag_profile_20mm',
    name: '20mm Magnetic Track Profile',
    slug: '20mm-magnetic-track-profile',
    sku: 'KSH-MAG-PR20',
    categoryId: 'cat_lighting',
    categoryName: 'Smart Architectural Lighting',
    subcategoryId: 'sub_magnetic_tracks',
    shortDescription: 'Super slim 20mm width magnetic track profile.',
    description: 'Sleek, super-slim 20mm slot magnetic track rail, perfect for vertical wall-to-ceiling runs and modern residential designs.',
    features: ['Super slim 20mm structural slot', 'Sleek miniature look', 'High load magnetic grip'],
    specifications: [{ key: 'Width', value: '20mm slot' }, { key: 'Conductors', value: 'Dual solid copper lines' }],
    protocol: 'Manual'
  }),

  // ==========================================
  // 9. TITAN MODULAR SWITCHES (First Class)
  // ==========================================
  makeProduct({
    id: 'prod_titan_socket_only',
    name: 'Titan Socket Only (2M)',
    slug: 'titan-socket-only-2m',
    sku: 'KSH-TITAN-SO2M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular 2M power socket panel with integrated safety lock.',
    description: 'A dedicated 2-Module power socket panel with electronic shutter locks and status indicators.',
    features: ['Auto-closing safety shutter', 'Manual bypass switch', 'Soft glow status indicator'],
    specifications: [{ key: 'Form Factor', value: '2 Module' }, { key: 'Socket Rating', value: '16A High Load' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Polycarbonate', price: 4490 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_knob_only',
    name: 'Titan Knob Only (2M)',
    slug: 'titan-knob-only-2m',
    sku: 'KSH-TITAN-KO2M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular 2M precision rotary dimmer dial panel.',
    description: 'A standalone stepless rotary dimmer knob panel for light level or fan speed regulation.',
    features: ['CNC aluminum dial', 'Amber backlit scale', 'Integrated press on/off button'],
    specifications: [{ key: 'Form Factor', value: '2 Module' }, { key: 'Control Type', value: 'Stepless Digital Rotary' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Polycarbonate', price: 14490 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_4s_1sk',
    name: 'Titan Smart Switch (4S + 1SK)',
    slug: 'titan-smart-switch-4s-1sk',
    sku: 'KSH-TITAN-4S1S',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular switchboard featuring 4 smart switches and 1 socket.',
    description: 'Bespoke modular plate designed to fit standard Indian backboxes, combining 4 high-feedback smart relays and 1 integrated socket with automated power safety checks.',
    features: ['4 Independent smart switch actuators', '1 Dedicated high-load socket with auto-shutoff', 'LED backlight buttons'],
    specifications: [{ key: 'Configuration', value: '4 Switches + 1 Socket' }, { key: 'Load Rating', value: '10A per switch / 16A socket' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 19999 },
      { id: 'v2', name: 'Polycarbonate', price: 15799 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_6s_1sk',
    name: 'Titan Smart Switch (6S + 1SK)',
    slug: 'titan-smart-switch-6s-1sk',
    sku: 'KSH-TITAN-6S1S',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular switchboard with 6 smart switches and 1 socket.',
    description: 'Expanded plate for larger rooms, incorporating 6 programmable relays for lights/fans and 1 premium modular power socket.',
    features: ['6 Tactile feedback relays', '1 Heavy load socket integrated', 'Overload automatic break safety'],
    specifications: [{ key: 'Configuration', value: '6 Switches + 1 Socket' }, { key: 'Backbox size', value: 'Standard 8-Module horizontal' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 20499 },
      { id: 'v2', name: 'Polycarbonate', price: 16299 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_8s',
    name: 'Titan Smart Switch (8S)',
    slug: 'titan-smart-switch-8s',
    sku: 'KSH-TITAN-8S',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular smart switchboard with 8 independent relays.',
    description: 'High capacity 8-relay tactile switchboard designed for grand master bedrooms, managing extensive downlight circuits and dimmers.',
    features: ['8 Smart switches on a single plate', 'Laser-etched button symbols on request', 'Multi-tap scene integration'],
    specifications: [{ key: 'Switches', value: '8 Relays' }, { key: 'Voltage', value: '110V - 240V AC' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 22699 },
      { id: 'v2', name: 'Polycarbonate', price: 18499 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_8s_knob',
    name: 'Titan Smart Switch (8S + Knob)',
    slug: 'titan-smart-switch-8s-knob',
    sku: 'KSH-TITAN-8SKNB',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Modular plate with 8 smart switches and 1 rotary dial.',
    description: 'Luxe tactile switchboard integrating 8 independent switches and 1 CNC-machined metal rotary dial knob to dim lights or regulate fan speed.',
    features: ['CNC metal rotary encoder knob', '8 Independent smart relays', 'Multi-level LED dimming level indicators'],
    specifications: [{ key: 'Rotary Dial', value: 'Stepless Digital Encoder' }, { key: 'Fan speed steps', value: '5 Levels regulated' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 24599 },
      { id: 'v2', name: 'Polycarbonate', price: 20399 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_10s_knob',
    name: 'Titan Smart Switch (10S + Knob)',
    slug: 'titan-smart-switch-10s-knob',
    sku: 'KSH-TITAN-10SK',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Luxury plate with 10 switches and a precision rotary dial.',
    description: 'Designed for flagship living room layouts, combining 10 switches and a tactile rotary knob to manage extensive architectural lighting zones.',
    features: ['10 Programmable tactile relays', 'CNC finished rotary dial', 'Laser engraved custom text'],
    specifications: [{ key: 'Relays', value: '10 independent channels' }, { key: 'Switching load', value: 'Max 2200W total capacity' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 4,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 25099 },
      { id: 'v2', name: 'Polycarbonate', price: 20899 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_12s_knob',
    name: 'Titan Smart Switch (12S + Knob)',
    slug: 'titan-smart-switch-12s-knob',
    sku: 'KSH-TITAN-12SK',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Ultimate 12-switch plate with precision rotary dial.',
    description: 'Master switch panel designed for grand entrance foyers and media rooms, featuring 12 physical toggle actions and 1 stepless analog dial.',
    features: ['12 Smart mechanical toggles', 'CNC machined dial regulator', 'Instant scene mapping with double clicks'],
    specifications: [{ key: 'Module Size', value: '12 Module standard backbox' }, { key: 'Backlight Color', value: 'Soft blue / amber adjustable' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 5,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 39999 },
      { id: 'v2', name: 'Polycarbonate', price: 33499 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_14s_knob',
    name: 'Titan Smart Switch (14S + Knob)',
    slug: 'titan-smart-switch-14s-knob',
    sku: 'KSH-TITAN-14SK',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Expansive 14-switch modular smart board.',
    description: 'An expansive architectural control plate. Features 14 mechanical switches and a stepless dimmer rotary dial for absolute room coordination.',
    features: ['14 Dynamic smart relays', 'Precision dial for CCT/Volume', 'Custom icons for zero guesswork'],
    specifications: [{ key: 'Switch Capacity', value: '14 Channels' }, { key: 'Mortise Match', value: '16 Module plate' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 5,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 40399 },
      { id: 'v2', name: 'Polycarbonate', price: 34099 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_16s_knob',
    name: 'Titan Smart Switch (16S + Knob)',
    slug: 'titan-smart-switch-16s-knob',
    sku: 'KSH-TITAN-16SK',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Massive master room 16-switch smart board.',
    description: 'High density smart board equipped with 16 mechanical click relays and a digital rotary knob, managing all ceiling and accent lights in expansive luxury suites.',
    features: ['16 Heavy duty relays onboard', 'Tactile dial with status ring', 'Total group scenario control'],
    specifications: [{ key: 'Power rating', value: 'Max 16A high-power relays' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 5,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 40899 },
      { id: 'v2', name: 'Polycarbonate', price: 34599 }
    ]
  }),
  makeProduct({
    id: 'prod_titan_18s',
    name: 'Titan Smart Switch (18S)',
    slug: 'titan-smart-switch-18s',
    sku: 'KSH-TITAN-18S',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_titan',
    shortDescription: 'Ultimate grand hall 18-switch smart board.',
    description: 'Our largest modular smart plate. Features 18 distinct high-feedback physical switches, ideal for high-end home theaters and commercial showrooms.',
    features: ['18 High-feedback mechanical switches', 'Master switch "All Off" option', 'Complete status feedback LED array'],
    specifications: [{ key: 'Form Factor', value: '18 Module grand horizontal plate' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 5,
    bodyColors: ['Aluminum Silver', 'Polycarbonate White'],
    variants: [
      { id: 'v1', name: 'Aluminum', price: 39499 },
      { id: 'v2', name: 'Polycarbonate', price: 33199 }
    ]
  }),

  // ==========================================
  // 10. GLASS TOUCH SMART SWITCHES (First Class)
  // ==========================================
  makeProduct({
    id: 'prod_touch_glass_2m',
    name: '2M Touch Smart Switch',
    slug: '2m-touch-smart-switch',
    sku: 'KSH-TOUCH-2M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_touch',
    shortDescription: 'Capacitive crystal glass 2-button touch smart switch.',
    description: 'Luxe crystal glass capacitive 2-switch touch panel designed to fit Indian 2M boxes, offering responsive backlight triggers.',
    features: ['Toughened capacitive crystal glass', 'Multiple configurations (Switches, Fan, Curtain)', 'Configurable blue/red LED backlight indicators'],
    specifications: [{ key: 'Form Factor', value: '2 Module Plate' }, { key: 'Glass Type', value: 'Toughened 4mm Tempered' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 7,
    colors: ['White Glass', 'Black Glass', 'Gray Glass', 'Gold Glass'],
    variants: [
      { id: 'v1', name: '4S (4 Switches)', price: 9199 },
      { id: 'v2', name: '2S+1C (2 Switches + 1 Curtain)', price: 9199 },
      { id: 'v3', name: '2C (2 Curtain)', price: 9199 },
      { id: 'v4', name: '2S+1F (2 Switches + 1 Fan)', price: 9599 },
      { id: 'v5', name: '1C+1F (1 Curtain + 1 Fan)', price: 9599 }
    ]
  }),
  makeProduct({
    id: 'prod_touch_glass_4m',
    name: '4M Touch Smart Switch',
    slug: '4m-touch-smart-switch',
    sku: 'KSH-TOUCH-4M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_touch',
    shortDescription: 'Capacitive crystal glass 4-button touch smart switch.',
    description: 'Toughened tempered glass panel with multiple configurations, designed for standard 4-module in-wall metal boxes.',
    features: ['Capacitive touch sensors with backlight', 'Scratch and water resistant glass', 'Over-current fuse protection'],
    specifications: [{ key: 'Form Factor', value: '4 Module Plate' }, { key: 'Dimensions', value: '135mm x 86mm' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 7,
    colors: ['White Glass', 'Black Glass', 'Gray Glass', 'Gold Glass'],
    variants: [
      { id: 'v1', name: '8S (8 Switches)', price: 11999 },
      { id: 'v2', name: '4S+1SK (4 Switches + 1 Socket)', price: 11699 },
      { id: 'v3', name: '2S+1C+1SK (2 Switches + 1 Curtain + 1 Socket)', price: 11699 },
      { id: 'v4', name: '2C+1SK (2 Curtains + 1 Socket)', price: 11699 },
      { id: 'v5', name: '6S+1C (6 Switches + 1 Curtain)', price: 11999 },
      { id: 'v6', name: '4S+2C (4 Switches + 2 Curtain)', price: 11999 },
      { id: 'v7', name: '2S+1F+1SK (2 Switches + 1 Fan + 1 Socket)', price: 11999 },
      { id: 'v8', name: '1F+1C+1SK (1 Fan + 1 Curtain + 1 Socket)', price: 11999 },
      { id: 'v9', name: '4S+1F+1C (4 Switches + 1 Fan + 1 Curtain)', price: 12399 },
      { id: 'v10', name: '4S+2F (4 Switches + 2 Fans)', price: 12999 },
      { id: 'v11', name: '2F+2C (2 Fans + 2 Curtains)', price: 12999 },
      { id: 'v12', name: '2S+2F+1C (2 Switches + 2 Fans + 1 Curtain)', price: 12999 },
      { id: 'v13', name: '2S+1F+2C (2 Switches + 1 Fan + 2 Curtains)', price: 12399 },
      { id: 'v14', name: '6S+1F (6 Switches + 1 Fan)', price: 12399 }
    ]
  }),
  makeProduct({
    id: 'prod_touch_glass_6m',
    name: '6M/8M Touch Smart Switch',
    slug: '6m-touch-smart-switch',
    sku: 'KSH-TOUCH-6M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_touch',
    shortDescription: 'Capacitive crystal glass 6M/8M touch smart switch.',
    description: 'Elegant capacitive touch console. Accommodates multi-button configurations behind beautiful tempered glass.',
    features: ['Capacitive feedback touch points', 'Sleek glass finishes', 'Direct Wi-Fi / Zigbee dual chip options'],
    specifications: [{ key: 'Form factor', value: '6M or 8M standard box' }, { key: 'Load', value: '600W resistive load per channel' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 8,
    colors: ['White Glass', 'Black Glass', 'Gray Glass', 'Gold Glass'],
    variants: [
      { id: 'v1', name: '8S+1SK (8 Switches + 1 Socket)', price: 14999 },
      { id: 'v2', name: '6S+1C+1SK (6 Switches + 1 Curtain + 1 Socket)', price: 14999 },
      { id: 'v3', name: '10S (10 Switches)', price: 15999 },
      { id: 'v4', name: '8S+1C (8 Switches + 1 Curtain)', price: 15999 },
      { id: 'v5', name: '6S+2C (6 Switches + 2 Curtains)', price: 15999 },
      { id: 'v6', name: '4S+2C+1SK (4 Switches + 2 Curtains + 1 Socket)', price: 14999 },
      { id: 'v7', name: '6S+1F+1SK (6 Switches + 1 Fan + 1 Socket)', price: 15499 },
      { id: 'v8', name: '8S+1F (8 Switches + 1 Fan)', price: 15999 },
      { id: 'v9', name: '6S+1F+1C (6 Switches + 1 Fan + 1 Curtain)', price: 15999 },
      { id: 'v10', name: '4S+1F+2C (4 Switches + 1 Fan + 2 Curtains)', price: 15999 },
      { id: 'v11', name: '6S+2F (6 Switches + 2 Fans)', price: 15999 },
      { id: 'v12', name: '2F+2C+1SK (2 Fans + 2 Curtains + 1 Socket)', price: 16199 },
      { id: 'v13', name: '2S+2F+1C+1SK (2 Switches + 2 Fans + 1 Curtain + 1 Socket)', price: 16199 },
      { id: 'v14', name: '4I+8S (4 Inch Touch + 8 Switches)', price: 53999 }
    ]
  }),
  makeProduct({
    id: 'prod_touch_glass_12m',
    name: '12M Touch Smart Switch',
    slug: '12m-touch-smart-switch',
    sku: 'KSH-TOUCH-12M',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_touch',
    shortDescription: 'Capacitive crystal glass 12-button touch smart switch.',
    description: 'Flagship all-glass capacitive touch board containing 12 responsive touch keys, designed for advanced whole-room scenario mapping.',
    features: ['12 Luxurious touch-sensor points', 'Dual integrated sockets compatible', 'Zero physical wear tactile technology'],
    specifications: [{ key: 'Form factor', value: '12 Module square plate' }],
    protocol: 'Zigbee 3.0',
    cataloguePage: 8,
    colors: ['White Glass', 'Black Glass', 'Gray Glass', 'Gold Glass'],
    variants: [
      { id: 'v1', name: '10S+3SK (10 Switches + 3 Sockets)', price: 27099 },
      { id: 'v2', name: '8S+1F+3SK (8 Switches + 1 Fan + 3 Sockets)', price: 27099 },
      { id: 'v3', name: '8S+1C+3SK (8 Switches + 1 Curtain + 3 Sockets)', price: 27099 },
      { id: 'v4', name: '6S+2C+3SK (6 Switches + 2 Curtains + 3 Sockets)', price: 27099 },
      { id: 'v5', name: '6S+1F+1C+3SK (6 Switches + 1 Fan + 1 Curtain + 3 Sockets)', price: 27099 },
      { id: 'v6', name: '6S+2F+3SK (6 Switches + 2 Fans + 3 Sockets)', price: 27099 }
    ]
  }),

  // ==========================================
  // 11. SCENE CONTROLLERS & ROTARY KNOBS
  // ==========================================
  makeProduct({
    id: 'prod_scene_knob_curved',
    name: 'Curved Rotary Knob Controller',
    slug: 'curved-rotary-knob-controller',
    sku: 'KSH-KNB-CRVD',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_scene_knobs',
    shortDescription: 'Bespoke curved-face wireless rotary knob for stepless dimming.',
    description: 'A luxurious curved-profile wireless dial controller designed for bedside tables or lounge walls, allowing smooth stepless CCT tuning and volume adjustments.',
    features: ['Stepless analog rotary dial encoder', 'Luxury heavy brass curved outer trim', 'Wireless magnetic wall dock'],
    specifications: [{ key: 'Mounting', value: 'Portable or Magnetic Wall Mount' }, { key: 'Power source', value: 'CR2032 Coin Battery (Up to 2 years)' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_scene_knob_textured',
    name: 'Textured Rotary Knob Controller',
    slug: 'textured-rotary-knob-controller',
    sku: 'KSH-KNB-TXT',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_scene_knobs',
    shortDescription: 'Diamond-cut textured knurled rotary knob controller.',
    description: 'Bespoke diamond-pattern knurled brass dial that provides luxurious tactile feedback for volume, fan speed, or light CCT color adjustments.',
    features: ['Diamond-cut knurled metallic texture dial', 'Extremely high-precision micro-step encoder', 'Click action to toggle on/off'],
    specifications: [{ key: 'Knurling pattern', value: 'Premium Diamond knurled' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_scene_knob_flat',
    name: 'Flat Rotary Knob Controller',
    slug: 'flat-rotary-knob-controller',
    sku: 'KSH-KNB-FLAT',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_scene_knobs',
    shortDescription: 'Minimalist flush-face flat smart dial.',
    description: 'Low-profile flush-face flat dial controller designed for modern minimalist interiors, matching satin silver and titanium wall plates.',
    features: ['Minimalist flush-to-plate flat dial', 'Stepless rotary speed control', 'Sealed dust-proof casing'],
    specifications: [{ key: 'Chassis', value: 'Satin anodized aluminum' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_scene_4button',
    name: '4-Button Scene Controller',
    slug: '4-button-scene-controller',
    sku: 'KSH-SCN-4BTN',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_scene_knobs',
    shortDescription: 'Wireless 4-button controller supporting 12 unique scenes.',
    description: 'Wireless battery-powered wall or portable pad controller with 4 tactile buttons, each recognizing single, double, and long press actions to trigger up to 12 automated scenes.',
    features: ['4 Independent programmable scene buttons', 'Supports Single / Double / Long press triggers', 'Magnetic wall mount bracket included'],
    specifications: [{ key: 'Control capacity', value: '12 scene presets' }, { key: 'Battery', value: 'CR2430 Lithium (Up to 3 years)' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_scene_6button',
    name: '6-Button Scene Controller',
    slug: '6-button-scene-controller',
    sku: 'KSH-SCN-6BTN',
    categoryId: 'cat_switches',
    categoryName: 'Smart Switches & Touch Boards',
    subcategoryId: 'sub_scene_knobs',
    shortDescription: 'Wireless 6-button controller supporting 18 unique scenes.',
    description: 'Expanded wireless control pad featuring 6 mechanical keys. Automates entire home sections: curtains, audio, HVAC, and light scenarios.',
    features: ['6 Mechanical tactile keys', 'Trigger up to 18 custom automation paths', 'Low power standby mode'],
    specifications: [{ key: 'Buttons count', value: '6 configurable keys' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 12. RETROFIT MODULES
  // ==========================================
  makeProduct({
    id: 'prod_retro_1ch',
    name: '1-Channel Retro-Fit Module',
    slug: '1-channel-retro-fit-module',
    sku: 'KSH-RTR-1CH',
    categoryId: 'cat_retrofit',
    categoryName: 'Smart Retrofit Automation',
    subcategoryId: 'sub_retrofit_switch',
    shortDescription: 'Mini 1-channel in-wall smart retrofit relay module.',
    description: 'Extremely compact 1-channel relay receiver designed to slip directly into standard backboxes behind manual toggle plates, adding app and voice control without changing switches.',
    features: ['Fits behind standard Indian modular switch boxes', 'Supports heavy-load appliances (16A)', 'Real-time manual switch state sync'],
    specifications: [{ key: 'Power rating', value: '16A High Load' }, { key: 'Dimensions', value: '40mm x 40mm x 18mm' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_retro_2ch',
    name: '2-Channel Retro-Fit Module',
    slug: '2-channel-retro-fit-module',
    sku: 'KSH-RTR-2CH',
    categoryId: 'cat_retrofit',
    categoryName: 'Smart Retrofit Automation',
    subcategoryId: 'sub_retrofit_switch',
    shortDescription: 'Mini 2-channel in-wall smart retrofit module.',
    description: 'Dual-channel micro switch actuator to make 2 manual ceiling or accent lights completely smart. Retains full manual control.',
    features: ['Control 2 distinct switch channels', 'Compact dual-relay circuit', 'Supports App scheduled timers'],
    specifications: [{ key: 'Load Capacity', value: '5A per channel (10A max)' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_retro_3ch',
    name: '3-Channel Retro-Fit Module',
    slug: '3-channel-retro-fit-module',
    sku: 'KSH-RTR-3CH',
    categoryId: 'cat_retrofit',
    categoryName: 'Smart Retrofit Automation',
    subcategoryId: 'sub_retrofit_switch',
    shortDescription: 'Mini 3-channel in-wall smart retrofit module.',
    description: 'Three-relay compact retrofit receiver to control 3 light channels simultaneously, perfect for 3-switch gypsum ceiling downlight arrays.',
    features: ['Control 3 separate light lines', 'Safe flame-retardant PC body', 'Power-off state memory restoration'],
    specifications: [{ key: 'Outputs', value: '3 relay terminals' }, { key: 'Casing Material', value: 'V0 Grade PC' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_retro_4ch',
    name: '4-Channel Retro-Fit Module',
    slug: '4-channel-retro-fit-module',
    sku: 'KSH-RTR-4CH',
    categoryId: 'cat_retrofit',
    categoryName: 'Smart Retrofit Automation',
    subcategoryId: 'sub_retrofit_switch',
    shortDescription: 'Mini 4-channel in-wall smart retrofit module.',
    description: 'High density 4-channel in-wall micro controller, transforming a whole 4-gang wall plate into a fully automated smart experience.',
    features: ['4 Switch terminal inputs', 'Extremely thin architectural module housing', 'Interlocked mesh networking'],
    specifications: [{ key: 'Channels count', value: '4 channels' }, { key: 'Voltage limits', value: '100V - 250V AC' }],
    protocol: 'Zigbee 3.0'
  }),
  makeProduct({
    id: 'prod_retro_curtain',
    name: '2-Channel Curtain Retro-Fit Module',
    slug: '2-channel-curtain-retro-fit-module',
    sku: 'KSH-RTR-CRT',
    categoryId: 'cat_retrofit',
    categoryName: 'Smart Retrofit Automation',
    subcategoryId: 'sub_retrofit_curtain',
    shortDescription: 'In-wall motorized curtain/shutter retrofit controller.',
    description: 'Bespoke 2-channel interlocked relay module, engineered specifically to automate motorized projection screens, blinds, and shutters via traditional toggle switches.',
    features: ['Hardware-interlocked safety prevents motor shorts', 'Percentage manual open/close controls', 'Auto-calibration routine'],
    specifications: [{ key: 'Motor compatibility', value: '4-wire AC motor' }, { key: 'Calibration', value: 'Auto-timing position map' }],
    protocol: 'Zigbee 3.0'
  }),

  // ==========================================
  // 13. VIDEO DOOR PHONES & INTERCOM
  // ==========================================
  makeProduct({
    id: 'prod_vdp_hybrid_kit',
    name: 'Hybrid Video Door Phone Kit',
    slug: 'hybrid-video-door-phone-kit',
    sku: 'KSH-VDP-HYB7',
    categoryId: 'cat_vdp',
    categoryName: 'Video Door Phones & Intercom',
    shortDescription: 'Complete hybrid VDP bundle featuring 7" monitor and 2MP outdoor station.',
    description: 'Luxury hybrid video intercom package. Includes a wall-mounted 7-inch IPS high-resolution touchscreen indoor unit and a 2MP outdoor door station with a wide-angle night-vision camera and a touchless unlock trigger.',
    features: ['7-inch IPS high definition indoor screen', '2MP HD wide-angle outdoor gate camera', 'Bi-directional audio with echo cancellation', 'Saves snapshot logs on local MicroSD card'],
    specifications: [{ key: 'Screen Size', value: '7.0-inch Touch Screen' }, { key: 'Camera Angle', value: '140° wide horizontal' }, { key: 'Power Output', value: '12V DC standard' }],
    protocol: 'Wired'
  }),
  makeProduct({
    id: 'prod_vdp_lobby_station',
    name: 'Lobby Display Station',
    slug: 'lobby-display-station',
    sku: 'KSH-VDP-LOBBY',
    categoryId: 'cat_vdp',
    categoryName: 'Video Door Phones & Intercom',
    shortDescription: 'Commercial grade multi-tenant lobby entrance intercom station.',
    description: 'Heavy duty multi-tenant lobby door control terminal equipped with Face ID verification, IC access card readers, dynamic QR guest codes, and SIP communication protocol.',
    features: ['3D Biometric facial gate unlock', 'SIP network protocol for mobile app redirection', 'Durable stainless steel SUS314 casing'],
    specifications: [{ key: 'Verification options', value: 'Face ID, Card, PIN, QR Code' }, { key: 'SIP Protocol', value: 'SIP 2.0 standard' }],
    protocol: 'SIP / IP'
  }),

  // ==========================================
  // 14. SECURITY & SURVEILLANCE
  // ==========================================
  makeProduct({
    id: 'prod_sec_ajax_hub',
    name: 'Ajax Hub 2 Plus Security Coordinator',
    slug: 'ajax-hub-2-plus-security-coordinator',
    sku: 'KSH-SEC-AJHUB',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Enterprise high-security wireless intrusion coordinator.',
    description: 'High-security wireless intrusion control panel supporting up to 200 security sensors, dynamic photo verification, dual SIM cellular backup, and LAN.',
    features: ['Dynamic instant photo verification in 9s', 'Triple communication channels (LAN + Wi-Fi + Cellular 4G)', 'Jeweller high-security radio protocol'],
    specifications: [{ key: 'Sensors capacity', value: '200 maximum' }, { key: 'Radio range', value: 'Up to 2,000m line of sight' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_motioncam',
    name: 'MotionCam Outdoor Wireless Motion Sensor',
    slug: 'motioncam-outdoor-wireless-motion-sensor',
    sku: 'KSH-SEC-MOCAM',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Wireless outdoor motion sensor with dynamic photo camera.',
    description: 'Sophisticated outdoor microwave motion sensor that ignores pets, triggering an immediate series of photo snapshots on intrusion to prevent false alarms.',
    features: ['Pet immunity up to 80cm tall', 'PIR motion detection and thermal check', 'Sends verification photos on alarm'],
    specifications: [{ key: 'Camera resolution', value: '640x480 pixels' }, { key: 'Battery life', value: 'Up to 3 years' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_siren',
    name: 'StreetSiren Double Deck Outdoor Siren',
    slug: 'streetsiren-double-deck-outdoor-siren',
    sku: 'KSH-SEC-SIREN',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Wireless outdoor double-deck alert siren.',
    description: 'Powerful weatherproof outdoor alarm siren featuring loud acoustic warnings up to 113dB and high-brightness LED strobe rings.',
    features: ['Weatherproof robust outer frame (IP54)', 'Loud acoustic siren up to 113 dB', 'Custom branding clip face plate'],
    specifications: [{ key: 'Sound Pressure', value: '85 - 113 dB adjustable' }, { key: 'IP Rating', value: 'IP54' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_doorprotect',
    name: 'DoorProtect Plus Magnetic Sensor',
    slug: 'doorprotect-plus-magnetic-sensor',
    sku: 'KSH-SEC-DOORP',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Wireless magnetic door contact with shock/tilt sensor.',
    description: 'Precision magnetic reed contact sensor with built-in dual acceleration chips to register door opening, shocks, and tilt changes.',
    features: ['Shock, vibration, and tilt angle detection', 'Wireless battery operation', 'Tamper protection switch'],
    specifications: [{ key: 'Magnetic threshold', value: '1cm magnet gap' }, { key: 'Battery', value: 'CR123A (Included)' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_glassprotect',
    name: 'GlassProtect Wireless Acoustic Detector',
    slug: 'glassprotect-wireless-acoustic-detector',
    sku: 'KSH-SEC-GLASSP',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Wireless acoustic glass break detector.',
    description: 'Compact acoustic sensor tuned to recognize the distinct dual-frequency sound of impact and glass shattering while ignoring room echo.',
    features: ['Dual-frequency sound validation', 'Detection range up to 9m', 'Compact visual design'],
    specifications: [{ key: 'Angle view', value: '180° radial' }, { key: 'Mic threshold', value: 'Low / Medium / High adjustable' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_keypad',
    name: 'KeyPad Plus RFID Reader',
    slug: 'keypad-plus-rfid-reader',
    sku: 'KSH-SEC-KEYPAD',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_ajax_alarm',
    shortDescription: 'Wireless arming keypad with contactless RFID reader.',
    description: 'Touch arming wall keypad, supporting secure access cards and keyfobs for quick, passcodeless security system management.',
    features: ['Secure RFID card reader', 'Duress distress code option', 'Touch-sensitive numeric keys'],
    specifications: [{ key: 'Arming options', value: 'Contactless tag or PIN code' }, { key: 'RFID', value: 'DESFire encrypted' }],
    protocol: 'Jeweller'
  }),
  makeProduct({
    id: 'prod_sec_ptz_cam',
    name: 'PTZ High-Speed Auto-Tracking Camera',
    slug: 'ptz-high-speed-auto-tracking-camera',
    sku: 'KSH-SEC-PTZ',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_cctv',
    shortDescription: 'Smart dome PTZ outdoor IP surveillance camera.',
    description: 'High-speed robotic PTZ security camera with 10x optical zoom, continuous auto-tracking of humans and vehicles, and thermal-imaging dark-room matrix.',
    features: ['360° pan and 90° tilt robotic movement', 'AI continuous tracking and person auto-focus', 'Active deterrent speaker and laser strobe'],
    specifications: [{ key: 'Resolution', value: '4MP Quad HD' }, { key: 'Optical Zoom', value: '10x lossless zoom' }],
    protocol: 'ONVIF / IP'
  }),
  makeProduct({
    id: 'prod_sec_bullet_cam',
    name: 'AI Analytics Bullet Camera',
    slug: 'ai-analytics-bullet-camera',
    sku: 'KSH-SEC-BULLET',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_cctv',
    shortDescription: 'Rugged outdoor AI analytic bullet camera.',
    description: 'Weatherproof bullet surveillance camera with built-in AI edge chips to run on-board line-crossing and vehicle plate analytics.',
    features: ['AI Edge analytic classification', 'IP67 dust and water rating', 'High power infrared night matrix (60m)'],
    specifications: [{ key: 'Resolution', value: '5MP HD' }, { key: 'Aperture', value: 'F1.4 large lens' }],
    protocol: 'ONVIF / IP'
  }),
  makeProduct({
    id: 'prod_sec_dome_cam',
    name: 'High-Definition Dome Camera',
    slug: 'high-definition-dome-camera',
    sku: 'KSH-SEC-DOME',
    categoryId: 'cat_security',
    categoryName: 'Security & Surveillance',
    subcategoryId: 'sub_cctv',
    shortDescription: 'Anti-vandal indoor ceiling dome surveillance camera.',
    description: 'Anti-vandal dome security camera, ideal for corridors, offices, and luxury lobbies requiring highly discrete continuous video feeds.',
    features: ['IK10 impact resistance rating', 'Micro size chassis', 'Extreme low-light color capture'],
    specifications: [{ key: 'Lens', value: '2.8mm wide-view' }, { key: 'IK Rating', value: 'IK10 vandal protection' }],
    protocol: 'ONVIF / IP'
  }),

  // ==========================================
  // 15. HOME ENTERTAINMENT & AUDIO
  // ==========================================
  makeProduct({
    id: 'prod_ent_amplifier',
    name: 'Hi-Fi Multi-Room Amplifier',
    slug: 'hi-fi-multi-room-amplifier',
    sku: 'KSH-ENT-AMPL',
    categoryId: 'cat_entertainment',
    categoryName: 'Home Entertainment & Multi-Room Audio',
    shortDescription: 'High-fidelity multi-room digital streaming amplifier.',
    description: 'Sleek multi-room streaming amplifier driving high-fidelity architectural speakers, with native AirPlay 2, Spotify Connect, and optical inputs.',
    features: ['AirPlay 2 & Spotify Connect streaming', 'High efficiency Class-D digital amplifier', 'Continuous active equalizer calibration'],
    specifications: [{ key: 'Power Output', value: '125W RMS per Channel at 8 ohms' }, { key: 'Frequency response', value: '20Hz - 20kHz' }],
    protocol: 'Wi-Fi'
  }),
  makeProduct({
    id: 'prod_ent_ceiling_speaker',
    name: 'Acoustic Surround In-Ceiling Speaker',
    slug: 'acoustic-surround-in-ceiling-speaker',
    sku: 'KSH-ENT-CEILS',
    categoryId: 'cat_entertainment',
    categoryName: 'Home Entertainment & Multi-Room Audio',
    shortDescription: 'High-end architectural circular flush-mount in-ceiling speaker.',
    description: 'Bespoke in-ceiling surround speaker featuring a pivoting dome tweeter and Kevlar driver cone, providing premium acoustic warmth.',
    features: ['Pivoting high-performance silk-dome tweeter', 'Rigid Kevlar transducer cone', 'Trimless magnetic click speaker grille'],
    specifications: [{ key: 'Impedance', value: '8 ohms standard' }, { key: 'Power handling', value: '100W maximum peak' }],
    protocol: 'Analog'
  }),

  // ==========================================
  // 16. ENTRANCE & GATE AUTOMATION
  // ==========================================
  makeProduct({
    id: 'prod_ent_sliding_gate',
    name: 'Sliding Gate Motorized Automation System',
    slug: 'sliding-gate-motorized-automation-system',
    sku: 'KSH-GATE-SLID',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'Heavy-duty motorized sliding gate operator up to 2000kg.',
    description: 'Rugged oil-bath motorized operator with solid steel rack and pinion, engineered to slide heavy private villa gates up to 2000kg with safety photocell overrides.',
    features: ['Oil-bath reduction gear mechanical box', 'Obstacle reverse photocell array', 'Emergency manual key release'],
    specifications: [{ key: 'Gate Max Weight', value: '2,000 kg' }, { key: 'Duty Cycle', value: 'Continuous 100% operation' }],
    protocol: 'RF Remote'
  }),
  makeProduct({
    id: 'prod_ent_swing_gate',
    name: 'Swing Gate Motorized Automation System',
    slug: 'swing-gate-motorized-automation-system',
    sku: 'KSH-GATE-SWING',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'Heavy-duty swing gate dual telescopic arm actuators.',
    description: 'Precision dual telescopic mechanical arms for automated opening of dual-wing swing gates, equipped with slow soft close actions.',
    features: ['Soft close/open slow speed deceleration', 'Telescopic stainless steel protective tube', 'Intercom remote bypass unlock'],
    specifications: [{ key: 'Leaf capacity', value: 'Up to 4.0m leaf width / 450kg' }],
    protocol: 'RF Remote'
  }),
  makeProduct({
    id: 'prod_ent_shutter',
    name: 'Rolling Shutter Automation System',
    slug: 'rolling-shutter-automation-system',
    sku: 'KSH-GATE-SHUT',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'Central high-torque rolling shutter motor with spring balancing.',
    description: 'High-reliability side-mount central motor designed to automate standard rolling shutters for luxury home garages or commercial storefronts.',
    features: ['Central balanced drive shaft attachment', 'Integrated mechanical limit parameters', 'Manual crank bypass option'],
    specifications: [{ key: 'Lifting force', value: 'Up to 280kg lifting weight' }],
    protocol: 'RF Remote'
  }),
  makeProduct({
    id: 'prod_ent_boom_barrier',
    name: 'Automatic Boom Barrier System',
    slug: 'automatic-boom-barrier-system',
    sku: 'KSH-GATE-BOOM',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'High speed residential parking access boom barrier.',
    description: 'High-speed automatic parking barrier with an adjustable 4-meter aluminum boom arm equipped with visual LED indicator lights.',
    features: ['Fast lift speed from 1.5s', 'Alumninum arm with warning LED strips', 'Under-boom anti-crush safety rubber padding'],
    specifications: [{ key: 'Arm Length', value: '4.0 Meters standard' }, { key: 'Lifting speed', value: '1.5s - 4.0s (Adjustable)' }],
    protocol: 'RF Remote'
  }),
  makeProduct({
    id: 'prod_ent_garage_door',
    name: 'Overhead Garage Door Automation',
    slug: 'overhead-garage-door-automation',
    sku: 'KSH-GATE-GAR',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'Belt-driven sectional garage door operator.',
    description: 'Whisper-quiet belt-driven overhead garage sectional operator, featuring rolling-code RF remotes, automated work light, and manual release rails.',
    features: ['Whisper-quiet steel-mesh belt drive', 'Integrated LED light delay illumination', 'Auto reverse on obstruction'],
    specifications: [{ key: 'Lifting Power', value: '800N output force' }],
    protocol: 'RF Remote'
  }),
  makeProduct({
    id: 'prod_ent_glass_door',
    name: 'Radar Automatic Glass Sliding Door System',
    slug: 'radar-automatic-glass-sliding-door-system',
    sku: 'KSH-GATE-GLASS',
    categoryId: 'cat_entrance',
    categoryName: 'Entrance & Gate Automation',
    shortDescription: 'Touchless motorized dual-slide automatic glass door.',
    description: 'Commercial automatic glass door sliding mechanism incorporating highly precise microwave radar sensors and a whisper-quiet DC brushless motor.',
    features: ['Dual microwave radar motion trigger', 'Active infrared safety photocells', 'Brushless DC silent track motor'],
    specifications: [{ key: 'Track Type', value: 'Dual-sliding track rail' }, { key: 'Door panel weight', value: 'Max 120kg per panel' }],
    protocol: 'Sensor Control'
  }),

  // ==========================================
  // 17. INDUSTRIAL ACCESS CONTROL & TURNSTILES
  // ==========================================
  makeProduct({
    id: 'prod_ind_full_turnstile',
    name: 'Full Height Turnstile Gate',
    slug: 'full-height-turnstile-gate',
    sku: 'KSH-IND-FTURN',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'Double height high-security perimeter turnstile gate.',
    description: 'Maximum security double-height physical perimeter turnstile gate made of SUS304 stainless steel, engineered for strict access control on perimeters.',
    features: ['SUS304 heavy-duty stainless steel frame', 'Bidirectional mechanical rotation controls', 'Auto lock return wheel system'],
    specifications: [{ key: 'Material Grade', value: 'SUS304 Stainless Steel' }, { key: 'Aperture height', value: '2.1 Meters' }],
    protocol: 'Access Controller'
  }),
  makeProduct({
    id: 'prod_ind_tripod_turnstile',
    name: 'Tripod Turnstile Gate',
    slug: 'tripod-turnstile-gate',
    sku: 'KSH-IND-TTURN',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'Stainless steel high-throughput tripod turnstile.',
    description: 'High durability stainless steel 3-arm tripod turnstile, ideal for corporate reception lobbies, metro rails, and gym check-ins.',
    features: ['Sleek space-saving cabinet design', 'Drop-arm automatic fire alarm release', 'Anti-tailgating control analytics'],
    specifications: [{ key: 'Throughput', value: '35 persons per minute' }],
    protocol: 'Access Controller'
  }),
  makeProduct({
    id: 'prod_ind_swing_speed_gate',
    name: 'Swing Barrier Speed Gate',
    slug: 'swing-barrier-speed-gate',
    sku: 'KSH-IND-SWING',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'Luxe architectural fast swing barrier speed gate.',
    description: 'Elegant in-lobby pedestrian speed gate featuring motorized tempered glass swing barrier flaps, integrated optical anti-intrusion array, and Face ID compatibility.',
    features: ['Architectural glass barriers', 'Fast passage speeds with zero impact safety', 'Integrated RFID card lector panels'],
    specifications: [{ key: 'Passage Width', value: '600mm - 900mm (ADA compliant)' }],
    protocol: 'Access Controller'
  }),
  makeProduct({
    id: 'prod_ind_flap_speed_gate',
    name: 'Flap Barrier Speed Gate',
    slug: 'flap-barrier-speed-gate',
    sku: 'KSH-IND-FLAP',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'High-speed retractable flap barrier speed gate.',
    description: 'Motorized fast-retracting physical flap barriers designed for rapid pedestrian ticket checks in major transit lobbies and airports.',
    features: ['High speed physical barrier retraction', 'Multi-zone optical safety arrays', 'Multi-colored status indication lights'],
    specifications: [{ key: 'Retraction Speed', value: '0.2 seconds' }],
    protocol: 'Access Controller'
  }),
  makeProduct({
    id: 'prod_ind_parking_barrier',
    name: 'Parking Boom Barrier',
    slug: 'parking-boom-barrier',
    sku: 'KSH-IND-PARK',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'High-speed commercial parking boom barrier.',
    description: 'Commercial automatic boom barrier with 24V brushless motor, designed for continuous high-frequency operation in paid parking lot entrances.',
    features: ['Brushless 24V DC heavy-duty motor', 'Supports loop vehicle inductive sensors', 'Active crush mechanical reverse'],
    specifications: [{ key: 'Active Motor Cycle', value: '100% continuous duty' }],
    protocol: 'RF Remote / Loop'
  }),
  makeProduct({
    id: 'prod_ind_fencing_barrier',
    name: 'Parking & Fencing Boom Barrier',
    slug: 'parking-fencing-boom-barrier',
    sku: 'KSH-IND-FENCE',
    categoryId: 'cat_industrial',
    categoryName: 'Industrial Access Control & Turnstiles',
    shortDescription: 'High-security boom barrier with folding fence grille.',
    description: 'High security automatic boom barrier equipped with an aluminum vertical folding grid fence beneath the boom to block unauthorized pedestrian crawling.',
    features: ['Vertical folding aluminum grid fence', 'Robust steel housing protective casing', 'Automatic obstruction return arm'],
    specifications: [{ key: 'Fence Height', value: '800mm folding grille' }],
    protocol: 'RF Remote / Loop'
  }),

  // ==========================================
  // 18. SMART SWITCHABLE PDLC PRIVACY GLASS
  // ==========================================
  makeProduct({
    id: 'prod_glass_switchable',
    name: 'Smart Switchable PDLC Privacy Glass',
    slug: 'smart-switchable-pdlc-privacy-glass',
    sku: 'KSH-GLASS-PDLC',
    categoryId: 'cat_glass',
    categoryName: 'Smart Switchable Glass',
    shortDescription: 'Electronic instant switchable PDLC privacy glass.',
    description: 'Premium PDLC film laminated glass that transitions from crystal clear to completely frosted opaque privacy in less than 10 milliseconds via wall switch, RF remote, or App.',
    features: ['Instant electronic transition (<10ms)', 'Blocks >99% UV rays', 'High thermal insulation and acoustic damping'],
    specifications: [{ key: 'Technology', value: 'Polymer Dispersed Liquid Crystal (PDLC)' }, { key: 'Switching Speed', value: '<10 milliseconds' }, { key: 'Operating Voltage', value: '48V / 65V AC' }],
    protocol: 'Wi-Fi / RF'
  }),

  // ==========================================
  // 19. ARCHITECTURAL LOUVERED PERGOLA
  // ==========================================
  makeProduct({
    id: 'prod_pergola_louvered',
    name: 'Premium Aluminum Louvered Pergola System',
    slug: 'premium-aluminum-louvered-pergola-system',
    sku: 'KSH-PERGOLA-LUV',
    categoryId: 'cat_pergola',
    categoryName: 'Architectural Louvered Pergola',
    shortDescription: 'Motorized rotating aluminum louvered outdoor pergola.',
    description: 'Bespoke aluminum outdoor structural pergola featuring motorized adjustable louvers (0-135°), hidden rainwater columns, and integrated linear perimeter lighting.',
    features: ['Motorized rotating louver blades (0° to 135°)', '100% internal column rainwater drainage channels', 'Integrated dimmable linear LED strips'],
    specifications: [{ key: 'Material', value: 'Extruded Aluminum Alloy 6063-T5' }, { key: 'Louver Operation', value: 'Motorized dual-rod actuator' }],
    protocol: 'Wi-Fi / RF'
  }),

  // ==========================================
  // 20. ELECTRICAL & INTEGRATION SERVICES
  // ==========================================
  makeProduct({
    id: 'prod_srv_conduit',
    name: 'DB Conduit Planning & Layout Design',
    slug: 'db-conduit-planning-layout-design',
    sku: 'KSH-SRV-CONDUIT',
    categoryId: 'cat_services',
    categoryName: 'Electrical & Integration Services',
    shortDescription: 'Professional DB conduit layout and structured wiring drafting.',
    description: 'On-site assessment and formal engineering drafting of automated distribution board (DB) layout, conduits pathing, and architectural cabling slots.',
    features: ['Bespoke AutoCAD wiring diagram layouts', 'On-site coordination with site contractor', 'DB panel space optimization charts'],
    specifications: [{ key: 'Deliverables', value: 'Physical DWG prints & PDF schematics' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_srv_cabling',
    name: 'Smart Home Structured Cabling',
    slug: 'smart-home-structured-cabling',
    sku: 'KSH-SRV-CABLING',
    categoryId: 'cat_services',
    categoryName: 'Electrical & Integration Services',
    shortDescription: 'On-site smart home structured bus cabling deployment.',
    description: 'Physical professional laying of shielded CAT6, KNX green bus line, and 48V auxiliary power conduits across massive architectural villas.',
    features: ['Shielded CAT6 cabling prevents interference', 'KNX Bus line and auxiliary loops', 'Detailed labelling of every wire lead'],
    specifications: [{ key: 'Cable Standard', value: 'Halogen Free Flame Retardant (LSZH)' }],
    protocol: 'Manual'
  }),
  makeProduct({
    id: 'prod_srv_integration',
    name: 'Lutron / KNX Panel Integration',
    slug: 'lutron-knx-panel-integration',
    sku: 'KSH-SRV-INTEG',
    categoryId: 'cat_services',
    categoryName: 'Electrical & Integration Services',
    shortDescription: 'Enterprise DB automation panel assembly and programming.',
    description: 'Assembly, testing, wire terminating, and software programming of high-end architectural DIN-rail panels supporting Lutron, KNX, or custom relay setups.',
    features: ['Professional DIN-rail panel assembly', 'Software logic setup and group mapping', 'Overcurrent protection integration'],
    specifications: [{ key: 'Certifications', value: 'KNX Certified / CE Compliant assembly' }],
    protocol: 'Wired'
  })
];

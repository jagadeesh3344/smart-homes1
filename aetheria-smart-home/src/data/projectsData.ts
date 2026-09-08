/**
 * Project Applications Showcase Database
 * Real-world applications across residential, commercial, hospitality & industrial sectors
 */

import { ProjectApplication } from '../types';

export const initialProjects: ProjectApplication[] = [
  {
    id: 'proj_luxury_villa',
    title: 'Whole-Villa Automation & Circadian Lighting',
    slug: 'luxury-villa-automation-circadian-lighting',
    category: 'Luxury Villa',
    location: 'Jubilee Hills, Hyderabad',
    propertyType: 'Independent Luxury Villa (7,500 sq.ft.)',
    solutionCategories: [
      'Smart Touch Switch Boards',
      'Smart Architectural Lighting',
      'Curtain & Shading Automation',
      'Smart Door Locks',
      'Security & Surveillance'
    ],
    description: 'Comprehensive whole-home smart automation integrating Titan modular smart switches with rotary knobs, circadian tuneable white architectural downlights, motorized blackout drapery, 3D face recognition main door locks, and outdoor perimeter Ajax intrusion detection.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['Zigbee 3.0', 'Matter', 'Wired Pro+ Gateway', 'Ajax Jeweller', '48V Magnetic Tracks'],
    highlights: [
      'Circadian lighting auto-adjusts color temperature from 2700K to 6500K throughout the day',
      'Dual-curtain motorized tracks synchronized with solar orientation to reduce AC load',
      'S3 Pro Smart Lock with 3D Face Recognition and real-time video doorbell streaming',
      'Centralized 8-inch in-wall touch panels in foyer, living hall, and master suite',
      '100% local offline automation processing with zero cloud lag'
    ],
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: 'proj_smart_apartment',
    title: 'Smart Retrofit Apartment Automation',
    slug: 'smart-retrofit-apartment-automation',
    category: 'Smart Apartment',
    location: 'Bandra West, Mumbai',
    propertyType: '3BHK Luxury High-Rise Apartment (2,400 sq.ft.)',
    solutionCategories: [
      'Smart Retrofit Automation',
      'Smart Touch Switch Boards',
      'Video Door Phones',
      'Smart LED Strips'
    ],
    description: 'Seamless retrofit automation completed in an occupied designer apartment without breaking walls or replacing custom Italian switch plates. Multi-channel micro modules and false ceiling CCT LED strip combos deliver effortless mood control and mobile convenience.',
    heroImage: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['Zigbee 3.0', 'Wireless Gateway', 'Hybrid VDP Kit', 'CCT Tunable Drivers'],
    highlights: [
      'Zero wall chipping: All smart modules installed behind existing switchboards in 1 day',
      'Full retention of manual physical switches for visiting elders and guests',
      'Hybrid 7-inch IPS Video Door Phone kit with mobile call forwarding',
      'Pre-programmed "Welcome", "Good Night", and "Party" lighting scenes'
    ],
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: 'proj_home_theatre',
    title: 'Private 9.4.4 Dolby Atmos Cinema & Acoustic Suite',
    slug: 'private-dolby-atmos-cinema-acoustic-suite',
    category: 'Entertainment',
    location: 'Indiranagar, Bengaluru',
    propertyType: 'Private Cinema Room (600 sq.ft.)',
    solutionCategories: [
      'Home Entertainment',
      'Smart Lighting',
      'Curtain & Shading Automation',
      'Scene Controllers'
    ],
    description: 'Custom acoustic isolation, 4K laser projection, automated acoustic velvet curtains, and fiber-optic starlight ceiling with one-touch scene orchestration.',
    heroImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['Dolby Atmos', 'Zigbee 3.0', 'Magnetic Scene Knob', 'DMX Lighting Control'],
    highlights: [
      'One-touch "Movie Start" button dims cove lighting, closes blackout drapes, and boots AV rack',
      'Architectural anti-glare downlights with smooth 0.1% deep dimming',
      'Custom acoustic diffuser and fabric wall panelling for zero acoustic reflection',
      'Independent HVAC climate management with whisper-quiet variable airflow'
    ],
    isFeatured: true,
    sortOrder: 3
  },
  {
    id: 'proj_corporate_office',
    title: 'Executive Corporate Boardroom & Smart Glass Suite',
    slug: 'executive-corporate-boardroom-smart-glass',
    category: 'Office',
    location: 'Cyber City, Gurugram',
    propertyType: 'Corporate Headquarters & Executive Floor (12,000 sq.ft.)',
    solutionCategories: [
      'Smart Switchable Glass',
      'Display & Touch Panels',
      'Industrial Access Control',
      'Smart Lighting'
    ],
    description: 'Modern corporate automation featuring switchable PDLC privacy glass partitions, centralized 10-inch touch control panels, optical flap speed gates for lobby access, and magnetic track lighting.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['PDLC Smart Glass', '10" Touch Consoles', 'Flap Speed Gates', '48V Magnetic Track'],
    highlights: [
      'Instant privacy glass switches from clear to opaque frosted during confidential meetings',
      'Centralized 10-inch in-wall touch panel manages video conferencing, AC, and shades',
      'Optical anti-tailgating flap speed gates with facial recognition access',
      'Scheduled energy-saving automation switches off unoccupied zone circuits'
    ],
    isFeatured: true,
    sortOrder: 4
  },
  {
    id: 'proj_automated_entrance',
    title: 'Gated Villa Estate Entrance & Perimeter Defense',
    slug: 'gated-villa-estate-entrance-perimeter-defense',
    category: 'Entrance Automation',
    location: 'Alibaug, Maharashtra',
    propertyType: 'Private Seaside Estate (2.5 Acres)',
    solutionCategories: [
      'Entrance Automation',
      'Security & Surveillance',
      'Video Door Phones',
      'Parking Management'
    ],
    description: 'Heavy-duty motorized sliding gates with high-speed boom barriers, Long-range RFID vehicle identification, outdoor Ajax perimeter motion cam tripwires, and 2MP lobby intercom stations.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['Heavy-Duty Sliding Gate Motor', 'Ajax MotionCam Outdoor', 'UHF Long-Range RFID', 'SIP Intercom'],
    highlights: [
      'Hands-free sliding gate opening via UHF windshield tags on family vehicles',
      'MotionCam Outdoor sends instant animated photo alerts to owner phones during intrusion',
      '113dB StreetSiren Double Deck with emergency strobe deterrence',
      'Integrated solar battery backup system ensures continuous gate operation during grid failures'
    ],
    isFeatured: false,
    sortOrder: 5
  },
  {
    id: 'proj_outdoor_pergola',
    title: 'Architectural Louvered Pergola & Poolside Automation',
    slug: 'architectural-louvered-pergola-poolside-automation',
    category: 'Residential',
    location: 'ECR, Chennai',
    propertyType: 'Coastal Beachfront Villa Pavilion (850 sq.ft.)',
    solutionCategories: [
      'Architectural Louvered Pergola',
      'Smart Lighting',
      'Home Entertainment',
      'Curtain & Shading Automation'
    ],
    description: 'Motorized aluminum louvered pergola featuring 0°–135° rotating roof blades, integrated linear LED perimeter lighting, frameless sliding glass enclosures, and weatherproof outdoor landscape audio.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    technologies: ['Motorized Louver Automation', 'Automated Rain Sensors', 'Linear LED Dimmable', 'Outdoor Audio'],
    highlights: [
      'Automated rain sensor instantly closes louvers at the first raindrop to protect patio furniture',
      'Integrated linear LED strip lighting provides adjustable warm ambient evening illumination',
      'Motorized zip roller shades provide effective wind and insect shielding',
      'Frameless sliding glass walls allow year-round air-conditioned comfort when closed'
    ],
    isFeatured: false,
    sortOrder: 6
  }
];

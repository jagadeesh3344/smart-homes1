/**
 * SmartRoomSimulator Component - Interactive Luxury Scene & Automation Simulator.
 * Deep charcoal background with luxury warm stone and champagne accents.
 */

import React, { useState } from 'react';
import { 
  Sun, Moon, Volume2, Shield, Thermometer, Sparkles, Sliders,
  Film, Music, KeyRound, Lock, Unlock, Info, ArrowRight, ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export type SceneId = 'welcome' | 'cinema' | 'goodnight' | 'party' | 'away';

interface SceneConfig {
  id: SceneId;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  lightColor: string;
  brightness: number;
  temperature: number;
  curtainPercent: number; // 0 = fully closed, 100 = fully open
  audioActive: boolean;
  audioTrack: string;
  securityArmed: boolean;
  doorsLocked: boolean;
  displayActive: boolean;
  accentGlow: string;
  climateMode: 'Comfort' | 'Cinema' | 'Night Eco' | 'Dynamic' | 'Eco Away';
}

export const SmartRoomSimulator: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeRoom, setActiveRoom] = useState<'living' | 'bedroom' | 'cinema' | 'terrace'>('living');
  const [activeScene, setActiveScene] = useState<SceneId>('welcome');

  // Interactive Live State
  const [lightColor, setLightColor] = useState<string>('#C5A880');
  const [brightness, setBrightness] = useState<number>(80);
  const [temperature, setTemperature] = useState<number>(72);
  const [curtainPercent, setCurtainPercent] = useState<number>(60);
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [audioTrack, setAudioTrack] = useState<string>('Ambient Welcome Lounge');
  const [securityArmed, setSecurityArmed] = useState<boolean>(false);
  const [doorsLocked, setDoorsLocked] = useState<boolean>(false);
  const [displayActive, setDisplayActive] = useState<boolean>(false);
  const [climateMode, setClimateMode] = useState<string>('Comfort');

  const rooms = [
    { id: 'living', name: 'Grand Living Salon', bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80' },
    { id: 'bedroom', name: 'Master Suite', bg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80' },
    { id: 'cinema', name: 'Acoustic Home Theater', bg: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=1400&q=80' },
    { id: 'terrace', name: 'Pool & Garden Terrace', bg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80' },
  ];

  const scenes: SceneConfig[] = [
    {
      id: 'welcome',
      name: 'Welcome Home',
      tagline: 'Warm illumination, pleasant climate, welcoming acoustics',
      icon: <Sun className="w-4 h-4 text-[#C5A880]" />,
      lightColor: '#C5A880',
      brightness: 85,
      temperature: 72,
      curtainPercent: 65,
      audioActive: true,
      audioTrack: 'Aetheria Ambient Welcome Lounge (Lossless)',
      securityArmed: false,
      doorsLocked: false,
      displayActive: false,
      accentGlow: 'rgba(197, 168, 128, 0.25)',
      climateMode: 'Comfort'
    },
    {
      id: 'cinema',
      name: 'Cinema Mode',
      tagline: 'Main lights dim, indigo mood glow, blackout curtains, Dolby Atmos',
      icon: <Film className="w-4 h-4 text-zinc-400" />,
      lightColor: '#2D3748',
      brightness: 20,
      temperature: 70,
      curtainPercent: 0,
      audioActive: true,
      audioTrack: 'Dolby Atmos Spatial Audio Engine Active',
      securityArmed: false,
      doorsLocked: true,
      displayActive: true,
      accentGlow: 'rgba(45, 55, 72, 0.4)',
      climateMode: 'Cinema'
    },
    {
      id: 'goodnight',
      name: 'Goodnight',
      tagline: 'Amber bedtime glow, blackout shading, doors locked, perimeter armed',
      icon: <Moon className="w-4 h-4 text-amber-500" />,
      lightColor: '#D97706',
      brightness: 12,
      temperature: 68,
      curtainPercent: 0,
      audioActive: false,
      audioTrack: 'Sleep Acoustic Masking',
      securityArmed: true,
      doorsLocked: true,
      displayActive: false,
      accentGlow: 'rgba(217, 119, 6, 0.15)',
      climateMode: 'Night Eco'
    },
    {
      id: 'party',
      name: 'Party Mode',
      tagline: 'Dynamic emerald & gold lights, open curtains, multi-zone beat',
      icon: <Music className="w-4 h-4 text-zinc-300" />,
      lightColor: '#718096',
      brightness: 90,
      temperature: 69,
      curtainPercent: 100,
      audioActive: true,
      audioTrack: 'Whole-Home Lossless High-Energy Mix (Multi-Zone)',
      securityArmed: false,
      doorsLocked: false,
      displayActive: true,
      accentGlow: 'rgba(113, 128, 150, 0.35)',
      climateMode: 'Dynamic'
    },
    {
      id: 'away',
      name: 'Away Mode',
      tagline: 'All lights off, eco climate, shades closed, full AI security perimeter',
      icon: <ShieldCheck className="w-4 h-4 text-zinc-500" />,
      lightColor: '#1A202C',
      brightness: 5,
      temperature: 64,
      curtainPercent: 0,
      audioActive: false,
      audioTrack: 'Acoustic Standby',
      securityArmed: true,
      doorsLocked: true,
      displayActive: false,
      accentGlow: 'rgba(26, 32, 44, 0.5)',
      climateMode: 'Eco Away'
    },
  ];

  const applyScene = (scene: SceneConfig) => {
    setActiveScene(scene.id);
    setLightColor(scene.lightColor);
    setBrightness(scene.brightness);
    setTemperature(scene.temperature);
    setCurtainPercent(scene.curtainPercent);
    setAudioActive(scene.audioActive);
    setAudioTrack(scene.audioTrack);
    setSecurityArmed(scene.securityArmed);
    setDoorsLocked(scene.doorsLocked);
    setDisplayActive(scene.displayActive);
    setClimateMode(scene.climateMode);
  };

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[0];

  return (
    <section className="py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
            EXPERIENCE INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
            Living Intelligence, <br />
            <span className="text-zinc-400 italic">Demonstrated in Real-Time.</span>
          </h2>
          <p className="text-xs text-zinc-500 font-light max-w-lg mx-auto leading-relaxed">
            Switch between custom orchestrated room scenes to observe how linear light tracks, motorized solar curtains, spatial audio, and biometrics synchronize autonomously.
          </p>
        </div>

        {/* Scene Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {scenes.map(s => {
            const isSelected = activeScene === s.id;
            return (
              <button
                key={s.id}
                onClick={() => applyScene(s)}
                className={`p-4 rounded border text-left transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-100 border-zinc-300 shadow-sm'
                    : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-1.5 rounded bg-white border ${isSelected ? 'border-zinc-300 text-[#C5A880]' : 'border-zinc-100 text-zinc-400'}`}>
                    {s.icon}
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  )}
                </div>
                <div className="font-bold text-xs tracking-wider uppercase text-zinc-800">{s.name}</div>
                <div className="text-[10px] text-zinc-400 line-clamp-1 mt-1 font-light">{s.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Room Zone Tabs */}
        <div className="flex items-center justify-between mb-6 border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mr-3 hidden sm:inline">
              Selected Zone:
            </span>
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id as any)}
                className={`px-4 py-2 rounded text-[10px] uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeRoom === room.id
                    ? 'bg-zinc-900 text-white font-bold'
                    : 'bg-zinc-50 text-zinc-500 hover:text-zinc-900 border border-zinc-200'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider hidden md:block">
            ACTIVE BLUEPRINT: <strong className="text-[#C5A880]">{scenes.find(s => s.id === activeScene)?.name}</strong>
          </span>
        </div>

        {/* Simulator Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-50 p-6 rounded-lg border border-zinc-200 shadow-sm">
          
          {/* Visual Room Frame */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded overflow-hidden border border-zinc-900 shadow-inner">
            
            <img
              src={currentRoom.bg}
              alt={currentRoom.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                filter: `brightness(${Math.max(0.15, brightness / 100)}) contrast(1.02)`
              }}
            />

            {/* Ambient Lighting tone filter */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-color"
              style={{
                backgroundColor: lightColor,
                opacity: Math.max(0.05, brightness / 150)
              }}
            />

            {/* Shading Curtains Panels */}
            <div
              className="absolute top-0 left-0 bottom-0 bg-zinc-950 border-r border-zinc-900 transition-all duration-700 pointer-events-none shadow-2xl"
              style={{
                width: `${(100 - curtainPercent) / 2}%`
              }}
            />
            <div
              className="absolute top-0 right-0 bottom-0 bg-zinc-950 border-l border-zinc-900 transition-all duration-700 pointer-events-none shadow-2xl"
              style={{
                width: `${(100 - curtainPercent) / 2}%`
              }}
            />

            {/* Top Left Status Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded border border-zinc-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-zinc-850">{currentRoom.name}</span>
              <span className="text-zinc-200">|</span>
              <span className="text-[#C5A880] font-mono flex items-center gap-1">
                <Thermometer className="w-3 h-3" />
                {temperature}°F ({Math.round((temperature - 32) * 5 / 9)}°C)
              </span>
            </div>

            {/* Top Right Status Lock */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded border border-zinc-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              {doorsLocked ? (
                <>
                  <Lock className="w-3 h-3 text-[#C5A880]" />
                  <span className="text-[#C5A880]">Locked</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3 h-3 text-zinc-400" />
                  <span className="text-zinc-400">Unlocked</span>
                </>
              )}
            </div>

            {/* Bottom State Bar */}
            <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-sm p-3 rounded border border-zinc-200 text-[10px] tracking-wide font-bold uppercase text-zinc-600 shadow-sm">
              <div className="flex items-center gap-1">
                <span>Shading:</span>
                <span className="text-zinc-800 font-semibold">{curtainPercent === 0 ? 'Closed' : curtainPercent === 100 ? 'Open' : `${curtainPercent}%`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                {audioActive ? (
                  <span className="text-zinc-800 font-semibold truncate max-w-[120px]">{audioTrack}</span>
                ) : (
                  <span className="text-zinc-400">Muted</span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span>Security:</span>
                <span className="text-zinc-800 font-semibold">{securityArmed ? 'Armed' : 'Standby'}</span>
              </div>
            </div>

          </div>

          {/* Slider Console */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800">
                    Manual Override
                  </h3>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 border border-zinc-200 uppercase tracking-wider font-bold">
                  {climateMode} PROFILE
                </span>
              </div>

              {/* Tone regulator */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Tunable Kelvin Output</span>
                </div>
                <div className="flex items-center gap-3">
                  {['#C5A880', '#D4AF37', '#6366F1', '#EC4899', '#10B981', '#E6E1DA', '#1A202C'].map(color => (
                    <button
                      key={color}
                      onClick={() => setLightColor(color)}
                      className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                        lightColor === color ? 'scale-125 ring-1 ring-[#C5A880] ring-offset-2 ring-offset-white' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Luminance Level */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Luminance Output</span>
                  <span className="text-zinc-800 font-mono font-bold">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightness}
                  onChange={e => setBrightness(Number(e.target.value))}
                  className="w-full accent-[#C5A880] bg-zinc-200 h-1 rounded cursor-pointer"
                />
              </div>

              {/* Shading aperture */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Curtain Shading Aperture</span>
                  <span className="text-zinc-800 font-mono font-bold">{curtainPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={curtainPercent}
                  onChange={e => setCurtainPercent(Number(e.target.value))}
                  className="w-full accent-[#C5A880] bg-zinc-200 h-1 rounded cursor-pointer"
                />
              </div>

              {/* Thermostat Target */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Thermostat Target</span>
                  <span className="text-zinc-800 font-mono font-bold">{temperature}°F ({Math.round((temperature - 32) * 5 / 9)}°C)</span>
                </div>
                <input
                  type="range"
                  min="62"
                  max="78"
                  value={temperature}
                  onChange={e => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#C5A880] bg-zinc-200 h-1 rounded cursor-pointer"
                />
              </div>

              {/* Biometrics Override Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDoorsLocked(!doorsLocked)}
                  className={`p-3 rounded border text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    doorsLocked
                      ? 'bg-zinc-900 border-[#C5A880]/40 text-[#C5A880]'
                      : 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    Locks
                  </span>
                  <span>{doorsLocked ? 'Secured' : 'Open'}</span>
                </button>

                <button
                  onClick={() => setSecurityArmed(!securityArmed)}
                  className={`p-3 rounded border text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    securityArmed
                      ? 'bg-zinc-900 border-[#C5A880]/40 text-[#C5A880]'
                      : 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Alarms
                  </span>
                  <span>{securityArmed ? 'Armed' : 'Disarmed'}</span>
                </button>
              </div>
            </div>

            {/* Customizer Plan Proposal Link */}
            <div className="pt-4 border-t border-zinc-200">
              <button
                onClick={() => navigateTo('configurator')}
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Curate Your Smart Space blueprint</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>

        {/* Disclaimer bar */}
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-zinc-500 text-[10px] py-2 px-4 rounded bg-zinc-100 border border-zinc-200 font-light">
          <Info className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>
            Interactive simulation demonstrating Aetheria automated logic. Does not connect to live physical hardware.
          </span>
        </div>

      </div>
    </section>
  );
};

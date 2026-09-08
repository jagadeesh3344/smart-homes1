import { User, Bell, Shield, LogOut } from 'lucide-react';
import { AdminUser } from '../types';

interface NavbarProps {
  currentUser: AdminUser | null;
  onLogout: () => void;
  activeMenu: string;
  onToggleSidebar: () => void;
}

export default function Navbar({ currentUser, onLogout, activeMenu, onToggleSidebar }: NavbarProps) {
  const getPageTitle = () => {
    const formatted = activeMenu.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formatted || 'Dashboard';
  };

  return (
    <header className="bg-[#0a0a0a] border-b border-[#222] h-20 flex items-center justify-between px-8 sticky top-0 z-30" id="admin-navbar">
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-[#888] hover:text-[#bbb] hover:bg-[#151515] border border-[#333] rounded-sm cursor-pointer"
          aria-label="Toggle Sidebar"
          id="btn-sidebar-toggle"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-mono leading-none">SmartHomes Admin Executive</span>
          <h1 className="text-lg font-serif italic text-[#d4d4d4] tracking-wide leading-none mt-1">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Status Indicators */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] text-[#c4a46a] border border-[#222] rounded-sm text-[10px] uppercase tracking-widest font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a46a] animate-pulse"></span>
          LEDGER SECURED
        </div>

        {/* Notifications */}
        <button className="p-2 bg-[#111] text-[#666] hover:text-[#bbb] hover:bg-[#1a1a1a] border border-[#222] rounded-sm relative cursor-pointer" id="btn-notifications">
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c4a46a]"></span>
          <Bell className="w-4 h-4" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-4 border-l border-[#222] pl-6">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-medium text-[#d4d4d4] leading-tight">{currentUser?.name || 'Administrator'}</p>
            <p className="text-[10px] text-[#666] uppercase tracking-wider flex items-center justify-end gap-1 font-mono mt-1">
              <Shield className="w-3 h-3 text-[#c4a46a]" />
              {currentUser?.role || 'Super Admin'}
            </p>
          </div>
          <div className="w-9 h-9 bg-[#111] border border-[#222] text-[#c4a46a] rounded-full flex items-center justify-center relative">
            <User className="w-4 h-4" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#121212] rounded-full"></span>
          </div>
          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-2 text-[#666] hover:text-red-400 rounded-sm hover:bg-red-950/20 transition-colors cursor-pointer border border-transparent hover:border-red-950/30"
            id="btn-navbar-logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

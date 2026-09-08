import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Tags,
  Sliders,
  ShoppingBag,
  Users,
  CreditCard,
  Layers,
  AlertOctagon,
  Globe,
  Video,
  HelpCircle,
  Percent,
  Compass,
  Database,
  Activity,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({ activeMenu, setActiveMenu, isOpen, onClose, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'Main Hub',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Catalogue',
      items: [
        { id: 'products', name: 'Products', icon: Package },
        { id: 'categories', name: 'Categories', icon: Tags },
        { id: 'variants', name: 'Product Variants', icon: Sliders }
      ]
    },
    {
      title: 'Sales & CRM',
      items: [
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'customers', name: 'Customers', icon: Users },
        { id: 'payments', name: 'Payments', icon: CreditCard }
      ]
    },
    {
      title: 'Inventory',
      items: [
        { id: 'inventory', name: 'Stock Control', icon: Layers },
        { id: 'low-stock', name: 'Low Stock Alerts', icon: AlertOctagon }
      ]
    },
    {
      title: 'Website CMS',
      items: [
        { id: 'homepage-mgmt', name: 'Homepage Content', icon: Globe },
        { id: 'featured-lists', name: 'Featured Sections', icon: Sparkles }
      ]
    },
    {
      title: 'Content & Media',
      items: [
        { id: 'videos', name: 'Videos Catalog', icon: Video },
        { id: 'faqs', name: 'FAQ Manager', icon: HelpCircle }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { id: 'offers', name: 'Discounts & Coupons', icon: Percent },
        { id: 'seo', name: 'SEO Metadata', icon: Compass }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'backups', name: 'Data Backups', icon: Database },
        { id: 'activity-log', name: 'Audit Trail Logs', icon: Activity },
        { id: 'admin-users', name: 'Admin Accounts', icon: ShieldCheck },
        { id: 'settings', name: 'Global Settings', icon: Settings }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    setActiveMenu(id);
    onClose(); // Auto close on mobile
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
          id="sidebar-backdrop"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 bg-[#121212] text-[#e5e5e5] z-50 flex flex-col transition-all duration-300 border-r border-[#222]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
        id="admin-sidebar"
      >
        {/* Brand Header */}
        <div className="p-6 pb-4 border-b border-[#222] flex items-center justify-between bg-[#121212]">
          <div className="flex flex-col overflow-hidden">
            {!isCollapsed ? (
              <>
                <div className="text-lg font-serif italic text-[#c4a46a] tracking-wider select-none uppercase">
                  SmartHomes
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#666] mt-0.5 font-mono select-none">
                  Corporate Portal
                </div>
              </>
            ) : (
              <div className="text-xl font-serif italic text-[#c4a46a] tracking-wider select-none px-2">
                S
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded hover:bg-[#1a1a1a] text-[#888] hover:text-[#c4a46a] cursor-pointer border border-[#333]"
            title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
            id="btn-sidebar-collapse"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Group Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#222] bg-[#121212]">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1.5">
              {!isCollapsed && (
                <h3 className="px-3 text-[10px] uppercase tracking-[0.2em] text-[#666] font-mono leading-none mb-3">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = activeMenu === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs transition-all group relative cursor-pointer
                        ${isActive 
                          ? 'bg-[#1a1a1a] text-[#c4a46a] font-serif border border-[#333] font-medium' 
                          : 'hover:bg-[#151515] text-[#888] hover:text-[#bbb]'
                        }
                      `}
                      title={isCollapsed ? item.name : undefined}
                      id={`sidebar-item-${item.id}`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {/* Elegant Bullet Status Circle */}
                        <div className={`w-1.5 h-1.5 rounded-full transition-all shrink-0
                          ${isActive ? 'bg-[#c4a46a]' : 'border border-[#444] group-hover:border-[#666]'}
                        `} />
                        
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#c4a46a]' : 'text-[#666] group-hover:text-[#888]'}`} />
                        {!isCollapsed && <span className="truncate tracking-wide">{item.name}</span>}
                      </div>

                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[10px] rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-md border border-[#222]">
                          {item.name}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-[#222] bg-[#121212]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-serif italic text-red-400/90 hover:bg-red-950/20 hover:text-red-300 transition-all cursor-pointer border border-transparent hover:border-red-900/40"
            id="sidebar-logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout Account</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

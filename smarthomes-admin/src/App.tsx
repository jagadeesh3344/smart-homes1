import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import ProductsView from './components/ProductsView';
import CategoriesView from './components/CategoriesView';
import VariantsView from './components/VariantsView';
import OrdersView from './components/OrdersView';
import CustomersView from './components/CustomersView';
import PaymentsView from './components/PaymentsView';
import InventoryView from './components/InventoryView';
import WebsiteView from './components/WebsiteView';
import VideosView from './components/VideosView';
import FaqsView from './components/FaqsView';
import OffersView from './components/OffersView';
import SeoView from './components/SeoView';
import BackupsView from './components/BackupsView';
import ActivityLogView from './components/ActivityLogView';
import UsersView from './components/UsersView';
import SettingsView from './components/SettingsView';

import { getAdminSession, logoutAdmin, startRealtimeSync, stopRealtimeSync } from './utils/db';
import { getAuthInstance, isFirebaseConfigured } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AdminUser } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authenticate and load session
  const checkSession = () => {
    const session = getAdminSession();
    setCurrentUser(session);
  };

  useEffect(() => {
    checkSession();

    let unsubscribeAuth: (() => void) | null = null;
    try {
      if (isFirebaseConfigured()) {
        const auth = getAuthInstance();
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(`[Firebase Auth] Session active for UID: ${user.uid}. Initializing Realtime Sync.`);
            startRealtimeSync();
          } else {
            console.log('[Firebase Auth] Auth session suspended or cleared. Stopping Realtime Sync.');
            stopRealtimeSync();
            if (getAdminSession()) {
              console.warn('[Firebase Auth] Local session is stale. Redirecting to login.');
              logoutAdmin();
              setCurrentUser(null);
            }
          }
        });
      } else {
        console.log('[App] Operating in offline local storage mode.');
      }
    } catch (e) {
      console.error('Failed to init Firebase Auth state listener:', e);
    }

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      stopRealtimeSync();
    };
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setActiveMenu('dashboard');
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    setActiveMenu('dashboard');
  };

  // Toggle mobile responsive sidebar drawer
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Render correct view block matching sidebar coordinates
  const renderActiveView = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveMenu} />;
      case 'products':
        return <ProductsView />;
      case 'categories':
        return <CategoriesView />;
      case 'variants':
        return <VariantsView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'payments':
        return <PaymentsView />;
      case 'inventory':
        return <InventoryView filterLowStockOnly={false} />;
      case 'low-stock':
        return <InventoryView filterLowStockOnly={true} />;
      case 'homepage-mgmt':
        return <WebsiteView />;
      case 'featured-lists':
        // Featured lists are directly configured via product and category featured toggles!
        return (
          <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">Featured Layout Lists</h3>
            <p className="text-xs text-gray-400 font-medium">
              Products and categories can be featured on the homepage layout by toggling the "Featured" setting in their respective editors:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveMenu('products')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs uppercase tracking-wider"
              >
                Featured Products
              </button>
              <button
                onClick={() => setActiveMenu('categories')}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer shadow-xs uppercase tracking-wider"
              >
                Featured Categories
              </button>
            </div>
          </div>
        );
      case 'videos':
        return <VideosView />;
      case 'faqs':
        return <FaqsView />;
      case 'offers':
        return <OffersView />;
      case 'seo':
        return <SeoView />;
      case 'backups':
        return <BackupsView />;
      case 'activity-log':
        return <ActivityLogView />;
      case 'admin-users':
        return <UsersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={setActiveMenu} />;
    }
  };

  // Enforce credentials checks
  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex" id="admin-root-layout">
      {/* Responsive drawer sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main dashboard panel wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Navigation title & account status */}
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          activeMenu={activeMenu}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Managed workspace */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto" id="main-content-canvas">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

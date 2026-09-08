/**
 * App.tsx - Main Router Switch and Provider Wrapper
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { useAuth } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { BackToTop } from './components/layout/BackToTop';
import { ToastContainer } from './components/common/ToastContainer';

import { ProductQuickView } from './components/shop/ProductQuickView';
import { EnquiryModal } from './components/shop/EnquiryModal';
import { CartDrawer } from './components/shop/CartDrawer';
import { WishlistDrawer } from './components/shop/WishlistDrawer';

import { AuthModal } from './pages/AuthPages';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { VideosPage } from './pages/VideosPage';
import { PolicyPage } from './pages/PolicyPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { OrderEnquiryPage } from './pages/OrderEnquiryPage';
import { ComparePage } from './pages/ComparePage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainContent: React.FC = () => {
  const { activeRoute, routeParams } = useShop();

  const renderRoute = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'configurator':
        return <ConfiguratorPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'project-detail':
        return <ProjectDetailPage id={routeParams.id} />;
      case 'consultation':
        return <ConsultationPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'videos':
        return <VideosPage />;
      case 'privacy':
        return <PolicyPage type="privacy" />;
      case 'shipping':
        return <PolicyPage type="shipping" />;
      case 'terms':
        return <PolicyPage type="terms" />;
      case 'returns':
        return <PolicyPage type="returns" />;
      case 'account':
        return <AccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'order-enquiry':
        return <OrderEnquiryPage />;
      case 'compare':
        return <ComparePage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans flex flex-col overflow-x-hidden selection:bg-amber-100 selection:text-zinc-900">
      <Navbar />

      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <ProductQuickView />
      <EnquiryModal />
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />

      {/* Utility Floating Widgets */}
      <FloatingWhatsApp />
      <BackToTop />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <MainContent />
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;

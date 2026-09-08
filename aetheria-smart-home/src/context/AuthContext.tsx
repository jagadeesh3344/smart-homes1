/**
 * AuthContext - Handles Customer Auth and Pending Action Lock
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { StorageService } from '../services/storage';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { ApiService } from '../services/api';

interface PendingAction {
  type: 'whatsapp_enquiry' | 'email_enquiry' | 'quote_enquiry' | 'add_wishlist' | 'add_cart' | 'checkout';
  payload?: any;
  onSuccess?: () => void;
}

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  adminPinModalOpen: boolean;
  authModalOpen: boolean;
  authModalTab: 'login' | 'signup' | 'forgot';
  pendingAction: PendingAction | null;
  login: (email: string, pass: string) => { success: boolean; message: string };
  signup: (userData: { name: string; email: string; phone: string; password: string; address?: string; city?: string }) => { success: boolean; message: string };
  logout: () => void;
  openAdminPinModal: () => void;
  closeAdminPinModal: () => void;
  verifyAdminPin: (pin: string, rememberMe?: boolean) => { success: boolean; message: string };
  changeAdminPin: (currentPin: string, newPin: string) => { success: boolean; message: string };
  resetAdminPinToDefault: () => { success: boolean; message: string };
  adminLogout: () => void;
  requireAuth: (action: PendingAction) => boolean;
  closeAuthModal: () => void;
  openAuthModal: (tab?: 'login' | 'signup' | 'forgot') => void;
  executePendingAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const isAdmin = false;
  const adminPinModalOpen = false;
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  useEffect(() => {
    const user = StorageService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      console.log("[Firebase Auth] Attempting login with", email);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e: any) {
      console.warn("[Firebase Auth] Auth service error or fallback required:", e.message);
    }

    const result = StorageService.loginUser(email, pass);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setAuthModalOpen(false);
      if (pendingAction) {
        setTimeout(() => {
          if (pendingAction.onSuccess) {
            pendingAction.onSuccess();
          }
          setPendingAction(null);
        }, 300);
      }
    }
    return result;
  };

  const signup = async (userData: { name: string; email: string; phone: string; password: string; address?: string; city?: string }) => {
    try {
      console.log("[Firebase Auth] Attempting registration for", userData.email);
      const credentials = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      if (credentials.user) {
        await updateProfile(credentials.user, { displayName: userData.name });
      }
    } catch (e: any) {
      console.warn("[Firebase Auth] Auth service error or fallback required:", e.message);
    }

    const result = StorageService.registerUser(userData);
    if (result.success && result.user) {
      // Mirror to Unified Backend
      fetch(`${ApiService.getBaseUrl()}/api/orders/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        })
      }).catch(e => console.warn('[Backend Customer Registration Mirror]:', e.message));

      setCurrentUser(result.user);
      setAuthModalOpen(false);
      if (pendingAction) {
        setTimeout(() => {
          if (pendingAction.onSuccess) {
            pendingAction.onSuccess();
          }
          setPendingAction(null);
        }, 300);
      }
    }
    return result;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      console.warn("[Firebase Auth] Error signing out:", e);
    }
    StorageService.logoutUser();
    setCurrentUser(null);
  };

  // Secure no-op placeholders for removed Admin controls
  const openAdminPinModal = () => {};
  const closeAdminPinModal = () => {};
  const verifyAdminPin = (pin: string, rememberMe: boolean = false) => {
    return { success: false, message: 'Administrator Access Disabled.' };
  };
  const resetAdminPinToDefault = () => {
    return { success: false, message: 'Administrator Access Disabled.' };
  };
  const changeAdminPin = (currentPin: string, newPin: string) => {
    return { success: false, message: 'Administrator Access Disabled.' };
  };
  const adminLogout = () => {};

  /**
   * Enforces login before executing action.
   * Returns true if already logged in, otherwise opens Auth Modal and stores action.
   */
  const requireAuth = (action: PendingAction): boolean => {
    if (currentUser) {
      if (action.onSuccess) {
        action.onSuccess();
      }
      return true;
    }
    // Store pending action and prompt login modal
    setPendingAction(action);
    setAuthModalTab('login');
    setAuthModalOpen(true);
    return false;
  };

  const executePendingAction = () => {
    if (pendingAction && pendingAction.onSuccess) {
      pendingAction.onSuccess();
      setPendingAction(null);
    }
  };

  const openAuthModal = (tab: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isAdmin,
        adminPinModalOpen,
        authModalOpen,
        authModalTab,
        pendingAction,
        login,
        signup,
        logout,
        openAdminPinModal,
        closeAdminPinModal,
        verifyAdminPin,
        resetAdminPinToDefault,
        changeAdminPin,
        adminLogout,
        requireAuth,
        closeAuthModal,
        openAuthModal,
        executePendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthPages Component - Customer Login, Signup, Forgot Password & Auth Modal Overlay
 * Refined with Premium Light-Mode Luxury Theme.
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal, login, signup, pendingAction } = useAuth();
  const { addToast } = useShop();

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupError, setSignupError] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = login(loginEmail, loginPass);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      addToast('Welcome back to Aetheria Smart Home!');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    const res = signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPass,
      address: signupAddress,
    });
    if (!res.success) {
      setSignupError(res.message);
    } else {
      addToast('Account created successfully!');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-xl border border-zinc-200 relative animate-scale-up my-auto max-h-[90vh] flex flex-col text-zinc-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-50 text-zinc-900 p-5 sm:p-6 relative shrink-0 border-b border-zinc-150">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-800 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-[#C5A880] text-[10px] font-bold uppercase tracking-widest mb-1">
            <span>Customer Portal Access</span>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 font-serif">
            {authModalTab === 'login' ? 'Sign In' : authModalTab === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>

          {pendingAction && (
            <p className="text-xs text-[#C5A880] mt-2 p-2 rounded bg-[#C5A880]/5 border border-[#C5A880]/15 font-light">
              🔒 Login required to proceed with your selected action.
            </p>
          )}
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* Tabs */}
          {authModalTab !== 'forgot' && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 rounded mb-6 text-xs font-bold border border-zinc-200">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className={`py-2 rounded transition-all cursor-pointer ${
                  authModalTab === 'login' ? 'bg-white text-[#C5A880] shadow-sm' : 'text-zinc-455 hover:text-zinc-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className={`py-2 rounded transition-all cursor-pointer ${
                  authModalTab === 'signup' ? 'bg-white text-[#C5A880] shadow-sm' : 'text-zinc-455 hover:text-zinc-800'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* LOGIN FORM */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                  />
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={e => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 stroke-[1.5]" />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-500 font-light">
                  <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-[#C5A880] focus:ring-0" />
                  <span>Remember session</span>
                </label>
                <button
                  type="button"
                  onClick={() => openAuthModal('forgot')}
                  className="text-[#C5A880] font-semibold hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Sign In & Continue</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authModalTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              {signupError && (
                <div className="p-3 rounded bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
                  {signupError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={signupPhone}
                  onChange={e => setSignupPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={signupPass}
                  onChange={e => setSignupPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-sm"
              >
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD */}
          {authModalTab === 'forgot' && (
            <div className="space-y-4">
              {forgotSent ? (
                <div className="p-4 bg-zinc-50 rounded border border-[#C5A880]/30 text-zinc-800 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-zinc-900 font-serif">Reset Instructions Sent</h4>
                  <p className="text-xs text-zinc-550 mt-1 font-light">Check your email inbox for password recovery steps.</p>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="mt-3 px-4 py-2 bg-zinc-900 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">Enter your registered email address to receive password reset instructions.</p>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded border border-zinc-200 text-xs bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="w-full text-center text-xs text-zinc-450 hover:text-zinc-800 font-semibold cursor-pointer block mt-2"
                  >
                    Cancel & Back to Sign In
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

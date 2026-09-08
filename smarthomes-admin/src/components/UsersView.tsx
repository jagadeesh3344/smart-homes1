import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, X } from 'lucide-react';
import { getAdminUsers, addAdminUser, updateAdminUser, deleteAdminUser, getAdminSession } from '../utils/db';
import { AdminUser } from '../types';

export default function UsersView() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentSession, setCurrentSession] = useState<AdminUser | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('Catalogue Manager');

  const [toast, setToast] = useState('');

  const loadData = () => {
    setUsers(getAdminUsers());
    setCurrentSession(getAdminSession());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !name.trim()) {
      alert('Email and Name are required fields.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const exists = users.find(u => u.email === cleanEmail);
    if (exists) {
      alert('An administrative account with this email already exists.');
      return;
    }

    addAdminUser({
      email: cleanEmail,
      name: name.trim(),
      role,
      active: true
    });

    triggerToast(`Team account for "${name}" created successfully!`);
    setIsModalOpen(false);
    loadData();
  };

  const handleRoleChange = (userId: string, nextRole: AdminUser['role']) => {
    if (userId === currentSession?.id) {
      alert('You cannot modify your own administrative access role.');
      return;
    }
    updateAdminUser(userId, { role: nextRole });
    triggerToast('Administrative access role updated.');
    loadData();
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userId === currentSession?.id) {
      alert('You cannot delete your own active administrative session.');
      return;
    }
    if (window.confirm(`Permanently revoke admin access for "${userToDelete?.name}"?`)) {
      deleteAdminUser(userId);
      triggerToast('Administrator account deleted.');
      loadData();
    }
  };

  return (
    <div className="space-y-6" id="users-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">Team Accounts &amp; Access Controls</h2>
          <p className="text-xs text-gray-400 font-medium font-sans">Enforce granular role limits for administrative portal users</p>
        </div>
        <button
          onClick={() => {
            setEmail('');
            setName('');
            setRole('Catalogue Manager');
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
          id="btn-add-user"
        >
          <Plus className="w-4 h-4" /> ADD USER ACCOUNT
        </button>
      </div>

      {/* Users table list */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="team-users-table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Administrative Member Name</th>
                <th className="py-3.5 px-4">Email Username Address</th>
                <th className="py-3.5 px-4">Access Permission Role</th>
                <th className="py-3.5 px-4 text-center">Profile status</th>
                <th className="py-3.5 px-4 text-right pr-6">Remove account</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      {u.name}
                      {u.id === currentSession?.id && (
                        <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase font-sans shrink-0">
                          Your Active Profile
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-indigo-650">
                    {u.email}
                  </td>
                  <td className="py-4 px-4">
                    <select
                      disabled={u.id === currentSession?.id}
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as AdminUser['role'])}
                      className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Catalogue Manager">Catalogue Manager</option>
                      <option value="Order Manager">Order Manager</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-green-50 border border-green-150 text-green-700 rounded-full text-[9px] font-extrabold tracking-wide uppercase">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right pr-6">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      disabled={u.id === currentSession?.id}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title={u.id === currentSession?.id ? 'Cannot delete your own active session' : 'Delete user account'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="user-modal">
          <div className="bg-white rounded-3xl max-w-sm w-full border border-gray-100 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                  Create Operational Account
                </h3>
                <p className="text-[10px] text-gray-400 font-medium font-sans">Allocate credentials for team staff profiles</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Member Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Username Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@smarthomes.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Access Role Permission</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminUser['role'])}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white font-bold"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Catalogue Manager">Catalogue Manager (Editing Products/Categories)</option>
                  <option value="Order Manager">Order Manager (Fulfilling sales pipelines)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                >
                  PROVISION ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { getActivityLogs } from '../utils/db';
import { ActivityLog } from '../types';

export default function ActivityLogView() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = () => {
    setLogs(getActivityLogs().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to purge the activity audit trail? This action is irreversible.')) {
      localStorage.setItem('smarthomes_activity', JSON.stringify([]));
      loadData();
    }
  };

  const filteredLogs = logs.filter(log => {
    const term = searchTerm.toLowerCase();
    return (
      log.adminEmail.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.target.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6" id="activity-log-view">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-800">Activity Logs &amp; Audit Trail</h2>
          <p className="text-xs text-gray-400 font-medium">Verify system event trails and administrative modifications chronologically</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 border border-gray-150 rounded-xl cursor-pointer"
            title="Refresh Logs List"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={handleClearLogs}
            className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
          >
            PURGE LOGS
          </button>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Search bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
          <div className="relative w-full max-w-sm rounded-lg shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by admin email, action description, target..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-600 bg-white"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm font-semibold">
              No audit trail events match search filters.
            </div>
          ) : (
            <table className="w-full text-left border-collapse" id="audit-logs-table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-4">Administrative Actor Email</th>
                  <th className="py-3.5 px-4">Action Event</th>
                  <th className="py-3.5 px-4 pr-6">Target Resource Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-mono font-medium text-gray-600">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-3.5 px-6 text-gray-400">
                      {new Date(log.timestamp).toLocaleString('en-US', { hour12: false })}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-gray-800">
                      {log.adminEmail}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold border border-indigo-150 bg-indigo-50 text-indigo-700 font-sans uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 pr-6 font-sans text-gray-500 leading-normal text-[11px] break-all max-w-xs">
                      {log.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

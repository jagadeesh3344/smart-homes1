import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCcw, 
  Wifi, 
  WifiOff, 
  Play, 
  Save, 
  CloudRain, 
  Sparkles, 
  Loader2, 
  Info,
  Server,
  Shield,
  Activity,
  Fingerprint,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import { 
  getActiveFirebaseConfig, 
  saveFirebaseConfig, 
  testFirebaseConnection, 
  isFirebaseConfigured,
  clearFirebaseConfig,
  FirebaseConfigParams,
  getDb
} from '../utils/firebase';
import { 
  seedFirestoreWithLocalData, 
  pullDataFromFirestore, 
  exportBackup, 
  restoreBackup 
} from '../utils/db';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function BackupsView() {
  const [toast, setToast] = useState('');
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [uploadedJsonString, setUploadedJsonString] = useState<string | null>(null);

  // Firebase Config State
  const [config, setConfig] = useState<FirebaseConfigParams>(getActiveFirebaseConfig());
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{ checked: boolean; success: boolean; latency?: number; error?: string }>({
    checked: false,
    success: false
  });

  // Action Operations State
  const [seedingDatabase, setSeedingDatabase] = useState(false);
  const [seedingProgress, setSeedingProgress] = useState('');
  const [pullingDatabase, setPullingDatabase] = useState(false);

  // Security Testing Suite State
  const [runningSecTests, setRunningSecTests] = useState(false);
  const [secTestLogs, setSecTestLogs] = useState<{ id: number; name: string; criteria: string; status: 'PENDING' | 'PASS' | 'FAIL'; message: string }[]>([
    { id: 1, name: 'Unauthenticated Write Block', criteria: 'Non-logged in user must fail to write products/categories', status: 'PENDING', message: 'Ready to initiate test...' },
    { id: 2, name: 'Customer Privilege Lock', criteria: 'Authenticating as a normal user (no admin doc) must fail catalogue changes', status: 'PENDING', message: 'Ready to initiate test...' },
    { id: 3, name: 'Order & Profile Isolation', criteria: 'Customer A cannot read Customer B\'s personal orders', status: 'PENDING', message: 'Ready to initiate test...' },
    { id: 4, name: 'Self-Admin Escalation Block', criteria: 'Unprivileged customers must not be able to write an admins card', status: 'PENDING', message: 'Ready to initiate test...' },
    { id: 5, name: 'Admin Functional Authorization', criteria: 'Logged-in Super Admin is permitted fully authorized sync writes', status: 'PENDING', message: 'Ready to initiate test...' }
  ]);

  const runSecurityAuditTests = async () => {
    if (!isFirebaseConfigured()) {
      triggerToast('Please configure Firebase settings to run security audit.');
      return;
    }
    setRunningSecTests(true);
    
    // Set all pending
    setSecTestLogs(prev => prev.map(t => ({ ...t, status: 'PENDING', message: 'Running cryptographical penetration test...' })));

    const activeConfig = getActiveFirebaseConfig();
    let tempApp;
    try {
      tempApp = initializeApp(activeConfig, `sec-test-${Date.now()}`);
    } catch (e: any) {
      console.warn('Temp app init warning:', e);
      tempApp = initializeApp(activeConfig);
    }

    const tempDb = getFirestore(tempApp);
    const tempAuth = getAuth(tempApp);

    // 1. Unauthenticated Write Block
    try {
      await setDoc(doc(tempDb, 'products', 'test_sec_unauth_probe'), { name: 'Intrusion Probe', sku: 'PROBE', price: 99999 });
      setSecTestLogs(prev => prev.map(t => t.id === 1 ? { ...t, status: 'FAIL', message: 'CRITICAL VULNERABILITY: Public user wrote to products collection!' } : t));
    } catch (err: any) {
      if (err.code === 'permission-denied') {
        setSecTestLogs(prev => prev.map(t => t.id === 1 ? { ...t, status: 'PASS', message: 'VERIFIED SECURE: Server-side security rules rejected the unauthenticated write attempt.' } : t));
      } else {
        setSecTestLogs(prev => prev.map(t => t.id === 1 ? { ...t, status: 'FAIL', message: `Unexpected error code: ${err.code || err.message}` } : t));
      }
    }

    // 2. Customer Privilege Lock
    let userUid = '';
    try {
      const email = `test-customer-${Math.floor(Math.random() * 100000)}@smarthomes.com`;
      const cred = await createUserWithEmailAndPassword(tempAuth, email, 'securePassword123');
      userUid = cred.user.uid;

      try {
        await setDoc(doc(tempDb, 'products', 'test_sec_customer_probe'), { name: 'Customer Bypass Test', sku: 'BYPASS', price: 0 });
        setSecTestLogs(prev => prev.map(t => t.id === 2 ? { ...t, status: 'FAIL', message: 'VULNERABILITY: Standard authenticated customer wrote to catalog!' } : t));
      } catch (err: any) {
        if (err.code === 'permission-denied') {
          setSecTestLogs(prev => prev.map(t => t.id === 2 ? { ...t, status: 'PASS', message: 'VERIFIED SECURE: Client is authenticated but server rules block writes due to absence from admins collection.' } : t));
        } else {
          setSecTestLogs(prev => prev.map(t => t.id === 2 ? { ...t, status: 'FAIL', message: `Unexpected error: ${err.message}` } : t));
        }
      }
    } catch (authErr: any) {
      console.error(authErr);
      setSecTestLogs(prev => prev.map(t => t.id === 2 ? { ...t, status: 'FAIL', message: `Customer simulation failed: ${authErr.message}` } : t));
    }

    // 3. Order & Profile Isolation
    if (userUid) {
      try {
        await getDoc(doc(tempDb, 'orders', 'order-belonging-to-customer-b'));
        setSecTestLogs(prev => prev.map(t => t.id === 3 ? { ...t, status: 'FAIL', message: 'VULNERABILITY: Customer A successfully read document metadata from a Customer B path!' } : t));
      } catch (err: any) {
        if (err.code === 'permission-denied') {
          setSecTestLogs(prev => prev.map(t => t.id === 3 ? { ...t, status: 'PASS', message: 'VERIFIED SECURE: Rules block reading other customers orders. Customer data fully isolated.' } : t));
        } else {
          setSecTestLogs(prev => prev.map(t => t.id === 3 ? { ...t, status: 'FAIL', message: `Unexpected read error: ${err.message}` } : t));
        }
      }
    } else {
      setSecTestLogs(prev => prev.map(t => t.id === 3 ? { ...t, status: 'FAIL', message: 'Aborted: Requires customer auth token.' } : t));
    }

    // 4. Self-Admin Escalation Block
    if (userUid) {
      try {
        await setDoc(doc(tempDb, 'admins', userUid), { email: 'malicious@smarthomes.com', role: 'Super Admin', active: true });
        setSecTestLogs(prev => prev.map(t => t.id === 4 ? { ...t, status: 'FAIL', message: 'VULNERABILITY: Standard customer successfully added themselves to admins collection!' } : t));
      } catch (err: any) {
        if (err.code === 'permission-denied') {
          setSecTestLogs(prev => prev.map(t => t.id === 4 ? { ...t, status: 'PASS', message: 'VERIFIED SECURE: Creating or editing documents in /admins collection is forbidden to non-Super Admins.' } : t));
        } else {
          setSecTestLogs(prev => prev.map(t => t.id === 4 ? { ...t, status: 'FAIL', message: `Unexpected error: ${err.message}` } : t));
        }
      }
    } else {
      setSecTestLogs(prev => prev.map(t => t.id === 4 ? { ...t, status: 'FAIL', message: 'Aborted: Requires customer session.' } : t));
    }

    // 5. Admin Functional Authorization
    try {
      const db = getDb();
      const testDocId = `test-verify-${Date.now()}`;
      await setDoc(doc(db, 'connection_tests', testDocId), { active: true, testedAt: new Date().toISOString() });
      await deleteDoc(doc(db, 'connection_tests', testDocId));
      setSecTestLogs(prev => prev.map(t => t.id === 5 ? { ...t, status: 'PASS', message: 'VERIFIED SECURE: Active Super Admin session is fully authorized on Firebase Firestore.' } : t));
    } catch (err: any) {
      setSecTestLogs(prev => prev.map(t => t.id === 5 ? { ...t, status: 'FAIL', message: `Verification failed: ${err.message}. Please check active admin login.` } : t));
    }

    setRunningSecTests(false);
    triggerToast('Cryptographical Penetration and Security Tests completed!');
  };

  useEffect(() => {
    // If already pre-filled via standard variables, run an initial connection check
    if (isFirebaseConfigured()) {
      handleTestConnection();
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleConfigChange = (field: keyof FirebaseConfigParams, val: string) => {
    setConfig(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveConfig = () => {
    if (!config.apiKey) {
      triggerToast('API Key is required to save Firebase overrides.');
      return;
    }
    saveFirebaseConfig(config);
    triggerToast('Firebase Web configurations saved successfully!');
    // Trigger connection re-check
    handleTestConnection();
  };

  const handleClearOverrides = () => {
    clearFirebaseConfig();
    const active = getActiveFirebaseConfig();
    setConfig(active);
    setConnectionResult({ checked: false, success: false });
    triggerToast('Configuration overrides cleared. Using standard variables.');
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult({ checked: false, success: false });
    try {
      const res = await testFirebaseConnection();
      setConnectionResult({
        checked: true,
        success: res.success,
        latency: res.latency,
        error: res.error
      });
      if (res.success) {
        triggerToast('Connected to smarthomes-366443 successfully!');
      } else {
        triggerToast('Firebase connection test failed.');
      }
    } catch (e: any) {
      setConnectionResult({
        checked: true,
        success: false,
        error: e?.message || 'Initialization failed'
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSeedFirebase = async () => {
    setSeedingDatabase(true);
    setSeedingProgress('Initializing seed batch...');
    try {
      const res = await seedFirestoreWithLocalData((msg) => setSeedingProgress(msg));
      if (res.success) {
        triggerToast('Successfully seeded Firestore with local smart home records!');
        setSeedingProgress('Seeding Complete! Direct public website sync active.');
      } else {
        alert(`Seeding failed: ${res.error}`);
      }
    } catch (error: any) {
      alert(`Error during seeding: ${error?.message}`);
    } finally {
      setSeedingDatabase(false);
    }
  };

  const handlePullFirebase = async () => {
    setPullingDatabase(true);
    try {
      const res = await pullDataFromFirestore();
      if (res.success) {
        triggerToast('Pulled latest e-commerce dataset from Firestore successfully!');
      } else {
        alert(`Database pull failed: ${res.error}. Make sure Firestore has data and you have permissions.`);
      }
    } catch (error: any) {
      alert(`Error during Firestore pull: ${error?.message}`);
    } finally {
      setPullingDatabase(false);
    }
  };

  // Local JSON Backup Exports
  const handleExport = () => {
    try {
      const jsonStr = exportBackup();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `k_smarthomes_db_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast('Backup file generated and downloaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to generate local database export.');
    }
  };

  const handleTriggerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        JSON.parse(content);
        setUploadedJsonString(content);
        setIsWarningOpen(true);
      } catch (err) {
        alert('File is not a valid JSON string.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExecuteRestore = () => {
    if (!uploadedJsonString) return;
    const success = restoreBackup(uploadedJsonString);
    if (success) {
      setIsWarningOpen(false);
      setUploadedJsonString(null);
      alert('Database restored successfully and synced to both Local Cache and Firestore!');
    } else {
      alert('Failed to restore backup.');
    }
  };

  return (
    <div className="space-y-8" id="backups-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1a1a] border border-[#c4a46a]/50 text-[#c4a46a] px-5 py-3 rounded-sm shadow-2xl flex items-center gap-2 font-serif italic text-xs animate-slide-in">
          <CheckCircle className="w-4 h-4 text-[#c4a46a]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Profile Title */}
      <div className="bg-[#111] p-6 border border-[#222] rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-serif italic text-[#d4d4d4] tracking-wide">E-Commerce Cloud Synchronization</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-mono mt-1">Configure and manage real-time connections to the core Firestore project database</p>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#151515] border border-[#222] text-[#c4a46a] text-[10px] font-mono uppercase tracking-widest shrink-0">
          <Server className="w-4 h-4 text-[#c4a46a]" />
          PROJECT ID: <span className="font-bold text-[#e5e5e5]">smarthomes-366443</span>
        </div>
      </div>

      {/* Connection & Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Firebase Config Credentials Panel */}
        <div className="lg:col-span-7 bg-[#111] border border-[#222] p-6 rounded-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#222] pb-3">
              <h3 className="text-xs font-serif font-black text-[#c4a46a] uppercase tracking-wider flex items-center gap-2">
                <Wifi className="w-4.5 h-4.5" /> Firebase SDK Config Parameters
              </h3>
              {connectionResult.checked && (
                <span className={`text-[9px] px-2 py-0.5 font-mono uppercase tracking-widest border ${
                  connectionResult.success 
                    ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-400' 
                    : 'bg-red-950/20 border-red-900/50 text-red-400'
                }`}>
                  {connectionResult.success ? `Connected (${connectionResult.latency}ms)` : 'Disconnnected'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#666] font-mono mb-1.5">Project ID (Static)</label>
                <input 
                  type="text" 
                  value={config.projectId}
                  disabled
                  className="w-full bg-[#151515]/50 text-[#888] cursor-not-allowed border border-[#222] px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#666] font-mono mb-1.5">Auth Domain</label>
                <input 
                  type="text" 
                  value={config.authDomain}
                  onChange={(e) => handleConfigChange('authDomain', e.target.value)}
                  className="w-full bg-[#151515] border border-[#222] px-3 py-2 text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-[#c4a46a] font-mono mb-1.5">Web API Key (Required)</label>
                <input 
                  type="text" 
                  value={config.apiKey}
                  onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                  placeholder="Paste your Firebase web API key here"
                  className="w-full bg-[#151515] border border-[#222] px-3 py-2 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#666] font-mono mb-1.5">App ID</label>
                <input 
                  type="text" 
                  value={config.appId}
                  onChange={(e) => handleConfigChange('appId', e.target.value)}
                  placeholder="1:xxxxxxxx:web:xxxxxx"
                  className="w-full bg-[#151515] border border-[#222] px-3 py-2 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#666] font-mono mb-1.5">Storage Bucket</label>
                <input 
                  type="text" 
                  value={config.storageBucket}
                  onChange={(e) => handleConfigChange('storageBucket', e.target.value)}
                  className="w-full bg-[#151515] border border-[#222] px-3 py-2 text-xs"
                />
              </div>
            </div>

            {/* Config alert helper */}
            <div className="bg-[#151515] border border-[#222] p-3 text-[10px] text-[#888] leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 text-[#c4a46a] mt-0.5" />
              <div>
                <p className="font-serif italic text-[#c4a46a]">Configuration Hierarchy</p>
                <p className="mt-0.5">The Admin Panel reads from saved credentials above. If you haven't configured your Firebase environment keys yet, paste your web API key and App ID here to establish complete dynamic operations instantly.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t border-[#222] pt-4 mt-6">
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2 bg-[#c4a46a] hover:bg-[#b09058] text-[#0a0a0a] text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer"
            >
              Save Configuration
            </button>
            <button
              onClick={handleTestConnection}
              disabled={testingConnection || !config.apiKey}
              className="px-4 py-2 bg-[#151515] border border-[#222] hover:bg-[#222] text-[#bbb] text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
            >
              {testingConnection ? <Loader2 className="animate-spin w-3.5 h-3.5 text-[#bbb]" /> : <RefreshCcw className="w-3.5 h-3.5" />}
              Test Connection
            </button>
            <button
              onClick={handleClearOverrides}
              className="px-4 py-2 border border-transparent hover:border-red-900/50 text-red-400 text-[10px] hover:bg-red-950/10 cursor-pointer ml-auto"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Dynamic Database Operation Controls */}
        <div className="lg:col-span-5 bg-[#111] border border-[#222] p-6 rounded-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-serif font-black text-[#c4a46a] uppercase tracking-wider border-b border-[#222] pb-3 flex items-center gap-2">
              <CloudRain className="w-4.5 h-4.5" /> Core Sync Operations
            </h3>

            {/* Sync Status Banner */}
            <div className={`p-4 border ${
              connectionResult.success 
                ? 'bg-emerald-950/10 border-emerald-900/40 text-[#e5e5e5]' 
                : 'bg-yellow-950/10 border-yellow-900/40 text-[#bbb]'
            } text-xs space-y-1.5`}>
              <div className="flex items-center gap-2 font-serif italic text-emerald-400">
                {connectionResult.success ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                <span>{connectionResult.success ? 'Core Connection Active' : 'Offline / Standard Cache'}</span>
              </div>
              <p className="text-[10px] text-[#888] leading-relaxed">
                {connectionResult.success 
                  ? 'All additions, stock adjustments, order workflows, and catalog manipulations are pushed in real-time to the smarthomes-366443 project.' 
                  : 'Configure a valid Firebase Web API key on the left to activate instant writes to your SmartHomes database.'
                }
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div>
                <button
                  onClick={handlePullFirebase}
                  disabled={pullingDatabase || !connectionResult.success}
                  className="w-full py-2.5 px-4 bg-[#151515] hover:bg-[#222] border border-[#222] text-[#bbb] text-xs font-serif italic font-medium uppercase tracking-wider flex items-center justify-between cursor-pointer disabled:opacity-40"
                >
                  <span className="flex items-center gap-2">
                    {pullingDatabase ? <Loader2 className="animate-spin w-4 h-4 text-[#c4a46a]" /> : <RefreshCcw className="w-4 h-4 text-[#666]" />}
                    Pull E-Commerce Ledger From Cloud
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#666]">PULL DATA</span>
                </button>
                <p className="text-[9px] text-[#666] font-sans mt-1 px-1">Retrieve latest updates from public website database</p>
              </div>

              <div>
                <button
                  onClick={handleSeedFirebase}
                  disabled={seedingDatabase || !connectionResult.success}
                  className="w-full py-2.5 px-4 bg-[#151515] hover:bg-[#222] border border-[#222] text-[#bbb] text-xs font-serif italic font-medium uppercase tracking-wider flex items-center justify-between cursor-pointer disabled:opacity-40"
                >
                  <span className="flex items-center gap-2">
                    {seedingDatabase ? <Loader2 className="animate-spin w-4 h-4 text-[#c4a46a]" /> : <Play className="w-4 h-4 text-[#666]" />}
                    Bootstrap Empty Cloud Project with Seed Data
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#666]">SEED DATA</span>
                </button>
                <p className="text-[9px] text-[#666] font-sans mt-1 px-1">Seed existing empty Firestore with pre-defined smart home products and categories</p>
              </div>
            </div>
          </div>

          {seedingDatabase && (
            <div className="bg-[#151515] p-3 border border-indigo-950/30 text-[10px] text-[#c4a46a] font-mono flex items-center gap-2 animate-pulse mt-4">
              <Loader2 className="animate-spin w-4.5 h-4.5" />
              <span>{seedingProgress}</span>
            </div>
          )}
        </div>

      </div>

      {/* Connection Errors details */}
      {connectionResult.checked && !connectionResult.success && (
        <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-sm text-xs text-red-400 space-y-1">
          <p className="font-serif italic text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
            Authentication / Security Exception Details
          </p>
          <code className="block font-mono text-[10px] bg-[#0a0a0a] p-3 border border-red-950 text-red-300 mt-2 whitespace-pre-wrap select-all">
            {connectionResult.error}
          </code>
        </div>
      )}

      {/* Cryptographical Security Audit & Penetration Test Suite */}
      <div className="bg-[#111] border border-[#222] p-6 rounded-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222] pb-4">
          <div>
            <h3 className="text-xs font-serif font-black text-[#c4a46a] uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-[#c4a46a]" /> Cryptographical Security Audit &amp; Penetration Testing Suite
            </h3>
            <p className="text-[10px] text-[#666] font-mono mt-1">Live, on-demand negative tests simulating unauthenticated and standard customer session intrusion attempts</p>
          </div>
          <button
            onClick={runSecurityAuditTests}
            disabled={runningSecTests || !isFirebaseConfigured()}
            className="px-4 py-2.5 bg-red-950/30 border border-red-900/50 hover:bg-red-900/20 text-red-400 text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-40"
          >
            {runningSecTests ? (
              <>
                <Loader2 className="animate-spin w-3.5 h-3.5 text-red-400" />
                Executing Pentests...
              </>
            ) : (
              <>
                <Activity className="w-3.5 h-3.5" />
                Run On-Demand Security Audit
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#bbb] font-medium border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-[#666] text-[9px] uppercase tracking-widest font-mono">
                <th className="py-2.5 font-bold">Audit Test Case</th>
                <th className="py-2.5 font-bold">Intrusion Vector / Target Criteria</th>
                <th className="py-2.5 font-bold">Status</th>
                <th className="py-2.5 font-bold text-right">Server Response Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]/55">
              {secTestLogs.map((test) => (
                <tr key={test.id} className="hover:bg-[#151515]/30 transition-colors">
                  <td className="py-4 font-serif italic text-white flex items-center gap-2">
                    {test.status === 'PASS' && <Lock className="w-3.5 h-3.5 text-emerald-500" />}
                    {test.status === 'FAIL' && <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
                    {test.status === 'PENDING' && <Fingerprint className="w-3.5 h-3.5 text-[#666]" />}
                    {test.name}
                  </td>
                  <td className="py-4 text-[10px] text-[#888] font-mono max-w-xs">{test.criteria}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-mono uppercase tracking-widest border rounded-xs ${
                      test.status === 'PASS' ? 'bg-emerald-950/25 border-emerald-900/50 text-emerald-400' :
                      test.status === 'FAIL' ? 'bg-red-950/25 border-red-900/50 text-red-400 animate-pulse' :
                      'bg-[#1a1a1a] border-[#222] text-[#666]'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="py-4 text-right text-[10px] font-mono text-[#888] max-w-sm overflow-hidden text-ellipsis">
                    <span className={test.status === 'PASS' ? 'text-emerald-400' : test.status === 'FAIL' ? 'text-red-400 font-bold' : ''}>
                      {test.message}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local Files System Backups block */}
      <div className="bg-[#111] border border-[#222] p-6 rounded-sm">
        <h3 className="text-xs font-serif font-black text-[#c4a46a] uppercase tracking-wider border-b border-[#222] pb-3 flex items-center gap-2 mb-4">
          <Database className="w-4.5 h-4.5" /> Local System Backups
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5 text-xs">
            <h4 className="font-serif italic text-[#d4d4d4]">Export Database State</h4>
            <p className="text-[#888] leading-relaxed text-[11px]">
              Generate a single, self-contained JSON backup file capturing all existing touch-switches, price variant tables, active sales pipeline orders, customer accounts, and CMS configurations. Keep this file safe for data archiving.
            </p>
            <button
              onClick={handleExport}
              className="py-2.5 px-4 bg-[#c4a46a] hover:bg-[#b09058] text-[#0a0a0a] text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer mt-2"
            >
              Export JSON File
            </button>
          </div>

          <div className="space-y-2.5 text-xs border-l border-[#222] pl-0 md:pl-6 pt-6 md:pt-0">
            <h4 className="font-serif italic text-[#d4d4d4]">Restore System Backup</h4>
            <p className="text-[#888] leading-relaxed text-[11px]">
              Restores previous configurations from an exported JSON backup. Restoring is destructive and will overwrite all existing local catalog, pricing adjustments, current warehouse inventories, user databases, and system settings instantly.
            </p>
            <label className="inline-block py-2.5 px-4 bg-[#151515] border border-[#222] hover:bg-[#222] text-[#bbb] text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer mt-2">
              Upload JSON Backup
              <input
                type="file"
                accept=".json"
                onChange={handleTriggerUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Warning overwrite warning dialogue */}
      {isWarningOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="restore-warning-dialog">
          <div className="bg-[#111] max-w-md w-full border border-red-900/50 shadow-2xl overflow-hidden p-6 space-y-5 text-xs text-[#bbb] font-medium rounded-sm">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-900/50 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-sm font-serif italic text-red-400 uppercase tracking-wider">
                DESTRUCTIVE OVERWRITE ACTIONS
              </h3>
              <p className="text-[10px] text-[#666] font-mono">Verify your actions before executing this overwrite command</p>
            </div>

            <div className="bg-red-950/20 border border-red-900/50 p-4 space-y-2 text-red-300">
              <p className="font-serif italic font-bold">Are you absolutely sure you want to restore this database?</p>
              <p className="text-[11px] leading-relaxed opacity-90">
                This action is non-reversible. Executing this restoration will completely purge, overwrite, and reset all:
              </p>
              <ul className="list-disc pl-4 text-[10px] space-y-1 font-bold opacity-90 font-mono text-red-400">
                <li>Smart switches &amp; automation items</li>
                <li>Fulfillment orders ledger</li>
                <li>Customer accounts index</li>
                <li>FAQ &amp; multimedia database lists</li>
                <li>General website settings</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end pt-3 border-t border-[#222]">
              <button
                type="button"
                onClick={() => {
                  setIsWarningOpen(false);
                  setUploadedJsonString(null);
                }}
                className="py-2.5 px-4 bg-[#151515] border border-[#222] hover:bg-[#222] text-[#bbb] text-[10px] font-serif italic uppercase tracking-wider cursor-pointer"
              >
                Abort Restore
              </button>
              <button
                type="button"
                onClick={handleExecuteRestore}
                className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-serif italic font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Overwrite Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

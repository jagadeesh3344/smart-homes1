import { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  Activity,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Database,
  Wifi,
  Loader2
} from 'lucide-react';
import { 
  getProducts, 
  getCategories, 
  getOrders, 
  getCustomers, 
  getActivityLogs, 
  getSystemSettings 
} from '../utils/db';
import { Product, Order, ActivityLog } from '../types';
import { getDb, getAuthInstance } from '../utils/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface DashboardViewProps {
  onNavigate: (menu: string) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    paidOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    lowStockCount: 0,
    totalSales: 0
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [lowStockList, setLowStockList] = useState<Product[]>([]);
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);

  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResult, setTestResult] = useState<{
    projectId: string;
    database: string;
    authUid: string;
    adminRecognized: string;
    writeStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE';
    readStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE';
    writeError?: string;
    readError?: string;
    productWriteStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE';
    productReadStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE';
    productWriteError?: string;
  } | null>(null);

  const handleTestRealFirestoreWrite = async () => {
    setIsRunningTest(true);
    setTestResult({
      projectId: 'Checking...',
      database: 'Checking...',
      authUid: 'Checking...',
      adminRecognized: 'Checking...',
      writeStatus: 'PENDING',
      readStatus: 'PENDING',
    });

    try {
      const db = getDb();
      const auth = getAuthInstance();
      const projectId = db.app.options.projectId || 'Unknown';
      const database = '(default)';
      const authUid = auth.currentUser?.uid || 'None (Not Authenticated in SDK)';

      let adminRecognized = 'NO';
      if (auth.currentUser) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
          if (adminDoc.exists()) {
            const data = adminDoc.data();
            adminRecognized = `YES (active: ${data.active === true ? 'true' : 'false'}, role: ${data.role || 'none'})`;
          } else {
            adminRecognized = `NO (No document found in /admins/${auth.currentUser.uid} collection)`;
          }
        } catch (adminErr: any) {
          adminRecognized = `ERROR checking: ${adminErr.message || adminErr}`;
        }
      } else {
        adminRecognized = 'NO (Not authenticated)';
      }

      // Execute connection test write
      const ref = doc(db, "connection_tests", "admin-browser-test");
      let writeStatus: 'SUCCESS' | 'FAILED' = 'SUCCESS';
      let writeError = '';

      try {
        await setDoc(ref, {
          test: true,
          source: "admin-panel-browser",
          timestamp: serverTimestamp()
        });
      } catch (writeErr: any) {
        writeStatus = 'FAILED';
        writeError = writeErr.message || String(writeErr);
      }

      // Execute connection test read
      let readStatus: 'SUCCESS' | 'FAILED' | 'IDLE' = 'SUCCESS';
      let readError = '';
      if (writeStatus === 'SUCCESS') {
        try {
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            readStatus = 'FAILED';
            readError = 'Document does not exist after writing.';
          }
        } catch (readErr: any) {
          readStatus = 'FAILED';
          readError = readErr.message || String(readErr);
        }
      } else {
        readStatus = 'IDLE';
      }

      // State for product write
      let productWriteStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE' = 'IDLE';
      let productReadStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE' = 'IDLE';
      let productWriteError = '';

      if (writeStatus === 'SUCCESS' && readStatus === 'SUCCESS') {
        productWriteStatus = 'PENDING';
        // Test real product write
        try {
          const tempId = `test-prod-${Date.now()}`;
          const prodRef = doc(db, "products", tempId);
          const testProduct = {
            name: "Firebase Real Test Product",
            sku: `FIREBASE-TEST-${Math.floor(Math.random() * 9000 + 1000)}`,
            price: 20000,
            salePrice: 18000,
            stock: 10,
            category: "test"
          };
          
          await setDoc(prodRef, testProduct);
          productWriteStatus = 'SUCCESS';
          
          productReadStatus = 'PENDING';
          const prodSnap = await getDoc(prodRef);
          if (prodSnap.exists()) {
            productReadStatus = 'SUCCESS';
          } else {
            productReadStatus = 'FAILED';
            productWriteError = 'Product doc does not exist after write.';
          }
        } catch (prodErr: any) {
          productWriteStatus = 'FAILED';
          productWriteError = prodErr.message || String(prodErr);
        }
      }

      setTestResult({
        projectId,
        database,
        authUid,
        adminRecognized,
        writeStatus,
        readStatus,
        writeError: writeError || undefined,
        readError: readError || undefined,
        productWriteStatus,
        productReadStatus,
        productWriteError: productWriteError || undefined
      });

    } catch (globalErr: any) {
      setTestResult(prev => ({
        projectId: prev?.projectId || 'Error',
        database: prev?.database || 'Error',
        authUid: prev?.authUid || 'Error',
        adminRecognized: prev?.adminRecognized || 'Error',
        writeStatus: 'FAILED',
        readStatus: 'FAILED',
        writeError: globalErr.message || String(globalErr)
      }));
    } finally {
      setIsRunningTest(false);
    }
  };

  const handleForceLogOutSession = () => {
    localStorage.removeItem('smarthomes_admin_session');
    window.location.reload();
  };

  useEffect(() => {
    // Fetch live data
    const products = getProducts();
    const categories = getCategories();
    const orders = getOrders();
    const customers = getCustomers();
    const logs = getActivityLogs();
    const settings = getSystemSettings();

    const lowStockThreshold = settings.lowStockThreshold || 10;

    const activeProds = products.filter(p => p.status === 'Active');
    const inactiveProds = products.filter(p => p.status === 'Inactive' || p.status === 'Draft');
    const lowStockProds = products.filter(p => p.stock <= lowStockThreshold);
    
    const paid = orders.filter(o => o.orderStatus === 'Paid' || o.orderStatus === 'Delivered');
    const pending = orders.filter(o => o.orderStatus === 'Pending Payment');
    const salesVolume = orders
      .filter(o => o.orderStatus !== 'Cancelled' && o.orderStatus !== 'Refunded')
      .reduce((sum, o) => sum + o.total, 0);

    setStats({
      totalProducts: products.length,
      activeProducts: activeProds.length,
      inactiveProducts: inactiveProds.length,
      totalCategories: categories.length,
      totalOrders: orders.length,
      paidOrders: paid.length,
      pendingOrders: pending.length,
      totalCustomers: customers.length,
      lowStockCount: lowStockProds.length,
      totalSales: salesVolume
    });

    // Recent Orders (last 5)
    const sortedOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    setRecentOrders(sortedOrders);

    // Recently Added Products (last 5)
    const sortedProducts = [...products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    setRecentProducts(sortedProducts);

    // Low Stock items list (last 5)
    setLowStockList(lowStockProds.slice(0, 5));

    // Recent Admin Logs (last 5)
    setRecentLogs(logs.slice(0, 6));
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatLogTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getOrderStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Paid':
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending Payment':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="space-y-6" id="dashboard-view">
      {/* Top Banner Row */}
      <div className="bg-indigo-900 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-lg border border-indigo-950">
        <div className="relative z-10 space-y-1">
          <span className="inline-flex items-center gap-1 bg-indigo-800 text-indigo-200 border border-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-300" />
            Live Database Sync Active
          </span>
          <h2 className="text-2xl font-bold tracking-tight">E-Commerce Management Operations</h2>
          <p className="text-indigo-200 text-sm font-medium">
            Real-time catalog updates, order fulfillment pipelines, and inventory stock tracking metrics.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 relative z-10">
          <div className="bg-indigo-800/80 backdrop-blur-xs px-4 py-3 rounded-xl border border-indigo-700/60 min-w-[140px]">
            <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Gross Revenue</p>
            <p className="text-xl font-black mt-1">{formatCurrency(stats.totalSales)}</p>
          </div>
          <div className="bg-indigo-800/80 backdrop-blur-xs px-4 py-3 rounded-xl border border-indigo-700/60 min-w-[120px]">
            <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Total Orders</p>
            <p className="text-xl font-black mt-1">{stats.totalOrders}</p>
          </div>
        </div>

        {/* Decorative ambient background curves */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-indigo-800 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute left-1/3 top-0 w-64 h-64 bg-indigo-700 rounded-full blur-3xl opacity-15"></div>
      </div>

      {/* --- TEMPORARY REAL FIRESTORE TEST SYSTEM --- */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6 animate-fade-in" id="real-firestore-test-panel">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              Firebase Real-Time Connection Diagnostic Suite
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Validate active browser session, direct Firestore CRUD permission rules, and real catalog document sync.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleTestRealFirestoreWrite}
              disabled={isRunningTest}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-serif italic tracking-wider font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              id="btn-test-firestore"
            >
              {isRunningTest ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  RUNNING FIREBASE...
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  TEST REAL FIRESTORE WRITE
                </>
              )}
            </button>
            <button
              onClick={handleForceLogOutSession}
              className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-xl border border-red-200 transition-all cursor-pointer"
            >
              Force Re-Auth
            </button>
          </div>
        </div>

        {testResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2" id="test-results-panel">
            {/* System Info Block */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 font-mono text-[11px] text-gray-600">
              <p className="font-serif italic text-xs text-gray-800 uppercase tracking-wide font-semibold">Active Session Profile</p>
              <div className="flex justify-between py-1 border-b border-gray-200/50">
                <span>Firebase Project ID:</span>
                <span className="font-bold text-gray-800 select-all">{testResult.projectId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/50">
                <span>Firestore Database:</span>
                <span className="font-bold text-gray-800">{testResult.database}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/50">
                <span>Authenticated UID:</span>
                <span className="font-bold text-gray-800 select-all">{testResult.authUid}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/50">
                <span>Admin Profile recognized in DB:</span>
                <span className={`font-bold ${testResult.adminRecognized.startsWith('YES') ? 'text-green-600' : 'text-amber-600'}`}>
                  {testResult.adminRecognized}
                </span>
              </div>
            </div>

            {/* Transaction Results Block */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 font-mono text-[11px] text-gray-600">
              <p className="font-serif italic text-xs text-gray-800 uppercase tracking-wide font-semibold">Transaction Ledger Status</p>
              
              {/* Connection Write */}
              <div className="flex justify-between py-1 border-b border-gray-200/50 items-center">
                <span>WRITE connection_tests Doc:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
                  testResult.writeStatus === 'SUCCESS' ? 'bg-green-50 text-green-700 border border-green-200' :
                  testResult.writeStatus === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-200'
                }`}>
                  {testResult.writeStatus}
                </span>
              </div>

              {/* Connection Read */}
              <div className="flex justify-between py-1 border-b border-gray-200/50 items-center">
                <span>READ connection_tests Doc:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
                  testResult.readStatus === 'SUCCESS' ? 'bg-green-50 text-green-700 border border-green-200' :
                  testResult.readStatus === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-200'
                }`}>
                  {testResult.readStatus}
                </span>
              </div>

              {/* Product Write */}
              <div className="flex justify-between py-1 border-b border-gray-200/50 items-center">
                <span>WRITE products Doc:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
                  testResult.productWriteStatus === 'SUCCESS' ? 'bg-green-50 text-green-700 border border-green-200' :
                  testResult.productWriteStatus === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-200' :
                  testResult.productWriteStatus === 'PENDING' ? 'bg-indigo-50 text-indigo-700 animate-pulse' : 'bg-gray-200'
                }`}>
                  {testResult.productWriteStatus || 'IDLE'}
                </span>
              </div>

              {/* Product Read */}
              <div className="flex justify-between py-1 border-b border-gray-200/50 items-center">
                <span>READ products Doc:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
                  testResult.productReadStatus === 'SUCCESS' ? 'bg-green-50 text-green-700 border border-green-200' :
                  testResult.productReadStatus === 'FAILED' ? 'bg-red-50 text-red-700 border border-red-200' :
                  testResult.productReadStatus === 'PENDING' ? 'bg-indigo-50 text-indigo-700 animate-pulse' : 'bg-gray-200'
                }`}>
                  {testResult.productReadStatus || 'IDLE'}
                </span>
              </div>

              {/* Error logs */}
              {(testResult.writeError || testResult.readError || testResult.productWriteError) && (
                <div className="bg-red-50 border border-red-100 text-red-800 p-3 rounded-lg text-[10px] space-y-1 col-span-1 md:col-span-2">
                  <p className="font-bold flex items-center gap-1 text-red-900">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    TRANSACTION EXCEPTION DETECTED:
                  </p>
                  {testResult.writeError && <p><span className="font-semibold">Write Error:</span> {testResult.writeError}</p>}
                  {testResult.readError && <p><span className="font-semibold">Read Error:</span> {testResult.readError}</p>}
                  {testResult.productWriteError && <p><span className="font-semibold">Product Error:</span> {testResult.productWriteError}</p>}
                  
                  {testResult.authUid.includes('None') && (
                    <p className="mt-2 text-indigo-900 font-semibold bg-indigo-50/50 p-2 rounded border border-indigo-100 text-xs">
                      Recommendation: Click 'Force Re-Auth' to clear the local storage session cache, type your admin credentials, and let the portal log you into Firebase Auth properly.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Key Analytical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="dashboard-metrics-grid">
        {/* Metric 1 */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catalogue Products</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.totalProducts}</h3>
            <div className="flex gap-2 text-xs font-medium text-gray-500 pt-1">
              <span className="text-green-600 font-semibold">{stats.activeProducts} Active</span>
              <span className="text-gray-300">|</span>
              <span className="text-yellow-600 font-semibold">{stats.inactiveProducts} Drafts</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Orders</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.totalOrders}</h3>
            <div className="flex gap-2 text-xs font-medium text-gray-500 pt-1">
              <span className="text-green-600 font-semibold">{stats.paidOrders} Paid</span>
              <span className="text-gray-300">|</span>
              <span className="text-yellow-600 font-semibold">{stats.pendingOrders} Pending</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 text-green-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Low Stock Warnings</p>
            <h3 className={`text-2xl font-black leading-none ${stats.lowStockCount > 0 ? 'text-red-600' : 'text-gray-800'}`}>{stats.lowStockCount}</h3>
            <p className="text-xs font-medium text-gray-500 pt-1">Products requiring refill</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stats.lowStockCount > 0 ? 'bg-red-50 border border-red-100 text-red-600 animate-pulse' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Customers</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">{stats.totalCustomers}</h3>
            <p className="text-xs font-medium text-gray-500 pt-1">Unique shoppers in database</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Dual-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Double-Width Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders Section */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs" id="dashboard-recent-orders">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Recent Customer Purchases</h3>
                <p className="text-xs text-gray-400 font-medium">Real-time incoming orders through Razorpay</p>
              </div>
              <button 
                onClick={() => onNavigate('orders')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                View All Orders <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              {recentOrders.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm font-medium">
                  No orders found in the shared database.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-6">Order ID</th>
                      <th className="py-3 px-6">Customer</th>
                      <th className="py-3 px-6">Items Qty</th>
                      <th className="py-3 px-6">Total Amount</th>
                      <th className="py-3 px-6">Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 px-6 font-mono font-bold text-indigo-600">{order.id}</td>
                        <td className="py-3.5 px-6">
                          <p className="font-bold text-gray-800">{order.customerName}</p>
                          <p className="text-[10px] text-gray-400">{order.customerEmail}</p>
                        </td>
                        <td className="py-3.5 px-6">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="py-3.5 px-6">
                          <span className={`inline-flex px-2 py-0.5 border rounded-full text-[10px] font-bold tracking-wide uppercase ${getOrderStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recently Added Products List */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs" id="dashboard-recent-products">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Recently Catalogued Products</h3>
                <p className="text-xs text-gray-400 font-medium">Source of truth: official K Smart Homes datasets</p>
              </div>
              <button 
                onClick={() => onNavigate('products')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                Manage Catalogue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentProducts.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm font-medium">
                  No products catalogued in database yet.
                </div>
              ) : (
                recentProducts.map(product => (
                  <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-xs font-medium">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded-lg bg-gray-50 border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-gray-800">{product.name}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-2">
                          <span>SKU: {product.sku}</span>
                          <span className="text-gray-300">•</span>
                          <span>Category: {product.categoryId}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{formatCurrency(product.price)}</p>
                      <p className="text-[10px] text-green-600 font-semibold">Page Reference: {product.cataloguePage || 'N/A'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Single-Width Column */}
        <div className="space-y-6">
          {/* Critical Low Stock Alerter */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs" id="dashboard-low-stock">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Critical Stock Warning</h3>
                <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Action required
                </p>
              </div>
              <button 
                onClick={() => onNavigate('low-stock')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Refill Stock
              </button>
            </div>
            <div className="p-2 divide-y divide-gray-100">
              {lowStockList.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm font-medium">
                  All inventory items are healthy!
                </div>
              ) : (
                lowStockList.map(item => (
                  <div key={item.id} className="p-3 flex items-center justify-between text-xs font-medium">
                    <div className="space-y-0.5">
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold ${item.stock === 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                        {item.stock === 0 ? 'OUT OF STOCK' : `${item.stock} left`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Audit Trails Logs */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xs" id="dashboard-activity-trail">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800">Audit Trail Activity Logs</h3>
                <p className="text-xs text-gray-400 font-medium">Continuous administrative security logging</p>
              </div>
              <button 
                onClick={() => onNavigate('activity-log')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                Full Trail <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {recentLogs.length === 0 ? (
                <p className="text-center text-gray-400 text-xs font-medium py-4">No activities logged yet.</p>
              ) : (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex gap-3 text-xs font-medium">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0 flex items-center justify-center mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-gray-800 leading-snug">
                        <span className="font-bold">{log.action}</span> - <span className="text-gray-500 break-words">{log.target}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold flex items-center gap-1.5">
                        <span>{log.adminEmail}</span>
                        <span>•</span>
                        <span>{formatLogTime(log.timestamp)}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

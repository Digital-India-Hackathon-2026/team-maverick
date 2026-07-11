import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SupportSection from "../../components/SupportSection";
import { useToast } from "../../contexts/ToastContext";
import {
  Search, CheckCircle2, Clock, Package, Truck,
  ChevronRight, X, BarChart3, TrendingUp, ArrowUpRight,
  Utensils, Heart, Activity, Filter
} from "lucide-react";

export default function NGOAccount() {
  const location = useLocation();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('storage');
  
  // Storage State
  const [inventorySearch, setInventorySearch] = useState('');
  const [storageTypeFilter, setStorageTypeFilter] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('');

  useEffect(() => {
    if (location.pathname.includes('notifications') || location.hash === '#notifications') setActiveTab('notifications');
    else if (location.pathname.includes('profile') || location.hash === '#profile') setActiveTab('profile');
    else if (location.pathname.includes('settings') || location.hash === '#settings') setActiveTab('settings');
    else if (location.pathname.includes('history') || location.hash === '#history') setActiveTab('history');
    else if (location.pathname.includes('analytics') || location.hash === '#analytics') setActiveTab('analytics');
    else setActiveTab('storage');
  }, [location]);

  // Notifications State
  const [notifFilter, setNotifFilter] = useState('all');
  const [notifReadIds, setNotifReadIds] = useState<Record<string, boolean>>({});
  const [notifDeletedIds, setNotifDeletedIds] = useState<Record<string, boolean>>({});

  // Settings State
  const [settingsOpen, setSettingsOpen] = useState<Record<string, boolean>>({ general: true, notifications: false, security: false });
  const [toggles, setToggles] = useState<Record<string, boolean>>({ emailNotif: true, inAppNotif: true, deliveryAlerts: true, complaintAlerts: true, twoFactor: false });

  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    ngoName: 'Helping Hands NGO',
    representativeName: 'Meena Kapoor',
    email: 'contact@helpinghands.ngo',
    phone: '+91 98765 00112',
    ngoAddress: '14 Cross, Indiranagar, Bengaluru 560038',
    registrationNumber: 'NGO-KA-2015-09887',
    operatingCapacity: '400 kg / day',
    focusAreas: 'Orphanages, Homeless Shelters',
  });

  const profileFields = [
    { label: 'Representative Name', key: 'representativeName' as const },
    { label: 'Email Address', key: 'email' as const },
    { label: 'Phone Number', key: 'phone' as const },
    { label: 'NGO Address', key: 'ngoAddress' as const },
    { label: 'Registration Number', key: 'registrationNumber' as const },
    { label: 'Operating Capacity', key: 'operatingCapacity' as const },
    { label: 'Focus Areas', key: 'focusAreas' as const },
  ];

  useEffect(() => {
    // Determine active tab from hash or pathname
    const hash = location.hash.replace('#', '');
    const path = location.pathname;
    
    if (hash) {
      if (['storage', 'history', 'analytics', 'notifications', 'profile', 'settings', 'reports', 'help'].includes(hash)) {
        setActiveTab(hash);
      }
    } else {
      if (path.includes('/storage')) setActiveTab('storage');
      else if (path.includes('/history')) setActiveTab('history');
      else if (path.includes('/analytics')) setActiveTab('analytics');
      else if (path.includes('/notifications')) setActiveTab('notifications');
      else if (path.includes('/profile')) setActiveTab('profile');
      else if (path.includes('/settings')) setActiveTab('settings');
      else if (path.includes('/support')) setActiveTab('help');
      else setActiveTab('storage'); // default
    }
  }, [location.pathname, location.hash]);



  const inventoryDefs = [
    { id: '1', foodName: 'Vegetable Biryani', category: 'Cooked Meals', quantity: '18 kg', meals: 60, receivedDate: 'Jul 9', expiryDate: 'Jul 10', storageType: 'Room Temperature', status: 'Fresh' },
    { id: '2', foodName: 'Rice & Curry Combo', category: 'Cooked Meals', quantity: '25 kg', meals: 80, receivedDate: 'Jul 9', expiryDate: 'Jul 10', storageType: 'Refrigerated', status: 'Fresh' },
    { id: '3', foodName: 'Assorted Bakery Items', category: 'Bakery & Pastries', quantity: '8 kg', meals: 28, receivedDate: 'Jul 8', expiryDate: 'Jul 11', storageType: 'Room Temperature', status: 'Fresh' },
    { id: '4', foodName: 'Frozen Vegetables', category: 'Fruits & Vegetables', quantity: '14 kg', meals: 40, receivedDate: 'Jul 6', expiryDate: 'Jul 20', storageType: 'Frozen', status: 'Fresh' },
    { id: '5', foodName: 'Packaged Snacks', category: 'Packaged Food', quantity: '10 kg', meals: 35, receivedDate: 'Jul 5', expiryDate: 'Jul 9', storageType: 'Room Temperature', status: 'Expiring Soon' },
    { id: '6', foodName: 'Dairy Products', category: 'Packaged Food', quantity: '6 kg', meals: 18, receivedDate: 'Jul 4', expiryDate: 'Jul 8', storageType: 'Refrigerated', status: 'Expired' },
  ];

  const filteredInventory = inventoryDefs.filter(item => {
    if (inventorySearch && !item.foodName.toLowerCase().includes(inventorySearch.toLowerCase())) return false;
    if (storageTypeFilter && item.storageType !== storageTypeFilter) return false;
    if (inventoryCategoryFilter && item.category !== inventoryCategoryFilter) return false;
    return true;
  });

  const notificationsList = [
    { id: 'n1', title: 'New Request Assigned', description: 'Donation #DN-2304 from Palm Suites assigned to your organization', time: '3 minutes ago', category: 'requests', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></> },
    { id: 'n2', title: 'Volunteer Assigned', description: 'Rahul Sharma assigned to Delivery #DEL-8823', time: '18 minutes ago', category: 'delivery', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></> },
    { id: 'n3', title: 'Delivery Started', description: 'Delivery #DEL-8819 is now en route', time: '32 minutes ago', category: 'delivery', color: 'text-purple-700', bg: 'bg-purple-100', icon: <path d="M5 13l4 4L19 7"/> },
    { id: 'n4', title: 'Delivery Completed', description: 'Delivery #DEL-8801 delivered successfully', time: '1 hour ago', category: 'delivery', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
    { id: 'n5', title: 'Complaint Update', description: 'Complaint on Delivery #DEL-8790 under review', time: '3 hours ago', category: 'complaints', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></> },
    { id: 'n6', title: 'Account Verification', description: 'Your Government Approval document was verified', time: '1 day ago', category: 'system', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
  ];

  const filteredNotifs = notificationsList.filter(n => {
    if (notifDeletedIds[n.id]) return false;
    if (notifFilter === 'unread') return !notifReadIds[n.id];
    if (notifFilter === 'delivery') return n.category === 'delivery';
    if (notifFilter === 'requests') return n.category === 'requests';
    if (notifFilter === 'complaints') return n.category === 'complaints';
    return true;
  });

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <style>
        {`@keyframes fb-na-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      {/* STORAGE VIEW */}
      {activeTab === 'storage' && (
        <div className="animate-[fb-na-fade-up_300ms_ease_both]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[
              { label: 'Total Capacity', value: '400 kg', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M3 11h18M9 7V4h6v3"/></> },
              { label: 'Available Capacity', value: '152 kg', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M12 5v14M5 12h14"/></> },
              { label: 'Current Utilization', value: '62%', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></> },
              { label: 'Storage Health', value: 'Good', color: 'text-purple-700', bg: 'bg-purple-100', icon: <path d="M20 6L9 17l-5-5"/> },
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 md:p-[18px] shadow-sm">
                <span className={`inline-flex items-center justify-center w-9 h-9 md:w-[38px] md:h-[38px] rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{kpi.icon}</svg>
                </span>
                <div className="mt-4 text-[22px] font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
                <div className="mt-1 text-[12px] font-semibold text-gray-500">{kpi.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
            {[
              { label: 'Dry Storage', usage: 110, capacity: 200, color: 'bg-emerald-600' },
              { label: 'Refrigerated Storage', usage: 96, capacity: 130, color: 'bg-blue-600' },
              { label: 'Frozen Storage', usage: 42, capacity: 70, color: 'bg-purple-600' },
            ].map((cat, i) => {
              const pct = Math.round((cat.usage / cat.capacity) * 100);
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] font-bold text-gray-900">{cat.label}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Optimal</span>
                  </div>
                  <div className="text-[12px] text-gray-400 mb-3.5">{cat.usage} kg of {cat.capacity} kg</div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <div className="mt-2.5 text-[12.5px] font-bold text-gray-900">{pct}% utilized</div>
                </div>
              );
            })}
          </div>

          <div className="text-[15.5px] font-bold text-gray-900 mb-3.5">Food Inventory</div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm mb-5">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[180px] relative">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input 
                  type="text" 
                  placeholder="Search food items..." 
                  value={inventorySearch} 
                  onChange={e => setInventorySearch(e.target.value)} 
                  className="w-full py-[9px] pl-[34px] pr-[12px] rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors"
                />
              </div>
              <select value={storageTypeFilter} onChange={e => setStorageTypeFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
                <option value="">All Storage Types</option>
                <option value="Room Temperature">Room Temperature</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Frozen">Frozen</option>
              </select>
              <select value={inventoryCategoryFilter} onChange={e => setInventoryCategoryFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
                <option value="">All Categories</option>
                {['Cooked Meals', 'Bakery & Pastries', 'Packaged Food', 'Fruits & Vegetables'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[760px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['Food Name', 'Category', 'Qty', 'Meals', 'Received', 'Expiry', 'Storage', 'Status'].map((col, i) => (
                      <th key={i} className="px-[14px] py-[10px] text-[11px] font-bold text-gray-400 uppercase tracking-[0.03em] whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInventory.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-[14px] py-[13px] text-[12.5px] font-semibold text-gray-900 whitespace-nowrap">{row.foodName}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.category}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.quantity}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.meals}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.receivedDate}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.expiryDate}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.storageType}</td>
                      <td className="px-[14px] py-[13px] whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          row.status === 'Fresh' ? 'bg-emerald-50 text-emerald-600' :
                          row.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredInventory.length === 0 && (
                <div className="p-8 text-center text-[13px] text-gray-500">No inventory found for the selected filters.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HISTORY & ANALYTICS PLACEHOLDERS (We'll use generic placeholders for these to match provided structure) */}
      {activeTab === 'history' && (
        <NGODeliveryHistory toast={toast as (msg: string, type?: string) => void} />
      )}
      {activeTab === 'analytics' && (
        <NGOAnalytics />
      )}

      {/* PROFILE VIEW */}
      {activeTab === 'profile' && (
        <div className="animate-[fb-na-fade-up_300ms_ease_both]">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 text-white text-3xl font-extrabold">{profileData.ngoName.substring(0, 2).toUpperCase()}</div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50">Upload Logo</button>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-3 flex-wrap">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileData.ngoName} 
                    onChange={e => setProfileData({...profileData, ngoName: e.target.value})} 
                    className="text-[21px] font-extrabold text-gray-900 tracking-tight border-b border-gray-300 focus:border-emerald-600 outline-none pb-1 bg-transparent w-full max-w-[300px]" 
                  />
                ) : (
                  <span className="text-[21px] font-extrabold text-gray-900 tracking-tight">{profileData.ngoName}</span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[12px] font-bold rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  Government Verified
                </span>
              </div>
              <div className="mt-1 text-[13.5px] text-gray-500">Represented by {profileData.representativeName} · Member since Jan 2024</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {profileFields.map((pf, i) => (
                  <div key={i}>
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{pf.label}</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData[pf.key]}
                        onChange={(e) => setProfileData({ ...profileData, [pf.key]: e.target.value })}
                        className="mt-1 w-full text-[13.5px] font-semibold text-gray-900 border-b border-gray-300 focus:border-emerald-600 outline-none pb-1 bg-transparent transition-colors"
                      />
                    ) : (
                      <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{profileData[pf.key]}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-6 flex-wrap">
                <button 
                  onClick={() => {
                    if (isEditing) {
                      toast('Profile updated successfully', 'success');
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-[13px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:-translate-y-0.5"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  Update Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS VIEW */}
      {activeTab === 'notifications' && (
        <div className="animate-[fb-na-fade-up_300ms_ease_both]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All' }, { key: 'unread', label: 'Unread' }, { key: 'requests', label: 'Requests' }, { key: 'delivery', label: 'Delivery' }, { key: 'complaints', label: 'Complaints' }
              ].map(f => (
                <button key={f.key} onClick={() => setNotifFilter(f.key)} className={`px-[15px] py-[8px] rounded-full text-[12.5px] font-semibold transition-all border ${notifFilter === f.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <button onClick={() => {
              const all = {...notifReadIds};
              notificationsList.forEach(n => all[n.id] = true);
              setNotifReadIds(all);
              toast('All notifications marked as read', 'success');
            }} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50">
              Mark All Read
            </button>
          </div>

          {filteredNotifs.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-2">
              {filteredNotifs.map((note, i) => {
                const isUnread = !notifReadIds[note.id];
                return (
                  <div key={note.id} className={`flex items-start gap-3.5 py-4 ${i < filteredNotifs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${note.bg} ${note.color}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{note.icon}</svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[13.5px] font-bold text-gray-900">{note.title}</span>
                        {isUnread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>}
                      </div>
                      <div className="mt-1 text-[12.5px] text-gray-500">{note.description}</div>
                      <div className="mt-1 text-[11.5px] text-gray-400">{note.time}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isUnread && (
                        <button onClick={() => setNotifReadIds(s => ({...s, [note.id]: true}))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-emerald-600 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </button>
                      )}
                      <button onClick={() => setNotifDeletedIds(s => ({...s, [note.id]: true}))} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
              <div className="mt-4 text-[15px] font-bold text-gray-900">No new notifications</div>
              <div className="mt-1 text-[13px] text-gray-400">You're all caught up.</div>
            </div>
          )}
        </div>
      )}

      {/* SETTINGS VIEW */}
      {activeTab === 'settings' && (
        <div className="flex flex-col gap-4 animate-[fb-na-fade-up_300ms_ease_both]">
          {[
            { key: 'general', title: 'General', rows: [
              { label: 'Change Password', sub: 'Last changed 3 months ago', isButton: true, buttonLabel: 'Change' },
              { label: 'Email', sub: 'contact@helpinghands.ngo', isValue: true, value: 'Verified' },
              { label: 'Phone Number', sub: '+91 98765 00112', isValue: true, value: 'Verified' },
            ]},
            { key: 'notifications', title: 'Notification Preferences', rows: [
              { label: 'Email Notifications', sub: 'Receive updates via email', isToggle: true, toggleKey: 'emailNotif' },
              { label: 'In-App Notifications', sub: 'Show alerts inside FoodBridge', isToggle: true, toggleKey: 'inAppNotif' },
              { label: 'Delivery Alerts', sub: 'Pickup and delivery status changes', isToggle: true, toggleKey: 'deliveryAlerts' },
              { label: 'Complaint Alerts', sub: 'Updates on raised complaints', isToggle: true, toggleKey: 'complaintAlerts' },
            ]},
            { key: 'security', title: 'Security', rows: [
              { label: 'Logout from All Devices', sub: 'Sign out everywhere except here', isButton: true, buttonLabel: 'Logout All', danger: true },
            ]},
          ].map((grp) => (
            <div key={grp.key} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <button onClick={() => setSettingsOpen(s => ({...s, [grp.key]: !s[grp.key]}))} className="flex items-center justify-between w-full outline-none">
                <span className="text-[15px] font-bold text-gray-900">{grp.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${settingsOpen[grp.key] ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {settingsOpen[grp.key] && (
                <div className="flex flex-col gap-4 mt-5">
                  {grp.rows.map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-[13.5px] font-semibold text-gray-900">{row.label}</div>
                        {row.sub && <div className="text-[12px] text-gray-400 mt-0.5">{row.sub}</div>}
                      </div>
                      {(row as any).isToggle && (
                        <button onClick={() => setToggles(s => ({...s, [(row as any).toggleKey as string]: !s[(row as any).toggleKey as string]}))} className={`relative w-[42px] h-[24px] rounded-full transition-colors ${toggles[(row as any).toggleKey as string] ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                          <span className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all ${toggles[(row as any).toggleKey as string] ? 'left-[21px]' : 'left-[3px]'}`}></span>
                        </button>
                      )}
                      {(row as any).isButton && (
                        <button className={`px-4 py-2 rounded-xl text-[12.5px] font-semibold transition-colors border ${(row as any).danger ? 'border-red-300 text-red-600 bg-white hover:bg-red-50' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}>
                          {(row as any).buttonLabel}
                        </button>
                      )}
                      {(row as any).isValue && (
                        <span className="text-[13px] font-semibold text-gray-500">{(row as any).value}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* HELP VIEW */}
      {activeTab === 'help' && (
        <SupportSection userType="ngo" />
      )}

    </div>
  );
}

// ─── NGO Delivery History Sub-Component ─────────────────────────────────────

type DeliveryRecord = {
  id: string; donationId: string; hotel: string; volunteer: string;
  foodItem: string; qty: string; meals: number; date: string;
  pickupOtp: string; dropOtp: string; duration: string; status: string;
};

function NGODeliveryHistory({ toast }: { toast: (msg: string, type?: string) => void }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRecord | null>(null);

  const deliveries: DeliveryRecord[] = [
    { id: 'DEL-8921', donationId: 'DN-2298', hotel: 'Grand Regency Hotel', volunteer: 'Rahul Sharma', foodItem: 'Vegetable Biryani', qty: '22 kg', meals: 75, date: 'Jul 10, 2025', pickupOtp: '3821', dropOtp: '4917', duration: '38 min', status: 'Completed' },
    { id: 'DEL-8918', donationId: 'DN-2295', hotel: 'The Leela Palace', volunteer: 'Priya Patel', foodItem: 'Paneer Butter Masala', qty: '16 kg', meals: 55, date: 'Jul 9, 2025', pickupOtp: '7543', dropOtp: '2910', duration: '42 min', status: 'Completed' },
    { id: 'DEL-8910', donationId: 'DN-2288', hotel: 'Taj West End', volunteer: 'Amit Kumar', foodItem: 'Rice & Dal Combo', qty: '30 kg', meals: 100, date: 'Jul 8, 2025', pickupOtp: '6612', dropOtp: '8834', duration: '29 min', status: 'Completed' },
    { id: 'DEL-8903', donationId: 'DN-2281', hotel: 'ITC Windsor', volunteer: 'Anjali Mehta', foodItem: 'Mixed Veg Curry', qty: '18 kg', meals: 60, date: 'Jul 7, 2025', pickupOtp: '9120', dropOtp: '3305', duration: '51 min', status: 'Completed' },
    { id: 'DEL-8897', donationId: 'DN-2274', hotel: 'Sheraton Grand', volunteer: 'Vikram Singh', foodItem: 'Chapati & Sabzi', qty: '12 kg', meals: 40, date: 'Jul 6, 2025', pickupOtp: '4481', dropOtp: '7752', duration: '33 min', status: 'Completed' },
    { id: 'DEL-8893', donationId: 'DN-2270', hotel: 'Four Points Sheraton', volunteer: 'Deepa Nair', foodItem: 'Sambar Rice', qty: '25 kg', meals: 82, date: 'Jul 5, 2025', pickupOtp: '2267', dropOtp: '5590', duration: '45 min', status: 'Completed' },
    { id: 'DEL-8888', donationId: 'DN-2265', hotel: 'Grand Regency Hotel', volunteer: 'Sanjay Gupta', foodItem: 'Poha & Upma', qty: '10 kg', meals: 35, date: 'Jul 4, 2025', pickupOtp: '8832', dropOtp: '1144', duration: '27 min', status: 'Cancelled' },
    { id: 'DEL-8880', donationId: 'DN-2257', hotel: 'Radisson Blu', volunteer: 'Meera Pillai', foodItem: 'Dal Khichdi', qty: '20 kg', meals: 65, date: 'Jul 3, 2025', pickupOtp: '5531', dropOtp: '7730', duration: '40 min', status: 'Completed' },
    { id: 'DEL-8875', donationId: 'DN-2252', hotel: 'JW Marriott', volunteer: 'Karthik Rao', foodItem: 'Chole Bhature', qty: '8 kg', meals: 25, date: 'Jul 2, 2025', pickupOtp: '3319', dropOtp: '9901', duration: '35 min', status: 'Completed' },
    { id: 'DEL-8870', donationId: 'DN-2248', hotel: 'The Oberoi', volunteer: 'Sunita Sharma', foodItem: 'Rajma Chawal', qty: '28 kg', meals: 92, date: 'Jul 1, 2025', pickupOtp: '4456', dropOtp: '6623', duration: '48 min', status: 'Completed' },
  ];

  const filtered = deliveries.filter(d => {
    const matchSearch = !search || d.id.toLowerCase().includes(search.toLowerCase()) || d.hotel.toLowerCase().includes(search.toLowerCase()) || d.volunteer.toLowerCase().includes(search.toLowerCase()) || d.foodItem.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (s: string) => {
    if (s === 'Completed') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (s === 'Cancelled') return 'bg-red-50 text-red-600 border border-red-200';
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, hotel, volunteer..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent text-sm font-bold text-gray-700 outline-none appearance-none pr-4">
              <option value="">All Statuses</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <button onClick={() => toast('Exporting CSV...', 'info')} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Deliveries', value: deliveries.length, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Completed', value: deliveries.filter(d => d.status === 'Completed').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Meals', value: deliveries.reduce((a, d) => a + d.meals, 0), icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg Duration', value: '38 min', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Delivery ID', 'Hotel', 'Volunteer', 'Food Item', 'Qty / Meals', 'Date', 'Duration', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400 font-medium">No deliveries match your filters.</td></tr>
              ) : filtered.map(d => (
                <tr key={d.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-emerald-700">{d.id}</td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 whitespace-nowrap">{d.hotel}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {d.volunteer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-gray-700 font-medium whitespace-nowrap">{d.volunteer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{d.foodItem}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-gray-800">{d.qty}</span>
                    <span className="text-gray-400 text-xs ml-1">/ {d.meals} meals</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap text-xs">{d.date}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{d.duration}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusBadge(d.status)}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelectedDelivery(d)} className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedDelivery(null)} />
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right-4 duration-300">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <div className="text-lg font-extrabold text-gray-900">{selectedDelivery.id}</div>
                <div className="text-xs text-gray-400 font-medium">{selectedDelivery.donationId} · {selectedDelivery.date}</div>
              </div>
              <button onClick={() => setSelectedDelivery(null)} className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-5">
              {/* Hotel */}
              <section>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Hotel Details</h4>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">{selectedDelivery.hotel[0]}</div>
                  <div><div className="font-bold text-gray-900 text-sm">{selectedDelivery.hotel}</div><div className="text-xs text-gray-500">Registered Partner Hotel</div></div>
                </div>
              </section>
              {/* Volunteer */}
              <section>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Volunteer</h4>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">{selectedDelivery.volunteer.split(' ').map(n => n[0]).join('')}</div>
                  <div><div className="font-bold text-gray-900 text-sm">{selectedDelivery.volunteer}</div><div className="text-xs text-gray-500">Certified FoodBridge Volunteer</div></div>
                </div>
              </section>
              {/* Food */}
              <section>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Food Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: 'Food Item', val: selectedDelivery.foodItem }, { label: 'Quantity', val: selectedDelivery.qty }, { label: 'Estimated Meals', val: `${selectedDelivery.meals} people` }, { label: 'Delivery Duration', val: selectedDelivery.duration }].map((item, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</div>
                      <div className="font-bold text-gray-900 text-sm mt-1">{item.val}</div>
                    </div>
                  ))}
                </div>
              </section>
              {/* OTP */}
              <section>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">OTP Verification</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                    <div className="text-[10px] font-bold text-amber-600 uppercase mb-1">Pickup OTP</div>
                    <div className="text-2xl font-extrabold text-amber-700 tracking-widest">{selectedDelivery.pickupOtp}</div>
                    <div className="flex items-center justify-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /><span className="text-[10px] text-emerald-600 font-bold">Verified</span></div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Drop OTP</div>
                    <div className="text-2xl font-extrabold text-emerald-700 tracking-widest">{selectedDelivery.dropOtp}</div>
                    <div className="flex items-center justify-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /><span className="text-[10px] text-emerald-600 font-bold">Verified</span></div>
                  </div>
                </div>
              </section>
              {/* Timeline */}
              <section>
                <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Timeline</h4>
                <div className="relative border-l-2 border-gray-100 ml-2 space-y-4">
                  {[
                    { label: 'Donation Posted', sub: selectedDelivery.hotel, dot: 'bg-blue-500', time: '08:12 AM' },
                    { label: 'Volunteer Accepted', sub: selectedDelivery.volunteer, dot: 'bg-indigo-500', time: '08:35 AM' },
                    { label: 'Pickup Confirmed (OTP)', sub: `Code: ${selectedDelivery.pickupOtp}`, dot: 'bg-amber-500', time: '09:00 AM' },
                    { label: 'Delivery Completed (OTP)', sub: `Code: ${selectedDelivery.dropOtp}`, dot: 'bg-emerald-500', time: `09:${selectedDelivery.duration.replace(' min', '')} AM` },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-6">
                      <span className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${step.dot}`}></span>
                      <div className="text-sm font-bold text-gray-800">{step.label}</div>
                      <div className="text-xs text-gray-400">{step.sub} · {step.time}</div>
                    </div>
                  ))}
                </div>
              </section>
              <button onClick={() => toast('Downloading receipt...', 'info')} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NGO Analytics Sub-Component ────────────────────────────────────────────

function NGOAnalytics() {
  const kpis = [
    { label: 'Total Meals Received', value: '14,820', trend: '+12%', icon: Utensils, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Deliveries This Month', value: '124', trend: '+8%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Partner Hotels', value: '18', trend: '+2', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Beneficiaries Served', value: '4,200', trend: '+15%', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const weeklyData = [42, 58, 51, 74, 88, 62, 79];
  const categoryData = [
    { label: 'Cooked Meals', percent: 62, color: 'bg-emerald-500' },
    { label: 'Packaged Food', percent: 18, color: 'bg-blue-500' },
    { label: 'Fruits & Vegetables', percent: 12, color: 'bg-amber-500' },
    { label: 'Bakery & Dairy', percent: 8, color: 'bg-purple-500' },
  ];
  const topHotels = [
    { name: 'Grand Regency Hotel', deliveries: 28, meals: 2240 },
    { name: 'The Leela Palace', deliveries: 22, meals: 1810 },
    { name: 'Taj West End', deliveries: 19, meals: 1520 },
    { name: 'JW Marriott', deliveries: 16, meals: 1280 },
    { name: 'ITC Windsor', deliveries: 13, meals: 1040 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}><kpi.icon className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />{kpi.trend}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" /> Weekly Meals Received (Last 7 Days)
            </h3>
          </div>
          <div className="h-48 flex items-end justify-between gap-3 px-2">
            {weeklyData.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full group">
                <div className="w-full bg-gray-100 rounded-t-lg relative flex items-end h-full">
                  <div className="w-full bg-emerald-500 rounded-t-lg transition-all relative" style={{ height: `${h}%` }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h * 18} meals</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" /> Food Categories
          </h3>
          <div className="space-y-5">
            {categoryData.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-gray-900">{item.percent}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Hotels */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" /> Top Contributing Hotels
          </h3>
          <span className="text-xs text-gray-400 font-medium">This Month</span>
        </div>
        <div className="divide-y divide-gray-50">
          {topHotels.map((hotel, i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm truncate">{hotel.name}</div>
                <div className="text-xs text-gray-400">{hotel.deliveries} deliveries · {hotel.meals.toLocaleString()} meals</div>
              </div>
              <div className="h-2 w-28 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(hotel.meals / topHotels[0].meals) * 100}%` }}></div>
              </div>
              <div className="text-sm font-extrabold text-emerald-700 w-12 text-right">{hotel.meals.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

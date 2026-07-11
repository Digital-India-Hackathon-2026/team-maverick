import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";

export default function VolunteerAccount() {
  const location = useLocation();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('history');
  
  // History State
  const [historySearch, setHistorySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Notifications State
  const [notifFilter, setNotifFilter] = useState('all');
  const [notifReadIds, setNotifReadIds] = useState<Record<string, boolean>>({});
  const [notifDeletedIds, setNotifDeletedIds] = useState<Record<string, boolean>>({});

  // Settings State
  const [settingsOpen, setSettingsOpen] = useState<Record<string, boolean>>({ general: true, availability: false, notifications: false, security: false });
  const [toggles, setToggles] = useState<Record<string, boolean>>({ emailNotif: true, pushNotif: true, deliveryAlerts: true, complaintAlerts: true, twoFactor: false });

  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91 98765 43210',
    vehicleType: 'Two Wheeler (Scooter)',
    vehicleCapacity: 'Up to 25 kg',
    operatingArea: 'Indiranagar, Bengaluru',
  });

  const profileFields = [
    { label: 'Email Address', key: 'email' as const },
    { label: 'Phone Number', key: 'phone' as const },
    { label: 'Vehicle Type', key: 'vehicleType' as const },
    { label: 'Vehicle Capacity', key: 'vehicleCapacity' as const },
    { label: 'Operating Area', key: 'operatingArea' as const },
  ];

  useEffect(() => {
    // Determine active tab from hash or pathname
    const hash = location.hash.replace('#', '');
    const path = location.pathname;
    
    if (hash) {
      if (['history', 'earnings', 'profile', 'notifications', 'settings', 'reports', 'help', 'rewards'].includes(hash)) {
        setActiveTab(hash === 'rewards' ? 'earnings' : hash);
      }
    } else {
      if (path.includes('/history')) setActiveTab('history');
      else if (path.includes('/earnings') || path.includes('/rewards')) setActiveTab('earnings');
      else if (path.includes('/profile')) setActiveTab('profile');
      else if (path.includes('/settings')) setActiveTab('settings');
      else setActiveTab('history'); // default
    }
  }, [location.pathname, location.hash]);

  const historyDefs = [
    { id: '1', deliveryId: '#DEL-8801', date: 'Jul 9, 2026', hotelName: 'Grand Regency Hotel', ngoName: 'Helping Hands', category: 'Cooked Meals', meals: 60, pickupTime: '2:10 PM', deliveryTime: '2:45 PM', duration: '35 min', status: 'Delivered', complaintStatus: 'None' },
    { id: '2', deliveryId: '#DEL-8795', date: 'Jul 8, 2026', hotelName: 'Palm Suites', ngoName: 'Annapurna Trust', category: 'Bakery & Pastries', meals: 28, pickupTime: '11:20 AM', deliveryTime: '11:52 AM', duration: '32 min', status: 'Delivered', complaintStatus: 'None' },
    { id: '3', deliveryId: '#DEL-8781', date: 'Jul 7, 2026', hotelName: 'The Metropole', ngoName: 'Seva Kitchen', category: 'Cooked Meals', meals: 95, pickupTime: '1:05 PM', deliveryTime: '1:34 PM', duration: '29 min', status: 'Delivered', complaintStatus: 'Resolved' },
    { id: '4', deliveryId: '#DEL-8760', date: 'Jul 6, 2026', hotelName: 'Grand Regency Hotel', ngoName: 'Helping Hands', category: 'Fruits & Vegetables', meals: 40, pickupTime: '9:40 AM', deliveryTime: '10:12 AM', duration: '32 min', status: 'Delivered', complaintStatus: 'None' },
    { id: '5', deliveryId: '#DEL-8744', date: 'Jul 5, 2026', hotelName: 'Sunrise Inn', ngoName: 'Hope Foundation', category: 'Packaged Food', meals: 22, pickupTime: '4:15 PM', deliveryTime: '4:50 PM', duration: '35 min', status: 'Delivered', complaintStatus: 'Under Review' },
    { id: '6', deliveryId: '#DEL-8720', date: 'Jul 4, 2026', hotelName: 'Palm Suites', ngoName: 'Annapurna Trust', category: 'Cooked Meals', meals: 55, pickupTime: '12:30 PM', deliveryTime: '—', duration: '—', status: 'Failed', complaintStatus: 'None' },
  ];

  const filteredHistory = historyDefs.filter(item => {
    if (historySearch && !item.deliveryId.toLowerCase().includes(historySearch.toLowerCase())) return false;
    if (statusFilter && item.status !== statusFilter) return false;
    if (categoryFilter && item.category !== categoryFilter) return false;
    return true;
  });

  const notificationDefs = [
    { id: 'n1', title: 'New Delivery Assigned', description: 'You have been assigned Delivery #DEL-8823 from Grand Regency Hotel', time: '10 minutes ago', category: 'delivery', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></> },
    { id: 'n2', title: 'Delivery Completed', description: 'Delivery #DEL-8801 marked as delivered', time: '2 hours ago', category: 'delivery', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
    { id: 'n3', title: 'Complaint Update', description: 'Complaint on Delivery #DEL-8744 is under review', time: '5 hours ago', category: 'complaints', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></> },
    { id: 'n4', title: 'Account Verification', description: 'Your Government ID was successfully verified', time: '1 day ago', category: 'system', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
    { id: 'n5', title: 'System Maintenance Notice', description: 'FoodBridge will undergo scheduled maintenance tonight', time: '2 days ago', category: 'system', color: 'text-purple-700', bg: 'bg-purple-100', icon: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></> },
  ];

  const filteredNotifs = notificationDefs.filter(n => {
    if (notifDeletedIds[n.id]) return false;
    if (notifFilter === 'unread') return !notifReadIds[n.id];
    if (notifFilter === 'delivery') return n.category === 'delivery';
    if (notifFilter === 'complaints') return n.category === 'complaints';
    return true;
  });

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <style>
        {`
          @keyframes fb-va-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-va-ring { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 30; } }
        `}
      </style>

      {/* HISTORY VIEW */}
      {activeTab === 'history' && (
        <div className="animate-[fb-va-fade-up_300ms_ease_both]">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm mb-5">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[180px] relative">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input 
                  type="text" 
                  placeholder="Search by Delivery ID..." 
                  value={historySearch} 
                  onChange={e => setHistorySearch(e.target.value)} 
                  className="w-full py-[9px] pl-[34px] pr-[12px] rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors"
                />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
                <option value="">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Failed">Failed</option>
              </select>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
                <option value="">All Categories</option>
                {['Cooked Meals', 'Bakery & Pastries', 'Packaged Food', 'Fruits & Vegetables'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['Delivery ID', 'Date', 'Hotel', 'NGO', 'Meals', 'Duration', 'Status', 'Complaint', 'Actions'].map((col, i) => (
                      <th key={i} className="px-[14px] py-[10px] text-[11px] font-bold text-gray-400 uppercase tracking-[0.03em] whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredHistory.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-[14px] py-[13px] text-[12.5px] font-semibold text-gray-900 whitespace-nowrap">{row.deliveryId}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.date}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.hotelName}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.ngoName}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.meals}</td>
                      <td className="px-[14px] py-[13px] text-[12.5px] text-gray-700 whitespace-nowrap">{row.duration}</td>
                      <td className="px-[14px] py-[13px] whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          row.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-[14px] py-[13px] whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          row.complaintStatus === 'None' ? 'bg-gray-100 text-gray-600' :
                          row.complaintStatus === 'Resolved' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {row.complaintStatus}
                        </span>
                      </td>
                      <td className="px-[14px] py-[13px] whitespace-nowrap">
                        <div className="flex gap-3">
                          <button className="text-[12px] font-semibold text-emerald-600 hover:underline">View</button>
                          <button className="text-[12px] font-semibold text-blue-600 hover:underline">Receipt</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredHistory.length === 0 && (
                <div className="p-8 text-center flex flex-col items-center">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>
                  <div className="mt-4 text-[15px] font-bold text-gray-900">No Completed Deliveries</div>
                  <div className="mt-1 text-[13px] text-gray-400">Try adjusting your search or filters.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EARNINGS / PERFORMANCE PLACEHOLDER */}
      {activeTab === 'earnings' && (
        <div className="animate-[fb-va-fade-up_300ms_ease_both]">
           <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <div className="mt-4 text-[15px] font-bold text-gray-900">Earnings & Performance Dashboard</div>
            <div className="mt-1 text-[13px] text-gray-400">View earnings, points, and metrics here.</div>
          </div>
        </div>
      )}

      {/* PROFILE VIEW */}
      {activeTab === 'profile' && (
        <div className="animate-[fb-va-fade-up_300ms_ease_both]">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white text-3xl font-extrabold">{profileData.name.substring(0, 2).toUpperCase()}</div>
              <label className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer text-center">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.length) toast('Photo uploaded successfully.', 'success'); }} />
              </label>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-3 flex-wrap">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileData.name} 
                    onChange={e => setProfileData({...profileData, name: e.target.value})} 
                    className="text-[21px] font-extrabold text-gray-900 tracking-tight border-b border-gray-300 focus:border-emerald-600 outline-none pb-1 bg-transparent w-full max-w-[300px]" 
                  />
                ) : (
                  <span className="text-[21px] font-extrabold text-gray-900 tracking-tight">{profileData.name}</span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[12px] font-bold rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  Government ID Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-[12px] font-bold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Available Now
                </span>
              </div>
              <div className="mt-1 text-[13.5px] text-gray-500">Member since March 2024</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
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
                    if (isEditing) toast('Profile updated successfully', 'success');
                    setIsEditing(!isEditing);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-[13px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:-translate-y-0.5"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  Update Vehicle Details
                </button>
                <label className="px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-center block">
                  Upload Documents
                  <input type="file" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) toast('Documents uploaded successfully.', 'success'); }} />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS VIEW */}
      {activeTab === 'notifications' && (
        <div className="animate-[fb-va-fade-up_300ms_ease_both]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All' }, { key: 'unread', label: 'Unread' }, { key: 'delivery', label: 'Delivery' }, { key: 'complaints', label: 'Complaints' }
              ].map(f => (
                <button key={f.key} onClick={() => setNotifFilter(f.key)} className={`px-[15px] py-[8px] rounded-full text-[12.5px] font-semibold transition-all border ${notifFilter === f.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <button onClick={() => {
              const all = {...notifReadIds};
              notificationDefs.forEach(n => all[n.id] = true);
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
                      {note.icon}
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
        <div className="flex flex-col gap-4 animate-[fb-va-fade-up_300ms_ease_both]">
          {[
            { key: 'general', title: 'General', rows: [
              { label: 'Change Password', sub: 'Last changed 3 months ago', isButton: true, buttonLabel: 'Change' },
              { label: 'Email', sub: 'rahul.s@example.com', isValue: true, value: 'Verified' },
              { label: 'Phone Number', sub: '+91 98765 43210', isValue: true, value: 'Verified' },
            ]},
            { key: 'availability', title: 'Availability', rows: [
              { label: 'Receive Delivery Requests', sub: 'Get notified for new nearby deliveries', isToggle: true, toggleKey: 'deliveryAlerts' },
            ]},
            { key: 'notifications', title: 'Notification Preferences', rows: [
              { label: 'Email Notifications', sub: 'Receive updates via email', isToggle: true, toggleKey: 'emailNotif' },
              { label: 'Push Notifications', sub: 'Show alerts on mobile device', isToggle: true, toggleKey: 'pushNotif' },
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

    </div>
  );
}

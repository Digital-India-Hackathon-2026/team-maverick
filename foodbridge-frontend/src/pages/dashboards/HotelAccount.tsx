import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SupportSection from "../../components/SupportSection";
import { useToast } from "../../contexts/ToastContext";

export default function HotelAccount() {
  const location = useLocation();

  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [notifFilter, setNotifFilter] = useState('all');
  const [notifReadIds, setNotifReadIds] = useState<Record<string, boolean>>({});
  const [notifDeletedIds, setNotifDeletedIds] = useState<Record<string, boolean>>({});
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState<Record<string, boolean>>({ general: true, notifications: false, security: false });
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [toggles, setToggles] = useState<Record<string, boolean>>({ emailNotif: true, inAppNotif: true, deliveryAlerts: true, complaintAlerts: true, twoFactor: false });
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    hotelName: 'Grand Regency',
    managerName: 'Anjali Mehta',
    email: 'anjali.mehta@grandregency.com',
    phone: '+91 98450 12233',
    hotelAddress: '42 MG Road, Bengaluru, Karnataka 560001',
    fssai: '11421999000456',
    businessReg: 'U55101KA2015PTC078234',
    hotelType: 'Chain Property',
    avgMeals: '58 meals',
  });

  useEffect(() => {
    // Determine active tab from hash or pathname
    const hash = location.hash.replace('#', '');
    const path = location.pathname;

    if (hash) {
      if (['profile', 'notifications', 'settings', 'reports', 'help'].includes(hash)) {
        setActiveTab(hash);
      }
    } else {
      if (path.includes('/profile')) setActiveTab('profile');
      else if (path.includes('/notifications')) setActiveTab('notifications');
      else if (path.includes('/settings')) setActiveTab('settings');
      else if (path.includes('/support')) setActiveTab('help');
      else setActiveTab('profile'); // default
    }
  }, [location.pathname, location.hash]);

  const profileFields = [
    { label: 'Manager Name', key: 'managerName' as const },
    { label: 'Email Address', key: 'email' as const },
    { label: 'Phone Number', key: 'phone' as const },
    { label: 'Hotel Address', key: 'hotelAddress' as const },
    { label: 'FSSAI License Number', key: 'fssai' as const },
    { label: 'Business Registration Number', key: 'businessReg' as const },
    { label: 'Hotel Type', key: 'hotelType' as const },
    { label: 'Avg. Daily Surplus Meals', key: 'avgMeals' as const },
  ];

  const documents = [
    { name: 'Hotel Logo', uploadDate: 'Mar 3, 2025', status: 'Pending Review', color: 'text-amber-700 bg-amber-100', icon: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></> },
  ];

  const notificationsList = [
    { id: 'n1', title: 'Volunteer Assigned', description: 'Rahul Sharma was assigned to Donation #DN-2289', time: '5 minutes ago', category: 'delivery', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></> },
    { id: 'n2', title: 'Donation Picked Up', description: 'Donation #DN-2291 has been picked up', time: '22 minutes ago', category: 'delivery', color: 'text-purple-700', bg: 'bg-purple-100', icon: <path d="M5 13l4 4L19 7" /> },
    { id: 'n3', title: 'Donation Delivered', description: 'Donation #DN-2290 was delivered to Annapurna Trust', time: '1 hour ago', category: 'delivery', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" /> },
    { id: 'n4', title: 'Smart Dispatch Update', description: 'Dispatch engine re-prioritized Donation #DN-2293 due to expiry', time: '2 hours ago', category: 'system', color: 'text-gray-900', bg: 'bg-gray-100', icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /> },
    { id: 'n5', title: 'Complaint Raised', description: 'A complaint was raised on Donation #DN-2276', time: '3 hours ago', category: 'complaints', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></> },
    { id: 'n6', title: 'Account Verification', description: 'Your FSSAI license was successfully verified', time: '1 day ago', category: 'system', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5" /> },
  ];

  const filteredNotifs = notificationsList.filter(n => {
    if (notifDeletedIds[n.id]) return false;
    if (notifFilter === 'unread') return !notifReadIds[n.id];
    if (notifFilter === 'delivery') return n.category === 'delivery';
    if (notifFilter === 'system') return n.category === 'system';
    if (notifFilter === 'complaints') return n.category === 'complaints';
    return true;
  });

  const settingsGroups = [
    {
      key: 'general', title: 'General', rows: [
        { label: 'Change Password', sub: 'Last changed 3 months ago', isButton: true, buttonLabel: 'Change', onClick: () => setChangePasswordOpen(true) },
        { label: 'Email', sub: 'anjali.mehta@grandregency.com', isValue: true, value: 'Verified' },
        { label: 'Phone Number', sub: '+91 98450 12233', isValue: true, value: 'Verified' },
      ]
    },
    {
      key: 'notifications', title: 'Notification Preferences', rows: [
        { label: 'Email Notifications', sub: 'Receive updates via email', isToggle: true, toggleKey: 'emailNotif' },
        { label: 'In-App Notifications', sub: 'Show alerts inside FoodBridge', isToggle: true, toggleKey: 'inAppNotif' },
        { label: 'Delivery Alerts', sub: 'Pickup and delivery status changes', isToggle: true, toggleKey: 'deliveryAlerts' },
        { label: 'Complaint Alerts', sub: 'Updates on raised complaints', isToggle: true, toggleKey: 'complaintAlerts' },
      ]
    },
    {
      key: 'security', title: 'Security', rows: [
        { label: 'Logout from All Devices', sub: 'Sign out everywhere except here', isButton: true, buttonLabel: 'Logout All', danger: true, onClick: () => toast('Logged out from all other devices successfully.', 'success') },
      ]
    },
  ];

  const reports = [
    { title: 'Monthly CSR Report', period: 'June 2026', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><path d="M12 3v12m0 0l4-4m-4 4l-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></> },
    { title: 'Quarterly Impact Report', period: 'Q2 2026', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></> },
    { title: 'Annual Sustainability Report', period: 'FY 2025-26', color: 'text-amber-700', bg: 'bg-amber-100', icon: <path d="M2 12c2-6 8-9 14-7 3 1 5 4 5 7M22 12c-2 6-8 9-14 7-3-1-5-4-5-7" /> },
    { title: 'Donation Summary', period: 'Last 90 Days', color: 'text-purple-700', bg: 'bg-purple-100', icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></> },
  ];


  return (
    <div className="flex flex-col flex-1 min-w-0">
      <style>
        {`@keyframes fb-ac-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      {/* PROFILE VIEW */}
      {activeTab === 'profile' && (
        <div className="animate-[fb-ac-fade-up_300ms_ease_both]">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 text-white text-3xl font-extrabold">{profileData.hotelName.substring(0, 2).toUpperCase()}</div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50">Upload New Logo</button>
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-3 flex-wrap">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.hotelName}
                    onChange={e => setProfileData({ ...profileData, hotelName: e.target.value })}
                    className="text-[21px] font-extrabold text-gray-900 tracking-tight border-b border-gray-300 focus:border-emerald-600 outline-none pb-1 bg-transparent w-full max-w-[300px]"
                  />
                ) : (
                  <span className="text-[21px] font-extrabold text-gray-900 tracking-tight">{profileData.hotelName}</span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[12px] font-bold rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Verified
                </span>
              </div>
              <div className="mt-1 text-[13.5px] text-gray-500">Managed by {profileData.managerName} · Member since Feb 2025</div>

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

              <button
                onClick={() => {
                  if (isEditing) {
                    toast('Profile updated successfully', 'success');
                  }
                  setIsEditing(!isEditing);
                }}
                className="mt-6 px-5 py-2.5 bg-emerald-600 text-white text-[13px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="text-[15.5px] font-bold text-gray-900 mt-7 mb-3.5">Documents</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0  ${doc.color}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{doc.icon}</svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-gray-900 truncate">{doc.name}</div>
                    <div className="text-[11.5px] text-gray-400 mt-0.5">Uploaded {doc.uploadDate}</div>
                  </div>
                </div>
                <span className={`inline-block mt-3.5 text-[11.5px] font-bold px-3 py-1 rounded-full ${doc.color}`}>{doc.status}</span>
                <button className="w-full mt-3.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 text-center">
                  Replace Document
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS VIEW */}
      {activeTab === 'notifications' && (
        <div className="animate-[fb-ac-fade-up_300ms_ease_both]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All' }, { key: 'unread', label: 'Unread' }, { key: 'delivery', label: 'Delivery' },
                { key: 'system', label: 'System' }, { key: 'complaints', label: 'Complaints' }
              ].map(f => (
                <button key={f.key} onClick={() => setNotifFilter(f.key)} className={`px-[15px] py-[8px] rounded-full text-[12.5px] font-semibold transition-all border ${notifFilter === f.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <button onClick={() => {
              const all = { ...notifReadIds };
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
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        {isUnread && (
                          <button onClick={(e) => { e.stopPropagation(); setNotifReadIds(s => ({ ...s, [note.id]: true })) }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-emerald-600 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          </button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); setNotifDeletedIds(s => ({ ...s, [note.id]: true })) }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedNotificationId(note.id); if (isUnread) setNotifReadIds(s => ({ ...s, [note.id]: true })); }} className="text-[11.5px] font-semibold text-emerald-600 hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
              <div className="mt-4 text-[15px] font-bold text-gray-900">No new notifications</div>
              <div className="mt-1 text-[13px] text-gray-400">You're all caught up.</div>
            </div>
          )}
        </div>
      )}

      {/* SETTINGS VIEW */}
      {activeTab === 'settings' && (
        <div className="flex flex-col gap-4 animate-[fb-ac-fade-up_300ms_ease_both]">
          {settingsGroups.map((grp) => (
            <div key={grp.key} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <button onClick={() => setSettingsOpen(s => ({ ...s, [grp.key]: !s[grp.key] }))} className="flex items-center justify-between w-full outline-none">
                <span className="text-[15px] font-bold text-gray-900">{grp.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${settingsOpen[grp.key] ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
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
                        <button onClick={() => setToggles(s => ({ ...s, [(row as any).toggleKey as string]: !s[(row as any).toggleKey as string] }))} className={`relative w-[42px] h-[24px] rounded-full transition-colors ${toggles[(row as any).toggleKey as string] ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                          <span className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all ${toggles[(row as any).toggleKey as string] ? 'left-[21px]' : 'left-[3px]'}`}></span>
                        </button>
                      )}
                      {(row as any).isButton && (
                        <button onClick={(row as any).onClick} className={`px-4 py-2 rounded-xl text-[12.5px] font-semibold transition-colors border ${(row as any).danger ? 'border-red-300 text-red-600 bg-white hover:bg-red-50' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}>
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

      {/* REPORTS VIEW */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 animate-[fb-ac-fade-up_300ms_ease_both]">
          {reports.map((rep, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className={`inline-flex items-center justify-center w-[42px] h-[42px] rounded-xl ${rep.bg} ${rep.color}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{rep.icon}</svg>
              </span>
              <div className="mt-3.5 text-[14.5px] font-bold text-gray-900">{rep.title}</div>
              <div className="mt-1 text-[12px] text-gray-400">{rep.period}</div>
              <div className="flex flex-wrap gap-2 mt-4.5">
                <button className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white text-[12px] font-bold hover:bg-emerald-700 transition-colors">Download PDF</button>
                <button className="px-3.5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-[12px] font-semibold hover:bg-gray-50 transition-colors">Export CSV</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HELP VIEW */}
      {activeTab === 'help' && (
        <SupportSection userType="hotel" />
      )}

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-[fb-ac-fade-up_200ms_ease_both]">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              <p className="text-[13px] text-gray-500 mt-1">Please enter your current and new password.</p>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">Current Password</label>
                <input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">New Password</label>
                <input type="password" value={passwordForm.new} onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })} className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors" placeholder="Enter new password" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors" placeholder="Confirm new password" />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button onClick={() => {
                setChangePasswordOpen(false);
                setPasswordForm({ current: '', new: '', confirm: '' });
              }} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
                  toast('Please fill all fields', 'error');
                  return;
                }
                if (passwordForm.new !== passwordForm.confirm) {
                  toast('New passwords do not match', 'error');
                  return;
                }
                toast('Password changed successfully', 'success');
                setChangePasswordOpen(false);
                setPasswordForm({ current: '', new: '', confirm: '' });
              }} className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-[13px] font-bold shadow-sm hover:bg-emerald-700 transition-colors">
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Details Modal */}
      {selectedNotificationId && (() => {
        const note = notificationsList.find(n => n.id === selectedNotificationId);
        if (!note) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-[fb-ac-fade-up_200ms_ease_both]">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[440px] overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-start gap-4">
                <span className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${note.bg} ${note.color}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{note.icon}</svg>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{note.title}</h3>
                  <div className="mt-1 text-[12px] font-medium text-gray-400 uppercase tracking-wider">{note.time}</div>
                </div>
              </div>
              <div className="p-6 bg-gray-50/50">
                <p className="text-[14.5px] leading-relaxed text-gray-700">{note.description}</p>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setSelectedNotificationId(null)} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-[13.5px] font-bold shadow-sm hover:bg-gray-800 transition-colors">
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

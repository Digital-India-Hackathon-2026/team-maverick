import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HotelDonations() {
  const location = useLocation();
  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState('active');
  const [historySearch, setHistorySearch] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('');
  const [historyCategoryFilter, setHistoryCategoryFilter] = useState('');
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  // Sync tab with route path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/active')) setActiveTab('active');
    else if (path.includes('/history')) setActiveTab('history');
    else if (path.includes('/analytics')) setActiveTab('analytics');
  }, [location.pathname]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/hotel/${tab}`);
  };

  const timelineLabels = ['Submitted', 'AI Dispatch', 'Volunteer Assigned', 'Picked Up', 'Delivered'];

  const [mockDonations, setMockDonations] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mockDonations') || '[]');
      setMockDonations(stored);
    } catch (e) {}
  }, []);

  const activeDonations = [
    ...mockDonations,
    { id: '#DN-2291', foodName: 'Vegetable Biryani', category: 'Cooked Meals', quantity: '18 kg', meals: 60, expiry: '1h 40m', ngo: 'Helping Hands', volunteer: 'Rahul Sharma', pickupEta: '12 min', stage: 3,
      volunteerInitial: 'RS', volunteerName: 'Rahul Sharma', volunteerPhone: '+91 98765 43210', vehicleType: 'Bike', vehicleNumber: 'KA-05-AB-1234',
      ngoContact: 'Meena Kapoor', eta: '12 min', status: 'Picked Up — En Route to NGO', pickupOtp: 'Verified', deliveryOtp: 'Pending' },
    { id: '#DN-2289', foodName: 'Rice & Curry Combo', category: 'Cooked Meals', quantity: '25 kg', meals: 80, expiry: '2h 10m', ngo: 'Seva Kitchen', volunteer: 'Amit Verma', pickupEta: '20 min', stage: 2,
      volunteerInitial: 'AV', volunteerName: 'Amit Verma', volunteerPhone: '+91 91234 56780', vehicleType: 'Auto', vehicleNumber: 'KA-03-CJ-9081',
      ngoContact: 'Ravi Iyer', eta: '20 min', status: 'Volunteer Assigned — Heading to Hotel', pickupOtp: 'Pending', deliveryOtp: 'Pending' },
    { id: '#DN-2293', foodName: 'Bakery Assortment', category: 'Bakery & Pastries', quantity: '6 kg', meals: 25, expiry: '3h 05m', ngo: 'Annapurna Trust', volunteer: 'Priya Nair', pickupEta: '8 min', stage: 4,
      volunteerInitial: 'PN', volunteerName: 'Priya Nair', volunteerPhone: '+91 99887 66550', vehicleType: 'Bicycle', vehicleNumber: '—',
      ngoContact: 'Suresh Rao', eta: 'Arrived', status: 'Delivered', pickupOtp: 'Verified', deliveryOtp: 'Verified' },
  ];

  const historyDefs = [
    { id: '#DN-2290', date: 'Jul 8, 2026', foodType: 'Bakery & Pastries', meals: 22, ngo: 'Annapurna Trust', volunteer: 'Priya Nair', deliveryTime: '32 min', status: 'Delivered', complaintStatus: 'None' },
    { id: '#DN-2288', date: 'Jul 7, 2026', foodType: 'Packaged Food', meals: 40, ngo: '—', volunteer: '—', deliveryTime: '—', status: 'Pending', complaintStatus: 'None' },
    { id: '#DN-2287', date: 'Jul 6, 2026', foodType: 'Cooked Meals', meals: 55, ngo: 'Hope Foundation', volunteer: 'Sana Sheikh', deliveryTime: '—', status: 'Expired', complaintStatus: 'None' },
    { id: '#DN-2283', date: 'Jul 5, 2026', foodType: 'Fruits & Vegetables', meals: 34, ngo: 'Seva Kitchen', volunteer: 'Amit Verma', deliveryTime: '41 min', status: 'Delivered', complaintStatus: 'Resolved' },
    { id: '#DN-2279', date: 'Jul 4, 2026', foodType: 'Cooked Meals', meals: 70, ngo: 'Helping Hands', volunteer: 'Rahul Sharma', deliveryTime: '28 min', status: 'Delivered', complaintStatus: 'Under Review' },
    { id: '#DN-2275', date: 'Jul 3, 2026', foodType: 'Beverages', meals: 15, ngo: 'Annapurna Trust', volunteer: 'Priya Nair', deliveryTime: '25 min', status: 'Delivered', complaintStatus: 'None' },
  ];

  const statusColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Assigned: 'bg-blue-50 text-blue-600',
    'Picked Up': 'bg-purple-100 text-purple-700',
    Delivered: 'bg-emerald-50 text-emerald-600',
    Expired: 'bg-red-50 text-red-600',
  };

  const complaintColors: Record<string, string> = {
    None: 'bg-gray-100 text-gray-500',
    'Under Review': 'bg-amber-100 text-amber-700',
    Resolved: 'bg-emerald-50 text-emerald-600',
  };

  const filteredHistory = historyDefs.filter(row => {
    const matchSearch = row.id.toLowerCase().includes(historySearch.toLowerCase());
    const matchStatus = historyStatusFilter ? row.status === historyStatusFilter : true;
    const matchCat = historyCategoryFilter ? row.foodType === historyCategoryFilter : true;
    return matchSearch && matchStatus && matchCat;
  });

  const activeDonationCount = activeDonations.length;

  const trackingDelivery = trackingId ? activeDonations.find(d => d.id === trackingId) : null;

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <style>
        {`
          @keyframes fb-dn-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-dn-ring { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 42px; } }
          @keyframes fb-dn-bar-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
          @keyframes fb-dn-line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        `}
      </style>

      {/* ACTIVE VIEW */}
      {activeTab === 'active' && (
        <div className="flex flex-col gap-4">
          {activeDonationCount > 0 ? (
            activeDonations.map((don, i) => (
              <div key={don.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1" style={{ animation: `fb-dn-fade-up 450ms ease ${i * 60}ms both` }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[15.5px] font-bold text-gray-900">{don.foodName}</span>
                      <span className="text-[12px] font-semibold text-gray-400">{don.id}</span>
                    </div>
                    <div className="mt-1 text-[12.5px] text-gray-500">{don.category} · {don.quantity} · {don.meals} meals</div>
                  </div>
                  <span className="text-[11.5px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full whitespace-nowrap">Expires in {don.expiry}</span>
                </div>

                <div className="flex items-center mt-6 overflow-x-auto pb-1">
                  {timelineLabels.map((label, stepIdx) => {
                    const stepNum = stepIdx + 1;
                    const isDone = stepNum <= don.stage;
                    const isCurrent = stepNum === don.stage;
                    return (
                      <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5 min-w-[76px]">
                          <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full shrink-0 transition-all border-2 ${isDone ? 'bg-emerald-600 border-emerald-600' : 'bg-gray-100 border-transparent'} ${isCurrent ? '!border-emerald-600' : ''}`}>
                            {isDone && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                          </div>
                          <span className={`text-[10px] whitespace-nowrap text-center ${isCurrent ? 'font-bold text-gray-900' : 'font-semibold text-gray-400'} ${isDone && !isCurrent ? 'text-gray-900' : ''}`}>{label}</span>
                        </div>
                        {stepIdx < timelineLabels.length - 1 && (
                          <div className="w-[32px] h-[3px] rounded bg-gray-100 mx-0.5 mb-5 overflow-hidden">
                            <div className="w-full h-full bg-emerald-600 origin-left transition-transform duration-500" style={{ transform: stepNum < don.stage ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between mt-6 gap-4 flex-wrap">
                  <div className="flex items-center gap-5 flex-wrap">
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase">NGO</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-0.5">{don.ngo}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase">Volunteer</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-0.5">{don.volunteer}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400 uppercase">Pickup ETA</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-0.5">{don.pickupEta}</div>
                    </div>
                  </div>
                  <button onClick={() => setTrackingId(don.id)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-[13px] font-semibold transition-all hover:bg-emerald-600 hover:-translate-y-0.5 whitespace-nowrap">
                    Track Delivery
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M3 11h18M9 7V4h6v3"/></svg>
              <div className="mt-4 text-[15px] font-bold text-gray-900">No Active Donations</div>
              <div className="mt-1 text-[13px] text-gray-400">Donations you submit will appear here once assigned.</div>
            </div>
          )}
        </div>
      )}

      {/* HISTORY VIEW */}
      {activeTab === 'history' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[180px] relative">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input type="text" placeholder="Search Donation ID..." value={historySearch} onChange={e => setHistorySearch(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:bg-white focus:border-emerald-600" />
              </div>
              <select value={historyStatusFilter} onChange={e => setHistoryStatusFilter(e.target.value)} className="py-2 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none">
                <option value="">All Statuses</option>
                {['Pending', 'Assigned', 'Picked Up', 'Delivered', 'Expired'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={historyCategoryFilter} onChange={e => setHistoryCategoryFilter(e.target.value)} className="py-2 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none">
                <option value="">All Categories</option>
                {['Cooked Meals', 'Bakery & Pastries', 'Packaged Food', 'Fruits & Vegetables', 'Beverages'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[820px]">
                <thead>
                  <tr>
                    {['ID', 'Date', 'Type', 'Meals', 'NGO', 'Volunteer', 'Delivery Time', 'Status', 'Complaint', 'Action'].map(col => (
                      <th key={col} className="text-left py-2.5 px-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-y border-gray-100 bg-gray-50 whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-900 border-b border-gray-100 whitespace-nowrap">{row.id}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.date}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.foodType}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.meals}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.ngo}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.volunteer}</td>
                      <td className="py-3 px-3.5 text-[12.5px] text-gray-700 border-b border-gray-100 whitespace-nowrap">{row.deliveryTime}</td>
                      <td className="py-3 px-3.5 border-b border-gray-100 whitespace-nowrap">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="py-3 px-3.5 border-b border-gray-100 whitespace-nowrap">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${complaintColors[row.complaintStatus]}`}>{row.complaintStatus}</span>
                      </td>
                      <td className="py-3 px-3.5 border-b border-gray-100 whitespace-nowrap">
                        <button onClick={() => setSelectedHistoryId(row.id)} className="text-[12px] font-semibold text-emerald-600 hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center p-[64px_20px] text-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>
                  <div className="mt-4 text-[15px] font-bold text-gray-900">No Donation History</div>
                  <div className="mt-1 text-[13px] text-gray-400">Try adjusting your search or filters.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS VIEW */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-[15px] font-bold text-gray-900 mb-1">Weekly Donations</div>
            <div className="text-[12px] text-gray-400 mb-5">Meals rescued per day</div>
            <div className="flex items-end justify-between gap-2 h-[120px]">
              {[{l: 'M', h: '40%'}, {l: 'T', h: '60%'}, {l: 'W', h: '30%'}, {l: 'T', h: '80%'}, {l: 'F', h: '100%'}, {l: 'S', h: '70%'}, {l: 'S', h: '50%'}].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full max-w-[24px] h-[90px] bg-gray-100 rounded-md overflow-hidden relative"><div className="absolute bottom-0 inset-x-0 bg-blue-600 rounded-md animate-[fb-dn-bar-grow_700ms_ease_both]" style={{ height: bar.h }}></div></div>
                  <span className="text-[10.5px] font-semibold text-gray-400">{bar.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-[15px] font-bold text-gray-900 mb-1">Monthly Meals Donated</div>
            <div className="text-[12px] text-gray-400 mb-5">Last 6 months</div>
            <div className="flex items-end justify-between gap-2 h-[120px]">
              {[{l: 'Feb', h: '30%'}, {l: 'Mar', h: '45%'}, {l: 'Apr', h: '60%'}, {l: 'May', h: '75%'}, {l: 'Jun', h: '90%'}, {l: 'Jul', h: '100%'}].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full max-w-[32px] h-[90px] bg-gray-100 rounded-md overflow-hidden relative"><div className="absolute bottom-0 inset-x-0 bg-emerald-600 rounded-md animate-[fb-dn-bar-grow_700ms_ease_both]" style={{ height: bar.h }}></div></div>
                  <span className="text-[10.5px] font-semibold text-gray-400">{bar.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="text-[15px] font-bold text-gray-900 mb-4 w-full text-left">CSR Impact Score</div>
            <div className="relative inline-flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 80 80" className="-rotate-90">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                <circle cx="40" cy="40" r="35" fill="none" stroke="#059669" strokeWidth="7" strokeLinecap="round" strokeDasharray="220" className="animate-[fb-dn-ring_1.2s_ease_forwards]" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[22px] font-extrabold text-gray-900">81</span>
                <span className="text-[10.5px] font-semibold text-gray-400">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRACKING MODAL */}
      {trackingId && trackingDelivery && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-gray-900/50 backdrop-blur-sm" onClick={() => setTrackingId(null)}>
          <div className="bg-white rounded-3xl w-full max-w-[420px] p-6 shadow-2xl animate-[fb-dn-fade-up_300ms_ease_both]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[18px] font-extrabold text-gray-900">Track Delivery</span>
              <button onClick={() => setTrackingId(null)} className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="text-[12.5px] text-gray-400 mb-5">{trackingDelivery.id}</div>

            <div className="h-[160px] rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="absolute bottom-3 text-[11.5px] font-bold text-blue-800 bg-white/80 px-3 py-1 rounded-full">Live Map Placeholder</span>
            </div>

            <div className="flex items-center gap-3.5 mt-5">
              <div className="w-[50px] h-[50px] rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 text-white flex items-center justify-center text-[16px] font-bold shrink-0">{trackingDelivery.volunteerInitial}</div>
              <div className="min-w-0">
                <div className="text-[14.5px] font-bold text-gray-900">{trackingDelivery.volunteerName}</div>
                <div className="text-[12px] text-gray-500 mt-0.5">{trackingDelivery.volunteerPhone} · {trackingDelivery.vehicleType}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] font-bold text-gray-400 uppercase">Assigned NGO</div><div className="text-[13px] font-bold text-gray-900 mt-1">{trackingDelivery.ngo}</div></div>
              <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] font-bold text-gray-400 uppercase">NGO Contact</div><div className="text-[13px] font-bold text-gray-900 mt-1">{trackingDelivery.ngoContact}</div></div>
              <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] font-bold text-gray-400 uppercase">ETA</div><div className="text-[13px] font-bold text-gray-900 mt-1">{trackingDelivery.eta}</div></div>
              <div className="bg-gray-50 rounded-xl p-3"><div className="text-[10px] font-bold text-gray-400 uppercase">Current Status</div><div className="text-[13px] font-bold text-gray-900 mt-1">{trackingDelivery.status}</div></div>
            </div>
          </div>
        </div>
      )}
    
      {/* History Details Modal */}
      {selectedHistoryId && (() => {
        const item = historyDefs.find(d => d.id === selectedHistoryId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 animate-[fb-dn-fade-up_200ms_ease_both]">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900">Donation {item.id}</h3>
                  <div className="mt-0.5 text-[12.5px] text-gray-500">{item.date}</div>
                </div>
                <span className={`text-[11.5px] font-bold px-3 py-1.5 rounded-full ${statusColors[item.status] || 'bg-gray-100 text-gray-600'}`}>{item.status}</span>
              </div>
              <div className="p-6 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Food Type</div>
                    <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{item.foodType}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Quantity</div>
                    <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{item.meals} Meals</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Assigned NGO</div>
                    <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{item.ngo}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Volunteer</div>
                    <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{item.volunteer}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Delivery Time</div>
                    <div className="mt-1 text-[13.5px] font-semibold text-gray-900">{item.deliveryTime}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Complaint Status</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.complaintStatus === 'None' ? 'bg-gray-300' : item.complaintStatus === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-[13.5px] font-semibold text-gray-900">{item.complaintStatus}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setSelectedHistoryId(null)} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-[13.5px] font-bold shadow-sm hover:bg-gray-800 transition-colors">
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

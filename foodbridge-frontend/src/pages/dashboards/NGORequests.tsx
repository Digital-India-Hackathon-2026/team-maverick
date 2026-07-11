import { useState } from "react";
import { useToast } from "../../contexts/ToastContext";

interface Request {
  id: string;
  deliveryId: string;
  donationId: string;
  hotelName: string;
  hotelAddress: string;
  distance: string;
  foodCategory: string;
  foodName: string;
  foodType: string;
  quantity: string;
  meals: number;
  expiry: string;
  storageRequirement: string;
  priority: 'high' | 'medium' | 'low';
  volunteerName: string;
  volunteerInitial: string;
  volunteerPhone: string;
  vehicleType: string;
  vehicleNumber: string;
  eta: string;
  pickupTime: string;
  hotelContact: string;
  specialInstructions: string;
  reasons: string[];
}

export default function NGORequests() {
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [declineTargetId, setDeclineTargetId] = useState<string | null>(null);
  const [selectedDeclineReason, setSelectedDeclineReason] = useState<string | null>(null);
  
  const [requestStates, setRequestStates] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('ngoRequestStates') || '{}');
    } catch { return {}; }
  });

  const requests: Request[] = [
    { id: 'r1', deliveryId: '#DEL-9021', donationId: '#DN-2301', hotelName: 'Grand Regency Hotel', hotelAddress: '42 MG Road, Bengaluru', distance: '2.4 km away', foodCategory: 'Cooked Meals', foodName: 'Vegetable Biryani', foodType: 'Vegetarian', quantity: '18 kg', meals: 60, expiry: '1h 10m', storageRequirement: 'Room Temperature', priority: 'high', volunteerName: 'Rahul Sharma', volunteerInitial: 'RS', volunteerPhone: '+91 98765 43210', vehicleType: 'Bike', vehicleNumber: 'KA-05-AB-1234', eta: '18 min', pickupTime: '3:40 PM', hotelContact: 'Anjali Mehta · +91 98450 12233', specialInstructions: 'Use the service entrance at the rear.', reasons: ['Storage Capacity Available', 'Closest Eligible NGO', 'Food Compatible', 'Fair Daily Distribution'] },
    { id: 'r2', deliveryId: '#DEL-9024', donationId: '#DN-2304', hotelName: 'Palm Suites', hotelAddress: '18 Residency Road, Bengaluru', distance: '4.1 km away', foodCategory: 'Bakery & Pastries', foodName: 'Assorted Bakery Items', foodType: 'Vegetarian', quantity: '8 kg', meals: 28, expiry: '3h 20m', storageRequirement: 'Room Temperature', priority: 'medium', volunteerName: 'Priya Nair', volunteerInitial: 'PN', volunteerPhone: '+91 99887 66550', vehicleType: 'Bicycle', vehicleNumber: '—', eta: '25 min', pickupTime: '4:15 PM', hotelContact: 'Karan Bedi · +91 90210 44556', specialInstructions: 'Call on arrival — no doorbell.', reasons: ['Storage Capacity Available', 'Food Compatible', 'Fair Daily Distribution'] },
    { id: 'r3', deliveryId: '#DEL-9018', donationId: '#DN-2296', hotelName: 'The Metropole', hotelAddress: '7 Brigade Road, Bengaluru', distance: '1.8 km away', foodCategory: 'Cooked Meals', foodName: 'Rice & Curry Combo', foodType: 'Non-Vegetarian', quantity: '30 kg', meals: 95, expiry: '45 min', storageRequirement: 'Refrigerated', priority: 'high', volunteerName: 'Amit Verma', volunteerInitial: 'AV', volunteerPhone: '+91 91234 56780', vehicleType: 'Auto', vehicleNumber: 'KA-03-CJ-9081', eta: '12 min', pickupTime: '3:05 PM', hotelContact: 'Neha Kulkarni · +91 99001 22345', specialInstructions: 'Fragile packaging — handle with care.', reasons: ['Closest Eligible NGO', 'Refrigeration Available', 'Fair Daily Distribution'] },
  ];

  const priorityMeta = {
    high: { label: 'High Priority', color: 'text-red-600', bg: 'bg-red-50', pulse: true },
    medium: { label: 'Medium Priority', color: 'text-amber-700', bg: 'bg-amber-100', pulse: false },
    low: { label: 'Low Priority', color: 'text-emerald-600', bg: 'bg-emerald-50', pulse: false },
  };

  const declineReasons = ['Storage Full', 'Unable to Accept', 'Emergency', 'Other'];

  const expiryToMinutes = (expiry: string) => {
    if (!expiry) return Infinity;
    const hMatch = expiry.match(/(\d+)\s*h/);
    const mMatch = expiry.match(/(\d+)\s*m/);
    const hours = hMatch ? parseInt(hMatch[1], 10) : 0;
    const mins = mMatch ? parseInt(mMatch[1], 10) : 0;
    return hours * 60 + mins;
  };

  const pendingAll = requests.filter(r => (requestStates[r.id] || 'pending') === 'pending');
  const filtered = requests.filter(r => {
    const status = requestStates[r.id] || 'pending';
    if (status !== 'pending') return false;
    if (search && !r.deliveryId.toLowerCase().includes(search.toLowerCase())) return false;
    if (priorityFilter && r.priority !== priorityFilter.toLowerCase().replace(' priority', '')) return false;
    if (categoryFilter && r.foodCategory !== categoryFilter) return false;
    if (statusFilter && statusFilter !== 'Pending') return false;
    return true;
  });

  const kpis = [
    { label: 'Incoming Requests', value: pendingAll.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></> },
    { label: 'High Priority Requests', value: pendingAll.filter(r => r.priority === 'high').length, color: 'text-red-600', bg: 'bg-red-50', icon: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6"/></> },
    { label: 'Accepted Today', value: Object.values(requestStates).filter(v => v === 'accepted').length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
    { label: 'Pending Decisions', value: pendingAll.length, color: 'text-amber-700', bg: 'bg-amber-100', icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></> },
  ];

  const handleAccept = (id: string) => {
    const newState = {...requestStates, [id]: 'accepted'};
    setRequestStates(newState);
    localStorage.setItem('ngoRequestStates', JSON.stringify(newState));
    
    const req = requests.find(r => r.id === id);
    if (req) {
      try {
        const accepted = JSON.parse(localStorage.getItem('ngoAcceptedRequests') || '[]');
        if (!accepted.some((a: any) => a.id === req.id)) {
          accepted.unshift(req);
          localStorage.setItem('ngoAcceptedRequests', JSON.stringify(accepted));
        }
      } catch (e) {}
    }
    toast('Request Accepted', 'success');
  };

  const confirmDecline = () => {
    if (declineTargetId) {
      const newState = {...requestStates, [declineTargetId]: 'declined'};
      setRequestStates(newState);
      localStorage.setItem('ngoRequestStates', JSON.stringify(newState));
      
      setDeclineTargetId(null);
      if (drawerId === declineTargetId) setDrawerId(null);
      setSelectedDeclineReason(null);
      toast('Request Declined', 'success');
    }
  };

  const drawerRequest = drawerId ? requests.find(r => r.id === drawerId) : null;

  return (
    <div className="flex flex-col flex-1 min-w-0 animate-[fb-ir-fade-up_300ms_ease_both]">
      <style>
        {`
          @keyframes fb-ir-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-ir-pulse-badge { 0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.35); } 50% { box-shadow: 0 0 0 5px rgba(220,38,38,0); } }
          @keyframes fb-ir-drawer-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes fb-ir-modal-pop { 0% { transform: scale(0.94); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        `}
      </style>



      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 md:p-[18px] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
            <span className={`inline-flex items-center justify-center w-9 h-9 md:w-[38px] md:h-[38px] rounded-xl ${kpi.bg} ${kpi.color}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{kpi.icon}</svg>
            </span>
            <div className="mt-4 text-2xl font-extrabold text-gray-900 tracking-tight">{kpi.value}</div>
            <div className="mt-1 text-[12.5px] font-semibold text-gray-500">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-[22px] shadow-sm mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[180px] relative">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search by Delivery ID..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="w-full py-[9px] pl-[34px] pr-[12px] rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 focus:bg-white focus:border-emerald-600 outline-none transition-colors"
            />
          </div>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
            <option value="">All Priorities</option>
            {['High', 'Medium', 'Low'].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
            <option value="">All Categories</option>
            {['Cooked Meals', 'Bakery & Pastries', 'Packaged Food', 'Fruits & Vegetables'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="py-[9px] px-3 rounded-xl border border-gray-200 bg-gray-50 text-[13px] text-gray-900 outline-none focus:border-emerald-600 transition-colors">
            <option value="">All Statuses</option>
            {['Pending'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Request cards */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-[18px]">
          {filtered.map(req => {
            const pm = priorityMeta[req.priority];
            const isExpiring = expiryToMinutes(req.expiry) < 60;
            const priorityLabel = isExpiring ? 'Expires Soon' : pm.label;
            
            return (
              <div key={req.id} className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-[14px] min-w-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-[13px] bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[15px] font-bold shrink-0">
                      {req.hotelName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-bold text-gray-900">{req.hotelName}</span>
                        <span className="text-[11.5px] font-semibold text-gray-400">{req.distance}</span>
                      </div>
                      <div className="mt-0.5 text-[12px] text-gray-500">{req.deliveryId} · {req.donationId}</div>
                      <div className="mt-0.5 text-[11.5px] text-gray-400">{req.hotelAddress}</div>
                    </div>
                  </div>
                  <span className={`text-[11.5px] font-bold px-[13px] py-[6px] rounded-full whitespace-nowrap ${pm.color} ${pm.bg} ${pm.pulse ? 'animate-[fb-ir-pulse-badge_1.8s_ease-in-out_infinite]' : ''}`}>
                    {priorityLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 mt-[18px]">
                  {[
                    { label: 'Food', value: req.foodName },
                    { label: 'Category', value: req.foodCategory },
                    { label: 'Food Type', value: req.foodType },
                    { label: 'Quantity', value: req.quantity },
                    { label: 'Est. Meals', value: req.meals },
                    { label: 'Expiry', value: req.expiry },
                    { label: 'Storage Needed', value: req.storageRequirement },
                    { label: 'Volunteer', value: req.volunteerName },
                    { label: 'Est. Arrival', value: req.eta },
                  ].map((field, i) => (
                    <div key={i}>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{field.label}</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-[3px] truncate" title={String(field.value)}>{field.value}</div>
                    </div>
                  ))}
                </div>

                {/* Smart dispatch insight */}
                <div className="mt-[18px] p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11.5px] font-bold text-emerald-700 uppercase tracking-[0.03em] mb-2">Assigned Because</div>
                  <div className="flex flex-wrap gap-2">
                    {req.reasons.map((reason, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-[18px] flex-wrap">
                  <button onClick={() => setDrawerId(req.id)} className="px-[18px] py-[10px] bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                    View Delivery Details
                  </button>
                  <div className="flex gap-2.5 w-full sm:w-auto">
                    <button onClick={() => setDeclineTargetId(req.id)} className="flex-1 sm:flex-none px-[18px] py-[10px] bg-white border border-red-300 text-red-600 rounded-xl text-[13px] font-semibold hover:bg-red-50 transition-colors">
                      Decline Request
                    </button>
                    <button onClick={() => handleAccept(req.id)} className="flex-1 sm:flex-none px-[18px] py-[10px] bg-emerald-600 text-white rounded-xl text-[13px] font-bold hover:bg-emerald-700 transition-colors shadow-sm hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(5,150,105,0.25)]">
                      Accept Request
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
          <div className="mt-4 text-[15px] font-bold text-gray-900">
            {pendingAll.length === 0 ? 'No Incoming Requests' : (priorityFilter ? 'No High Priority Requests' : 'No Incoming Requests')}
          </div>
          <div className="mt-1 text-[13px] text-gray-400">New requests will appear here as the Smart Dispatch Engine assigns them.</div>
        </div>
      )}

      {/* Request details drawer */}
      {drawerId && drawerRequest && (
        <div className="fixed inset-0 z-[80] bg-gray-900/40" onClick={() => setDrawerId(null)}>
          <div 
            className="fixed top-0 right-0 bottom-0 w-full md:w-[min(440px,92vw)] bg-white p-7 overflow-y-auto shadow-[-12px_0_40px_rgba(17,24,39,0.18)] animate-[fb-ir-drawer-in_320ms_cubic-bezier(0.22,1,0.36,1)_both]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">Delivery Details</span>
              <button onClick={() => setDrawerId(null)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="text-[12.5px] text-gray-400 mb-[22px]">{drawerRequest.deliveryId} · {drawerRequest.donationId}</div>

            <div className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.03em] mb-2.5">Food Details</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Food Name', value: drawerRequest.foodName },
                { label: 'Category', value: drawerRequest.foodCategory },
                { label: 'Quantity', value: drawerRequest.quantity },
                { label: 'Est. Meals', value: drawerRequest.meals },
                { label: 'Pickup Time', value: drawerRequest.pickupTime },
                { label: 'Est. Arrival', value: drawerRequest.eta },
              ].map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-1 leading-snug">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.03em] mb-2.5">Volunteer Information</div>
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex items-center justify-center w-[50px] h-[50px] rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white text-base font-bold shrink-0">
                {drawerRequest.volunteerInitial}
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-bold text-gray-900">{drawerRequest.volunteerName}</div>
                <div className="text-[12px] text-gray-500 mt-0.5">{drawerRequest.volunteerPhone} · {drawerRequest.vehicleType} ({drawerRequest.vehicleNumber})</div>
              </div>
            </div>

            <div className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.03em] mb-2.5">Hotel Contact</div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 mb-6">
              <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Contact Person</div>
              <div className="text-[13px] font-semibold text-gray-900 mt-1 leading-snug">{drawerRequest.hotelContact}</div>
            </div>

            <div className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.03em] mb-2.5">Special Instructions</div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 mb-[26px]">
              <div className="text-[13px] font-semibold text-gray-900 leading-snug">{drawerRequest.specialInstructions}</div>
            </div>

            <div className="flex gap-2.5 mt-auto">
              <button 
                onClick={() => setDeclineTargetId(drawerId)} 
                className="flex-1 px-[18px] py-[11px] bg-white border border-red-300 text-red-600 rounded-xl text-[13px] font-semibold hover:bg-red-50 transition-colors text-center"
              >
                Decline
              </button>
              <button 
                onClick={() => {
                  handleAccept(drawerId);
                  setDrawerId(null);
                }} 
                className="flex-1 px-[18px] py-[11px] bg-emerald-600 text-white rounded-xl text-[13px] font-bold hover:bg-emerald-700 transition-colors text-center"
              >
                Accept Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline modal */}
      {declineTargetId && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-5 bg-gray-900/50" onClick={() => {
          setDeclineTargetId(null);
          setSelectedDeclineReason(null);
        }}>
          <div className="bg-white rounded-[18px] p-7 w-full max-w-[400px] shadow-[0_24px_64px_rgba(17,24,39,0.24)] animate-[fb-ir-modal-pop_220ms_ease_both]" onClick={e => e.stopPropagation()}>
            <div className="text-[17px] font-extrabold text-gray-900 tracking-tight">Decline Request</div>
            <div className="mt-1 text-[13px] text-gray-500">Please select a reason for declining this donation.</div>

            <div className="flex flex-col gap-2.5 mt-5">
              {declineReasons.map(reason => {
                const active = selectedDeclineReason === reason;
                return (
                  <button
                    key={reason}
                    onClick={() => setSelectedDeclineReason(reason)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-[1.5px] text-[13.5px] font-semibold transition-all text-left ${active ? 'border-red-600 bg-red-50 text-red-800' : 'border-gray-200 bg-white text-gray-700'}`}
                  >
                    <span className={`w-4 h-4 rounded-full border-[1.5px] shrink-0 transition-colors ${active ? 'border-[5px] border-red-600' : 'border-gray-300'}`}></span>
                    {reason}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2.5 mt-6">
              <button 
                onClick={() => {
                  setDeclineTargetId(null);
                  setSelectedDeclineReason(null);
                }} 
                className="flex-1 py-[11px] px-4 bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDecline}
                disabled={!selectedDeclineReason}
                className={`flex-1 py-[11px] px-4 rounded-xl text-[13px] font-bold transition-colors text-center ${selectedDeclineReason ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-100 text-red-400 cursor-not-allowed'}`}
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

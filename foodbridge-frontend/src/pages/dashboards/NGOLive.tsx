import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function NGOLive() {
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const [acceptedRequests, setAcceptedRequests] = useState<any[]>([]);
  useEffect(() => {
    try {
      setAcceptedRequests(JSON.parse(localStorage.getItem('ngoAcceptedRequests') || '[]'));
    } catch (e) {}
  }, []);

  const baseDeliveryDefs = [
    { id: '#DEL-8823', deliveryId: '#DEL-8823', donationId: '#DN-2291', hotelName: 'Grand Regency Hotel', hotelManager: 'Anjali Mehta', hotelPhone: '+91 98450 12233', hotelAddress: '42 MG Road, Bengaluru', specialInstructions: 'Use the service entrance at the rear.', foodName: 'Vegetable Biryani', foodCategory: 'Cooked Meals', foodType: 'Vegetarian', quantity: '18 kg', meals: 60, expiry: '1h 10m', storageRequirement: 'Room Temperature', volunteerInitial: 'RS', volunteerName: 'Rahul Sharma', volunteerPhone: '+91 98765 43210', vehicleType: 'Bike', vehicleNumber: 'KA-05-AB-1234', eta: '12 min', distanceRemaining: '2.1 km', traffic: 'Light', speed: '24 km/h', status: 'On the Way', progress: 0.65, stage: 7, pickupOtp: 'Verified', deliveryOtp: 'Pending' },
    { id: '#DEL-8825', deliveryId: '#DEL-8825', donationId: '#DN-2304', hotelName: 'Palm Suites', hotelManager: 'Karan Bedi', hotelPhone: '+91 90210 44556', hotelAddress: '18 Residency Road, Bengaluru', specialInstructions: 'Call on arrival — no doorbell.', foodName: 'Assorted Bakery Items', foodCategory: 'Bakery & Pastries', foodType: 'Vegetarian', quantity: '8 kg', meals: 28, expiry: '3h 05m', storageRequirement: 'Room Temperature', volunteerInitial: 'AV', volunteerName: 'Amit Verma', volunteerPhone: '+91 91234 56780', vehicleType: 'Auto', vehicleNumber: 'KA-03-CJ-9081', eta: '25 min', distanceRemaining: '5.4 km', traffic: 'Moderate', speed: '18 km/h', status: 'At Hotel', progress: 0.25, stage: 4, pickupOtp: 'Pending', deliveryOtp: 'Pending' },
    { id: '#DEL-8819', deliveryId: '#DEL-8819', donationId: '#DN-2296', hotelName: 'The Metropole', hotelManager: 'Neha Kulkarni', hotelPhone: '+91 99001 22345', hotelAddress: '7 Brigade Road, Bengaluru', specialInstructions: 'Fragile packaging — handle with care.', foodName: 'Rice & Curry Combo', foodCategory: 'Cooked Meals', foodType: 'Non-Vegetarian', quantity: '30 kg', meals: 95, expiry: '35 min', storageRequirement: 'Refrigerated', volunteerInitial: 'PN', volunteerName: 'Priya Nair', volunteerPhone: '+91 99887 66550', vehicleType: 'Bicycle', vehicleNumber: '—', eta: '4 min', distanceRemaining: '0.6 km', traffic: 'Light', speed: '14 km/h', status: 'Nearby', progress: 0.92, stage: 9, pickupOtp: 'Verified', deliveryOtp: 'Pending' },
  ];

  const deliveryDefs = [
    ...acceptedRequests.map(r => ({
      id: r.deliveryId,
      deliveryId: r.deliveryId,
      donationId: r.donationId,
      hotelName: r.hotelName,
      hotelManager: r.hotelContact?.split(' · ')[0] || '-',
      hotelPhone: r.hotelContact?.split(' · ')[1] || '-',
      hotelAddress: r.hotelAddress,
      specialInstructions: r.specialInstructions,
      foodName: r.foodName,
      foodCategory: r.foodCategory,
      foodType: r.foodType,
      quantity: r.quantity,
      meals: r.meals,
      expiry: r.expiry,
      storageRequirement: r.storageRequirement,
      volunteerInitial: r.volunteerInitial,
      volunteerName: r.volunteerName,
      volunteerPhone: r.volunteerPhone,
      vehicleType: r.vehicleType,
      vehicleNumber: r.vehicleNumber,
      eta: r.eta,
      distanceRemaining: r.distance,
      traffic: 'Light',
      speed: '22 km/h',
      status: 'On the Way',
      progress: 0.15,
      stage: 3,
      pickupOtp: 'Pending',
      deliveryOtp: 'Pending'
    })),
    ...baseDeliveryDefs
  ];

  const notificationDefs = [
    { title: 'Volunteer Delayed on #DEL-8825', time: '6 minutes ago', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6"/></> },
    { title: 'Traffic Detected on Route to #DEL-8823', time: '14 minutes ago', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></> },
    { title: 'Pickup OTP Verified for #DEL-8819', time: '22 minutes ago', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
    { title: 'Delivery Completed — #DEL-8801', time: '1 hour ago', color: 'text-blue-600', bg: 'bg-blue-50', icon: <path d="M5 13l4 4L19 7"/> },
  ];

  const timelineLabels = ['Donation Submitted', 'AI Assignment Completed', 'Volunteer Assigned', 'Volunteer Reached Hotel', 'Pickup OTP Verified', 'Food Picked Up', 'En Route', 'NGO Arrival', 'Delivery OTP Verified', 'Delivery Completed'];

  const statusColors: Record<string, {bg: string, color: string}> = {
    'On the Way': { bg: 'bg-blue-50', color: 'text-blue-600' },
    'At Hotel': { bg: 'bg-amber-100', color: 'text-amber-700' },
    'Nearby': { bg: 'bg-emerald-50', color: 'text-emerald-600' },
    'Delivered': { bg: 'bg-gray-100', color: 'text-gray-500' }
  };
  const trafficColors: Record<string, string> = { Light: 'text-emerald-600', Moderate: 'text-amber-700', Heavy: 'text-red-600' };

  const kpis = [
    { label: 'Active Deliveries', value: deliveryDefs.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></> },
    { label: 'Arriving Within 30 Min', value: deliveryDefs.filter(d => parseInt(d.eta, 10) <= 30).length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6"/></> },
    { label: 'Delivered Today', value: 9, color: 'text-purple-700', bg: 'bg-purple-100', icon: <path d="M20 6L9 17l-5-5"/> },
    { label: 'Average Delivery Time', value: '31 min', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></> },
  ];

  const tracked = trackingId ? deliveryDefs.find(d => d.id === trackingId) : null;

  return (
    <div className="flex flex-col flex-1 min-w-0 animate-[fb-ld-fade-up_300ms_ease_both]">
      <style>
        {`
          @keyframes fb-ld-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-ld-progress-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes fb-ld-route-dash { to { stroke-dashoffset: -20; } }
          @keyframes fb-ld-map-fade { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>

      {/* Header overrides for tracking mode */}
      {trackingId && (
        <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm w-fit">
          <button 
            onClick={() => setTrackingId(null)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="pr-4">
            <h2 className="text-[17px] font-extrabold text-gray-900 leading-tight">Track Delivery</h2>
            <div className="text-[12.5px] font-semibold text-gray-500">{tracked?.deliveryId}</div>
          </div>
        </div>
      )}

      {!trackingId ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
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

          <div className="flex flex-col gap-4">
            {deliveryDefs.map(d => {
              const sc = statusColors[d.status];
              return (
                <div key={d.id} className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-[13px] bg-gradient-to-br from-amber-600 to-amber-500 text-white text-[15px] font-bold shrink-0">
                        {d.volunteerInitial}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14.5px] font-bold text-gray-900 truncate">{d.hotelName}</div>
                        <div className="mt-0.5 text-[12px] text-gray-500">{d.deliveryId} · {d.donationId}</div>
                      </div>
                    </div>
                    <span className={`text-[11.5px] font-bold px-[11px] py-[5px] rounded-full whitespace-nowrap ${sc.color} ${sc.bg}`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 mt-4 flex-wrap">
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Volunteer</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{d.volunteerName}</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Vehicle</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{d.vehicleType} ({d.vehicleNumber})</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">ETA</div>
                      <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{d.eta}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-[14px] text-[11.5px] font-semibold text-gray-400">
                    <span>Delivery Progress</span>
                    <span>{Math.round(d.progress * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mt-1.5">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full origin-left animate-[fb-ld-progress-grow_800ms_ease_both]" 
                      style={{ width: `${d.progress * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => setTrackingId(d.id)}
                      className="inline-flex items-center gap-[7px] px-[18px] py-[10px] rounded-xl bg-gray-900 text-white text-[12.5px] font-semibold hover:bg-emerald-600 hover:-translate-y-[2px] transition-all"
                    >
                      Track Delivery
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : tracked ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15.5px] font-bold text-gray-900">Live Tracking</span>
                <span className={`text-[11.5px] font-bold px-[11px] py-[5px] rounded-full ${statusColors[tracked.status].bg} ${statusColors[tracked.status].color}`}>
                  {tracked.status}
                </span>
              </div>
              <div className="relative h-[260px] rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden animate-[fb-ld-map-fade_400ms_ease_both]">
                <svg width="100%" height="100%" viewBox="0 0 300 180" preserveAspectRatio="none" className="absolute inset-0">
                  <path d="M40 150 Q 120 40 260 55" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="7 7" className="animate-[fb-ld-route-dash_1.4s_linear_infinite]" />
                </svg>
                <div className="absolute left-[12%] bottom-[12%] flex flex-col items-center gap-1">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/></svg>
                  </span>
                  <span className="text-[10px] font-bold text-blue-900 bg-white/85 px-2 py-0.5 rounded-full">Volunteer</span>
                </div>
                <div className="absolute right-[8%] top-[20%] flex flex-col items-center gap-1">
                  <span className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-emerald-600 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-.9a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-900 bg-white/85 px-2 py-0.5 rounded-full">Helping Hands NGO</span>
                </div>
                <span className="absolute top-2.5 left-3 text-[10.5px] font-semibold text-gray-500 bg-white/70 px-2 py-1 rounded-full">Interactive Map Placeholder</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-[18px]">
                <div className="p-[10px_12px] rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">ETA</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.eta}</div>
                </div>
                <div className="p-[10px_12px] rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Distance Left</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.distanceRemaining}</div>
                </div>
                <div className="p-[10px_12px] rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Traffic</div>
                  <div className={`text-[13px] font-bold mt-[3px] ${trafficColors[tracked.traffic]}`}>{tracked.traffic}</div>
                </div>
                <div className="p-[10px_12px] rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Speed</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.speed}</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[15.5px] font-bold text-gray-900 mb-[18px]">Delivery Timeline</div>
              <div className="flex flex-col">
                {timelineLabels.map((label, i) => {
                  const stepNum = i + 1;
                  const isDone = stepNum <= tracked.stage;
                  const isCurrent = stepNum === tracked.stage;
                  const isLast = i === timelineLabels.length - 1;
                  
                  return (
                    <div key={i} className="flex gap-3.5">
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0 transition-all ${isDone ? 'bg-emerald-600 border-2 border-emerald-600' : isCurrent ? 'bg-gray-100 border-2 border-emerald-600' : 'bg-gray-100 border-2 border-transparent'}`}>
                          {isDone && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                        </div>
                        {!isLast && (
                          <div className="w-0.5 flex-1 min-h-[18px] bg-gray-100 my-0.5 overflow-hidden">
                            <div className={`w-full bg-emerald-600 transition-all duration-400 ${stepNum < tracked.stage ? 'h-full' : 'h-0'}`}></div>
                          </div>
                        )}
                      </div>
                      <div className={isLast ? 'pb-0' : 'pb-5'}>
                        <span className={`text-[12.5px] ${isCurrent ? 'font-bold text-gray-900' : isDone ? 'font-semibold text-gray-900' : 'font-semibold text-gray-400'}`}>
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900 mb-3.5">Volunteer</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 text-white text-[16px] font-bold shrink-0">
                  {tracked.volunteerInitial}
                </div>
                <div className="min-w-0">
                  <div className="text-[13.5px] font-bold text-gray-900">{tracked.volunteerName}</div>
                  <div className="text-[12px] text-gray-500 mt-0.5">{tracked.volunteerPhone}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                <div>
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Vehicle</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.vehicleType}</div>
                </div>
                <div>
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Vehicle No.</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.vehicleNumber}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  License Verified
                </span>
                <span className="text-[11.5px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">On Delivery</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900 mb-3.5">Hotel</div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Hotel Name', value: tracked.hotelName },
                  { label: 'Manager', value: tracked.hotelManager },
                  { label: 'Phone', value: tracked.hotelPhone },
                  { label: 'Pickup Address', value: tracked.hotelAddress },
                  { label: 'Special Instructions', value: tracked.specialInstructions },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                    <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900 mb-3.5">Delivery Details</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Food Name', value: tracked.foodName },
                  { label: 'Category', value: tracked.foodCategory },
                  { label: 'Food Type', value: tracked.foodType },
                  { label: 'Quantity', value: tracked.quantity },
                  { label: 'Est. Meals', value: tracked.meals },
                  { label: 'Expiry', value: tracked.expiry },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                    <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                  </div>
                ))}
                <div className="col-span-2">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Storage Requirement</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{tracked.storageRequirement}</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900 mb-3.5">OTP Status</div>
              <div className="flex gap-3">
                <div className="flex-1 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Pickup OTP</div>
                  <span className={`inline-block mt-1.5 text-[11.5px] font-bold px-3 py-1 rounded-full ${tracked.pickupOtp === 'Verified' ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'}`}>
                    {tracked.pickupOtp}
                  </span>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Delivery OTP</div>
                  <span className={`inline-block mt-1.5 text-[11.5px] font-bold px-3 py-1 rounded-full ${tracked.deliveryOtp === 'Verified' ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'}`}>
                    {tracked.deliveryOtp}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-[14px] font-bold text-gray-900 mb-3.5">Notifications</div>
              <div className="flex flex-col gap-1">
                {notificationDefs.map((note, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-100 last:border-0">
                    <span className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${note.bg} ${note.color}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{note.icon}</svg>
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-semibold text-gray-900">{note.title}</div>
                      <div className="mt-0.5 text-[11px] text-gray-400">{note.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

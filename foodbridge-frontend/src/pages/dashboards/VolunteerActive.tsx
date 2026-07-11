import { useState, useEffect } from "react";
import { Clock, MapPin, Package } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
export default function VolunteerActive() {
  const { toast } = useToast();
  const [pickupOtpInput, setPickupOtpInput] = useState('');
  const [pickupOtpVerified, setPickupOtpVerified] = useState(false);
  const [pickupOtpError, setPickupOtpError] = useState('');
  
  const [deliveryOtpInput, setDeliveryOtpInput] = useState('');
  const [deliveryOtpVerified, setDeliveryOtpVerified] = useState(false);
  const [deliveryOtpError, setDeliveryOtpError] = useState('');

  const verifyPickupOtp = () => {
    if (pickupOtpInput.length < 4) {
      setPickupOtpError('Enter the full OTP shared by the hotel.');
      return;
    }
    setPickupOtpVerified(true);
    setPickupOtpError('');
  };

  const verifyDeliveryOtp = () => {
    if (deliveryOtpInput.length < 4) {
      setDeliveryOtpError('Enter the full OTP shared by the NGO.');
      return;
    }
    setDeliveryOtpVerified(true);
    setDeliveryOtpError('');
  };

  const handleReportIssue = () => {
    toast('Issue has been reported and saved.', 'error');
    const issues = JSON.parse(localStorage.getItem('volunteerReportedIssues') || '[]');
    issues.push({ id: delivery.deliveryId, date: new Date().toISOString(), type: 'General Issue' });
    localStorage.setItem('volunteerReportedIssues', JSON.stringify(issues));
  };

  const handleEmergency = (label: string) => {
    toast(`Emergency reported: ${label}. Support team notified.`, 'error');
    const emergencies = JSON.parse(localStorage.getItem('volunteerEmergencies') || '[]');
    emergencies.push({ id: delivery.deliveryId, date: new Date().toISOString(), type: label });
    localStorage.setItem('volunteerEmergencies', JSON.stringify(emergencies));
  };

  const [acceptedDeliveries, setAcceptedDeliveries] = useState<any[]>([]);

  useEffect(() => {
    try {
      setAcceptedDeliveries(JSON.parse(localStorage.getItem('volunteerAcceptedDeliveries') || '[]'));
    } catch {}
  }, []);

  const activeDeliveryData = acceptedDeliveries.length > 0 ? acceptedDeliveries[0] : null;
  const upcomingDeliveries = acceptedDeliveries.length > 1 ? acceptedDeliveries.slice(1) : [];

  const defaultDelivery = {
    deliveryId: '#DEL-8823', donationId: '#DN-2291', priority: 'High Priority',
    foodName: 'Vegetable Biryani', foodCategory: 'Cooked Meals', foodType: 'Vegetarian', quantity: '18 kg', meals: 60, expiry: '1h 10m',
    hotelName: 'Grand Regency Hotel', hotelInitial: 'GR', hotelManager: 'Anjali Mehta', hotelPhone: '+919845012233', hotelAddress: '42 MG Road, Bengaluru', hotelInstructions: 'Use the service entrance at the rear.',
    ngoName: 'Helping Hands', ngoInitial: 'HH', ngoRep: 'Meena Kapoor', ngoPhone: '+919822033445', ngoAddress: '56 Church Street, Bengaluru', storageType: 'Room Temperature',
    pickupEta: '6 min', deliveryEta: '24 min', distanceRemaining: '1.4 km', traffic: 'Light',
  };

  const delivery = activeDeliveryData ? {
    deliveryId: '#' + activeDeliveryData.id,
    donationId: '#DN-' + Math.floor(1000 + Math.random() * 9000),
    priority: activeDeliveryData.priority + ' Priority',
    foodName: activeDeliveryData.items || 'Assorted Food',
    foodCategory: 'Cooked Meals',
    foodType: 'Vegetarian',
    quantity: 'Bulk',
    meals: parseInt(activeDeliveryData.items) || 30,
    expiry: '2h',
    hotelName: activeDeliveryData.hotel,
    hotelInitial: activeDeliveryData.hotel.charAt(0),
    hotelManager: 'Manager',
    hotelPhone: '+91 99999 99999',
    hotelAddress: activeDeliveryData.hotel + ' Location',
    hotelInstructions: 'Call upon arrival.',
    ngoName: activeDeliveryData.ngo,
    ngoInitial: activeDeliveryData.ngo.charAt(0),
    ngoRep: 'Rep',
    ngoPhone: '+91 88888 88888',
    ngoAddress: activeDeliveryData.ngo + ' Location',
    storageType: 'Room Temperature',
    pickupEta: '10 min',
    deliveryEta: '30 min',
    distanceRemaining: activeDeliveryData.distance,
    traffic: 'Light',
  } : defaultDelivery;

  if (acceptedDeliveries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-[64px_20px] bg-white border border-dashed border-gray-200 rounded-2xl text-center flex-1 h-full animate-[fb-ad-fade-up_300ms_ease_both]">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
        <div className="mt-4 text-[15px] font-bold text-gray-900">No Active Deliveries</div>
        <div className="mt-1 text-[13px] text-gray-400">Head to the Find Deliveries page to accept a new delivery request.</div>
      </div>
    );
  }

  const timelineLabels = ['Delivery Assigned', 'Volunteer Accepted', 'Reached Hotel', 'Pickup OTP Verified', 'Food Picked Up', 'En Route', 'Reached NGO', 'Delivery OTP Verified', 'Delivery Completed'];

  const notes = [
    { source: 'Hotel', text: 'Please collect from the banquet kitchen, not the main lobby.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { source: 'NGO', text: 'Ring the side gate bell — main gate closes at 6 PM.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { source: 'Admin', text: 'This donation is high priority — please prioritize pickup.', color: 'text-amber-700', bg: 'bg-amber-100' },
  ];

  const emergencyOptions = [
    { label: 'Unable to Reach Hotel', color: 'text-blue-600', bg: 'bg-blue-50', icon: <path d="M4 22V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v18"/> },
    { label: 'Unable to Reach NGO', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-.9a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/> },
    { label: 'Vehicle Issue', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/><rect x="2" y="13" width="20" height="5" rx="1.5"/></> },
    { label: 'Food Damage', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></> },
    { label: 'Traffic Delay', color: 'text-purple-700', bg: 'bg-purple-100', icon: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6"/></> },
    { label: 'Emergency Support', color: 'text-red-600', bg: 'bg-red-50', icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></> },
  ];

  const notifications = [
    { title: 'Pickup OTP Generated', time: '2 minutes ago', color: 'text-purple-700', bg: 'bg-purple-100', icon: <><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></> },
    { title: 'Route Updated — Faster Path Found', time: '6 minutes ago', color: 'text-blue-600', bg: 'bg-blue-50', icon: <><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
    { title: 'Traffic Alert Near Hotel', time: '10 minutes ago', color: 'text-amber-700', bg: 'bg-amber-100', icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></> },
    { title: 'Delivery Assignment Confirmed', time: '18 minutes ago', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <path d="M20 6L9 17l-5-5"/> },
  ];

  let stage = 3; 
  let liveStatus = 'At Hotel';
  if (pickupOtpVerified && !deliveryOtpVerified) { stage = 6; liveStatus = 'On the Way'; }
  if (deliveryOtpVerified) { stage = 9; liveStatus = 'Delivered'; }



  return (
    <div className="flex flex-col flex-1 min-w-0 animate-[fb-ad-fade-up_300ms_ease_both]">
      <style>
        {`
          @keyframes fb-ad-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-ad-route-dash { to { stroke-dashoffset: -20; } }
          @keyframes fb-ad-pop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.06); opacity: 1; } 100% { transform: scale(1); } }
          @keyframes fb-ad-check-circle { from { stroke-dashoffset: 107; } to { stroke-dashoffset: 0; } }
          @keyframes fb-ad-check-mark { from { stroke-dashoffset: 22; } to { stroke-dashoffset: 0; } }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col gap-5 min-w-0">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="text-[17px] font-extrabold text-gray-900 tracking-tight">{delivery.foodName}</div>
                <div className="mt-[3px] text-[12.5px] text-gray-500">{delivery.deliveryId} · {delivery.donationId}</div>
              </div>
              <span className="text-[11.5px] font-bold text-red-600 bg-red-50 px-[11px] py-[5px] rounded-full whitespace-nowrap">
                {delivery.priority}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 mt-[18px]">
              {[
                { label: 'Category', value: delivery.foodCategory },
                { label: 'Food Type', value: delivery.foodType },
                { label: 'Quantity', value: delivery.quantity },
                { label: 'Est. Meals', value: delivery.meals },
                { label: 'Expiry', value: delivery.expiry },
                { label: 'Status', value: liveStatus },
              ].map((f, i) => (
                <div key={i}>
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[15px] font-bold shrink-0">
                  {delivery.hotelInitial}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.03em]">Hotel</div>
                  <div className="text-[14px] font-bold text-gray-900 mt-[2px]">{delivery.hotelName}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-[14px] mb-4">
                {[
                  { label: 'Manager', value: delivery.hotelManager },
                  { label: 'Phone', value: delivery.hotelPhone },
                  { label: 'Pickup Address', value: delivery.hotelAddress },
                  { label: 'Special Instructions', value: delivery.hotelInstructions },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                    <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                  </div>
                ))}
              </div>
              <a href={`tel:${delivery.hotelPhone}`} className="mt-auto inline-flex items-center justify-center gap-[7px] w-full p-[10px] rounded-[11px] bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>
                Contact Hotel
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-[15px] font-bold shrink-0">
                  {delivery.ngoInitial}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.03em]">NGO</div>
                  <div className="text-[14px] font-bold text-gray-900 mt-[2px]">{delivery.ngoName}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-[14px] mb-4">
                {[
                  { label: 'Representative', value: delivery.ngoRep },
                  { label: 'Phone', value: delivery.ngoPhone },
                  { label: 'Delivery Address', value: delivery.ngoAddress },
                  { label: 'Storage Required', value: delivery.storageType },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                    <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                  </div>
                ))}
              </div>
              <a href={`tel:${delivery.ngoPhone}`} className="mt-auto inline-flex items-center justify-center gap-[7px] w-full p-[10px] rounded-[11px] bg-white border border-gray-200 text-[12.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>
                Contact NGO
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-4">Live Navigation</div>
            <div className="relative h-[200px] rounded-[14px] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="none" className="absolute inset-0">
                <path d="M30 130 Q 100 30 160 60 T 270 40" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="7 7" className="animate-[fb-ad-route-dash_1.4s_linear_infinite]" />
              </svg>
              <div className="absolute left-[8%] bottom-[14%] flex flex-col items-center gap-1">
                <span className="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-gray-700 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
                </span>
                <span className="text-[9.5px] font-bold text-gray-700 bg-white/85 px-[7px] py-[2px] rounded-full">You</span>
              </div>
              <div className="absolute left-[48%] top-[22%] flex flex-col items-center gap-1">
                <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-blue-600 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v18"/></svg>
                </span>
                <span className="text-[9.5px] font-bold text-blue-900 bg-white/85 px-[7px] py-[2px] rounded-full">Hotel</span>
              </div>
              <div className="absolute right-[8%] top-[18%] flex flex-col items-center gap-1">
                <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-emerald-600 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-.9a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
                </span>
                <span className="text-[9.5px] font-bold text-emerald-900 bg-white/85 px-[7px] py-[2px] rounded-full">NGO</span>
              </div>
              <span className="absolute top-[10px] left-[12px] text-[10px] font-semibold text-gray-500 bg-white/70 px-[9px] py-[3px] rounded-full">Navigation Placeholder</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Est. Pickup', value: delivery.pickupEta },
                { label: 'Est. Delivery', value: delivery.deliveryEta },
                { label: 'Distance Left', value: delivery.distanceRemaining },
              ].map((f, i) => (
                <div key={i} className="p-[10px_12px] rounded-[11px] bg-gray-50 border border-gray-100">
                  <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">{f.label}</div>
                  <div className="text-[13px] font-semibold text-gray-900 mt-[3px]">{f.value}</div>
                </div>
              ))}
              <div className="p-[10px_12px] rounded-[11px] bg-gray-50 border border-gray-100">
                <div className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.03em]">Traffic</div>
                <div className="text-[13px] font-bold text-emerald-600 mt-[3px]">{delivery.traffic}</div>
              </div>
            </div>

            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 w-full p-[13px] rounded-[12px] bg-gray-900 text-white text-[13.5px] font-bold hover:bg-emerald-600 hover:-translate-y-0.5 transition-all">
              Open in Google Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-[18px]">Delivery Timeline</div>
            <div className="flex flex-col">
              {timelineLabels.map((label, i) => {
                const stepNum = i + 1;
                const isDone = stepNum <= stage;
                const isCurrent = stepNum === stage;
                const isLast = i === timelineLabels.length - 1;
                return (
                  <div key={i} className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-[22px] h-[22px] rounded-full shrink-0 transition-all ${isDone ? 'bg-emerald-600 border-2 border-emerald-600' : isCurrent ? 'bg-gray-100 border-2 border-emerald-600' : 'bg-gray-100 border-2 border-transparent'}`}>
                        {isDone && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      {!isLast && (
                        <div className="w-0.5 flex-1 min-h-[18px] bg-gray-100 my-0.5 overflow-hidden">
                          <div className={`w-full bg-emerald-600 transition-all duration-400 ${stepNum < stage ? 'h-full' : 'h-0'}`}></div>
                        </div>
                      )}
                    </div>
                    <div className={isLast ? 'pb-0' : 'pb-[18px]'}>
                      <span className={`text-[12.5px] ${isCurrent ? 'font-bold text-gray-900' : isDone ? 'font-semibold text-gray-900' : 'font-semibold text-gray-400'}`}>
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[15.5px] font-bold text-gray-900 mb-3.5">Volunteer Notes</div>
            <div className="flex flex-col gap-2.5">
              {notes.map((note, i) => (
                <div key={i} className="flex gap-2.5 p-[12px_14px] rounded-[12px] bg-gray-50 border border-gray-100">
                  <span className={`text-[10.5px] font-bold px-[9px] py-[4px] rounded-full whitespace-nowrap h-fit shrink-0 ${note.color} ${note.bg}`}>{note.source}</span>
                  <span className="text-[12.5px] text-gray-700 leading-snug">{note.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5 min-w-0">
          
          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14.5px] font-bold text-gray-900">Pickup OTP</span>
              <span className={`text-[11px] font-bold px-[10px] py-[4px] rounded-full ${pickupOtpVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
                {pickupOtpVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="text-[12px] text-gray-400 mb-3.5">Ask the hotel for the Pickup OTP to confirm collection.</div>
            
            {!pickupOtpVerified ? (
              <>
                <div className="flex gap-2.5">
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    maxLength={6} 
                    placeholder="Enter OTP" 
                    value={pickupOtpInput} 
                    onChange={e => setPickupOtpInput(e.target.value.replace(/\D/g, '').slice(0,6))}
                    className="flex-1 p-[12px_14px] rounded-[12px] border border-gray-200 bg-gray-50 text-[15px] font-semibold tracking-widest text-gray-900 outline-none focus:border-emerald-600 focus:bg-white focus:ring-[3px] focus:ring-emerald-600/15"
                  />
                  <button onClick={verifyPickupOtp} className="px-[22px] rounded-[12px] bg-emerald-600 text-white text-[13px] font-bold hover:bg-emerald-700 transition-colors">Verify</button>
                </div>
                {pickupOtpError && <div className="mt-2 text-[12px] font-semibold text-red-600">{pickupOtpError}</div>}
              </>
            ) : (
              <div className="flex items-center gap-3 animate-[fb-ad-pop_450ms_ease_both]">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#059669" strokeWidth="3.5" strokeDasharray="107" className="animate-[fb-ad-check-circle_600ms_ease_forwards]" />
                  <path d="M12 20l5 5 11-11" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22" strokeDashoffset="22" className="animate-[fb-ad-check-mark_400ms_ease_450ms_forwards]" />
                </svg>
                <span className="text-[13.5px] font-bold text-emerald-600">Pickup OTP Verified</span>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14.5px] font-bold text-gray-900">Delivery OTP</span>
              <span className={`text-[11px] font-bold px-[10px] py-[4px] rounded-full ${deliveryOtpVerified ? 'bg-emerald-50 text-emerald-600' : !pickupOtpVerified ? 'bg-gray-100 text-gray-400' : 'bg-amber-100 text-amber-700'}`}>
                {deliveryOtpVerified ? 'Verified' : !pickupOtpVerified ? 'Locked' : 'Pending'}
              </span>
            </div>
            <div className="text-[12px] text-gray-400 mb-3.5">Ask the NGO for the Delivery OTP to confirm handover.</div>

            {!pickupOtpVerified ? (
              <div className="flex items-center gap-2.5 p-[12px_14px] rounded-[12px] bg-gray-50 border border-dashed border-gray-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                <span className="text-[12.5px] font-semibold text-gray-400">Available after Pickup OTP is verified</span>
              </div>
            ) : !deliveryOtpVerified ? (
              <>
                <div className="flex gap-2.5">
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    maxLength={6} 
                    placeholder="Enter OTP" 
                    value={deliveryOtpInput} 
                    onChange={e => setDeliveryOtpInput(e.target.value.replace(/\D/g, '').slice(0,6))}
                    className="flex-1 p-[12px_14px] rounded-[12px] border border-gray-200 bg-gray-50 text-[15px] font-semibold tracking-widest text-gray-900 outline-none focus:border-emerald-600 focus:bg-white focus:ring-[3px] focus:ring-emerald-600/15"
                  />
                  <button onClick={verifyDeliveryOtp} className="px-[22px] rounded-[12px] bg-emerald-600 text-white text-[13px] font-bold hover:bg-emerald-700 transition-colors">Verify</button>
                </div>
                {deliveryOtpError && <div className="mt-2 text-[12px] font-semibold text-red-600">{deliveryOtpError}</div>}
              </>
            ) : (
              <div className="flex items-center gap-3 animate-[fb-ad-pop_450ms_ease_both]">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="#059669" strokeWidth="3.5" strokeDasharray="107" className="animate-[fb-ad-check-circle_600ms_ease_forwards]" />
                  <path d="M12 20l5 5 11-11" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22" strokeDashoffset="22" className="animate-[fb-ad-check-mark_400ms_ease_450ms_forwards]" />
                </svg>
                <span className="text-[13.5px] font-bold text-emerald-600">Delivery OTP Verified</span>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[14.5px] font-bold text-gray-900 mb-3.5">Delivery Actions</div>
            <div className="flex flex-col gap-2.5">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-[13px] rounded-[12px] bg-emerald-600 text-white text-[13.5px] font-bold hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Start Navigation
              </a>
              <a href={`tel:${delivery.hotelPhone}`} className="flex items-center justify-center p-[12px] rounded-[12px] bg-white border border-gray-200 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors">Call Hotel</a>
              <a href={`tel:${delivery.ngoPhone}`} className="flex items-center justify-center p-[12px] rounded-[12px] bg-white border border-gray-200 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors">Call NGO</a>
              <button onClick={handleReportIssue} className="flex items-center justify-center p-[12px] rounded-[12px] bg-white border border-gray-200 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors">Report Issue</button>
              <a href="tel:112" className="flex items-center justify-center p-[12px] rounded-[12px] bg-red-50 border border-red-200 text-red-600 text-[13px] font-bold hover:bg-red-100 transition-colors">Emergency Contact</a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[14.5px] font-bold text-gray-900 mb-3.5">Emergency Support</div>
            <div className="grid grid-cols-2 gap-2.5">
              {emergencyOptions.map((opt, i) => (
                <button key={i} onClick={() => handleEmergency(opt.label)} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm transition-all text-center">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${opt.bg} ${opt.color}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{opt.icon}</svg>
                  </span>
                  <span className="text-[11.5px] font-bold text-gray-900 leading-[1.3]">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-[22px] shadow-sm">
            <div className="text-[14.5px] font-bold text-gray-900 mb-3.5">Notifications</div>
            <div className="flex flex-col gap-1">
              {notifications.map((note, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
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

      {upcomingDeliveries.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[17px] font-extrabold text-gray-900 tracking-tight mb-4">Upcoming Deliveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingDeliveries.map((upcoming: any) => (
              <div key={upcoming.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500">{upcoming.id}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    upcoming.priority === 'High' ? 'bg-red-50 text-red-600' :
                    upcoming.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {upcoming.priority} Priority
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{upcoming.hotel}</div>
                      <div className="text-gray-500 text-xs mt-0.5">to {upcoming.ngo}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-600">{upcoming.items}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-600">{upcoming.timeWindow}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

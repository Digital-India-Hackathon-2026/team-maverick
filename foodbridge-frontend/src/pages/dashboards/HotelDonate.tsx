import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HotelDonate() {
  const navigate = useNavigate();
  

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({
    hotelAddress: 'Grand Regency Hotel, 42 MG Road, Bengaluru, Karnataka 560001',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const stepsConfig = [
    { title: 'Food Details', subtitle: 'Tell us what surplus food you have available.', fields: [
      { key: 'foodCategory', label: 'Food Category', kind: 'select', required: true, options: ['Cooked Meals', 'Bakery & Pastries', 'Packaged Food', 'Fruits & Vegetables', 'Beverages'] },
      { key: 'foodName', label: 'Food Name', kind: 'text', required: true, placeholder: 'e.g. Vegetable Biryani' },
      { key: 'foodType', label: 'Food Type', kind: 'segmented', required: true, segOptions: ['Vegetarian', 'Vegan', 'Jain'] },
      { key: 'quantity', label: 'Approximate Quantity', kind: 'text', required: true, placeholder: 'e.g. 20 kg' },
      { key: 'meals', label: 'Number of Meals', kind: 'text', required: true, placeholder: 'e.g. 60' },
      { key: 'prepTime', label: 'Preparation Time', kind: 'text', required: true, placeholder: 'e.g. 2:30 PM' },
      { key: 'expiryTime', label: 'Expiry Time', kind: 'select', required: true, options: ['Less than 1 Hour', '1-2 Hours', '2-4 Hours', '4-6 Hours', '6+ Hours'] },
      { key: 'storageCondition', label: 'Storage Condition', kind: 'segmented', required: true, segOptions: ['Room Temperature', 'Refrigerated', 'Frozen'] },
    ]},
    { title: 'Food Quality', subtitle: 'Confirm the condition of the food being donated.', fields: [
      { key: 'qualityGrid', kind: 'checkbox-grid', options: [
        { key: 'freshlyPrepared', label: 'Freshly Prepared' },
        { key: 'properlyPacked', label: 'Properly Packed' },
        { key: 'tempMaintained', label: 'Temperature Maintained' },
        { key: 'tamperFree', label: 'Tamper-Free Packaging' }
      ]},
      { key: 'notes', label: 'Optional Notes', kind: 'textarea', required: false, placeholder: 'Anything else the NGO or volunteer should know?' },
    ]},
    { title: 'Pickup Details', subtitle: 'Confirm where and when the food should be collected.', fields: [
      { key: 'hotelAddress', label: 'Hotel Address', kind: 'readonly', required: false },
      { key: 'contactNumber', label: 'Pickup Contact Number', kind: 'tel', required: true, placeholder: 'e.g. +91 98765 43210' },
      { key: 'preferredPickupTime', label: 'Preferred Pickup Time', kind: 'select', required: true, options: ['30 Minutes', '1 Hour', '1.5 Hours', '2 Hours', '2.5 Hours', '3 Hours', '3.5 Hours', '4 Hours'] },
      { key: 'specialInstructions', label: 'Special Pickup Instructions', kind: 'textarea', required: false, placeholder: 'e.g. Use the service entrance at the rear' },
    ]},
  ];

  const setFieldValue = (key: string, value: any) => {
    setData(s => ({ ...s, [key]: value }));
    setErrors(s => ({ ...s, [key]: '' }));
  };

  const validateField = (field: any) => {
    if (!field.required) return undefined;
    const value = data[field.key];
    if (!value || (typeof value === 'string' && value.trim() === '')) return 'This field is required';
    return undefined;
  };

  const touchField = (field: any) => () => {
    const err = validateField(field);
    setTouched(s => ({ ...s, [field.key]: true }));
    if (err) setErrors(s => ({ ...s, [field.key]: err }));
  };

  const validateCurrentStep = () => {
    const fields = stepsConfig[step].fields;
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let ok = true;
    fields.forEach((f) => {
      newTouched[f.key] = true;
      const err = validateField(f);
      if (err) { newErrors[f.key] = err; ok = false; }
    });
    setErrors(s => ({ ...s, ...newErrors }));
    setTouched(s => ({ ...s, ...newTouched }));
    return ok;
  };

  const goNext = () => {
    if (step < stepsConfig.length) {
      if (!validateCurrentStep()) return;
    }
    setStep(s => s + 1);
    setErrors({});
    setTouched({});
  };

  const goPrev = () => setStep(s => Math.max(0, s - 1));
  const editDetails = () => setStep(0);
  const submitDonation = () => {
    const newDonation = {
      id: `#DN-${Math.floor(1000 + Math.random() * 9000)}`,
      foodName: data.foodName || 'Food Item',
      category: data.foodCategory || 'Cooked Meals',
      quantity: data.quantity || '0 kg',
      meals: parseInt(data.meals, 10) || 0,
      expiry: data.expiryTime || '2-4 Hours',
      ngo: 'Finding NGO...',
      volunteer: 'Finding Volunteer...',
      pickupEta: '—',
      stage: 1,
      volunteerInitial: '?',
      volunteerName: 'Finding...',
      volunteerPhone: '—',
      vehicleType: '—',
      vehicleNumber: '—',
      ngoContact: '—',
      eta: '—',
      status: 'Submitted',
      pickupOtp: 'Pending',
      deliveryOtp: 'Pending'
    };
    try {
      const existing = JSON.parse(localStorage.getItem('mockDonations') || '[]');
      localStorage.setItem('mockDonations', JSON.stringify([newDonation, ...existing]));
    } catch (e) {}
    setStep(s => s + 1);
  };

  const computeDispatch = (data: any) => {
    const expiry = data.expiryTime || '2-4 Hours';
    let priority = 'Medium', pickup = '30 Minutes', delivery = '55 Minutes';
    if (expiry === 'Less than 1 Hour' || expiry === '1-2 Hours') { priority = 'High'; pickup = '15 Minutes'; delivery = '35 Minutes'; }
    else if (expiry === '2-4 Hours') { priority = 'Medium'; pickup = '30 Minutes'; delivery = '55 Minutes'; }
    else { priority = 'Low'; pickup = '50 Minutes'; delivery = '80 Minutes'; }

    const mealsNum = parseInt(data.meals, 10);
    let vehicle = 'Bike';
    if (!isNaN(mealsNum)) {
      if (mealsNum > 80) vehicle = 'Van';
      else if (mealsNum > 30) vehicle = 'Auto / Mini-Van';
      else vehicle = 'Bike';
    }

    return { pickup, priority, reason: `Expires in ${expiry}`, delivery, vehicle, status: 'Ready for Assignment' };
  };

  const totalSteps = stepsConfig.length;
  const isFormStep = step < totalSteps;
  const isDispatchPreview = step === totalSteps;
  const isConfirmation = step === totalSteps + 1;
  const isSuccess = step === totalSteps + 2;

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px',
    boxShadow: '0 12px 32px rgba(17,24,39,0.06)', padding: '32px', animation: 'fb-df-fade-up 450ms ease both',
  };

  const stepLabels = [...stepsConfig.map((s) => s.title), 'Dispatch Preview', 'Confirmation'];
  
  const dispatch = computeDispatch(data);
  const dispatchItems = isDispatchPreview ? [
    { label: 'Estimated Pickup Time', value: dispatch.pickup },
    { label: 'Food Priority', value: dispatch.priority, sub: dispatch.reason },
    { label: 'Estimated Delivery Time', value: dispatch.delivery },
    { label: 'Recommended Vehicle', value: dispatch.vehicle },
    { label: 'Dispatch Status', value: dispatch.status },
  ] : [];

  const summaryItems = isConfirmation ? [
    { label: 'Food Item', value: data.foodName || '—' },
    { label: 'Category', value: data.foodCategory || '—' },
    { label: 'Food Type', value: data.foodType || '—' },
    { label: 'Quantity', value: data.quantity || '—' },
    { label: 'Estimated Meals', value: data.meals || '—' },
    { label: 'Storage Condition', value: data.storageCondition || '—' },
    { label: 'Expiry', value: data.expiryTime || '—' },
    { label: 'Pickup Address', value: data.hotelAddress || '—' },
    { label: 'Pickup Contact', value: data.contactNumber || '—' },
    { label: 'Preferred Pickup Time', value: data.preferredPickupTime || '—' },
  ] : [];

  const baseInputClass = "w-full p-[11px_14px] rounded-xl border text-[14px] text-gray-900 bg-gray-50 transition-all outline-none font-inherit focus:border-emerald-600 focus:bg-white focus:ring-[3px] focus:ring-emerald-600/15";
  const errorInputClass = "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20";
  const btnClass = "inline-flex items-center gap-2 px-[24px] py-[13px] rounded-2xl font-bold transition-all font-inherit";

  return (
    <div className="max-w-[760px] mx-auto pt-9 pb-16 px-5 min-h-[80vh]">
      <style>
        {`
          @keyframes fb-df-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fb-df-check-circle { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 0; } }
          @keyframes fb-df-check-mark { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
          @keyframes fb-df-pop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
          @keyframes fb-df-pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
          @keyframes fb-df-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(220%); } }
        `}
      </style>

      {(isFormStep || isDispatchPreview || isConfirmation) && (
        <div className="text-center mb-9">
          <div className="text-[26px] font-extrabold tracking-tight text-gray-900">Donate Surplus Food</div>
          <div className="mt-1.5 text-[14px] text-gray-500">A quick, AI-assisted donation — usually under two minutes.</div>
        </div>
      )}

      {(isFormStep || isDispatchPreview || isConfirmation) && (
        <div className="flex items-center justify-center mb-9 overflow-x-auto pb-1">
          {stepLabels.map((label, i) => {
            const doneFlag = i < step;
            const isCurrent = i === step;
            return (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-[12.5px] font-bold shrink-0 transition-all border-2 ${doneFlag ? 'bg-emerald-600 text-white border-emerald-600' : isCurrent ? 'bg-gray-900 text-white border-emerald-600' : 'bg-gray-100 text-gray-400 border-transparent'}`}>
                    {doneFlag ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> : <span>{i + 1}</span>}
                  </div>
                  <span className={`text-[10px] font-semibold whitespace-nowrap max-w-[84px] text-center ${isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`w-[22px] h-[2px] mx-[3px] mb-[20px] transition-colors ${i < step ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isFormStep && (
        <div style={cardStyle}>
          <div className="text-[20px] font-extrabold text-gray-900 tracking-tight">{stepsConfig[step].title}</div>
          <div className="mt-1 text-[13.5px] text-gray-500">{stepsConfig[step].subtitle}</div>

          <div className="flex flex-col gap-5 mt-6.5">
            {stepsConfig[step].fields.map((f: any) => {
              const value = data[f.key];
              const error = touched[f.key] ? errors[f.key] : undefined;
              
              return (
                <div key={f.key} className="flex flex-col gap-[7px]">
                  {f.kind !== 'checkbox' && (
                    <label className="text-[13px] font-semibold text-gray-700 flex items-center gap-1">
                      {f.label} {f.required && <span className="text-red-600">*</span>}
                    </label>
                  )}

                  {['text', 'email', 'tel'].includes(f.kind) && (
                    <input type={f.kind} placeholder={f.placeholder || f.label} value={value || ''} onChange={(e) => setFieldValue(f.key, e.target.value)} onBlur={touchField(f)} className={`${baseInputClass} ${error ? errorInputClass : 'border-gray-200'}`} />
                  )}

                  {f.kind === 'readonly' && (
                    <div className="flex items-center gap-2 p-[11px_14px] rounded-xl border border-gray-200 bg-gray-100 text-[13.5px] text-gray-700 font-medium">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {value}
                    </div>
                  )}

                  {f.kind === 'textarea' && (
                    <textarea placeholder={f.placeholder || f.label} value={value || ''} onChange={(e) => setFieldValue(f.key, e.target.value)} onBlur={touchField(f)} rows={3} className={`${baseInputClass} resize-y min-h-[76px] ${error ? errorInputClass : 'border-gray-200'}`}></textarea>
                  )}

                  {f.kind === 'select' && (
                    <select value={value || ''} onChange={(e) => setFieldValue(f.key, e.target.value)} onBlur={touchField(f)} className={`${baseInputClass} ${error ? errorInputClass : 'border-gray-200'}`}>
                      <option value="">Select {f.label}</option>
                      {f.options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}

                  {f.kind === 'segmented' && (
                    <div className="flex gap-2.5 flex-wrap">
                      {f.segOptions.map((opt: string) => {
                        const active = value === opt;
                        return (
                          <button key={opt} type="button" onClick={() => setFieldValue(f.key, opt)} className={`inline-flex items-center px-[18px] py-[10px] rounded-xl text-[13.5px] font-semibold transition-all border-[1.5px] ${active ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-gray-700'}`}>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {f.kind === 'checkbox' && (
                    <label className="flex items-center gap-[11px] cursor-pointer py-1 relative">
                      <span className={`flex items-center justify-center w-5 h-5 rounded-md transition-all shrink-0 ${value ? 'bg-emerald-600 border-none' : 'bg-white border-[1.5px] border-gray-300'}`}>
                        {!!value && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                      </span>
                      <input type="checkbox" checked={!!value} onChange={() => setFieldValue(f.key, !value)} className="absolute opacity-0 w-0 h-0" />
                      <span className="text-[13.5px] font-semibold text-gray-700">{f.label}</span>
                    </label>
                  )}

                  {f.kind === 'checkbox-grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {f.options.map((opt: any) => {
                        const optValue = data[opt.key];
                        return (
                          <label key={opt.key} className="flex items-center gap-[11px] cursor-pointer p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors relative">
                            <span className={`flex items-center justify-center w-5 h-5 rounded-md transition-all shrink-0 ${optValue ? 'bg-emerald-600 border-none' : 'bg-white border-[1.5px] border-gray-300'}`}>
                              {!!optValue && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                            </span>
                            <input type="checkbox" checked={!!optValue} onChange={() => setFieldValue(opt.key, !optValue)} className="absolute opacity-0 w-0 h-0" />
                            <span className="text-[13.5px] font-semibold text-gray-700">{opt.label}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}

                  <span className="text-[12px] font-medium text-red-600 min-h-[16px] block">{error || ''}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 mt-8">
            <button type="button" onClick={goPrev} disabled={step === 0} className={`${btnClass} px-[22px] bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
              Back
            </button>
            <button type="button" onClick={goNext} className={`${btnClass} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5`}>
              Save & Continue
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      )}

      {isDispatchPreview && (
        <div style={cardStyle}>
          <div className="text-[20px] font-extrabold text-gray-900 tracking-tight">Smart Dispatch Preview</div>
          <div className="mt-1 text-[13.5px] text-gray-500">This is a preview only — assignment happens automatically after submission.</div>

          <div className="relative mt-6 p-[26px] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-blue-600">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-white/50 animate-[fb-df-scan_2.4s_linear_infinite]"></div>
            <div className="flex items-center gap-2.5 mb-5.5">
              <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-white/15 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a5 5 0 0 0-3.5 8.6c.3.3.5.7.5 1.1V14h6v-1.3c0-.4.2-.8.5-1.1A5 5 0 0 0 12 3z"/><path d="M9.5 17h5M10 20h4"/></svg>
              </span>
              <span className="text-[15px] font-bold text-white">Analyzing your donation…</span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              {dispatchItems.map((ditem, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-[14px_16px]">
                  <div className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">{ditem.label}</div>
                  <div className="mt-1.5 text-[16px] font-bold text-white">{ditem.value}</div>
                  {ditem.sub && <div className="mt-0.5 text-[11.5px] text-white/75">{ditem.sub}</div>}
                </div>
              ))}
            </div>
          </div>



          <div className="flex items-center justify-between gap-3 mt-7">
            <button type="button" onClick={goPrev} className={`${btnClass} px-[22px] bg-white text-gray-900 border border-gray-200 hover:bg-gray-50`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
              Back
            </button>
            <button type="button" onClick={goNext} className={`${btnClass} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5`}>
              Continue to Confirmation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      )}

      {isConfirmation && (
        <div style={cardStyle}>
          <div className="text-[20px] font-extrabold text-gray-900 tracking-tight">Review & Confirm</div>
          <div className="mt-1 text-[13.5px] text-gray-500">Please confirm your donation details before submitting.</div>

          <div className="flex flex-col gap-4 mt-6.5">
            {summaryItems.map((item, i) => (
              <div key={i} className="flex justify-between gap-4 py-[13px] border-b border-gray-100 last:border-0">
                <span className="text-[13px] text-gray-500">{item.label}</span>
                <span className="text-[13.5px] font-semibold text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 mt-7">
            <button type="button" onClick={editDetails} className={`${btnClass} px-[22px] bg-white text-gray-900 border border-gray-200 hover:bg-gray-50`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
              Edit Details
            </button>
            <button type="button" onClick={submitDonation} className={`${btnClass} bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5`}>
              Submit Donation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      )}

      {isSuccess && (
        <div style={cardStyle} className="text-center py-12">
          <div className="flex justify-center animate-[fb-df-pop_500ms_ease_both]">
            <svg width="76" height="76" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke="#059669" strokeWidth="4" strokeDasharray="226" className="animate-[fb-df-check-circle_700ms_ease_forwards]" />
              <path d="M24 41l10 10 22-22" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="46" strokeDashoffset="46" className="animate-[fb-df-check-mark_500ms_ease_500ms_forwards]" />
            </svg>
          </div>
          <div className="mt-6 text-[22px] font-extrabold text-gray-900 tracking-tight">Donation Submitted Successfully</div>
          <p className="mt-3 max-w-[420px] mx-auto text-[14px] leading-relaxed text-gray-500">
            Our Smart Dispatch Engine is finding the most suitable NGO and volunteer.
          </p>
          <div className="inline-flex items-center gap-[7px] mt-4 px-4 py-2 rounded-full bg-emerald-50">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-600 animate-[fb-df-pulse-dot_1.4s_ease-in-out_infinite]"></span>
            <span className="text-[12.5px] font-semibold text-emerald-700">Dispatch in progress</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-7.5">
            <button onClick={() => navigate('/hotel/active')} className={`${btnClass} bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5`}>
              View Active Donations
            </button>
            <button onClick={() => navigate('/hotel')} className={`${btnClass} bg-white text-gray-900 border border-gray-200 hover:bg-gray-50`}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

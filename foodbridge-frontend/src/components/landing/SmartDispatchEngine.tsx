import { Timer, MapPin, Package, Users, Scale, Car, Activity, Cpu, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { title: 'Expiry Time Priority', description: 'Food nearing expiry receives the highest priority.', Icon: Timer, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'Distance & ETA', description: 'Assigns the nearest suitable NGO and volunteer.', Icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Storage Capacity', description: 'Checks NGO storage availability before assignment.', Icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Volunteer Availability', description: 'Only assigns available volunteers with suitable vehicles.', Icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Fair Distribution', description: 'Balances donations among NGOs instead of repeatedly selecting the same organization.', Icon: Scale, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Vehicle Recommendation', description: 'Suggests the appropriate vehicle based on donation size.', Icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const decisionSteps = [
  { label: 'Food Uploaded', value: 'Hotel Grand Regency' },
  { label: 'Expiry', value: '2 Hours' },
  { label: 'Nearest NGO', value: 'Helping Hands' },
  { label: 'Volunteer', value: 'Rahul Sharma' },
  { label: 'Vehicle', value: 'Bike' },
  { label: 'Est. Delivery', value: '18 Minutes' },
  { label: 'Decision', value: 'Safe Delivery Possible' },
];

export default function SmartDispatchEngine() {
  const [started, setStarted] = useState(false);
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = vizRef.current;
    if (node && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setStarted(true);
    }
  }, []);

  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-100">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.1)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />
      <div className="absolute -bottom-40 -right-28 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,rgba(37,99,235,0)_70%)] blur-md pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Meet the Smart Dispatch Engine</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            The intelligence behind every successful food rescue. FoodBridge automatically analyzes multiple real-time factors to assign the right NGO, the right volunteer, and the right vehicle before food reaches its expiry.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left: Visualization placeholder */}
          <div className="flex-1 flex justify-center w-full max-w-md mx-auto" ref={vizRef}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              
              <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 border-2 border-dashed border-blue-500/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

              <div className={`relative z-10 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 shadow-[0_20px_48px_rgba(5,150,105,0.3)] 
                ${started ? 'animate-pulse' : ''}`}
              >
                <Cpu className="w-8 h-8 text-white mb-1" />
                <span className="text-[11.5px] font-bold text-white text-center leading-tight">Smart Dispatch<br/>Engine</span>
              </div>

              {/* Floating nodes */}
              {[Activity, MapPin, Package, Timer].map((Icon, i) => (
                <div key={i} className={`absolute w-12 h-12 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center
                  ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600' : ''}
                  ${i === 1 ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-emerald-600' : ''}
                  ${i === 2 ? 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600' : ''}
                  ${i === 3 ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-red-600' : ''}
                  animate-[bounce_4s_ease-in-out_infinite]`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <Icon className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="flex-[1.2] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`p-5 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(17,24,39,0.09)] hover:border-emerald-200
                    ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
                  `}
                  style={{ animationFillMode: 'both', animationDelay: `${i * 90}ms`, animationDuration: '550ms' }}
                >
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${feature.bg}`}>
                    <feature.Icon className={`w-5 h-5 ${feature.color}`} />
                  </span>
                  <div className="mt-3.5 text-[15px] font-bold text-gray-900">{feature.title}</div>
                  <div className="mt-1.5 text-[13px] leading-[1.55] text-gray-500">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decision Flow Panel */}
        <div className="mt-16 p-8 lg:px-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 shadow-[0_20px_48px_rgba(5,150,105,0.22)] overflow-hidden">
          <div className="flex items-center gap-3 mb-7">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15">
              <Play className="w-4 h-4 text-white fill-current" />
            </span>
            <span className="text-[17px] font-bold text-white">Decision Example</span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center">
            {decisionSteps.map((step, i) => {
              const isLast = i === decisionSteps.length - 1;
              return (
                <div key={i} className="flex flex-col lg:flex-row items-stretch lg:items-center flex-1 min-w-0">
                  <div className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 min-w-0">
                    <div className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">{step.label}</div>
                    <div className="mt-1.5 text-[14.5px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{step.value}</div>
                  </div>
                  
                  {!isLast && (
                    <div className="relative flex-none lg:w-6 lg:h-0.5 w-0.5 h-4 bg-white/30 my-0.5 mx-5 lg:my-0 lg:mx-1">
                      <div className="absolute lg:-top-[3px] lg:left-0 -left-[3px] w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

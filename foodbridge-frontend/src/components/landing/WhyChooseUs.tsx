import { BrainCircuit, MapPin, ShieldCheck, Activity, Scale, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: 'AI Smart Dispatch Engine',
    description: 'Automatically assigns the best NGO and volunteer using expiry time, distance, storage capacity, volunteer availability, and fairness logic.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    bar: 'from-emerald-600',
    Icon: BrainCircuit,
  },
  {
    title: 'Real-Time Live Tracking',
    description: 'Track every active delivery from pickup to successful delivery with ETA and route updates.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    bar: 'from-blue-600',
    Icon: MapPin,
  },
  {
    title: 'Secure OTP Verification',
    description: 'Dual OTP verification at pickup and delivery ensures safe, transparent, and verified handovers.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    bar: 'from-amber-600',
    Icon: ShieldCheck,
  },
  {
    title: 'Complete Delivery Transparency',
    description: 'Every delivery receives a unique Delivery ID with complete tracking, audit logs, and operational history.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    bar: 'from-blue-600',
    Icon: Activity,
  },
  {
    title: 'Fair NGO Distribution',
    description: 'The Smart Dispatch Engine balances donations across NGOs while prioritizing food before expiry and respecting storage capacity.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    bar: 'from-emerald-600',
    Icon: Scale,
  },
  {
    title: 'Complaint & Resolution System',
    description: 'Integrated complaint management with Delivery ID, live complaint tracking, admin investigation timeline, and transparent resolution updates.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    bar: 'from-amber-600',
    Icon: AlertCircle,
  },
];

export default function WhyChooseUs() {
  const [started, setStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = gridRef.current;
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
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.06)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />
      <div className="absolute -bottom-36 -right-24 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,rgba(37,99,235,0)_70%)] blur-md pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Why Choose FoodBridge?</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            FoodBridge combines AI, intelligent logistics, secure delivery verification, and real-time monitoring to ensure every surplus meal reaches the right destination efficiently and transparently.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              tabIndex={0}
              className={`relative flex flex-col items-start p-7 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] overflow-hidden transition-all duration-200 cursor-default h-full
                hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(17,24,39,0.09)] hover:border-emerald-200
                focus:outline-none focus:ring-2 focus:ring-emerald-600/30 group
                ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
              `}
              style={{ animationFillMode: 'both', animationDelay: `${i * 90}ms`, animationDuration: '600ms' }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.bar} to-transparent opacity-85`} />
              
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3`}>
                <feature.Icon className={`w-6 h-6 ${feature.color}`} />
              </span>
              
              <div className="mt-4.5 text-[17px] font-bold text-gray-900">{feature.title}</div>
              <div className="mt-2 text-[13.5px] leading-[1.6] text-gray-500">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

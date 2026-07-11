import { Building2, Cpu, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: 'Hotel Uploads Food',
    description: 'Hotels register surplus food with quantity, expiry time, food type, and pickup location.',
    Icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    highlight: false,
  },
  {
    title: 'Smart Dispatch Engine',
    description: 'FoodBridge intelligently selects the best NGO and the most suitable volunteer based on expiry, distance, capacity, and availability.',
    Icon: Cpu,
    color: 'text-white',
    bg: 'bg-white/20',
    highlight: true,
  },
  {
    title: 'Secure Pickup',
    description: 'The assigned volunteer verifies identity using Pickup OTP before collecting the food.',
    Icon: ShieldCheck,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    highlight: false,
  },
  {
    title: 'Safe Delivery',
    description: 'Food is delivered to the NGO with Delivery OTP verification, ensuring transparency and accountability.',
    Icon: Truck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    highlight: false,
  },
];

export default function HowItWorks() {
  const [started, setStarted] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = trackRef.current;
    if (node && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setStarted(true);
    }
  }, []);

  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-50">
      <div className="absolute -top-24 -right-32 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,rgba(37,99,235,0)_70%)] blur-md pointer-events-none" />
      <div className="absolute -bottom-32 -left-28 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.07)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">How FoodBridge Works</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            A seamless AI-powered workflow that ensures surplus food reaches the right people quickly, safely, and efficiently.
          </p>
        </div>

        <div ref={trackRef} className="flex flex-col lg:flex-row items-stretch justify-center gap-0 lg:gap-0 sm:grid sm:grid-cols-2 lg:flex">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const hasConnector = !isLast;

            return (
              <div key={i} className="flex flex-col lg:flex-row items-center flex-1 min-w-0 sm:block lg:flex">
                <div
                  className={`relative flex flex-col items-start p-6.5 rounded-2xl w-full min-w-0 transition-all duration-200 
                    ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
                    ${step.highlight 
                      ? "bg-gradient-to-br from-emerald-600 to-blue-600 border border-transparent shadow-[0_16px_40px_rgba(5,150,105,0.24)] lg:-translate-y-2 lg:scale-105 z-10 hover:shadow-[0_22px_52px_rgba(5,150,105,0.32)]" 
                      : "bg-white border border-gray-200 shadow-[0_2px_8px_rgba(17,24,39,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(17,24,39,0.09)] hover:border-emerald-200"
                    }
                  `}
                  style={{ animationFillMode: 'both', animationDelay: `${i * 140}ms`, animationDuration: '600ms' }}
                >
                  <div className={`inline-flex items-center justify-center w-6.5 h-6.5 rounded-full text-xs font-bold mb-3.5 
                    ${step.highlight ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  
                  <span className={`inline-flex items-center justify-center w-[54px] h-[54px] rounded-xl mb-1 ${step.bg}`}>
                    <step.Icon className={`w-7 h-7 ${step.color}`} />
                  </span>
                  
                  <div className={`mt-4 text-[17px] font-bold ${step.highlight ? "text-white" : "text-gray-900"}`}>
                    {step.title}
                  </div>
                  
                  <div className={`mt-2 text-[13.5px] leading-[1.55] ${step.highlight ? "text-white/90" : "text-gray-500"}`}>
                    {step.description}
                  </div>
                </div>

                {hasConnector && (
                  <>
                    {/* Desktop Connector */}
                    <div className="hidden lg:flex flex-[0_0_40px] items-center justify-center self-center -mt-2">
                      <div 
                        className={`w-full h-0.5 bg-gradient-to-r from-emerald-200 to-blue-200 origin-left 
                          ${started ? 'animate-in zoom-in-x' : 'opacity-0'}`}
                        style={{ animationFillMode: 'both', animationDelay: `${i * 140 + 400}ms`, animationDuration: '500ms' }}
                      />
                    </div>
                    {/* Mobile/Tablet Connector */}
                    <div className="lg:hidden h-7 w-0.5 ml-11">
                      <div 
                        className={`w-0.5 h-full bg-gradient-to-b from-emerald-200 to-blue-200 origin-top
                          ${started ? 'animate-in zoom-in-y' : 'opacity-0'}`}
                        style={{ animationFillMode: 'both', animationDelay: `${i * 140 + 400}ms`, animationDuration: '400ms' }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

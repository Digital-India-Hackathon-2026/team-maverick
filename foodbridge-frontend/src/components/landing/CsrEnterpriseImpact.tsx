import { Activity, Landmark, Building, Leaf, Building2, HeartHandshake } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: 'CSR & Impact Reporting',
    description: 'Automatically generate impact reports covering the metrics that matter most to stakeholders.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    bar: 'from-emerald-600',
    isFuture: false,
    hasList: true,
    metrics: ['Meals Donated', 'People Served', 'Food Waste Prevented', 'Environmental Impact'],
    Icon: Activity,
  },
  {
    title: 'Government Ready',
    description: 'Designed to support future partnerships with municipalities and government agencies for transparent food rescue operations.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    bar: 'from-purple-600',
    isFuture: true,
    hasList: false,
    Icon: Landmark,
  },
  {
    title: 'Enterprise Solutions',
    description: 'Enable hotel chains, corporate campuses, event venues, and institutions to manage surplus food efficiently across multiple locations.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    bar: 'from-blue-600',
    isFuture: false,
    hasList: false,
    Icon: Building,
  },
  {
    title: 'Sustainable Future',
    description: 'Support global sustainability initiatives by reducing food waste, improving resource utilization, and strengthening community outreach.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    bar: 'from-amber-600',
    isFuture: false,
    hasList: false,
    Icon: Leaf,
  },
];

export default function CsrEnterpriseImpact() {
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
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      <div className="absolute -top-24 -right-32 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,rgba(37,99,235,0)_70%)] blur-md pointer-events-none" />
      <div className="absolute -bottom-36 -left-24 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.07)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Built for Social Impact. Ready for Enterprise.</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            FoodBridge empowers organizations to reduce food waste, improve operational transparency, and measure real social impact through intelligent technology.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left: Ecosystem Illustration */}
          <div className="flex-1 flex justify-center w-full max-w-md mx-auto" ref={vizRef}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              
              <div className="absolute inset-0 border-[1.5px] border-dashed border-gray-300 rounded-full animate-[spin_40s_linear_infinite]" />
              
              {/* Center Hub */}
              <div className={`relative z-10 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-blue-600 shadow-[0_20px_44px_rgba(17,24,39,0.16)]
                ${started ? 'animate-pulse' : ''}`}
              >
                <Activity className="w-8 h-8 text-white mb-1.5" />
                <span className="text-[11px] font-bold text-white text-center leading-tight">Analytics &<br/>Dispatch Hub</span>
              </div>

              {/* Floating Nodes */}
              {[
                { Icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Hotels' },
                { Icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'NGOs' },
                { Icon: Building, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Enterprises' },
                { Icon: Landmark, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Government', isFuture: true },
              ].map((node, i) => (
                <div key={i} className={`absolute flex flex-col items-center gap-1.5 
                  ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                  ${i === 1 ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' : ''}
                  ${i === 2 ? 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                  ${i === 3 ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' : ''}
                  animate-[bounce_4s_ease-in-out_infinite]`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className={`w-[54px] h-[54px] rounded-2xl ${node.bg} shadow-lg border border-gray-100 flex items-center justify-center`}>
                    <node.Icon className={`w-6 h-6 ${node.color}`} />
                  </div>
                  <div className="text-[11px] font-bold text-gray-700">{node.label}</div>
                  {node.isFuture && (
                    <div className="text-[8.5px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">Future Ready</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="flex-[1.2] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className={`relative p-6 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] overflow-hidden transition-all duration-200 
                    hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(17,24,39,0.09)] hover:border-blue-200
                    ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
                  `}
                  style={{ animationFillMode: 'both', animationDelay: `${i * 100}ms`, animationDuration: '600ms' }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} to-transparent opacity-85`} />
                  
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-[46px] h-[46px] rounded-xl ${card.bg}`}>
                      <card.Icon className={`w-5 h-5 ${card.color}`} />
                    </span>
                    {card.isFuture && (
                      <span className="ml-auto text-[11px] font-bold text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full">Future Ready</span>
                    )}
                  </div>
                  
                  <div className="mt-4 text-[17px] font-bold text-gray-900">{card.title}</div>
                  <div className="mt-2 text-[13.5px] leading-[1.6] text-gray-500">{card.description}</div>
                  
                  {card.hasList && (
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      {card.metrics?.map((metric, j) => (
                        <span key={j} className={`text-[11.5px] font-semibold px-2.5 py-1.5 rounded-full ${card.color} ${card.bg}`}>
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

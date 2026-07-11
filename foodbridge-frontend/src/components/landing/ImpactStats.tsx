import { Building2, HeartHandshake, Navigation, Utensils, Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { key: 'meals', label: 'Meals Rescued', description: 'Surplus meals redirected to those in need', target: 12845, suffix: '+', decimals: 0, color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'from-emerald-600', Icon: Utensils },
  { key: 'hotels', label: 'Hotels Registered', description: 'Properties actively logging surplus food', target: 185, suffix: '+', decimals: 0, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'from-blue-600', Icon: Building2 },
  { key: 'ngos', label: 'NGOs Connected', description: 'Partner organizations receiving dispatches', target: 64, suffix: '+', decimals: 0, color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'from-emerald-600', Icon: HeartHandshake },
  { key: 'volunteers', label: 'Active Volunteers', description: 'Drivers delivering meals in real time', target: 432, suffix: '+', decimals: 0, color: 'text-amber-600', bg: 'bg-amber-50', bar: 'from-amber-600', Icon: Navigation },
  { key: 'waste', label: 'Food Waste Saved', description: 'Tons of surplus diverted from landfills', target: 18.6, suffix: ' Tons', decimals: 1, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'from-blue-600', Icon: Leaf },
];

export default function ImpactStats() {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = () => {
      if (started) return;
      setStarted(true);
      if (prefersReduced) {
        setProgress(1);
        return;
      }
      
      const duration = 1600;
      const startTime = performance.now();
      let rafId: number;

      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(eased);
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => cancelAnimationFrame(rafId);
    };

    const node = gridRef.current;
    if (node && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      start();
    }
  }, [started]);

  const formatValue = (target: number, decimals: number, suffix: string, currentProgress: number) => {
    const value = target * currentProgress;
    const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    const parts = rounded.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.') + suffix;
  };

  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-50">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.07)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Our Impact in Numbers</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            Every rescued meal brings us one step closer to reducing food waste and feeding communities through intelligent coordination.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              tabIndex={0}
              className={`relative p-7 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] overflow-hidden transition-all duration-200 cursor-default hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(17,24,39,0.09)] hover:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30
                ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
              `}
              style={{ animationFillMode: 'both', animationDelay: `${i * 90}ms`, animationDuration: '600ms' }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.bar} to-transparent opacity-85`} />
              
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg}`}>
                <stat.Icon className={`w-6 h-6 ${stat.color}`} />
              </span>
              
              <div className="mt-4.5 text-[34px] font-extrabold tracking-tight text-gray-900 leading-tight">
                {formatValue(stat.target, stat.decimals, stat.suffix, progress)}
              </div>
              
              <div className="mt-2 text-[15.5px] font-bold text-gray-900">{stat.label}</div>
              <div className="mt-1 text-[13px] leading-relaxed text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

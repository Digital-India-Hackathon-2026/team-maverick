import { Building2, HeartHandshake, Navigation, Check, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const roles = [
  {
    tag: 'Hotels',
    title: 'Register as a Hotel',
    description: 'Donate surplus food safely and let the Smart Dispatch Engine handle everything from NGO selection to volunteer assignment.',
    perks: ['Easy food uploads', 'Live donation tracking', 'Analytics dashboard', 'CSR & impact reports'],
    buttonLabel: 'Register as Hotel',
    href: '/auth?mode=register&role=hotel',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    gradient: 'from-blue-100 to-blue-50',
    shadow: 'shadow-blue-600/20',
    hoverBorder: 'hover:border-blue-100',
    btnBg: 'bg-blue-600',
    btnHover: 'hover:bg-blue-700',
    Icon: Building2,
  },
  {
    tag: 'NGOs',
    title: 'Register as an NGO',
    description: 'Receive food intelligently based on storage capacity, location, and food urgency while tracking deliveries in real time.',
    perks: ['Incoming requests', 'Live delivery tracking', 'Storage monitoring', 'Volunteer coordination'],
    buttonLabel: 'Register as NGO',
    href: '/auth?mode=register&role=ngo',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    gradient: 'from-emerald-100 to-emerald-50',
    shadow: 'shadow-emerald-600/20',
    hoverBorder: 'hover:border-emerald-100',
    btnBg: 'bg-emerald-600',
    btnHover: 'hover:bg-emerald-700',
    Icon: HeartHandshake,
  },
  {
    tag: 'Volunteers',
    title: 'Become a Volunteer',
    description: 'Help deliver surplus food securely using OTP verification while making a meaningful social impact.',
    perks: ['Flexible availability', 'Live navigation', 'Delivery history', 'Verified deliveries'],
    buttonLabel: 'Become a Volunteer',
    href: '/auth?mode=register&role=volunteer',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    gradient: 'from-amber-200 to-amber-100',
    shadow: 'shadow-amber-600/20',
    hoverBorder: 'hover:border-amber-200',
    btnBg: 'bg-amber-600',
    btnHover: 'hover:bg-amber-700',
    Icon: Navigation,
  },
];

export default function JoinFoodBridge() {
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
    <section className="relative py-24 px-8 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="absolute -top-32 left-[20%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.07)_0%,rgba(5,150,105,0)_70%)] blur-md pointer-events-none" />
      <div className="absolute -bottom-36 right-[10%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.07)_0%,rgba(37,99,235,0)_70%)] blur-md pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Become a Part of FoodBridge</h2>
          <p className="mt-3.5 text-[16.5px] leading-relaxed text-gray-500">
            Whether you're a Hotel, NGO, or Volunteer, FoodBridge empowers you to make a real impact by reducing food waste and helping communities.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <div
              key={i}
              className={`flex flex-col bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] overflow-hidden transition-all duration-300
                hover:-translate-y-2 hover:${role.shadow} hover:shadow-[0_22px_48px_rgba(0,0,0,0.08)] ${role.hoverBorder}
                ${i === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none' : ''}
                ${started ? 'opacity-100 animate-in fade-in slide-in-from-bottom-5' : 'opacity-0'}
              `}
              style={{ animationFillMode: 'both', animationDelay: `${i * 120}ms`, animationDuration: '600ms' }}
            >
              <div className={`h-28 bg-gradient-to-br ${role.gradient} flex items-center justify-center relative`}>
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-[0_10px_24px_rgba(17,24,39,0.1)] transition-transform duration-300 hover:scale-105">
                  <role.Icon className={`w-8 h-8 ${role.color}`} />
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6 pb-7">
                <div className={`text-[12.5px] font-bold uppercase tracking-wider ${role.color}`}>{role.tag}</div>
                <div className="mt-2 text-xl font-bold text-gray-900">{role.title}</div>
                <div className="mt-2.5 text-[13.5px] leading-[1.6] text-gray-500">{role.description}</div>

                <div className="flex flex-col gap-2.5 mt-5 mb-6">
                  {role.perks.map((perk, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${role.bg} shrink-0`}>
                        <Check className={`w-3 h-3 ${role.color}`} />
                      </span>
                      <span className="text-[13.5px] font-medium text-gray-700">{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    to={role.href}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[14.5px] font-semibold text-white transition-all shadow-sm
                      ${role.btnBg} ${role.btnHover} hover:-translate-y-0.5 hover:shadow-md
                    `}
                  >
                    {role.buttonLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

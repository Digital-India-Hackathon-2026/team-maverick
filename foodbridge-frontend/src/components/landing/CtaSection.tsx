import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-center">
      <div className="absolute -top-[140px] -left-[100px] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_70%)] blur-md animate-[pulse_15s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-[160px] -right-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)] blur-md animate-[pulse_17s_ease-in-out_infinite] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-[38px] font-extrabold tracking-tight text-white leading-tight">
          Ready to Transform Surplus Food into Social Impact?
        </h2>
        <p className="mt-4.5 text-[16.5px] leading-relaxed text-white/90">
          Join FoodBridge today and become part of an intelligent ecosystem that connects Hotels, NGOs, and Volunteers to reduce food waste through technology.
        </p>

        <div className="flex items-center justify-center gap-3.5 mt-8 flex-wrap">
          <Link
            to="/auth?mode=register"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-emerald-600 text-[15.5px] font-bold shadow-[0_8px_24px_rgba(17,24,39,0.16)] hover:shadow-[0_16px_36px_rgba(17,24,39,0.24)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 text-white text-[15.5px] font-semibold border border-white/35 hover:bg-white/20 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            Contact Us
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {['Secure Platform', 'AI Powered', 'Trusted Community'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-white/20 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[13.5px] font-semibold text-white/90">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

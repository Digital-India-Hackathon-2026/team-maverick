import { ArrowRight, CheckCircle2, Building2, Cpu, HeartHandshake, Navigation, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative pt-[120px] pb-24 overflow-hidden bg-gray-50">
      {/* Background blobs */}
      <div className="absolute -top-[120px] -right-[80px] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.16)_0%,rgba(5,150,105,0)_70%)] blur-md animate-[pulse_14s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-[140px] -left-[100px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.13)_0%,rgba(37,99,235,0)_70%)] blur-md animate-[pulse_16s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute top-[30%] left-[42%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,rgba(16,185,129,0)_70%)] blur-sm pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-14 lg:gap-10">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-start w-full text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span className="text-[13px] font-semibold text-emerald-700">AI-Powered Food Rescue Platform</span>
          </div>

          <h1 className="mt-5.5 text-5xl lg:text-[52px] leading-[1.12] font-extrabold tracking-tight text-gray-900 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
            Rescuing Surplus Food.<br />
            Delivering Hope.<br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Powered by Intelligence.
            </span>
          </h1>

          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-gray-500 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
            FoodBridge connects hotels, NGOs, and volunteers through a Smart Dispatch Engine that matches surplus food to the nearest need in real time — turning waste into meals, faster than ever.
          </p>

          <div className="flex items-center gap-3.5 mt-8 flex-wrap animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
            <Link
              to="/auth?mode=register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 text-white text-[15.5px] font-semibold shadow-sm hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-gray-900 text-[15.5px] font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Learn More
            </a>
          </div>

          <div className="flex items-center gap-5 mt-7.5 flex-wrap animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
            {['AI Powered', 'Secure OTP Delivery', 'Live Tracking'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-emerald-50 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
                <span className="text-[13.5px] font-medium text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Illustration) */}
        <div className="flex-1 flex justify-center w-full">
          <div className="relative w-full max-w-[380px] flex flex-col items-center">
            
            {/* Hotel Card */}
            <div className="relative z-10 w-full max-w-[260px] flex items-center gap-3 px-4.5 py-4 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_24px_rgba(17,24,39,0.06)] animate-[bounce_5s_ease-in-out_infinite]">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 shrink-0">
                <Building2 className="w-5 h-5 text-blue-600" />
              </span>
              <div>
                <div className="text-[14.5px] font-bold text-gray-900">Hotel</div>
                <div className="text-xs text-gray-400">Surplus logged</div>
              </div>
            </div>

            {/* Connector 1 */}
            <div className="relative w-0.5 h-11 bg-gradient-to-b from-emerald-200 to-blue-200 z-0" />

            {/* Smart Dispatch Engine */}
            <div className="relative z-10 w-full max-w-[300px] p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-blue-600 shadow-[0_16px_36px_rgba(5,150,105,0.28)] animate-[bounce_5.4s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 shrink-0 animate-[pulse_2.6s_ease-out_infinite]">
                  <Cpu className="w-5 h-5 text-white" />
                </span>
                <div>
                  <div className="text-[15px] font-bold text-white">Smart Dispatch Engine</div>
                  <div className="text-xs text-white/80">Matching in real time</div>
                </div>
              </div>
            </div>

            {/* Connector 2 */}
            <div className="relative w-0.5 h-11 bg-gradient-to-b from-blue-200 to-emerald-200 z-0" />

            {/* NGO Card */}
            <div className="relative z-10 w-full max-w-[260px] flex items-center gap-3 px-4.5 py-4 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_24px_rgba(17,24,39,0.06)] animate-[bounce_5.2s_ease-in-out_infinite]">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 shrink-0">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
              </span>
              <div>
                <div className="text-[14.5px] font-bold text-gray-900">NGO</div>
                <div className="text-xs text-gray-400">Request confirmed</div>
              </div>
            </div>

            {/* Connector 3 */}
            <div className="relative w-0.5 h-11 bg-gradient-to-b from-emerald-200 to-amber-200 z-0" />

            {/* Volunteer Card */}
            <div className="relative z-10 w-full max-w-[260px] flex items-center gap-3 px-4.5 py-4 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_24px_rgba(17,24,39,0.06)] animate-[bounce_5.6s_ease-in-out_infinite_0.4s]">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 shrink-0">
                <Navigation className="w-5 h-5 text-amber-600" />
              </span>
              <div>
                <div className="text-[14.5px] font-bold text-gray-900">Volunteer</div>
                <div className="text-xs text-gray-400">Live tracking en route</div>
              </div>
            </div>

            {/* Connector 4 */}
            <div className="relative w-0.5 h-10 bg-gradient-to-b from-amber-200 to-red-200 z-0" />

            {/* People Fed */}
            <div className="relative z-10 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-red-50 border border-red-200">
              <Utensils className="w-4.5 h-4.5 text-red-600" />
              <span className="text-sm font-bold text-red-700">People Fed</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

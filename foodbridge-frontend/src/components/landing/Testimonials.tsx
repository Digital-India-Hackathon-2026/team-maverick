import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "FoodBridge completely transformed how we manage our surplus banquet food. The live tracking gives us peace of mind that meals are reaching those who need them most.",
    name: "Anjali Mehta",
    role: "General Manager",
    org: "Grand Regency Hotel",
    type: "Hotel Partner",
    avatarBg: "bg-blue-100",
    avatarText: "AM",
    textColor: "text-blue-700"
  },
  {
    quote: "The Smart Dispatch Engine ensures we only receive the exact food types and quantities we can store. It has practically eliminated secondary waste at our shelters.",
    name: "Dr. Vikram Singh",
    role: "Director",
    org: "Annapurna Trust",
    type: "NGO Partner",
    avatarBg: "bg-emerald-100",
    avatarText: "VS",
    textColor: "text-emerald-700"
  },
  {
    quote: "Being a volunteer is incredibly seamless. The OTP verification ensures safety, and the navigation integrates perfectly with my phone. I love making a difference on my way home.",
    name: "Rahul Sharma",
    role: "Verified Driver",
    org: "Volunteer Network",
    type: "Volunteer",
    avatarBg: "bg-amber-100",
    avatarText: "RS",
    textColor: "text-amber-700"
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.03)_0%,rgba(37,99,235,0)_70%)] blur-2xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Voices of Impact</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-gray-500">
            Hear from the partners and volunteers who are making a difference every single day through our intelligent food rescue network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative flex flex-col p-8 bg-gray-50 border border-gray-100 rounded-3xl transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:bg-white">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-gray-200" />
              
              <div className="flex-1 mb-8 relative z-10">
                <p className="text-[15.5px] leading-relaxed text-gray-700 italic">"{t.quote}"</p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold ${t.avatarBg} ${t.textColor}`}>
                  {t.avatarText}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-[15px]">{t.name}</div>
                  <div className="text-[13px] font-medium text-gray-500">{t.role}, <span className="text-gray-900">{t.org}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

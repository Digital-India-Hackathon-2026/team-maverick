import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the Smart Dispatch Engine work?",
    answer: "Our intelligent engine matches surplus food from hotels with the nearest NGOs that have the exact storage capacity and dietary requirements for that specific food type. It factors in traffic, food perishability, and volunteer availability to ensure safe and rapid delivery."
  },
  {
    question: "What safety protocols are in place for food delivery?",
    answer: "Food safety is our top priority. All hotels must upload an active FSSAI license. We also enforce a dual-OTP verification system: one OTP at pickup to verify the volunteer, and another at drop-off to ensure the NGO receives the exact sealed package."
  },
  {
    question: "Who can register as a Volunteer?",
    answer: "Anyone with a valid Government ID and a vehicle (if taking large deliveries) can register. After submitting your documents through our automated verification queue, your account will be activated to accept delivery pings near you."
  },
  {
    question: "Is there a cost for Hotels or NGOs to use FoodBridge?",
    answer: "No. FoodBridge is completely free for all parties. Our mission is to eliminate food waste and hunger, and we believe technology should remove barriers, not create them."
  },
  {
    question: "How do I get my CSR Impact Report?",
    answer: "For Hotel partners, your Dashboard automatically tracks every meal donated and calculates the environmental impact. You can generate and download beautiful, audit-ready CSR reports directly from your 'Reports' tab."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[38px] font-extrabold tracking-tight text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-gray-500">
            Everything you need to know about the FoodBridge platform.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white border-emerald-200 shadow-[0_8px_30px_rgba(5,150,105,0.06)]' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <span className={`text-[15.5px] font-bold ${isOpen ? 'text-emerald-700' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${isOpen ? 'bg-emerald-100 rotate-180' : 'bg-gray-100'}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-emerald-700' : 'text-gray-500'}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 text-[15px] leading-relaxed text-gray-600 border-t border-transparent">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Globe, Code2, Camera, Share2, Heart } from "lucide-react";

export default function Footer() {
  const linkColumns = [
    {
      heading: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Impact", href: "/#impact" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Hotels", href: "/auth?mode=register" },
        { label: "NGOs", href: "/auth?mode=register" },
        { label: "Volunteers", href: "/auth?mode=register" },
        { label: "Enterprise", href: "/#enterprise" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help Center", href: "/#help" },
        { label: "FAQs", href: "/#faqs" },
        { label: "Privacy Policy", href: "/#privacy" },
        { label: "Terms & Conditions", href: "/#terms" },
        { label: "Contact Support", href: "/#support" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
                <defs>
                  <linearGradient id="fbFootGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#10B981" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <rect width="34" height="34" rx="10" fill="url(#fbFootGrad)" />
                <path d="M17 8.5C13 8.5 10 12 10 16.5C10 21 13 25.5 17 25.5C15.2 22.7 15 20.2 15 17.5C15 14 15.8 10.8 17 8.5Z" fill="white" fillOpacity="0.95" />
                <path d="M17 8.5C21 8.5 24 12 24 16.5C24 21 21 25.5 17 25.5C18.8 22.7 19 20.2 19 17.5C19 14 18.2 10.8 17 8.5Z" fill="white" fillOpacity="0.65" />
              </svg>
              <span className="text-lg font-bold tracking-tight text-white">FoodBridge</span>
            </div>
            <p className="mt-4 max-w-[300px] text-[13.5px] leading-relaxed text-gray-400">
              FoodBridge is an AI-powered surplus food rescue platform connecting Hotels, NGOs, and Volunteers through intelligent logistics.
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              {[
                { icon: Globe, href: "#", label: 'Website' },
                { icon: Code2, href: "#", label: 'GitHub' },
                { icon: Camera, href: "#", label: 'Instagram' },
                { icon: Share2, href: "#", label: 'Twitter' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 text-gray-300 flex items-center justify-center transition-all hover:bg-emerald-600 hover:text-white hover:-translate-y-0.5"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkColumns.map((col, i) => (
            <div key={i} className="min-w-0">
              <div className="text-[13px] font-bold tracking-wider uppercase text-gray-400">
                {col.heading}
              </div>
              <div className="flex flex-col gap-3 mt-4.5">
                {col.links.map((link, j) => (
                  <Link
                    key={j}
                    to={link.href}
                    onClick={(e) => {
                      if (['/#help', '/#faqs', '/#privacy', '/#terms', '/#support'].includes(link.href)) {
                        e.preventDefault();
                        alert('This page is coming soon!');
                      }
                    }}
                    className="text-sm font-medium text-gray-300 transition-colors w-fit hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 pt-6 flex-wrap">
          <span className="text-[13px] text-gray-400">
            &copy; {new Date().getFullYear()} FoodBridge. All rights reserved.
          </span>
          <span className="text-[13px] text-gray-400 flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> to reduce food waste
          </span>
          <span className="text-[12.5px] text-gray-500">Powered by Intelligent Logistics</span>
        </div>
      </div>
    </footer>
  );
}

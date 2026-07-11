import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Impact', href: '/#impact' },
    { label: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const solid = scrolled || mobileOpen;

  return (
    <>
      <nav
        className={`fixed top-0 z-[70] h-[72px] w-full transition-all duration-250 ease-in-out ${
          solid
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="transition-transform duration-200 group-hover:scale-105">
              <defs>
                <linearGradient id="fbGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#059669" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <rect width="34" height="34" rx="10" fill="url(#fbGrad)" />
              <path d="M17 8.5C13 8.5 10 12 10 16.5C10 21 13 25.5 17 25.5C15.2 22.7 15 20.2 15 17.5C15 14 15.8 10.8 17 8.5Z" fill="white" fillOpacity="0.95" />
              <path d="M17 8.5C21 8.5 24 12 24 16.5C24 21 21 25.5 17 25.5C18.8 22.7 19 20.2 19 17.5C19 14 18.2 10.8 17 8.5Z" fill="white" fillOpacity="0.65" />
            </svg>
            <span className="text-[19px] font-bold tracking-tight text-gray-900">FoodBridge</span>
          </Link>

          {/* Center Links (desktop) */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (location.pathname === '/' && link.href === '/');
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 text-[14.5px] font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? "text-emerald-600 border-emerald-600"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side (desktop) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/auth"
              className="px-[18px] py-[9px] rounded-2xl text-[14.5px] font-semibold text-gray-700 border border-transparent hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=register"
              className="px-5 py-[9px] rounded-2xl text-[14.5px] font-semibold text-white bg-emerald-600 shadow-sm hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              Register
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-[60] animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[min(340px,84vw)] bg-white z-[70] flex flex-col shadow-[-8px_0_32px_rgba(17,24,39,0.12)] transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <span className="text-[17px] font-bold tracking-tight text-gray-900">FoodBridge</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-gray-900" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (location.pathname === '/' && link.href === '/');
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`p-3.5 rounded-2xl text-[15.5px] font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 p-5 border-t border-gray-200">
          <Link
            to="/auth"
            className="w-full text-center py-3 rounded-2xl text-[15px] font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth?mode=register"
            className="w-full text-center py-3 rounded-2xl text-[15px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

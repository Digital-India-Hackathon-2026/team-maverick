import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Building2, HeartHandshake, Navigation, ArrowRight, MailCheck, Loader2 } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialMode = searchParams.get('mode') === 'register' ? 'roles' : 'login';
  const [view, setView] = useState<'login' | 'roles' | 'forgot' | 'register-form'>(initialMode);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<{ id: string, title: string, href: string } | null>(null);
  const [regStep, setRegStep] = useState(1);

  // Sync state with URL manually if user navigates back/forward
  useEffect(() => {
    setView(searchParams.get('mode') === 'register' ? 'roles' : 'login');
  }, [searchParams]);

  const showRoles = () => {
    navigate('/auth?mode=register');
  };

  const showLogin = () => {
    navigate('/auth');
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast('Successfully logged in!', 'success');
      const emailLower = email.toLowerCase();
      if (emailLower.includes('admin')) navigate('/admin');
      else if (emailLower.includes('ngo')) navigate('/ngo');
      else if (emailLower.includes('volunteer')) navigate('/volunteer');
      else navigate('/hotel');
    }, 800);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Password reset link sent to your email!', 'success');
    setView('login');
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setRegStep(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Account created successfully!', 'success');
    if (selectedRole) {
      navigate(selectedRole.href);
    } else {
      navigate('/');
    }
  };

  const roles = [
    {
      id: 'hotel',
      title: 'Register as Hotel',
      description: 'Donate surplus food and manage donations intelligently.',
      buttonLabel: 'Continue as Hotel',
      href: '/hotel',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hoverBorder: 'hover:border-blue-100',
      shadow: 'hover:shadow-blue-600/10',
      Icon: Building2,
    },
    {
      id: 'ngo',
      title: 'Register as NGO',
      description: 'Receive food efficiently using AI-powered allocation.',
      buttonLabel: 'Continue as NGO',
      href: '/ngo',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      hoverBorder: 'hover:border-emerald-100',
      shadow: 'hover:shadow-emerald-600/10',
      Icon: HeartHandshake,
    },
    {
      id: 'volunteer',
      title: 'Register as Volunteer',
      description: 'Help deliver food safely using OTP verification.',
      buttonLabel: 'Continue as Volunteer',
      href: '/volunteer',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      hoverBorder: 'hover:border-amber-200',
      shadow: 'hover:shadow-amber-600/10',
      Icon: Navigation,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      
      {/* Left: Illustration Panel */}
      <div className="relative flex-none lg:flex-[0_0_46%] flex items-start lg:items-center justify-center lg:justify-start px-6 py-10 lg:px-16 lg:py-14 bg-[linear-gradient(150deg,#059669,#047857_55%,#2563EB)] overflow-hidden lg:min-h-screen w-full">
        
        {/* Animated Blobs */}
        <div className="absolute -top-[120px] -left-[80px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_70%)] blur-md pointer-events-none animate-[authBlobA_15s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[140px] -right-[100px] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)] blur-md pointer-events-none animate-[authBlobB_17s_ease-in-out_infinite]" />

        <div className="relative z-10 flex flex-col items-start max-w-[400px]">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <svg width="32" height="32" viewBox="0 0 34 34" fill="none" className="transition-transform duration-200 group-hover:scale-105">
              <rect width="34" height="34" rx="10" fill="rgba(255,255,255,0.16)" />
              <path d="M17 8.5C13 8.5 10 12 10 16.5C10 21 13 25.5 17 25.5C15.2 22.7 15 20.2 15 17.5C15 14 15.8 10.8 17 8.5Z" fill="white" fillOpacity="0.95" />
              <path d="M17 8.5C21 8.5 24 12 24 16.5C24 21 21 25.5 17 25.5C18.8 22.7 19 20.2 19 17.5C19 14 18.2 10.8 17 8.5Z" fill="white" fillOpacity="0.65" />
            </svg>
            <span className="text-[19px] font-bold tracking-tight text-white">FoodBridge</span>
          </Link>

          <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-white leading-tight">
            Turning Surplus Food<br />into Real Impact.
          </h1>
          <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/85 max-w-[340px]">
            Every login connects a Hotel, NGO, or Volunteer to an intelligent network working to reduce food waste — one rescue at a time.
          </p>

          {/* Mini Ecosystem Illustration */}
          <div className="flex flex-col items-center gap-0 mt-11 w-full">
            <div className="flex items-center justify-center gap-3 px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl w-full max-w-[260px] animate-[authFloat1_5s_ease-in-out_infinite]">
              <span className="flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-white/15 shrink-0">
                <Building2 className="w-4 h-4 text-white" />
              </span>
              <span className="text-[13.5px] font-semibold text-white">Hotel</span>
            </div>
            
            <div className="w-0.5 h-[26px] bg-white/30" />
            
            <div className="flex items-center justify-center gap-2.5 px-4.5 py-3.5 bg-white/15 border border-white/30 rounded-2xl w-full max-w-[260px] animate-[authPulse_2.6s_ease-out_infinite]">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
              </span>
              <span className="text-[13.5px] font-bold text-white">Smart Dispatch Engine</span>
            </div>
            
            <div className="w-0.5 h-[26px] bg-white/30" />
            
            <div className="flex items-center justify-center gap-3 px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl w-full max-w-[260px] animate-[authFloat2_5.4s_ease-in-out_infinite]">
              <span className="flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-white/15 shrink-0">
                <HeartHandshake className="w-4 h-4 text-white" />
              </span>
              <span className="text-[13.5px] font-semibold text-white">NGO</span>
            </div>
            
            <div className="w-0.5 h-[26px] bg-white/30" />
            
            <div className="flex items-center justify-center gap-3 px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl w-full max-w-[260px] animate-[authFloat3_5.2s_ease-in-out_infinite]">
              <span className="flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-white/15 shrink-0">
                <Navigation className="w-4 h-4 text-white" />
              </span>
              <span className="text-[13.5px] font-semibold text-white">Volunteer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Auth Card Panel */}
      <div className="flex-1 flex items-center justify-center p-5 py-10 lg:p-12 lg:min-h-screen min-w-0">
        <div className="w-full max-w-[440px]">
          
          {view === 'login' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_48px_rgba(17,24,39,0.08)] p-7 lg:p-10 animate-[authFadeUp_500ms_ease_both]">
              <div className="text-center">
                <div className="text-2xl font-extrabold tracking-tight text-gray-900">Welcome Back</div>
                <div className="mt-2 text-sm text-gray-500">Log in to continue rescuing surplus food.</div>
              </div>

              <form className="flex flex-col gap-4 mt-8" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fb-email" className="text-[13px] font-semibold text-gray-700">Email Address</label>
                  <input id="fb-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fb-password" className="text-[13px] font-semibold text-gray-700">Password</label>
                  <input id="fb-password" type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                </div>

                <div className="flex items-center justify-between mt-0.5">
                  <label className="flex items-center gap-2 text-[13.5px] text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 bg-gray-50 border-gray-300 rounded focus:ring-emerald-600 focus:ring-2 cursor-pointer" 
                    />
                    Remember Me
                  </label>
                  <button type="button" onClick={() => setView('forgot')} className="text-[13.5px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 w-full p-3.5 mt-1 rounded-2xl bg-emerald-600 text-white text-[15px] font-bold shadow-sm hover:bg-emerald-700 hover:shadow-[0_10px_24px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="flex items-center gap-3 my-1.5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" title="Coming soon" className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-gray-200 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.6h6.5c-.3 1.5-1.2 2.8-2.5 3.6v3h4C22.3 19 23.5 15.9 23.5 12.3z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-4-3c-1.1.7-2.4 1.2-3.9 1.2-3 0-5.5-2-6.4-4.7h-4.1v3C3.5 21.5 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.6 14.6c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1v-3h-4.1C.5 8.8 0 10.4 0 12s.5 3.2 1.5 4.6z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.3 15.2 0 12 0 7.4 0 3.5 2.5 1.5 6.4l4.1 3C6.5 6.7 9 4.8 12 4.8z"/></svg>
                    Google
                  </button>
                  <button type="button" title="Coming soon" className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-gray-200 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 23 23"><rect x="1" y="1" width="10" height="10" fill="#F35325"/><rect x="12" y="1" width="10" height="10" fill="#81BC06"/><rect x="1" y="12" width="10" height="10" fill="#05A6F0"/><rect x="12" y="12" width="10" height="10" fill="#FFBA08"/></svg>
                    Microsoft
                  </button>
                </div>
                <div className="text-center text-[11.5px] text-gray-400 -mt-1.5">Social login coming soon</div>

                <button type="button" onClick={showRoles} className="w-full p-[13px] rounded-2xl bg-white text-gray-900 text-[14.5px] font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  Create New Account
                </button>
                
                <button type="button" onClick={() => navigate('/')} className="flex items-center justify-center gap-1.5 w-full mt-2 p-3 rounded-2xl bg-transparent text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                  Back to Home
                </button>
              </form>
            </div>
          )}

          {view === 'roles' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_48px_rgba(17,24,39,0.08)] p-7 lg:p-10 animate-[authFadeUp_500ms_ease_both]">
              <div className="text-center">
                <div className="text-2xl font-extrabold tracking-tight text-gray-900">Join FoodBridge</div>
                <div className="mt-2 text-sm text-gray-500">Choose how you'd like to be part of the ecosystem.</div>
              </div>

              <div className="flex flex-col gap-3.5 mt-7">
                {roles.map((role, i) => (
                  <div key={i} className={`flex items-center gap-3.5 p-4 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_8px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-1 ${role.shadow} ${role.hoverBorder}`}>
                    <span className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${role.bg}`}>
                      <role.Icon className={`w-5 h-5 ${role.color}`} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-bold text-gray-900">{role.title}</div>
                      <div className="mt-0.5 text-[12.5px] leading-relaxed text-gray-500">{role.description}</div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedRole({ id: role.id, title: role.title, href: role.href });
                        setView('register-form');
                        setRegStep(1);
                      }} 
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-900 text-white text-[12.5px] font-bold whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-lg ${role.color.replace('text', 'bg')} hover:bg-opacity-90`}
                    >
                      Select
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button type="button" onClick={showLogin} className="flex items-center justify-center gap-1.5 w-full mt-6 p-3 rounded-2xl bg-transparent text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                Already have an account? Login
              </button>
            </div>
          )}

          {view === 'forgot' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_48px_rgba(17,24,39,0.08)] p-7 lg:p-10 animate-[authFadeUp_500ms_ease_both]">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                  <MailCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold tracking-tight text-gray-900">Forgot Password</div>
                <div className="mt-2 text-sm text-gray-500">No worries, we'll send you reset instructions.</div>
              </div>

              <form className="flex flex-col gap-4 mt-8" onSubmit={handleForgot}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="reset-email" className="text-[13px] font-semibold text-gray-700">Email Address</label>
                  <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                </div>

                <button type="submit" className="w-full p-3.5 mt-2 rounded-2xl bg-emerald-600 text-white text-[15px] font-bold shadow-sm hover:bg-emerald-700 hover:shadow-[0_10px_24px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-all">
                  Reset Password
                </button>

                <button type="button" onClick={() => setView('login')} className="flex items-center justify-center gap-1.5 w-full mt-2 p-3 rounded-2xl bg-transparent text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                  Back to Login
                </button>
              </form>
            </div>
          )}

          {view === 'register-form' && selectedRole && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_48px_rgba(17,24,39,0.08)] p-7 lg:p-10 animate-[authFadeUp_500ms_ease_both]">
              <div className="text-center">
                <div className="text-2xl font-extrabold tracking-tight text-gray-900">{selectedRole.title}</div>
                <div className="mt-2 text-sm text-gray-500">Step {regStep} of 2: {regStep === 1 ? 'Basic Information' : 'Additional Details'}</div>
              </div>

              {regStep === 1 ? (
                <form className="flex flex-col gap-4 mt-8 animate-[authFadeUp_300ms_ease_both]" onSubmit={handleNextStep}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-name" className="text-[13px] font-semibold text-gray-700">
                      {selectedRole.id === 'hotel' ? 'Hotel Name' : selectedRole.id === 'ngo' ? 'NGO Name' : 'Full Name'}
                    </label>
                    <input id="reg-name" type="text" placeholder={selectedRole.id === 'hotel' ? 'Grand Regency' : 'John Doe'} className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-email" className="text-[13px] font-semibold text-gray-700">Email Address</label>
                    <input id="reg-email" type="email" placeholder="you@company.com" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-phone" className="text-[13px] font-semibold text-gray-700">Phone Number</label>
                    <input id="reg-phone" type="tel" placeholder="+91 98765 43210" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-password" className="text-[13px] font-semibold text-gray-700">Password</label>
                    <input id="reg-password" type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] text-gray-900 bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                  </div>

                  <button type="submit" className="w-full p-3.5 mt-2 rounded-2xl bg-emerald-600 text-white text-[15px] font-bold shadow-sm hover:bg-emerald-700 hover:shadow-[0_10px_24px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-all">
                    Next Step
                  </button>

                  <button type="button" onClick={() => setView('roles')} className="flex items-center justify-center gap-1.5 w-full mt-2 p-3 rounded-2xl bg-transparent text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                    Back to Roles
                  </button>
                </form>
              ) : (
                <form className="flex flex-col gap-4 mt-8 animate-[authFadeUp_300ms_ease_both]" onSubmit={handleRegister}>
                  
                  {selectedRole.id === 'hotel' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Manager Name</label>
                        <input type="text" placeholder="Anjali Mehta" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Address</label>
                        <textarea placeholder="123 Main St, City" rows={2} className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all resize-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">FSSAI No.</label>
                          <input type="text" placeholder="Required" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Business Reg No.</label>
                          <input type="text" placeholder="Required" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Avg Daily Surplus Meals</label>
                        <input type="number" placeholder="e.g. 50" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Food Categories</label>
                        <input type="text" placeholder="e.g. Cooked Meals, Bakery, Produce" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Upload FSSAI & Reg Documents</label>
                        <input type="file" multiple className="w-full p-2.5 rounded-xl border border-gray-200 text-[13.5px] text-gray-600 bg-gray-50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[12px] file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all cursor-pointer" required />
                      </div>
                    </>
                  )}

                  {selectedRole.id === 'ngo' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Representative Name</label>
                        <input type="text" placeholder="Meena Kapoor" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Address</label>
                        <textarea placeholder="NGO HQ Address" rows={2} className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all resize-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Storage Capacity</label>
                          <input type="text" placeholder="e.g. 500kg" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Meals Capacity</label>
                          <input type="number" placeholder="e.g. 200" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Storage Types</label>
                        <input type="text" placeholder="e.g. Cold Storage, Dry Pantry" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">NGO Registration No.</label>
                        <input type="text" placeholder="Required" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Upload NGO Documents</label>
                        <input type="file" multiple className="w-full p-2.5 rounded-xl border border-gray-200 text-[13.5px] text-gray-600 bg-gray-50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[12px] file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all cursor-pointer" required />
                      </div>
                    </>
                  )}

                  {selectedRole.id === 'volunteer' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Address</label>
                        <textarea placeholder="Residential Address" rows={2} className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all resize-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Date of Birth</label>
                          <input type="date" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Emergency Contact</label>
                          <input type="tel" placeholder="Phone No." className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Vehicle Type</label>
                          <select className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required>
                            <option value="">Select Type</option>
                            <option value="2-wheeler">2-Wheeler</option>
                            <option value="4-wheeler">4-Wheeler</option>
                            <option value="van">Mini Van</option>
                            <option value="none">No Vehicle</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Vehicle Number</label>
                          <input type="text" placeholder="e.g. KA 01 AB 1234" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Driving License No.</label>
                          <input type="text" placeholder="Required if driving" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-gray-700">Government ID No.</label>
                          <input type="text" placeholder="Aadhar / PAN" className="w-full p-3 rounded-xl border border-gray-200 text-[14.5px] bg-gray-50 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/15 outline-none transition-all" required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-gray-700">Upload License & ID</label>
                        <input type="file" multiple className="w-full p-2.5 rounded-xl border border-gray-200 text-[13.5px] text-gray-600 bg-gray-50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[12px] file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-all cursor-pointer" required />
                      </div>
                    </>
                  )}

                  <button type="submit" className="w-full p-3.5 mt-2 rounded-2xl bg-emerald-600 text-white text-[15px] font-bold shadow-sm hover:bg-emerald-700 hover:shadow-[0_10px_24px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-all">
                    Complete Registration
                  </button>

                  <button type="button" onClick={() => setRegStep(1)} className="flex items-center justify-center gap-1.5 w-full mt-2 p-3 rounded-2xl bg-transparent text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                    Back to Basic Info
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

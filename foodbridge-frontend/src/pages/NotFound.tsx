import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center animate-in zoom-in-95 duration-500">
        
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or you don't have permission to access it.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Home Page
          </button>
        </div>
      </div>
    </div>
  );
}

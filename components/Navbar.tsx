
import React from 'react';
import { authService } from '../services/mockAuthService';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:rotate-6 transition-transform shadow-lg">
              CF
            </div>
            <span className="ml-4 text-2xl font-black tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">
              CurricuForge<span className="text-violet-500">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center bg-white/40 p-1 rounded-2xl">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'generate', label: 'The Forge' },
              { id: 'history', label: 'History' }
            ].map((nav) => (
              <button 
                key={nav.id}
                onClick={() => onNavigate(nav.id)}
                className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${currentPage === nav.id ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-black text-slate-900 leading-tight">{user?.displayName}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.email}</span>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-100 hidden sm:block"></div>

            <button 
              onClick={onLogout}
              className="p-3 bg-white/40 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-2xl transition-all group"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

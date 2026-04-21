import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Bell, 
  Plus, 
  Maximize, 
  Command,
  ChevronDown,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ pageTitle = 'Dashboard' }) => {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-2xl">
      {/* Left Section: Search & Page Title */}
      <div className="flex items-center gap-10 flex-1">
        <div className="hidden md:flex items-center gap-3 relative group w-full max-w-[400px]">
          <Search size={18} className="absolute left-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks, documents..."
            className="w-full bg-white/[0.03] border border-white/5 pl-12 pr-12 py-3 rounded-2xl text-sm text-white outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-medium"
          />
          <div className="absolute right-4 flex items-center gap-1 px-1.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-slate-500">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      {/* Right Section: Actions & User */}
      <div className="flex items-center gap-6">
        {/* Quick Action Button */}
        <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95">
          <Plus size={18} />
          <span>New Task</span>
        </button>

        {/* Icons Group */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-4">
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e293b]" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden md:block">
            <Globe size={20} />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden md:block">
            <Maximize size={20} />
          </button>
        </div>

        {/* User Dropdown Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 pl-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white truncate max-w-[100px]">{user?.name}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pro Member</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-56 glass p-2 rounded-2xl border border-white/10 shadow-2xl z-50"
              >
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-semibold">Online</span>
                  </div>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-white/5 rounded-xl transition-all flex items-center justify-between">
                  My Profile 
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">New</span>
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-white/5 rounded-xl transition-all">
                  Billing Settings
                </button>
                <div className="h-px bg-white/5 my-2" />
                <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-[#0f172a] overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] height-[300px] bg-primary/40 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] height-[300px] bg-blue-500/40 blur-[80px] rounded-full"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[450px] p-10 z-10 glass rounded-3xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#f8fafc]">Welcome Back</h1>
          <p className="text-slate-400">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-500" size={20} />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-500" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgotpassword" size="sm" className="text-sm text-primary hover:underline font-medium tracking-wide">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

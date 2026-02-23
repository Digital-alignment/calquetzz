
import React, { useState } from 'react';
import { UserCircle, Lock, ArrowRight, ShieldAlert, User, LogIn, Github } from 'lucide-react';

interface LoginSectionProps {
  onLogin: (role: 'admin' | 'user') => void;
  onNavigateRegister: () => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin, onNavigateRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@maya.art' && password === 'admin123') {
      onLogin('admin');
    } else if (email === 'user@maya.art' && password === 'user123') {
      onLogin('user');
    } else {
      setError('Credenciales no válidas. Usa las de demostración abajo.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-in fade-in duration-500">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-emerald-900/20 rounded-full border border-emerald-500/20 mb-2">
            <LogIn className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-emerald-100 uppercase tracking-widest font-lexend">Acceso al Oráculo</h2>
          <p className="text-emerald-700 font-semibold uppercase text-xs tracking-widest">Ingresa a tu santuario personal</p>
        </div>

        <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-900/20 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleManualLogin} className="space-y-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest text-center animate-in shake-in duration-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircle className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="tu@esencia.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-xl shadow-emerald-900/40 font-black uppercase tracking-[0.2em] font-lexend group"
            >
              Entrar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-emerald-900/10 text-center">
            <button 
              onClick={onNavigateRegister}
              className="text-[10px] font-black text-emerald-700 hover:text-emerald-400 uppercase tracking-widest transition-colors font-lexend"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="space-y-4">
          <div className="text-center">
             <span className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.3em]">Demo Roles</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onLogin('admin')}
              className="p-4 bg-[#151510] border border-emerald-900/20 rounded-2xl hover:border-emerald-500/50 transition-all group text-left"
            >
              <ShieldAlert className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Admin</div>
              <div className="text-[9px] text-gray-500 font-medium truncate">admin@maya.art / admin123</div>
            </button>

            <button 
              onClick={() => onLogin('user')}
              className="p-4 bg-[#151510] border border-emerald-900/20 rounded-2xl hover:border-emerald-500/50 transition-all group text-left"
            >
              <User className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-1">Usuario</div>
              <div className="text-[9px] text-gray-500 font-medium truncate">user@maya.art / user123</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;


import React from 'react';
import { UserPlus, UserCircle, Mail, Lock, ArrowRight } from 'lucide-react';

interface RegisterSectionProps {
  onNavigateLogin: () => void;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({ onNavigateLogin }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-in fade-in duration-500">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-emerald-900/20 rounded-full border border-emerald-500/20 mb-2">
            <UserPlus className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-emerald-100 uppercase tracking-widest font-lexend">Nueva Inscripción</h2>
          <p className="text-emerald-700 font-semibold uppercase text-xs tracking-widest">Inicia tu viaje por los ciclos sagrados</p>
        </div>

        <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-900/20 shadow-2xl relative overflow-hidden">
          <form className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Nombre Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircle className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input 
                  type="text"
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="Tu Nombre"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input 
                  type="email"
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
                  className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled
              className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600/50 text-white/50 rounded-2xl cursor-not-allowed font-black uppercase tracking-[0.2em] font-lexend"
            >
              Registrarse (Demo Bloqueada)
              <ArrowRight className="w-5 h-5 opacity-50" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-emerald-900/10 text-center">
            <button 
              onClick={onNavigateLogin}
              className="text-[10px] font-black text-emerald-700 hover:text-emerald-400 uppercase tracking-widest transition-colors font-lexend"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;

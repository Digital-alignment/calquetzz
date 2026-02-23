
import React, { useMemo } from 'react';
import { Sparkles, Calendar, Compass, ScrollText, ArrowRight, Sun, Moon, Layers, ArrowUpRight } from 'lucide-react';
import { gregorianToJDN, jdnToMayan, getMoonData } from '../mayanLogic';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const todayAstral = useMemo(() => {
    const today = new Date();
    const jdn = gregorianToJDN(today.getDate(), today.getMonth() + 1, today.getFullYear());
    return {
      mayan: jdnToMayan(jdn),
      moon: getMoonData(jdn)
    };
  }, []);

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Today's Astral Bar */}
      <div className="bg-[#151510] border-b border-emerald-900/10 py-3 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button 
            onClick={onStart}
            className="group flex items-center gap-4 px-5 py-2 bg-emerald-900/20 border border-emerald-500/10 rounded-2xl hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/40">
                <span className="text-sm font-black font-lexend">{todayAstral.mayan.tzolkin.number}</span>
              </div>
              <div className="text-left">
                <div className="text-[9px] text-emerald-700 font-black uppercase tracking-widest font-lexend">Energía de Hoy</div>
                <div className="text-xs text-emerald-100 font-black uppercase tracking-widest flex items-center gap-2">
                  {todayAstral.mayan.tzolkin.kaqchikel}
                  <ArrowUpRight className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-6">
            <div className="h-8 w-px bg-emerald-900/20 hidden sm:block"></div>
            
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#2a2a24] rounded-full border border-emerald-900/20">
                <Moon className="w-4 h-4 text-emerald-100/60" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-emerald-900 font-black uppercase tracking-widest font-lexend">{todayAstral.moon.label}</div>
                <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">
                  {todayAstral.moon.daysToFullMoon === 0 
                    ? '¡Hoy es Luna Llena!' 
                    : `${todayAstral.moon.daysToFullMoon} días para Luna Llena`}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden stone-texture px-4 pt-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a15]/50 to-[#1a1a15]"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-700/5 rounded-full blur-[80px] animate-pulse delay-700"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] font-lexend animate-in slide-in-from-top duration-700">
            <Sparkles className="w-3 h-3" />
            Descubre el tiempo sagrado
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] font-lexend animate-in zoom-in-95 duration-700">
            El Oráculo del <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-700">Calendario Maya</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium leading-relaxed font-sans px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Sincroniza tu vida con los ciclos ancestrales. Explora la Cuenta Larga, el Tzolk'in sagrado y descubre tu destino personal a través de la Cruz Maya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <button 
              onClick={onStart}
              className="group px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-2xl shadow-emerald-900/50 text-base font-black uppercase tracking-[0.2em] font-lexend flex items-center gap-4"
            >
              Comenzar Lectura
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 py-5 bg-transparent border border-emerald-900/50 hover:border-emerald-500/50 text-emerald-700 hover:text-emerald-400 rounded-2xl transition-all text-base font-black uppercase tracking-[0.2em] font-lexend">
              Explorar Lore
            </button>
          </div>
        </div>

        {/* Floating Glyphs Decoration */}
        <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 space-y-12 opacity-10">
           <Compass className="w-16 h-16 text-emerald-500 rotate-12" />
           <Sun className="w-12 h-12 text-emerald-500 -rotate-12" />
           <Layers className="w-20 h-20 text-emerald-500" />
        </div>
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 space-y-12 opacity-10">
           <ScrollText className="w-20 h-20 text-emerald-500 -rotate-12" />
           <Moon className="w-12 h-12 text-emerald-500 rotate-12" />
           <Calendar className="w-16 h-16 text-emerald-500" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Compass className="w-8 h-8 text-emerald-400" />}
            title="Cuenta Larga"
            description="Mide el paso de los milenios desde el origen del mundo. El sistema de datación más preciso de la antigüedad."
          />
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8 text-amber-400" />}
            title="Ciclo Sagrado"
            description="El Tzolk'in de 260 días guía tu espíritu y define tu energía diaria a través de 20 nahuales."
          />
          <FeatureCard 
            icon={<Layers className="w-8 h-8 text-sky-400" />}
            title="Cruz Maya"
            description="Un mapa cosmográfico de tu esencia, vaticinando tu origen, tu destino y tus fortalezas espirituales."
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#151510] py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
           <div className="p-6 bg-emerald-900/10 rounded-full border border-emerald-500/10 w-fit mx-auto">
             <ScrollText className="w-10 h-10 text-emerald-500" />
           </div>
           <h3 className="text-3xl md:text-5xl font-black text-emerald-100 uppercase tracking-widest leading-tight font-lexend">
             "El tiempo no es una línea, es un tejido infinito"
           </h3>
           <p className="text-xl text-gray-500 leading-relaxed italic font-normal">
             Para los antiguos Mayas, cada día traía una carga energética específica enviada por los Abuelos. Nuestro oráculo te ayuda a descifrar ese mensaje para que camines con armonía.
           </p>
           <div className="flex justify-center pt-8">
             <div className="h-1 w-40 bg-gradient-to-r from-transparent via-emerald-900 to-transparent"></div>
           </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-[#2a2a24] stone-texture rounded-[2rem] p-10 border border-emerald-900/20 hover:border-emerald-500/40 hover:jade-glow transition-all group">
    <div className="p-4 bg-[#151510] rounded-2xl border border-emerald-900/30 w-fit mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-4 font-lexend">{title}</h4>
    <p className="text-gray-400 leading-relaxed font-medium font-sans">{description}</p>
  </div>
);

export default LandingPage;

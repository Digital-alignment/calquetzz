
import React, { useMemo } from 'react';
import { MayanDate } from '../types';
import { TZOLKIN_NUMBER_MEANINGS, TZOLKIN_DAY_DETAILS } from '../constants';
import { getTrecenaRange } from '../mayanLogic';
import { 
  Sun, 
  Gem, 
  Compass, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Layers
} from 'lucide-react';

export type LecturaTab = 'nawal' | 'trecena' | 'cross' | 'longcount';

interface ResultDisplayProps {
  mode: 'hero' | 'sidebar';
  mayanDate: MayanDate;
  gregorianDate?: { day: number; month: number; year: number; isBCE: boolean } | null;
  showGregorian?: boolean;
  onNextDay?: () => void;
  onPrevDay?: () => void;
  activeLecturaTab?: LecturaTab;
  onLecturaTabChange?: (tab: LecturaTab) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  mode, 
  mayanDate, 
  gregorianDate, 
  showGregorian, 
  onNextDay, 
  onPrevDay,
  activeLecturaTab,
  onLecturaTabChange
}) => {
  const { longCount, tzolkin, trecena, jdn } = mayanDate;
  const detail = TZOLKIN_DAY_DETAILS[tzolkin.name];

  const synthesis = useMemo(() => {
    const numMeaning = TZOLKIN_NUMBER_MEANINGS[tzolkin.number];
    return `Día de ${numMeaning.toLowerCase()} bajo la guía del Nawal ${tzolkin.kaqchikel}.`;
  }, [tzolkin]);

  const trecenaDates = useMemo(() => {
    return getTrecenaRange(jdn, tzolkin.number);
  }, [jdn, tzolkin.number]);

  if (mode === 'hero') {
    return (
      <div className="animate-in fade-in duration-700 font-sans">
        <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] overflow-hidden border border-emerald-900/20 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Sun className="w-64 h-64 text-emerald-400 rotate-12" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-14 relative z-10">
            <div className="flex items-center gap-6 group shrink-0 w-full md:w-auto justify-center">
               <button 
                  onClick={onPrevDay}
                  className="p-4 bg-[#151510] hover:bg-emerald-900/40 text-emerald-800 hover:text-emerald-400 rounded-2xl border border-emerald-900/30 transition-all shadow-lg"
                  title="Día Anterior"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>

               <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-emerald-900/20 flex items-center justify-center border-4 border-emerald-500/30 jade-glow shadow-2xl transition-transform hover:scale-105">
                      <div className="text-center">
                        <span className="block text-5xl md:text-6xl font-black text-emerald-400 font-lexend mb-1">{tzolkin.number}</span>
                        <span className="block text-xs font-black text-emerald-100 uppercase tracking-widest font-lexend">{tzolkin.kaqchikel}</span>
                      </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-3 bg-[#151510] border border-emerald-900/50 rounded-2xl shadow-xl">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
               </div>

               <button 
                  onClick={onNextDay}
                  className="p-4 bg-[#151510] hover:bg-emerald-900/40 text-emerald-800 hover:text-emerald-400 rounded-2xl border border-emerald-900/30 transition-all shadow-lg"
                  title="Siguiente Día"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left w-full">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-amber-500/80">
                     <Layers className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] font-lexend">Trecena: 1 {trecena.name}</span>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-lexend">
                      {tzolkin.number} {tzolkin.name}
                    </h2>
                    <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                       <span className="text-xs font-black text-emerald-400 uppercase tracking-widest font-lexend">{detail.symbol} (Animal/Símbolo)</span>
                    </div>
                  </div>
                </div>
                <p className="text-emerald-700 font-black uppercase text-xs tracking-[0.3em] font-lexend">Energía sagrada del día</p>
              </div>

              <div className="p-6 bg-emerald-900/10 rounded-3xl border border-emerald-500/10 relative">
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-emerald-900/40" />
                <p className="text-emerald-100 font-semibold text-lg leading-relaxed font-lexend italic">
                  {synthesis} {detail.meaning}
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-1 w-full bg-[#151510]">
             <div 
               className="h-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500" 
               style={{ width: `${((tzolkin.index + 1) / 20) * 100}%` }}
             ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <h3 className="text-xs font-black text-emerald-900 uppercase tracking-[0.3em] font-lexend px-2">Lectura</h3>
      
      {/* Horizontal scrolling menu for mobile, vertical sidebar for desktop */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x no-scrollbar">
        <SidebarCard 
          active={activeLecturaTab === 'nawal'}
          onClick={() => onLecturaTabChange?.('nawal')}
          icon={<Gem className="w-5 h-5 text-emerald-400" />}
          label="Número y Nawal"
          value={`${tzolkin.number} ${tzolkin.kaqchikel}`}
          sub={detail.symbol}
        />

        <SidebarCard 
          active={activeLecturaTab === 'trecena'}
          onClick={() => onLecturaTabChange?.('trecena')}
          icon={<Sparkles className="w-5 h-5 text-amber-400" />}
          label="Trecena"
          value={`1 ${trecena.name}`}
          sub={`${trecenaDates.startDate.day}/${trecenaDates.startDate.month} al ${trecenaDates.endDate.day}/${trecenaDates.endDate.month}`}
        />

        <SidebarCard 
          active={activeLecturaTab === 'cross'}
          onClick={() => onLecturaTabChange?.('cross')}
          icon={<Layers className="w-5 h-5 text-sky-400" />}
          label="Cruz Maya"
          value="Cosmograma"
          sub="Estructura Espiritual"
        />

        <SidebarCard 
          active={activeLecturaTab === 'longcount'}
          onClick={() => onLecturaTabChange?.('longcount')}
          icon={<Compass className="w-5 h-5 text-emerald-600" />}
          label="Cuenta Larga"
          value={`${longCount.baktun}.${longCount.katun}.${longCount.tun}.${longCount.uinal}.${longCount.kin}`}
          sub="Tiempo Lineal"
        />
      </div>

      {showGregorian && gregorianDate && (
        <div className="p-6 bg-amber-900/10 border border-amber-500/20 rounded-3xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-black mb-1 font-lexend">Fecha Gregoriana</p>
          <div className="text-xl font-black text-white font-lexend">
            {gregorianDate.day} / {gregorianDate.month} / {gregorianDate.year} {gregorianDate.isBCE ? 'AC' : 'DC'}
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarCard: React.FC<{ 
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  sub: string 
}> = ({ active, onClick, icon, label, value, sub }) => (
  <button 
    onClick={onClick}
    className={`w-full min-w-[240px] lg:min-w-0 bg-[#2a2a24] stone-texture rounded-3xl p-5 border flex items-center gap-5 transition-all text-left snap-center shrink-0 ${
      active ? 'border-emerald-500 jade-glow ring-1 ring-emerald-500/20' : 'border-emerald-900/10 hover:border-emerald-500/20'
    }`}
  >
    <div className={`p-3 bg-[#151510] rounded-xl border border-emerald-900/20 transition-transform ${active ? 'scale-110 border-emerald-500/30' : ''}`}>
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <div className={`text-[9px] font-black uppercase tracking-widest font-lexend truncate ${active ? 'text-emerald-400' : 'text-emerald-800'}`}>{label}</div>
      <div className="text-base font-black text-white uppercase tracking-tight font-lexend truncate">{value}</div>
      <div className="text-[10px] text-gray-500 font-semibold truncate font-lexend">{sub}</div>
    </div>
  </button>
);

export default ResultDisplay;


import React, { useState } from 'react';
import { ConversionDirection, LongCount } from '../types';
import { Calendar as CalendarIcon, Clock, Sparkles, RotateCcw, Landmark, CheckCircle2 } from 'lucide-react';

interface CalculatorProps {
  direction: ConversionDirection;
  onConvertGregorian: (d: number, m: number, y: number, bce: boolean) => void;
  onConvertMayan: (lc: LongCount) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ direction, onConvertGregorian, onConvertMayan }) => {
  const [gregorianDate, setGregorianDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    isBCE: false
  });

  const [longCount, setLongCount] = useState<LongCount>({
    baktun: 13,
    katun: 0,
    tun: 11,
    uinal: 4,
    kin: 12
  });

  const handleSync = () => {
    if (direction === 'GregorianToMayan') {
      if (!isNaN(gregorianDate.day) && !isNaN(gregorianDate.month) && !isNaN(gregorianDate.year)) {
        onConvertGregorian(gregorianDate.day, gregorianDate.month, gregorianDate.year, gregorianDate.isBCE);
      }
    } else {
      onConvertMayan(longCount);
    }
  };

  const handleGregorianChange = (field: string, value: string) => {
    const num = parseInt(value);
    setGregorianDate(prev => ({ ...prev, [field]: isNaN(num) ? (prev as any)[field] : num }));
  };

  const setToday = () => {
    const today = new Date();
    setGregorianDate({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      isBCE: false
    });
  };

  const setCreation = () => {
    setLongCount({ baktun: 0, katun: 0, tun: 0, uinal: 0, kin: 0 });
  };

  const setEndCycle = () => {
    setLongCount({ baktun: 13, katun: 0, tun: 0, uinal: 0, kin: 0 });
  };

  const handleLongCountChange = (field: keyof LongCount, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setLongCount(prev => ({ ...prev, [field]: num }));
  };

  return (
    <div className="space-y-8 font-sans">
      {direction === 'GregorianToMayan' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 font-lexend">
              <CalendarIcon className="w-4 h-4" />
              Entrada Gregoriana
            </h3>
            <button 
              onClick={setToday}
              className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors group font-lexend"
            >
              <RotateCcw className="w-3 h-3 group-hover:rotate-[-45deg] transition-transform" />
              Hoy
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Día', field: 'day' as const, min: 1, max: 31 },
              { label: 'Mes', field: 'month' as const, min: 1, max: 12 },
              { label: 'Año', field: 'year' as const, min: 0, max: 9999 },
            ].map((item) => (
              <div key={item.field} className="relative group">
                <label className="absolute -top-2 left-3 px-1 bg-[#2a2a24] text-[9px] font-semibold text-emerald-800 uppercase tracking-widest group-focus-within:text-emerald-400 transition-colors font-lexend">
                  {item.label}
                </label>
                <input 
                  type="number" 
                  min={item.min}
                  max={item.max}
                  value={isNaN(gregorianDate[item.field]) ? '' : gregorianDate[item.field]}
                  onChange={(e) => handleGregorianChange(item.field, e.target.value)}
                  className="w-full bg-[#151510]/50 border border-emerald-900/30 rounded-2xl px-2 sm:px-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-mono text-lg text-center"
                />
              </div>
            ))}
          </div>

          <div 
            onClick={() => setGregorianDate(p => ({ ...p, isBCE: !p.isBCE }))}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
              gregorianDate.isBCE 
                ? 'bg-amber-900/10 border-amber-500/30 shadow-lg shadow-amber-900/20' 
                : 'bg-[#151510]/50 border-emerald-900/20 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-colors ${gregorianDate.isBCE ? 'bg-amber-500/20' : 'bg-emerald-900/20'}`}>
                <Landmark className={`w-4 h-4 ${gregorianDate.isBCE ? 'text-amber-500' : 'text-emerald-700'}`} />
              </div>
              <div className="text-left">
                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest font-lexend ${gregorianDate.isBCE ? 'text-amber-200' : 'text-emerald-700'}`}>
                  Antes de Cristo (A.C.)
                </span>
                <p className="text-[9px] text-gray-500 font-normal hidden sm:block">Cronología negativa para fechas antiguas</p>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${gregorianDate.isBCE ? 'bg-amber-500' : 'bg-gray-800'}`}>
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${gregorianDate.isBCE ? 'left-6' : 'left-1'}`} />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 font-lexend">
              <Sparkles className="w-4 h-4" />
              Entrada Cuenta Larga
            </h3>
            <div className="flex gap-3">
              <button 
                onClick={setCreation}
                className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-400 uppercase tracking-widest transition-colors font-lexend"
              >
                Creación
              </button>
              <button 
                onClick={setEndCycle}
                className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-400 uppercase tracking-widest transition-colors font-lexend"
              >
                13.0.0.0.0
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {(['baktun', 'katun', 'tun', 'uinal', 'kin'] as const).map((unit) => (
              <div key={unit} className="space-y-2 group">
                <input 
                  type="number"
                  min="0"
                  value={isNaN(longCount[unit]) ? '' : longCount[unit]}
                  onChange={(e) => handleLongCountChange(unit, e.target.value)}
                  className="w-full bg-[#151510]/50 border border-emerald-900/30 rounded-xl py-4 text-center text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-mono text-base sm:text-lg"
                />
                <div className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-emerald-900 font-semibold text-center group-focus-within:text-emerald-500 transition-colors font-lexend">
                  {unit.charAt(0).toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#151510]/30 rounded-2xl p-4 border border-emerald-900/10 flex items-center gap-4">
             <div className="p-2 bg-emerald-900/20 rounded-lg">
               <Clock className="w-4 h-4 text-emerald-600" />
             </div>
             <div className="flex-1 text-left">
                <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-[0.2em] mb-1 font-lexend">Formato Estándar</div>
                <div className="text-base sm:text-xl font-mono text-emerald-100 tracking-widest">
                  {longCount.baktun}.{longCount.katun}.{longCount.tun}.{longCount.uinal}.{longCount.kin}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* SYNC BUTTON */}
      <div className="pt-4">
        <button 
          onClick={handleSync}
          className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] transition-all shadow-2xl shadow-emerald-900/50 font-black uppercase tracking-[0.2em] font-lexend group jade-glow"
        >
          <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
          Sincronizar con el Cosmos
        </button>
      </div>
    </div>
  );
};

export default Calculator;

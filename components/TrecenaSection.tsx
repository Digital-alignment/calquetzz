
import React, { useMemo } from 'react';
import { Trecena } from '../types';
import { TRECENA_INFO } from '../constants';
import { getTrecenaRange } from '../mayanLogic';
import { Sparkles, Info, Layers, CalendarDays } from 'lucide-react';

interface TrecenaSectionProps {
  trecena: Trecena;
  currentJdn: number;
  tzolkinNumber: number;
}

const TrecenaSection: React.FC<TrecenaSectionProps> = ({ trecena, currentJdn, tzolkinNumber }) => {
  const info = TRECENA_INFO[trecena.name];
  const dates = useMemo(() => getTrecenaRange(currentJdn, tzolkinNumber), [currentJdn, tzolkinNumber]);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 font-sans">
      <section className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 shadow-xl">
        <header className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-900/40 rounded-2xl border border-emerald-500/30">
            <Layers className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-widest text-emerald-100 uppercase font-lexend">El Ciclo de la Trecena</h2>
            <p className="text-xs text-emerald-500/60 uppercase font-semibold tracking-tighter font-lexend">Periodos Espirituales de 13 Días</p>
          </div>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20">
              <h3 className="text-xs font-black text-amber-500 uppercase mb-3 flex items-center gap-2 font-lexend">
                <CalendarDays className="w-4 h-4" />
                Inicio de Ciclo
              </h3>
              <div className="text-xl font-black text-white font-lexend">
                 {dates.startDate.day} / {dates.startDate.month} / {dates.startDate.year} {dates.startDate.isBCE ? 'AC' : 'DC'}
              </div>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mt-1">Día 1 {trecena.name}</p>
            </div>

            <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20">
              <h3 className="text-xs font-black text-emerald-600 uppercase mb-3 flex items-center gap-2 font-lexend">
                <CalendarDays className="w-4 h-4" />
                Final de Ciclo
              </h3>
              <div className="text-xl font-black text-white font-lexend">
                 {dates.endDate.day} / {dates.endDate.month} / {dates.endDate.year} {dates.endDate.isBCE ? 'AC' : 'DC'}
              </div>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mt-1">Día 13 del ciclo</p>
            </div>
          </div>

          <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20">
            <h3 className="text-sm font-semibold text-emerald-400 uppercase mb-3 flex items-center gap-2 font-lexend">
              <Info className="w-4 h-4" />
              ¿Qué es una Trecena?
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              En el calendario Tzolk'in, una <strong>Trecena</strong> es un periodo de 13 días. Debido a que el calendario combina 20 nombres de días con 13 números, cada secuencia de 13 días comienza con el número <strong>1</strong>. 
              La trecena lleva el nombre del día que cae en este primer día. Se cree que cada trecena está gobernada por la energía de su día inicial.
            </p>
          </div>

          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/10 overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
               <Sparkles className="w-32 h-32 text-emerald-400" />
            </div>
            
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 mb-2 font-semibold font-lexend">Trecena Activa</p>
            <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-wide font-lexend">
              1 {trecena.name}
            </h4>
            <div className="inline-block px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30 mb-6">
              <span className="text-xs font-semibold text-emerald-300 uppercase italic font-lexend">"{info.summary}"</span>
            </div>
            
            <div className="space-y-4">
              <div className="h-px bg-emerald-500/10 w-full"></div>
              <p className="text-emerald-100 leading-relaxed italic text-lg font-normal">
                {info.meaning}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrecenaSection;

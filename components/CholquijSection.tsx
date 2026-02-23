
import React, { useState, useMemo } from 'react';
import { TZOLKIN_NAMES, TZOLKIN_DAY_DETAILS, TZOLKIN_NUMBER_MEANINGS } from '../constants';
import { MayanCross, Tzolkin } from '../types';
import { 
  Sparkles, BookOpen, Sun, ScrollText, Compass, 
  Shield, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  PenTool, Eye, Activity, Star, Info, Quote
} from 'lucide-react';

interface CholquijSectionProps {
  cross?: MayanCross;
  tzolkinNumber?: number;
}

const CholquijSection: React.FC<CholquijSectionProps> = ({ cross, tzolkinNumber }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'cross' | 'library' | 'about'>('cross');

  const getDepthColor = (depth: string) => {
    switch (depth) {
      case 'Básico': return 'text-sky-400 bg-sky-900/20 border-sky-900/40';
      case 'Intermedio': return 'text-amber-400 bg-amber-900/20 border-amber-900/40';
      case 'Avanzado': return 'text-purple-400 bg-purple-900/20 border-purple-900/40';
      default: return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/40';
    }
  };

  const crossInterpretation = useMemo(() => {
    if (!cross || !tzolkinNumber) return null;

    const birth = TZOLKIN_DAY_DETAILS[cross.birth.name];
    const conception = TZOLKIN_DAY_DETAILS[cross.conception.name];
    const destiny = TZOLKIN_DAY_DETAILS[cross.destiny.name];
    const spiritual = TZOLKIN_DAY_DETAILS[cross.spiritual.name];
    const material = TZOLKIN_DAY_DETAILS[cross.material.name];
    const numberMeaning = TZOLKIN_NUMBER_MEANINGS[tzolkinNumber];

    return {
      synthesis: `Tu esencia como ${tzolkinNumber} ${cross.birth.name} revela un destino de ${birth.meaning.toLowerCase()} equilibrado por la fuerza del número ${tzolkinNumber}, que representa ${numberMeaning.toLowerCase()}`,
      path: `Vienes de la energía de ${conception.kaqchikel} (${conception.symbol}), que sembró en ti ${conception.meaning.toLowerCase()}. Tu camino se dirige hacia ${destiny.kaqchikel}, donde alcanzarás ${destiny.meaning.toLowerCase()}.`,
      support: `En el plano espiritual te guía ${spiritual.kaqchikel}, dándote ${spiritual.meaning.toLowerCase()}, mientras que en el plano material ${material.kaqchikel} te otorga ${material.meaning.toLowerCase()}.`
    };
  }, [cross, tzolkinNumber]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      <div className="flex bg-[#151510] p-1 rounded-2xl border border-emerald-900/20 shadow-inner">
        <SubTabButton active={activeSubTab === 'cross'} onClick={() => setActiveSubTab('cross')} label="Cruz Maya" icon={<Compass className="w-4 h-4" />} />
        <SubTabButton active={activeSubTab === 'library'} onClick={() => setActiveSubTab('library')} label="Los 20 Nahuales" icon={<ScrollText className="w-4 h-4" />} />
        <SubTabButton active={activeSubTab === 'about'} onClick={() => setActiveSubTab('about')} label="Origen" icon={<BookOpen className="w-4 h-4" />} />
      </div>

      {activeSubTab === 'cross' && cross && (
        <section className="space-y-8 animate-in slide-in-from-bottom-4">
          <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-900/20 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
              <Compass className="w-64 h-64 text-emerald-500 -rotate-12" />
            </div>
            
            <h3 className="text-xl font-black text-emerald-100 uppercase tracking-widest mb-2 font-lexend">Cosmograma Personal</h3>
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-tighter mb-12 font-lexend">La alineación de tus energías sagradas</p>
            
            <div className="relative max-w-xl mx-auto aspect-square flex items-center justify-center mb-12">
              {/* Decorative rings */}
              <div className="absolute w-[80%] h-[80%] border border-emerald-900/10 rounded-full"></div>
              <div className="absolute w-[60%] h-[60%] border border-emerald-900/20 rounded-full border-dashed"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-900/40 to-transparent"></div>
                <div className="h-full w-px bg-gradient-to-b from-transparent via-emerald-900/40 to-transparent"></div>
              </div>

              <CrossNode node={cross.birth} label="Esencia (Nacimiento)" position="center" isMain />
              
              <div className="absolute top-0 -translate-y-4">
                <CrossNode node={cross.conception} label="Origen (Engendración)" position="top" icon={<ArrowUp className="w-3 h-3" />} />
              </div>
              
              <div className="absolute bottom-0 translate-y-4">
                <CrossNode node={cross.destiny} label="Misión (Destino)" position="bottom" icon={<ArrowDown className="w-3 h-3" />} />
              </div>
              
              <div className="absolute left-0 -translate-x-4">
                <CrossNode node={cross.spiritual} label="Brazo Izquierdo (Espiritual)" position="left" icon={<ArrowLeft className="w-3 h-3" />} />
              </div>
              
              <div className="absolute right-0 translate-x-4">
                <CrossNode node={cross.material} label="Brazo Derecho (Material)" position="right" icon={<ArrowRight className="w-3 h-3" />} />
              </div>
            </div>

            {/* Interpretation Synthesis */}
            {crossInterpretation && (
              <div className="mt-12 space-y-6 text-left border-t border-emerald-900/20 pt-10">
                <div className="flex items-start gap-4 p-6 bg-emerald-900/10 rounded-3xl border border-emerald-500/10">
                   <Quote className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                   <div className="space-y-4">
                      <h4 className="text-emerald-400 font-black uppercase text-sm font-lexend tracking-widest">Interpretación del Ajq’ij</h4>
                      <p className="text-emerald-100 font-semibold leading-relaxed font-lexend">
                        {crossInterpretation.synthesis}.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-2">
                           <span className="text-emerald-700 font-black uppercase text-[10px] tracking-widest font-lexend flex items-center gap-2">
                             <Sparkles className="w-3 h-3" /> Origen y Destino
                           </span>
                           <p className="text-gray-400 leading-relaxed font-normal">
                             {crossInterpretation.path}
                           </p>
                        </div>
                        <div className="space-y-2">
                           <span className="text-emerald-700 font-black uppercase text-[10px] tracking-widest font-lexend flex items-center gap-2">
                             <Shield className="w-3 h-3" /> Equilibrio de Fuerzas
                           </span>
                           <p className="text-gray-400 leading-relaxed font-normal">
                             {crossInterpretation.support}
                           </p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-[#151510] rounded-2xl border border-emerald-900/20 text-[10px] text-gray-500 italic font-normal uppercase tracking-widest">
              "La Cruz Maya es el mapa que Ajaw trazó para que el ser humano no se perdiera en el tiempo."
            </div>
          </div>
        </section>
      )}

      {activeSubTab === 'library' && (
        <section className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-900/20 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-lg font-black text-emerald-100 uppercase tracking-widest font-lexend">Biblioteca de Nawales</h3>
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-tighter font-lexend">Energías del Calendario Sagrado</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
            {TZOLKIN_NAMES.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedDay(name === selectedDay ? null : name)}
                className={`p-4 rounded-2xl border transition-all group font-lexend ${
                  selectedDay === name 
                    ? 'bg-emerald-600 text-white border-emerald-400 scale-105 shadow-xl shadow-emerald-900/50' 
                    : 'bg-[#151510] text-emerald-700 border-emerald-900/30 hover:border-emerald-500/30 hover:text-emerald-500'
                }`}
              >
                <div className="text-[10px] uppercase font-semibold tracking-tighter mb-1 opacity-60">
                   {TZOLKIN_DAY_DETAILS[name].kaqchikel}
                </div>
                <div className="font-black uppercase tracking-wide text-sm">{name}</div>
              </button>
            ))}
          </div>

          {selectedDay && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-[#151510] rounded-[2rem] border border-emerald-500/20">
                <div className="flex flex-col md:flex-row gap-8 font-lexend">
                  <div className="md:w-1/3 text-center md:text-left space-y-4">
                    <div className="inline-block p-6 bg-emerald-900/20 rounded-full border border-emerald-500/20">
                      <Sun className="w-12 h-12 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-widest">
                        {selectedDay} / {TZOLKIN_DAY_DETAILS[selectedDay].kaqchikel}
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-widest border border-emerald-500/30 text-emerald-400">
                          {TZOLKIN_DAY_DETAILS[selectedDay].symbol}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-widest border ${getDepthColor(TZOLKIN_DAY_DETAILS[selectedDay].depth)}`}>
                          {TZOLKIN_DAY_DETAILS[selectedDay].depth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-6 font-sans">
                     <p className="text-emerald-100 font-semibold leading-relaxed text-lg font-lexend">
                       {TZOLKIN_DAY_DETAILS[selectedDay].meaning}
                     </p>
                     <p className="text-gray-400 text-sm italic leading-relaxed font-normal">
                       {TZOLKIN_DAY_DETAILS[selectedDay].extended}
                     </p>
                     
                     {TZOLKIN_DAY_DETAILS[selectedDay].cycleRole && (
                        <div className="flex items-center gap-3 p-3 bg-emerald-900/10 rounded-xl border border-emerald-500/10">
                          <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
                          <p className="text-xs text-emerald-300 font-semibold font-lexend uppercase tracking-tighter">{TZOLKIN_DAY_DETAILS[selectedDay].cycleRole}</p>
                        </div>
                     )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-lexend">
                <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 uppercase tracking-widest text-[10px] font-semibold">
                    <Eye className="w-3 h-3" /> Glifo
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal font-sans">
                    {TZOLKIN_DAY_DETAILS[selectedDay].glyph.glifo}
                  </p>
                </div>
                <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 uppercase tracking-widest text-[10px] font-semibold">
                    <PenTool className="w-3 h-3" /> Trazos
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal font-sans">
                    {TZOLKIN_DAY_DETAILS[selectedDay].glyph.trazos}
                  </p>
                </div>
                <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 uppercase tracking-widest text-[10px] font-semibold">
                    <Sparkles className="w-3 h-3" /> Simbolismo
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal font-sans">
                    {TZOLKIN_DAY_DETAILS[selectedDay].glyph.simbolismo}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeSubTab === 'about' && (
        <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 font-lexend">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 space-y-6">
              <h3 className="flex items-center gap-3 text-emerald-400 font-semibold uppercase tracking-wider text-sm">
                <Star className="w-5 h-5" />
                Profundidad Espiritual
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal font-sans">
                Los nahuales se clasifican según la profundidad espiritual requerida para comprender su esencia y energía:
              </p>
              <div className="space-y-4">
                {[
                  { level: 'Básico', color: 'text-sky-400', desc: 'Fácil acceso, energía directa. Ejemplo: Aj, Q\'anil.' },
                  { level: 'Intermedio', color: 'text-amber-400', desc: 'Requiere reflexión y equilibrio. Ejemplo: E, Tz\'ikin, Ajpu.' },
                  { level: 'Avanzado', color: 'text-purple-400', desc: 'Requiere iniciación espiritual y dominio del ego. Ejemplo: B\'atz\', I\'x, No\'j.' }
                ].map((d) => (
                  <div key={d.level} className="flex gap-4 p-3 bg-[#151510] rounded-xl border border-emerald-900/20">
                    <div className={`font-semibold text-xs uppercase tracking-widest ${d.color} shrink-0 w-20`}>{d.level}</div>
                    <div className="text-xs text-gray-500 font-normal font-sans">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 space-y-6">
              <h3 className="flex items-center gap-3 text-emerald-400 font-semibold uppercase tracking-wider text-sm">
                <Activity className="w-5 h-5" />
                Ciclos Temporales
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal font-sans">
                Cada nahual juega un papel crucial en los ciclos mayores que mantienen el orden cósmico:
              </p>
              <ul className="space-y-4 font-sans">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    <span className="text-emerald-100 font-semibold font-lexend">B'atz'</span> abre el ciclo de 260 días, representando el inicio del hilo temporal.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    <span className="text-emerald-100 font-semibold font-lexend">Aq'ab'al</span> cierra y abre ciclos simultáneamente en el día 13 del Cholq'ij.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    <span className="text-emerald-100 font-semibold font-lexend">Kan</span> completa el microciclo de 20 días antes del reinicio.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-[#151510] border border-emerald-900/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="p-5 bg-emerald-900/20 rounded-full border border-emerald-500/20 shadow-jade">
              <Shield className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black text-emerald-200 uppercase tracking-widest font-lexend">Sabiduría Ajq’ij</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic font-normal font-sans max-w-2xl">
                "Esta estructura garantiza que el calendario sea un sistema perpetuo e infinito, donde cada ciclo inicia nuevamente pero con aprendizajes acumulados. Los 20 nahuales integran energías cósmicas y características personales para guiar la existencia humana."
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const SubTabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all text-xs font-semibold uppercase tracking-tighter font-lexend ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg' 
        : 'text-emerald-900 hover:text-emerald-500'
    }`}
  >
    {icon}
    {label}
  </button>
);

const CrossNode: React.FC<{ node: Tzolkin; label: string; position: string; isMain?: boolean; icon?: React.ReactNode }> = ({ node, label, position, isMain, icon }) => {
  const detail = TZOLKIN_DAY_DETAILS[node.name];
  return (
    <div className={`flex flex-col items-center transition-all ${isMain ? 'scale-110 z-10' : 'scale-90 opacity-80'} font-lexend`}>
      <div className={`group relative w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-2 shadow-2xl stone-texture transition-all hover:scale-105 ${
        isMain ? 'border-emerald-400 bg-emerald-900/40 jade-glow' : 'border-emerald-900/60 bg-[#151510] hover:border-emerald-400'
      }`}>
        {/* Tooltip on hover */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-3 bg-[#151510] border border-emerald-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
           <p className="text-[10px] text-emerald-400 font-black uppercase mb-1 tracking-widest">{detail.kaqchikel}</p>
           <p className="text-[9px] text-gray-400 font-normal leading-tight font-sans italic">"{detail.meaning.split('.')[0]}."</p>
        </div>

        <span className="text-[10px] text-emerald-500 font-black mb-0.5">{node.number}</span>
        <span className={`font-black uppercase tracking-tighter leading-none ${isMain ? 'text-white text-sm' : 'text-emerald-200 text-[10px]'}`}>
          {node.kaqchikel}
        </span>
        {icon && <div className="mt-1.5 text-emerald-600/50 group-hover:text-emerald-400 transition-colors">{icon}</div>}
      </div>
      <span className={`mt-3 text-[8px] uppercase font-black tracking-[0.2em] text-center max-w-[100px] leading-tight ${isMain ? 'text-emerald-400' : 'text-emerald-900'}`}>
        {label}
      </span>
    </div>
  );
};

export default CholquijSection;

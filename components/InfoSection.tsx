
import React from 'react';
import { BookOpen, Star, AlertCircle, Sparkles } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 space-y-10 animate-in slide-in-from-bottom-4 duration-500 font-sans">
      
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-black text-emerald-100 uppercase tracking-widest font-lexend">Sabiduría Ancestral Descifrada</h2>
        <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-semibold uppercase tracking-wider text-sm font-lexend">
            <Star className="w-5 h-5" />
            El Ciclo Tzolk'in
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-normal">
            La rueda sagrada de 260 días es común a todas las civilizaciones mesoamericanas. Es el resultado de combinar 20 nombres de días con números del 1 al 13. Este ciclo se relaciona con la gestación humana y el ciclo del cultivo del maíz.
          </p>
          <div className="p-4 bg-[#151510] rounded-xl border border-emerald-900/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 uppercase font-lexend">
              <Sparkles className="w-3 h-3" />
              Los 13 Niveles
            </div>
            <p className="text-xs text-gray-500 italic font-normal">
              El número 13 representa los 13 niveles del <span className="text-emerald-400 font-semibold">Supramundo (Oshlahuntiku)</span>, la residencia de los dioses mayas. Cada número refleja una etapa específica de crecimiento y energía espiritual.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-semibold uppercase tracking-wider text-sm font-lexend">
            <BookOpen className="w-5 h-5" />
            El Ciclo Haab'
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-normal">
            El calendario solar de 365 días. Consta de 18 meses de 20 días cada uno, más un periodo final de 5 días "sin nombre" llamado <span className="text-red-400 font-black font-lexend uppercase">Wayeb'</span>, que se consideraban peligrosos o infortunados.
          </p>
        </section>

        <section className="space-y-4 col-span-1 md:col-span-2 bg-[#151510] p-6 rounded-2xl border border-emerald-900/20">
          <div className="flex items-center gap-3 text-emerald-400 font-semibold uppercase tracking-wider text-sm font-lexend">
            <AlertCircle className="w-5 h-5" />
            La Cuenta Larga
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 font-normal">
            Utilizada para registrar la historia a través de vastos periodos de tiempo, la Cuenta Larga comienza en el día mítico de la creación: 11 de agosto de 3114 A.C. (0.0.0.0.0).
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[10px] uppercase font-semibold tracking-tighter font-lexend">
            <li className="flex flex-col gap-1 p-2 bg-emerald-900/10 rounded border border-emerald-900/30">
              <span className="text-emerald-500">K'in</span>
              <span className="text-white">1 Día</span>
            </li>
            <li className="flex flex-col gap-1 p-2 bg-emerald-900/10 rounded border border-emerald-900/30">
              <span className="text-emerald-500">Uinal</span>
              <span className="text-white">20 K'ins</span>
            </li>
            <li className="flex flex-col gap-1 p-2 bg-emerald-900/10 rounded border border-emerald-900/30">
              <span className="text-emerald-500">Tun</span>
              <span className="text-white">18 Uinals (360 días)</span>
            </li>
            <li className="flex flex-col gap-1 p-2 bg-emerald-900/10 rounded border border-emerald-900/30">
              <span className="text-emerald-500">K'atun</span>
              <span className="text-white">20 Tuns (7,200 días)</span>
            </li>
            <li className="flex flex-col gap-1 p-2 bg-emerald-900/10 rounded border border-emerald-900/30">
              <span className="text-emerald-500">B'ak'tun</span>
              <span className="text-white">20 K'atuns (144,000 días)</span>
            </li>
          </ul>
        </section>
      </div>

    </div>
  );
};

export default InfoSection;

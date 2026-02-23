
import React from 'react';
import { Lightbulb, CheckCircle2, AlertCircle, BookOpen, Star, Sparkles, Map, Mountain, Target } from 'lucide-react';

const RecommendationsSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="space-y-4 font-lexend">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            Knowledge Audit & Recommendations
          </h2>
          <p className="text-sm text-emerald-700 font-semibold uppercase tracking-tighter">Evaluation of the Mayan Wisdom Database</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Assets */}
        <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-emerald-900/20 space-y-6">
          <h3 className="text-lg font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3 font-lexend">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Capacidades Actuales
          </h3>
          <ul className="space-y-4 font-sans text-sm text-gray-400">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className="text-emerald-200">Correlación GMT 584,283:</strong> Implementación técnica robusta para sincronización histórica.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className="text-emerald-200">Ciclos de Rueda Calendárica:</strong> Tzolk'in, Haab' y Señores de la Noche completamente funcionales.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className="text-emerald-200">Arquitectura de Cruz Maya:</strong> Cálculo geométrico de puntos de engendración y destino.</span>
            </li>
          </ul>
        </div>

        {/* Missing Knowledge */}
        <div className="bg-[#2a2a24] stone-texture rounded-3xl p-8 border border-amber-900/20 space-y-6">
          <h3 className="text-lg font-black text-amber-200 uppercase tracking-widest flex items-center gap-3 font-lexend">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Vacíos de Conocimiento
          </h3>
          <p className="text-xs text-amber-700/60 font-semibold uppercase font-lexend">Para una autoridad total, se recomienda añadir:</p>
          <ul className="space-y-4 font-sans text-sm text-gray-400">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong className="text-amber-200">Cargadores del Año (Year Bearers):</strong> La energía que gobierna el año solar completo (4 posibles Nawales).</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong className="text-amber-200">Regentes de Trecena:</strong> Deidades específicas que custodian cada periodo de 13 días.</span>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong className="text-amber-200">Ciclos de Venus:</strong> El calendario de guerra y ritual regido por Kukulcán.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recommended Knowledge Paths */}
      <section className="bg-[#151510] border border-emerald-900/30 rounded-[2.5rem] p-10 space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] font-lexend">Propuesta de Expansión de Base de Datos</h3>
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest font-lexend">Estrategia para convertir el oráculo en una enciclopedia viva</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="p-4 bg-emerald-900/20 rounded-2xl border border-emerald-500/20 w-fit">
              <Map className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="text-emerald-100 font-black uppercase text-xs tracking-widest font-lexend">Variaciones Regionales</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              La base de datos debería incluir los nombres y significados en <span className="text-emerald-600 font-bold">Yucateco, Quiché, Kaqchikel y Mam</span>. Esto permitiría a los usuarios ver cómo la sabiduría cambia según la geografía.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 rounded-2xl border border-purple-500/20 w-fit">
              <Mountain className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-purple-100 font-black uppercase text-xs tracking-widest font-lexend">Astronomía Sagrada</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Integrar datos sobre los <span className="text-purple-600 font-bold">solsticios, equinoccios y cenit solares</span> locales. El calendario maya no es solo números; es un reflejo de la posición de los astros en Centroamérica.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-amber-900/20 rounded-2xl border border-amber-500/20 w-fit">
              <Target className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-amber-100 font-black uppercase text-xs tracking-widest font-lexend">Práctica Ritual</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Añadir una sección de <span className="text-amber-600 font-bold">Ofrendas Específicas</span>. Qué velas, inciensos (pom) o flores se utilizan tradicionalmente para cada Nawal y cada Trecena.
            </p>
          </div>
        </div>

        <div className="p-8 bg-emerald-900/10 rounded-3xl border border-emerald-500/10">
          <h4 className="text-emerald-400 font-black uppercase text-sm mb-4 font-lexend flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Revisión de síntesis final
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed font-normal font-sans italic">
            "Para que esta aplicación sea una verdadera herramienta de autoconocimiento, la base de datos debe trascender la aritmética. Se debe proveer información sobre el <span className="text-emerald-100 font-semibold">propósito de vida</span> derivado de la combinación del número de trecena con el Nawal, y cómo las energías de 'los brazos' de la cruz interactúan dinámicamente según la madurez espiritual del individuo."
          </p>
        </div>
      </section>

      <div className="flex justify-center">
         <button className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-xl shadow-emerald-900/40 text-xs font-black uppercase tracking-widest font-lexend">
           <BookOpen className="w-4 h-4" />
           Solicitar Manual de Implementación Completo
         </button>
      </div>
    </div>
  );
};

export default RecommendationsSection;

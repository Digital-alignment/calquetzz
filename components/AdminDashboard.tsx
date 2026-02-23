
import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  BarChart3, 
  Bell, 
  Database, 
  Gem, 
  Briefcase, 
  BookOpen, 
  Mail, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  ShieldCheck,
  Instagram,
  Twitter,
  ExternalLink,
  ChevronRight,
  Upload,
  UserPlus,
  Download,
  FileSpreadsheet,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Cpu,
  Fingerprint,
  Info,
  Sparkles,
  Layers,
  Search,
  Zap
} from 'lucide-react';
import { AdminSubTab } from '../App';
import { TZOLKIN_NAMES, TZOLKIN_DAY_DETAILS, BLOG_POSTS } from '../constants';

interface AdminDashboardProps {
  subTab: AdminSubTab;
  onNavigateSubTab: (sub: AdminSubTab) => void;
}

// Exactly 29 fields for standard CSV integration as requested
const MASTER_CSV_HEADER = "registryId,nombreKaqchikel,significadoEtimologico,posicionOrdinal,glifoSVG,descripcionTrazos,simbolismoFilosofico,rumbo,elemento,colorPrimario,coloresOfrenda,piedraEnergia,animalProtector,atributosTotem,lugaresSagrados,anatomiaRegida,perfilPsicologico,virtudes,desafios,misionVida,vocaciones,significadoDia,peticiones,invocacionKaqchikel,invocacionEspañol,engendracion,destino,brazoDerecho,brazoIzquierdo,interaccionNumerales";

const AdminDashboard: React.FC<AdminDashboardProps> = ({ subTab, onNavigateSubTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans pb-20">
      <header className="space-y-4 font-lexend">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-amber-400 uppercase tracking-widest flex items-center gap-3">
              <ShieldAlert className="w-6 h-6" />
              Consola de Administración
            </h2>
            <p className="text-sm text-amber-700/60 font-semibold uppercase tracking-tighter">
              {subTab === 'stats' && 'Panel de Control y Métricas'}
              {subTab === 'nahuales' && 'Gestión de Sabiduría Ancestral (29 Campos)'}
              {subTab === 'proyectos' && 'Administración de Visiones'}
              {subTab === 'saberes' && 'Curaduría de Contenidos'}
              {subTab === 'users' && 'Control de Acceso'}
              {subTab === 'contacto' && 'Configuración de Canales'}
            </p>
          </div>
          
          <div className="flex gap-2">
             <button className="p-3 bg-[#2a2a24] rounded-xl border border-amber-900/20 text-amber-400 hover:bg-amber-500 hover:text-white transition-all">
                <Bell className="w-5 h-5" />
             </button>
             <button className="p-3 bg-[#2a2a24] rounded-xl border border-amber-900/20 text-amber-400 hover:bg-amber-500 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {subTab === 'stats' && <StatsView />}
      {subTab === 'nahuales' && <NahualesView />}
      {subTab === 'proyectos' && <ProyectosView />}
      {subTab === 'saberes' && <SaberesView />}
      {subTab === 'users' && <UsersView />}
      {subTab === 'contacto' && <ContactoView />}
    </div>
  );
};

const NahualesView = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('id');
  const csvInputRef = useRef<HTMLInputElement>(null);

  const downloadRecommendation = () => {
    const recommendation = {
      format: "JSON-LD / RAG-Ready Markdown",
      version: "2.1",
      structure: {
        root: "NahualRegistry",
        uniqueKey: "registryId",
        schema: [
          "Identidad (Kaqchikel focus)",
          "Simbolismo (Iconographic geometry)",
          "Correspondencias (Astrological alignments)",
          "Naturaleza (Totemic connections)",
          "Perfil Psicológico (Behavioral patterns)",
          "Espiritualidad (Invocation metadata)",
          "Geometría Sagrada (Mayan Cross nodes)",
          "Dinámica Numeral (Scalar interactions)"
        ],
        ai_instructions: "Use these fields as unique context nodes. For RAG, vectorize the 'PerfilPsicologico' and 'SimbolismoFilosofico' fields primarily to answer abstract queries about human nature and cosmic law."
      }
    };
    const blob = new Blob([JSON.stringify(recommendation, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Recomendacion_Estructura_DB_Nahuales.json';
    a.click();
  };

  const downloadCSVTemplate = () => {
    const exampleRow = "NAH-11,B'atz',El Hilo del Tiempo,11,<svg>...</svg>,Lineas de tejido...,El inicio de todo,Este,Aire,Rojo,\"Rojo,Blanco\",Jade,Mono,Creador,Cumbres,Manos,Creativo,\"Arte,Juego\",\"Orgullo,Distraccion\",Tejer comunidad,\"Artista,Guia\",Dia del tiempo,Pedir por la creacion,K'am b'atz...,Senor del hilo...,Nah-Concepcion,Nah-Destino,Brazo-M,Brazo-E,Interaccion con el 13";
    const blob = new Blob([`${MASTER_CSV_HEADER}\n${exampleRow}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_maestra_29campos.csv';
    a.click();
  };

  return (
    <div className="space-y-10">
      {/* Action Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-[#2a2a24] stone-texture p-8 rounded-[2.5rem] border border-amber-900/10 shadow-2xl">
         <div className="space-y-1">
            <h3 className="text-xl font-black text-amber-400 uppercase tracking-widest font-lexend flex items-center gap-3">
              <Database className="w-6 h-6" />
              Base de Conocimiento Nahual
            </h3>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Sincronización masiva de los 29 campos de sabiduría</p>
         </div>
         <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <button 
              onClick={downloadRecommendation}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-purple-900/20 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-900/30 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <Cpu className="w-4 h-4" /> Estructura AI
            </button>
            <button 
              onClick={downloadCSVTemplate}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-[#151510] hover:bg-amber-900/10 border border-amber-900/30 text-amber-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              <Download className="w-4 h-4" /> Plantilla CSV
            </button>
            <button 
              onClick={() => csvInputRef.current?.click()}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-amber-900/40"
            >
              <FileSpreadsheet className="w-4 h-4" /> Cargar Saberes
            </button>
            <input type="file" ref={csvInputRef} className="hidden" accept=".csv" />
         </div>
      </div>

      {/* Nahuales Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TZOLKIN_NAMES.map((name, index) => {
          const detail = TZOLKIN_DAY_DETAILS[name];
          const isCurrentEditing = editing === name;
          const registryId = `NAH-${(index + 1).toString().padStart(2, '0')}`;

          return (
            <div 
              key={name} 
              className={`bg-[#2a2a24] stone-texture rounded-[2.5rem] border transition-all duration-500 overflow-hidden group ${
                isCurrentEditing 
                  ? 'border-amber-500 ring-4 ring-amber-500/10 col-span-full shadow-[0_0_100px_rgba(245,158,11,0.1)]' 
                  : 'border-amber-900/10 hover:border-amber-500/30 shadow-xl'
              }`}
            >
              {/* Card Header Section */}
              <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-amber-900/10 bg-gradient-to-r from-amber-900/5 to-transparent">
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center border-2 transition-all shadow-inner ${
                    isCurrentEditing ? 'bg-amber-600 border-amber-400 rotate-3' : 'bg-amber-900/20 border-amber-500/20'
                  }`}>
                    <Gem className={`w-10 h-10 ${isCurrentEditing ? 'text-white' : 'text-amber-400'}`} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-3 justify-center sm:justify-start mb-1">
                      <span className="text-[10px] font-black text-amber-500 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1.5">
                        <Fingerprint className="w-3 h-3" />
                        {registryId}
                      </span>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter font-lexend">{name}</h4>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="text-xs text-amber-700 font-black uppercase tracking-[0.2em]">{detail.kaqchikel}</span>
                      <div className="w-1.5 h-1.5 bg-amber-900/30 rounded-full"></div>
                      <span className="text-[10px] text-gray-500 italic">Nahual de {detail.symbol}</span>
                    </div>
                  </div>
                </div>
                
                {!isCurrentEditing ? (
                  <button 
                    onClick={() => setEditing(name)}
                    className="w-full sm:w-auto px-10 py-4 bg-amber-900/10 hover:bg-amber-600 text-amber-600 hover:text-white rounded-2xl border border-amber-900/20 transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"
                  >
                    <Edit3 className="w-4 h-4" /> Administrar
                  </button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20">
                      <Save className="w-4 h-4" /> Consolidar
                    </button>
                    <button 
                      onClick={() => setEditing(null)}
                      className="p-4 bg-red-900/10 hover:bg-red-600 text-red-600 hover:text-white rounded-2xl border border-red-900/20 transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Content Area */}
              <div className={`grid ${isCurrentEditing ? 'grid-cols-1 xl:grid-cols-12' : 'grid-cols-1'} gap-10 p-10`}>
                {/* Visual Frame - Reduced Size Section */}
                <div className={`${isCurrentEditing ? 'xl:col-span-3' : 'w-full'} space-y-8 flex flex-col items-center xl:items-start`}>
                   <div className="space-y-4 w-full flex flex-col items-center xl:items-start">
                      <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest ml-2 flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" /> Ilustración (Dibujo)
                      </label>
                      <div className="w-40 h-40 bg-[#151510] border-2 border-dashed border-amber-900/30 rounded-[2rem] flex flex-col items-center justify-center text-amber-900/20 hover:text-amber-500 hover:border-amber-500/50 transition-all cursor-pointer relative group/img overflow-hidden shadow-inner">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                            <Upload className="w-6 h-6 text-white animate-bounce" />
                            <span className="text-[8px] font-black text-white uppercase tracking-widest leading-tight">Reemplazar Imagen</span>
                         </div>
                         <ImageIcon className="w-10 h-10 mb-2 opacity-30 group-hover/img:scale-110 transition-transform" />
                         <span className="text-[7px] font-black uppercase tracking-[0.2em] max-w-[100px] text-center opacity-40">Arte Digital 1024px</span>
                         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                      </div>
                   </div>

                   <div className="p-6 bg-amber-900/5 rounded-[2rem] border border-amber-900/10 space-y-5 w-full max-w-[280px]">
                      <h5 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-3 border-b border-amber-900/10 pb-4">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Auditoría
                      </h5>
                      <div className="space-y-3">
                         <RegistryStatus label="Identidad" complete={true} />
                         <RegistryStatus label="Iconografía" complete={true} />
                         <RegistryStatus label="Psicología" complete={false} />
                         <RegistryStatus label="Invocaciones" complete={false} />
                         <RegistryStatus label="Geometría" complete={true} />
                      </div>
                   </div>
                </div>

                {/* All 29 Fields grouped for AI/DB Integration */}
                {isCurrentEditing && (
                  <div className="xl:col-span-9 space-y-6">
                    <div className="bg-[#151510] rounded-[3rem] border border-amber-900/20 overflow-hidden shadow-2xl">
                      
                      <RegistryAccordion 
                        id="identidad"
                        icon={<Database className="w-4 h-4" />}
                        label="1. Identidad Kaqchikel"
                        active={activeAccordion === 'id'}
                        onToggle={() => setActiveAccordion('id')}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                           <RegistryField label="Unique Registry ID" value={registryId} readOnly icon={<Fingerprint className="w-3 h-3"/>} />
                           <RegistryField label="Nombre Kaqchikel" value={detail.kaqchikel} />
                           <RegistryField label="Significado Etimológico" value={detail.meaning} />
                           <RegistryField label="Posición Ordinal (1-20)" value={index + 1} type="number" />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="iconografia"
                        icon={<ImageIcon className="w-4 h-4" />}
                        label="2. Iconografía Sagrada"
                        active={activeAccordion === 'icon'}
                        onToggle={() => setActiveAccordion('icon')}
                      >
                        <div className="space-y-6 p-8">
                           <RegistryField label="Glifo (SVG Vector/Code)" type="textarea" value={detail.glyph.glifo} />
                           <RegistryField label="Descripción Técnica de Trazos" type="textarea" value={detail.glyph.trazos} />
                           <RegistryField label="Simbolismo Filosófico" type="textarea" value={detail.glyph.simbolismo} />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="correspondencias"
                        icon={<Layers className="w-4 h-4" />}
                        label="3. Correspondencias Cholq'ij"
                        active={activeAccordion === 'corr'}
                        onToggle={() => setActiveAccordion('corr')}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                           <RegistryField label="Rumbo / Punto Cardinal" placeholder="Ej: Este (Rojo)" />
                           <RegistryField label="Elemento Regente" placeholder="Ej: Fuego" />
                           <RegistryField label="Color Primario" placeholder="Ej: Rojo" />
                           <RegistryField label="Piedra de Energía" placeholder="Ej: Cuarzo Ahumado" />
                           <RegistryField label="Colores de Ofrenda (Lista)" placeholder="Ej: Rojo, Blanco, Negro" className="md:col-span-2" />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="naturaleza"
                        icon={<Zap className="w-4 h-4" />}
                        label="4. Naturaleza y Tótem"
                        active={activeAccordion === 'nat'}
                        onToggle={() => setActiveAccordion('nat')}
                      >
                        <div className="space-y-6 p-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <RegistryField label="Animal Protector (Tótem)" value={detail.symbol} />
                              <RegistryField label="Anatomía Regida" placeholder="Ej: Manos, Huesos" />
                           </div>
                           <RegistryField label="Atributos del Tótem" type="textarea" />
                           <RegistryField label="Lugares Sagrados de Conexión" placeholder="Ej: Ríos, Cuevas, Cumbres" />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="perfil"
                        icon={<Users className="w-4 h-4" />}
                        label="5. Perfil Energético"
                        active={activeAccordion === 'perf'}
                        onToggle={() => setActiveAccordion('perf')}
                      >
                        <div className="space-y-6 p-8">
                           <RegistryField label="Perfil Psicológico y Conductual" type="textarea" />
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <RegistryField label="Virtudes Espirituales (Luz)" />
                              <RegistryField label="Desafíos de Sombra" />
                           </div>
                           <RegistryField label="Misión de Vida Trascendental" type="textarea" />
                           <RegistryField label="Vocaciones Sugeridas" />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="espiritualidad"
                        icon={<Sparkles className="w-4 h-4" />}
                        label="6. Espiritualidad del Día"
                        active={activeAccordion === 'esp'}
                        onToggle={() => setActiveAccordion('esp')}
                      >
                        <div className="space-y-6 p-8">
                           <RegistryField label="Significado Colectivo del Día" type="textarea" />
                           <RegistryField label="Peticiones Específicas al Altar" type="textarea" />
                           <RegistryField label="Invocación Kaqchikel" type="textarea" />
                           <RegistryField label="Invocación Español" type="textarea" />
                        </div>
                      </RegistryAccordion>

                      <RegistryAccordion 
                        id="geometria"
                        icon={<ShieldCheck className="w-4 h-4" />}
                        label="7. Geometría Cruz Maya & Dinámica"
                        active={activeAccordion === 'geo'}
                        onToggle={() => setActiveAccordion('geo')}
                      >
                        <div className="space-y-6 p-8">
                           <div className="grid grid-cols-2 gap-4">
                              <RegistryField label="Nahual Engendración" placeholder="Nahual Name" />
                              <RegistryField label="Nahual Destino" placeholder="Nahual Name" />
                              <RegistryField label="Brazo Material" placeholder="Nahual Name" />
                              <RegistryField label="Brazo Espiritual" placeholder="Nahual Name" />
                           </div>
                           <RegistryField label="Dinámica Numeral (Relación 1-13)" type="textarea" />
                        </div>
                      </RegistryAccordion>

                    </div>

                    <div className="flex items-center gap-5 bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-500/20 shadow-inner">
                       <Cpu className="w-10 h-10 text-amber-500 shrink-0" />
                       <div className="space-y-1">
                          <p className="text-[11px] text-amber-200 font-black uppercase tracking-widest">Alineación Semántica AI</p>
                          <p className="text-xs text-amber-700 leading-relaxed font-normal italic">
                            Esta estructura de 29 campos permite una integración perfecta con futuros motores de búsqueda neuronal (RAG), vinculando terminología técnica Kaqchikel con significados espirituales profundos.
                          </p>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// UI Components
const RegistryStatus = ({ label, complete }: { label: string; complete: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    {complete ? (
      <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[8px] uppercase">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        Sync
      </div>
    ) : (
      <div className="flex items-center gap-1.5 text-amber-900/50 font-black text-[8px] uppercase">
        <div className="w-2 h-2 rounded-full bg-amber-900/30"></div>
        Pendiente
      </div>
    )}
  </div>
);

const RegistryAccordion = ({ id, icon, label, active, onToggle, children }: any) => (
  <div className={`border-b border-amber-900/10 last:border-0 transition-colors ${active ? 'bg-amber-900/5' : ''}`}>
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-8 group transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-900/20 text-amber-700 group-hover:text-amber-500'}`}>
          {icon}
        </div>
        <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${active ? 'text-amber-400' : 'text-amber-800 group-hover:text-amber-600'}`}>
          {label}
        </span>
      </div>
      <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${active ? 'rotate-180 text-amber-400' : 'text-amber-900'}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
       <div className="border-t border-amber-900/5">
         {children}
       </div>
    </div>
  </div>
);

const RegistryField = ({ label, value, type = 'text', placeholder, readOnly = false, icon, className = "" }: any) => (
  <div className={`space-y-2 text-left ${className}`}>
    <label className="text-[9px] font-black text-amber-900/50 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
      {icon}
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea 
        defaultValue={value}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-[#0d0d0a] border border-amber-900/30 rounded-2xl px-6 py-5 text-xs text-amber-100 focus:outline-none focus:border-amber-500 transition-all font-semibold resize-none scrollbar-hide shadow-inner"
      />
    ) : (
      <input 
        type={type}
        readOnly={readOnly}
        defaultValue={value}
        placeholder={placeholder}
        className={`w-full bg-[#0d0d0a] border border-amber-900/30 rounded-2xl px-6 py-5 text-xs text-amber-100 focus:outline-none focus:border-amber-500 transition-all font-semibold shadow-inner ${readOnly ? 'opacity-50 cursor-not-allowed bg-amber-900/5' : ''}`}
      />
    )}
  </div>
);

// StatCard and View helpers...
const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-[#2a2a24] stone-texture rounded-3xl p-6 border border-amber-900/10 flex items-center gap-6">
    <div className={`p-4 bg-[#151510] rounded-2xl border border-amber-900/20 ${color}`}>{icon}</div>
    <div>
      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest font-lexend">{label}</div>
      <div className="text-2xl font-black text-white font-lexend">{value}</div>
    </div>
  </div>
);

const StatsView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<Users className="w-5 h-5" />} label="Total Usuarios" value="1,284" color="text-sky-400" />
      <StatCard icon={<BarChart3 className="w-5 h-5" />} label="Consultas Hoy" value="342" color="text-emerald-400" />
      <StatCard icon={<Gem className="w-5 h-5" />} label="Registros Nahual" value="20/20" color="text-amber-400" />
      <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Uptime Cosmos" value="100%" color="text-emerald-500" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-10 border border-amber-900/10 min-h-[350px] flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-24 h-24 bg-amber-900/10 rounded-full flex items-center justify-center border border-amber-500/10">
            <BarChart3 className="w-12 h-12 text-amber-500/40" />
          </div>
          <div className="space-y-2">
             <h3 className="text-white font-black uppercase tracking-widest font-lexend">Flujo del Tiempo</h3>
             <p className="text-gray-500 text-xs max-w-xs mx-auto">Estado de la sincronización de la API temporal.</p>
          </div>
       </div>
       <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-10 border border-amber-900/10 min-h-[350px] flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-24 h-24 bg-purple-900/10 rounded-full flex items-center justify-center border border-purple-500/10">
            <Cpu className="w-12 h-12 text-purple-500/40" />
          </div>
          <div className="space-y-2">
             <h3 className="text-white font-black uppercase tracking-widest font-lexend">Madurez Semántica</h3>
             <p className="text-gray-500 text-xs max-w-xs mx-auto">Capacidad de respuesta para motores de inteligencia artificial.</p>
          </div>
       </div>
    </div>
  </div>
);

const ProyectosView = () => (
  <div className="space-y-8">
    <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-10 border border-amber-900/20">
      <h3 className="text-xl font-black text-white uppercase tracking-widest font-lexend mb-8 flex items-center gap-3">
        <Briefcase className="w-6 h-6 text-amber-500" /> Iniciar Nueva Visión
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <AdminInput label="Nombre de la Misión" placeholder="Ej: Digitalización Estelas Tikal" />
          <AdminTextArea label="Propósito Espiritual" placeholder="¿Cómo resuena este proyecto con el cosmos?..." />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="aspect-video bg-[#151510] border-2 border-dashed border-amber-900/30 rounded-[2.5rem] flex flex-col items-center justify-center text-amber-900/30 hover:text-amber-500 hover:border-amber-500/50 transition-all cursor-pointer">
             <Upload className="w-10 h-10 mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest">Subir Imagen Clave</span>
          </div>
          <button className="w-full py-6 bg-amber-600 hover:bg-emerald-500 text-white rounded-[1.8rem] font-black uppercase tracking-widest font-lexend shadow-xl shadow-amber-900/40">
             Activar Proyecto
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SaberesView = () => (
  <div className="space-y-8">
     <div className="flex justify-between items-center px-4">
         <h3 className="text-xs font-black text-amber-900 uppercase tracking-widest font-lexend">Artículos de Sabiduría</h3>
         <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest font-lexend">
           <Plus className="w-4 h-4" /> Crear Artículo
         </button>
      </div>
      <div className="space-y-4">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-[#2a2a24] stone-texture rounded-3xl p-6 border border-amber-900/10 flex items-center justify-between group hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-amber-900/20 rounded-2xl border border-amber-500/10">
                 <BookOpen className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tight font-lexend">{post.title}</h4>
                <span className="text-[9px] font-black uppercase text-amber-800 tracking-widest">{post.category}</span>
              </div>
            </div>
            <div className="flex gap-2">
               <button className="p-3 bg-amber-900/10 hover:bg-amber-900/30 rounded-xl text-amber-600"><Edit3 className="w-4 h-4" /></button>
               <button className="p-3 bg-red-900/10 hover:bg-red-900/30 rounded-xl text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
  </div>
);

const UsersView = () => (
  <div className="space-y-8">
    <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] overflow-hidden border border-amber-900/10 shadow-2xl">
       <table className="w-full text-left border-collapse">
         <thead>
           <tr className="bg-amber-900/10 border-b border-amber-900/20">
             <th className="px-8 py-6 text-[10px] font-black text-amber-600 uppercase tracking-widest">Identidad</th>
             <th className="px-8 py-6 text-[10px] font-black text-amber-600 uppercase tracking-widest">Privilegios</th>
             <th className="px-8 py-6 text-[10px] font-black text-amber-600 uppercase tracking-widest">Acciones</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-amber-900/5">
           {[
             { name: 'Admin Root', email: 'admin@maya.art', role: 'Super Administrador', color: 'text-amber-500' },
             { name: 'Ajq’ij Editor', email: 'guia@maya.art', role: 'Guía Espiritual', color: 'text-emerald-500' },
           ].map((user, i) => (
             <tr key={i} className="hover:bg-amber-900/5 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-900/20 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-xs font-lexend">{user.name.charAt(0)}</div>
                    <div>
                      <span className="font-black text-white text-sm font-lexend block">{user.name}</span>
                      <span className="text-[10px] text-gray-600 font-mono italic">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-current ${user.color}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-2">
                    <button className="p-3 text-gray-500 hover:text-amber-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-3 text-gray-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
             </tr>
           ))}
         </tbody>
       </table>
    </div>
  </div>
);

const ContactoView = () => (
  <div className="space-y-8">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-10 border border-amber-900/20 space-y-10">
           <h3 className="text-xl font-black text-white uppercase tracking-widest font-lexend flex items-center gap-4">
             <Mail className="w-7 h-7 text-amber-500" /> Enlaces de Alineación
           </h3>
           <div className="space-y-6">
              <AdminInputWithIcon icon={<Mail className="w-4 h-4" />} label="Email Principal" value="info@oraculomaya.art" />
              <AdminInputWithIcon icon={<Twitter className="w-4 h-4" />} label="Canal X (Twitter)" value="https://x.com/quetzal" />
              <AdminInputWithIcon icon={<Instagram className="w-4 h-4" />} label="Instagram" value="https://instagram.com/quetzal" />
           </div>
           <button className="w-full py-6 bg-amber-600 hover:bg-amber-500 text-white rounded-[1.8rem] font-black uppercase tracking-widest font-lexend shadow-xl shadow-amber-900/40">
             Sincronizar Canales
           </button>
        </div>
        <div className="bg-[#151510] rounded-[2.5rem] p-10 border border-amber-900/10 border-dashed flex flex-col items-center justify-center text-center space-y-8">
           <div className="p-8 bg-amber-900/10 rounded-full">
              <ExternalLink className="w-14 h-14 text-amber-500/30" />
           </div>
           <h4 className="text-white font-black uppercase tracking-widest font-lexend text-lg">Previsualización de Canales</h4>
           <p className="text-sm text-gray-500 italic max-w-xs mx-auto leading-relaxed">Este módulo sincroniza automáticamente los datos de contacto en todo el portal público.</p>
        </div>
     </div>
  </div>
);

// Helpers
const AdminInput = ({ label, placeholder, value }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest font-lexend ml-1">{label}</label>
    <input type="text" defaultValue={value} placeholder={placeholder} className="w-full bg-[#151510] border border-amber-900/50 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-semibold" />
  </div>
);

const AdminTextArea = ({ label, placeholder }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest font-lexend ml-1">{label}</label>
    <textarea rows={6} placeholder={placeholder} className="w-full bg-[#151510] border border-amber-900/50 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-semibold resize-none" />
  </div>
);

const AdminInputWithIcon = ({ icon, label, value }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest font-lexend ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-amber-800">{icon}</div>
      <input type="text" defaultValue={value} className="w-full bg-[#151510] border border-amber-900/50 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-semibold" />
    </div>
  </div>
);

export default AdminDashboard;

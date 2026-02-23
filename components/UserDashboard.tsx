
import React, { useState } from 'react';
import { LayoutDashboard, Star, Calendar, Bookmark, History, Sparkles, Plus, X, Trash2, Eye, User, Save, Landmark } from 'lucide-react';
import { SavedProfile, MayanDate } from '../types';
import { gregorianToJDN, jdnToMayan } from '../mayanLogic';

interface UserDashboardProps {
  profiles: SavedProfile[];
  onAddProfile: (profile: SavedProfile) => void;
  onDeleteProfile: (id: string) => void;
  onSelectProfile: (profile: SavedProfile) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ profiles, onAddProfile, onDeleteProfile, onSelectProfile }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [birthDate, setBirthDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    isBCE: false
  });

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const jdn = gregorianToJDN(birthDate.day, birthDate.month, birthDate.year, birthDate.isBCE);
    const mDate = jdnToMayan(jdn);

    const newProfile: SavedProfile = {
      id: crypto.randomUUID(),
      name: newName,
      day: birthDate.day,
      month: birthDate.month,
      year: birthDate.year,
      isBCE: birthDate.isBCE,
      mayanDate: mDate
    };

    onAddProfile(newProfile);
    setIsAdding(false);
    setNewName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="space-y-4 font-lexend">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-emerald-100 uppercase tracking-widest flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-emerald-500" />
              Mi Santuario
            </h2>
            <p className="text-sm text-emerald-700 font-semibold uppercase tracking-tighter">Gestiona tus lecturas y personas queridas</p>
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-xl shadow-emerald-900/40 font-black uppercase tracking-widest font-lexend"
          >
            {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAdding ? 'Cancelar' : 'Agregar Persona'}
          </button>
        </div>
      </header>

      {isAdding && (
        <section className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-500/30 shadow-2xl animate-in zoom-in-95 duration-300">
           <form onSubmit={handleQuickAdd} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">Nombre de la Persona</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-emerald-800" />
                  </div>
                  <input 
                    required
                    autoFocus
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-semibold"
                    placeholder="Ej: Sofía"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Día', field: 'day' as const },
                  { label: 'Mes', field: 'month' as const },
                  { label: 'Año', field: 'year' as const },
                ].map((item) => (
                  <div key={item.field} className="space-y-2">
                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest font-lexend ml-1">{item.label}</label>
                    <input 
                      required
                      type="number"
                      value={birthDate[item.field]}
                      onChange={(e) => setBirthDate(prev => ({ ...prev, [item.field]: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-[#151510] border border-emerald-900/50 rounded-2xl px-4 py-4 text-emerald-100 focus:outline-none text-center font-mono"
                    />
                  </div>
                ))}
              </div>

              <div 
                onClick={() => setBirthDate(prev => ({ ...prev, isBCE: !prev.isBCE }))}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${birthDate.isBCE ? 'bg-amber-900/10 border-amber-500/30' : 'bg-[#151510] border-emerald-900/20'}`}
              >
                <div className="flex items-center gap-3">
                   <Landmark className={`w-4 h-4 ${birthDate.isBCE ? 'text-amber-500' : 'text-emerald-800'}`} />
                   <span className="text-[10px] font-black uppercase tracking-widest font-lexend">Antes de Cristo (BCE)</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${birthDate.isBCE ? 'bg-amber-500' : 'bg-gray-800'}`}>
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${birthDate.isBCE ? 'left-6' : 'left-1'}`} />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-xl font-black uppercase tracking-widest font-lexend"
              >
                <Save className="w-5 h-5" />
                Guardar en mi Santuario
              </button>
           </form>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="text-xs font-black text-emerald-900 uppercase tracking-[0.3em] font-lexend">Tus Lecturas Guardadas</h3>
             <span className="text-[10px] text-emerald-900/50 font-bold uppercase">{profiles.length} perfiles</span>
          </div>

          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profiles.map((profile) => (
                <div 
                  key={profile.id}
                  className="bg-[#2a2a24] stone-texture rounded-[2rem] p-6 border border-emerald-900/10 hover:border-emerald-500/30 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-emerald-900/30 rounded-2xl border border-emerald-500/20">
                        <span className="text-lg font-black text-emerald-400 font-lexend">{profile.mayanDate.tzolkin.number}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteProfile(profile.id); }}
                        className="p-2 text-emerald-900 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-widest font-lexend">{profile.name}</h4>
                      <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-widest mt-1">
                        {profile.day}/{profile.month}/{profile.year} {profile.isBCE ? 'AC' : 'DC'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-emerald-900/10">
                       <div className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-1">Nawal de Nacimiento</div>
                       <div className="text-sm font-semibold text-emerald-100 uppercase tracking-tighter">
                          {profile.mayanDate.tzolkin.kaqchikel} ({profile.mayanDate.tzolkin.name})
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectProfile(profile)}
                    className="mt-6 flex items-center justify-center gap-2 py-3 bg-[#151510] hover:bg-emerald-900/40 text-emerald-600 hover:text-emerald-100 rounded-xl transition-all border border-emerald-900/30 text-[10px] font-black uppercase tracking-widest font-lexend"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Sabiduría Completa
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-12 border border-emerald-900/20 border-dashed text-center space-y-6 min-h-[300px] flex flex-col items-center justify-center">
              <div className="p-6 bg-emerald-900/10 rounded-full border border-emerald-500/10">
                 <Sparkles className="w-12 h-12 text-emerald-500/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-widest font-lexend">Santuario Vacío</h3>
                <p className="text-gray-500 max-w-md mx-auto">Aquí aparecerán los momentos del tiempo que has decidido atesorar para tu reflexión personal.</p>
              </div>
              <button 
                onClick={() => setIsAdding(true)}
                className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-400 underline underline-offset-8"
              >
                Comenzar con la primera persona
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <h3 className="text-xs font-black text-emerald-900 uppercase tracking-[0.3em] font-lexend px-4">Accesos Rápidos</h3>
           <div className="space-y-3">
             <DashAction icon={<Star className="w-4 h-4" />} label="Significado de Números" />
             <DashAction icon={<Calendar className="w-4 h-4" />} label="Próximos Wayeb'" />
             <DashAction icon={<Bookmark className="w-4 h-4" />} label="Trecenas Favoritas" />
             <DashAction icon={<History className="w-4 h-4" />} label="Historial de Búsqueda" />
           </div>
        </div>
      </div>
    </div>
  );
};

const DashAction: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="w-full flex items-center justify-between p-5 bg-[#2a2a24] stone-texture rounded-2xl border border-emerald-900/10 hover:border-emerald-500/40 transition-all group">
    <div className="flex items-center gap-4">
      <div className="text-emerald-700 group-hover:text-emerald-400 transition-colors">{icon}</div>
      <span className="text-sm font-semibold text-emerald-100 uppercase tracking-widest font-lexend">{label}</span>
    </div>
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-900 group-hover:bg-emerald-500 transition-colors"></div>
  </button>
);

export default UserDashboard;

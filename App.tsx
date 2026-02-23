
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  ArrowLeftRight, 
  Info, 
  Layers,
  Sparkles,
  LayoutGrid,
  ScrollText,
  BookOpen,
  Terminal,
  Github,
  Home,
  Mail,
  UserCircle,
  Menu,
  X,
  RefreshCw,
  Sun,
  Eye,
  PenTool,
  Gem,
  Briefcase,
  ChevronRight,
  ShieldAlert,
  Users
} from 'lucide-react';
import { 
  gregorianToJDN, 
  jdnToMayan, 
  jdnToGregorian, 
  longCountToJDN 
} from './mayanLogic';
import { 
  MayanDate, 
  ConversionDirection, 
  LongCount
} from './types';
import Calculator from './components/Calculator';
import ResultDisplay, { LecturaTab } from './components/ResultDisplay';
import InfoSection from './components/InfoSection';
import TrecenaSection from './components/TrecenaSection';
import CholquijSection from './components/CholquijSection';
import BlogSection from './components/BlogSection';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import { TZOLKIN_DAY_DETAILS, TZOLKIN_NAMES } from './constants';

type ActiveTab = 'home' | 'calculator' | 'nahuales' | 'saberes' | 'proyectos' | 'contacto' | 'admin-dash';
export type AdminSubTab = 'stats' | 'nahuales' | 'proyectos' | 'saberes' | 'users' | 'contacto';

const App: React.FC = () => {
  const [direction, setDirection] = useState<ConversionDirection>('GregorianToMayan');
  const [mayanResult, setMayanResult] = useState<MayanDate | null>(null);
  const [gregorianResult, setGregorianResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('stats');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeLecturaTab, setActiveLecturaTab] = useState<LecturaTab>('nawal');
  const [selectedNahual, setSelectedNahual] = useState<string | null>(null);

  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      
      if (hash.startsWith('adm/')) {
        const sub = hash.replace('adm/', '') as AdminSubTab;
        setActiveTab('admin-dash');
        setAdminSubTab(sub);
        return;
      }

      const validTabs: ActiveTab[] = ['home', 'calculator', 'nahuales', 'saberes', 'proyectos', 'contacto', 'admin-dash'];
      if (validTabs.includes(hash as ActiveTab)) {
        setActiveTab(hash as ActiveTab);
        if (hash === 'admin-dash') setAdminSubTab('stats');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    const today = new Date();
    const jdn = gregorianToJDN(today.getDate(), today.getMonth() + 1, today.getFullYear());
    setMayanResult(jdnToMayan(jdn));

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (tab: ActiveTab) => {
    window.location.hash = `#/${tab}`;
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (sub: AdminSubTab) => {
    window.location.hash = `#/adm/${sub}`;
    setActiveTab('admin-dash');
    setAdminSubTab(sub);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConvertFromGregorian = (d: number, m: number, y: number, bce: boolean) => {
    const jdn = gregorianToJDN(d, m, y, bce);
    const mDate = jdnToMayan(jdn);
    setMayanResult(mDate);
    setGregorianResult({ day: d, month: m, year: y, isBCE: bce });
    setIsCalculatorOpen(false);
    if (activeTab !== 'calculator') navigateTo('calculator');
  };

  const handleConvertFromMayan = (lc: LongCount) => {
    const jdn = longCountToJDN(lc);
    const mDate = jdnToMayan(jdn);
    const gDate = jdnToGregorian(jdn);
    setMayanResult(mDate);
    setGregorianResult(gDate);
    setIsCalculatorOpen(false);
    if (activeTab !== 'calculator') navigateTo('calculator');
  };

  const handleShiftDate = (days: number) => {
    if (mayanResult) {
      const nextJdn = mayanResult.jdn + days;
      const mDate = jdnToMayan(nextJdn);
      const gDate = jdnToGregorian(nextJdn);
      setMayanResult(mDate);
      setGregorianResult(gDate);
    }
  };

  const handleLecturaTabChange = (tab: LecturaTab) => {
    setActiveLecturaTab(tab);
    if (window.innerWidth < 1024 && contentAreaRef.current) {
      contentAreaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdminView = activeTab === 'admin-dash';

  return (
    <div className="min-h-screen bg-[#1a1a15] text-gray-200 selection:bg-emerald-900 selection:text-emerald-100 font-sans">
      <header className={`border-b stone-texture sticky top-0 z-50 transition-all duration-300 ${isAdminView ? 'bg-[#1b1b22] border-amber-900/30 ring-1 ring-amber-500/5' : 'bg-[#22221b] border-emerald-900/30'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className={`p-2 rounded-lg border shadow-inner group-hover:scale-110 transition-transform ${isAdminView ? 'bg-amber-900/40 border-amber-500/30' : 'bg-emerald-900/40 border-emerald-500/30'}`}>
              {isAdminView ? <ShieldAlert className="w-6 h-6 text-amber-400" /> : <Calendar className="w-6 h-6 text-emerald-400" />}
            </div>
            <div>
              <h1 className={`text-xl font-black tracking-widest uppercase font-lexend hidden sm:block ${isAdminView ? 'text-amber-100' : 'text-emerald-100'}`}>
                {isAdminView ? 'Admin Panel' : 'Oráculo Maya'}
              </h1>
              {isAdminView && <span className="text-[9px] font-black uppercase text-amber-500/60 tracking-[0.4em] hidden sm:block">Control de Sabiduría</span>}
            </div>
          </div>
          
          <nav className="hidden xl:flex items-center gap-1">
            {!isAdminView ? (
              <>
                <TabButton active={activeTab === 'home'} onClick={() => navigateTo('home')} icon={<Home className="w-4 h-4" />} label="Inicio" />
                <TabButton active={activeTab === 'calculator'} onClick={() => navigateTo('calculator')} icon={<LayoutGrid className="w-4 h-4" />} label="Calcular tiempo" />
                <TabButton active={activeTab === 'nahuales'} onClick={() => navigateTo('nahuales')} icon={<Gem className="w-4 h-4" />} label="Nahuales" />
                <TabButton active={activeTab === 'saberes'} onClick={() => navigateTo('saberes')} icon={<BookOpen className="w-4 h-4" />} label="Saberes" />
                <TabButton active={activeTab === 'proyectos'} onClick={() => navigateTo('proyectos')} icon={<Briefcase className="w-4 h-4" />} label="Proyectos" />
                <TabButton active={activeTab === 'contacto'} onClick={() => navigateTo('contacto')} icon={<Mail className="w-4 h-4" />} label="Contacto" />
              </>
            ) : (
              <>
                <TabButton active={adminSubTab === 'stats'} onClick={() => navigateToAdmin('stats')} icon={<LayoutGrid className="w-4 h-4" />} label="Dashboard" isAdmin />
                <TabButton active={adminSubTab === 'nahuales'} onClick={() => navigateToAdmin('nahuales')} icon={<Gem className="w-4 h-4" />} label="Nahuales" isAdmin />
                <TabButton active={adminSubTab === 'saberes'} onClick={() => navigateToAdmin('saberes')} icon={<BookOpen className="w-4 h-4" />} label="Saberes" isAdmin />
                <TabButton active={adminSubTab === 'proyectos'} onClick={() => navigateToAdmin('proyectos')} icon={<Briefcase className="w-4 h-4" />} label="Proyectos" isAdmin />
                <TabButton active={adminSubTab === 'users'} onClick={() => navigateToAdmin('users')} icon={<Users className="w-4 h-4" />} label="Usuarios" isAdmin />
                <TabButton active={adminSubTab === 'contacto'} onClick={() => navigateToAdmin('contacto')} icon={<Mail className="w-4 h-4" />} label="Contacto" isAdmin />
                <div className="h-6 w-px bg-amber-900/30 mx-2"></div>
                <TabButton active={false} onClick={() => navigateTo('home')} icon={<X className="w-4 h-4" />} label="Cerrar Admin" isAdmin />
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              className={`xl:hidden p-2.5 bg-[#151510] border rounded-xl ${isAdminView ? 'border-amber-900/30 text-amber-400' : 'border-emerald-900/30 text-emerald-400'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`xl:hidden bg-[#1a1a15] border-b p-4 space-y-2 animate-in slide-in-from-top duration-200 overflow-y-auto max-h-[85vh] ${isAdminView ? 'border-amber-900/30' : 'border-emerald-900/30'}`}>
            {!isAdminView ? (
              <>
                <MobileMenuButton active={activeTab === 'home'} onClick={() => navigateTo('home')} icon={<Home className="w-5 h-5" />} label="Inicio" />
                <MobileMenuButton active={activeTab === 'calculator'} onClick={() => navigateTo('calculator')} icon={<LayoutGrid className="w-5 h-5" />} label="Calcular tiempo" />
                <MobileMenuButton active={activeTab === 'nahuales'} onClick={() => navigateTo('nahuales')} icon={<Gem className="w-5 h-5" />} label="Nahuales" />
                <MobileMenuButton active={activeTab === 'saberes'} onClick={() => navigateTo('saberes')} icon={<BookOpen className="w-5 h-5" />} label="Saberes" />
                <MobileMenuButton active={activeTab === 'proyectos'} onClick={() => navigateTo('proyectos')} icon={<Briefcase className="w-5 h-5" />} label="Proyectos" />
                <MobileMenuButton active={activeTab === 'contacto'} onClick={() => navigateTo('contacto')} icon={<Mail className="w-5 h-5" />} label="Contacto" />
              </>
            ) : (
              <>
                <MobileMenuButton active={adminSubTab === 'stats'} onClick={() => navigateToAdmin('stats')} icon={<LayoutGrid className="w-5 h-5" />} label="Panel General" isAdmin />
                <MobileMenuButton active={adminSubTab === 'nahuales'} onClick={() => navigateToAdmin('nahuales')} icon={<Gem className="w-5 h-5" />} label="Gestión Nahuales" isAdmin />
                <MobileMenuButton active={adminSubTab === 'saberes'} onClick={() => navigateToAdmin('saberes')} icon={<BookOpen className="w-5 h-5" />} label="Gestión Saberes" isAdmin />
                <MobileMenuButton active={adminSubTab === 'proyectos'} onClick={() => navigateToAdmin('proyectos')} icon={<Briefcase className="w-5 h-5" />} label="Proyectos" isAdmin />
                <MobileMenuButton active={adminSubTab === 'users'} onClick={() => navigateToAdmin('users')} icon={<Users className="w-5 h-5" />} label="Gestión Usuarios" isAdmin />
                <MobileMenuButton active={adminSubTab === 'contacto'} onClick={() => navigateToAdmin('contacto')} icon={<Mail className="w-5 h-5" />} label="Canales Contacto" isAdmin />
                <div className="h-px bg-amber-900/20 my-2"></div>
                <MobileMenuButton active={false} onClick={() => navigateTo('home')} icon={<Home className="w-5 h-5" />} label="Volver al Portal Público" isAdmin />
              </>
            )}
          </div>
        )}
      </header>

      {isCalculatorOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsCalculatorOpen(false)}></div>
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
            <div className="w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] bg-[#2a2a24] stone-texture border border-emerald-500/30 p-6 sm:p-10 md:p-14 text-left shadow-[0_0_100px_rgba(16,185,129,0.25)] transition-all animate-in zoom-in-95 duration-500 relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setIsCalculatorOpen(false)} className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 bg-red-900/10 text-red-400 hover:bg-red-600 hover:text-white rounded-full transition-all border border-red-900/20 shadow-lg z-10"><X className="w-6 h-6" /></button>
              <div className="mb-8 sm:mb-12 text-center">
                <div className="inline-flex p-4 sm:p-6 bg-emerald-900/40 rounded-full border border-emerald-500/30 mb-6 shadow-jade jade-glow"><Calendar className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-400" /></div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-[0.2em] font-lexend leading-tight">Sincronizar Tiempo</h2>
              </div>
              <div className="flex justify-center mb-8">
                <button onClick={() => setDirection(d => d === 'GregorianToMayan' ? 'MayanToGregorian' : 'GregorianToMayan')} className="flex items-center gap-3 px-6 py-2.5 bg-emerald-900/60 border border-emerald-500/20 rounded-full text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest font-lexend group shadow-jade">
                  <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  {direction === 'GregorianToMayan' ? 'Cambiar a Cuenta Larga' : 'Cambiar a Gregoriano'}
                </button>
              </div>
              <Calculator direction={direction} onConvertGregorian={handleConvertFromGregorian} onConvertMayan={handleConvertFromMayan} />
            </div>
          </div>
        </div>
      )}

      <main className={`${activeTab === 'home' ? '' : 'max-w-7xl mx-auto px-4 py-8 md:py-12'}`}>
        {activeTab === 'home' ? (
          <LandingPage onStart={() => navigateTo('calculator')} />
        ) : activeTab === 'calculator' ? (
          <div className="space-y-12 relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-4">
              <h2 className="text-xs font-black text-emerald-900 uppercase tracking-[0.3em] font-lexend">Lectura del Tiempo</h2>
              <button 
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-4 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl transition-all shadow-2xl shadow-emerald-900/50 jade-glow overflow-hidden"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                <div className="text-left">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Sincronizar</div>
                  <div className="text-sm font-black uppercase tracking-widest font-lexend">Cambiar Fecha</div>
                </div>
              </button>
            </div>

            {mayanResult && (
              <ResultDisplay mode="hero" mayanDate={mayanResult} onNextDay={() => handleShiftDate(1)} onPrevDay={() => handleShiftDate(-1)} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                {mayanResult && (
                  <ResultDisplay 
                    mode="sidebar" 
                    mayanDate={mayanResult} 
                    gregorianDate={gregorianResult} 
                    showGregorian={direction === 'MayanToGregorian'} 
                    activeLecturaTab={activeLecturaTab}
                    onLecturaTabChange={handleLecturaTabChange}
                  />
                )}
              </div>
              <div className="lg:col-span-8 scroll-mt-24" ref={contentAreaRef}>
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                   {mayanResult && activeLecturaTab === 'nawal' && <NawalDetailSection tzolkin={mayanResult.tzolkin} />}
                   {mayanResult && activeLecturaTab === 'trecena' && <TrecenaSection trecena={mayanResult.trecena} currentJdn={mayanResult.jdn} tzolkinNumber={mayanResult.tzolkin.number} />}
                   {mayanResult && activeLecturaTab === 'cross' && <CholquijSection cross={mayanResult.cross} tzolkinNumber={mayanResult.tzolkin.number} />}
                   {mayanResult && activeLecturaTab === 'longcount' && <InfoSection />}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'nahuales' ? (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-widest font-lexend">Nahuales</h2>
              <p className="text-emerald-700 font-bold uppercase text-xs tracking-[0.3em]">Las 20 Energías Sagradas del Cholq'ij</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TZOLKIN_NAMES.map(name => {
                const detail = TZOLKIN_DAY_DETAILS[name];
                return (
                  <div 
                    key={name}
                    onClick={() => setSelectedNahual(selectedNahual === name ? null : name)}
                    className={`bg-[#2a2a24] stone-texture rounded-3xl p-6 border transition-all cursor-pointer group ${selectedNahual === name ? 'border-emerald-500 jade-glow ring-2 ring-emerald-500/20' : 'border-emerald-900/20 hover:border-emerald-500/40'}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-[#151510] rounded-2xl border border-emerald-900/30 group-hover:scale-110 transition-transform">
                        <Gem className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-emerald-800 font-black uppercase tracking-widest font-lexend">{detail.kaqchikel}</div>
                        <div className="text-xl font-black text-white uppercase tracking-tight font-lexend">{name}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4 line-clamp-2 italic">"{detail.meaning}"</p>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-emerald-700">
                      <span>{detail.symbol}</span>
                      {selectedNahual === name ? <X className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </div>
                    
                    {selectedNahual === name && (
                      <div className="mt-6 pt-6 border-t border-emerald-900/10 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="p-4 bg-[#151510] rounded-xl text-xs text-emerald-100/80 leading-relaxed font-sans italic">
                          {detail.extended}
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                           <div className="text-[10px] uppercase font-black tracking-widest text-emerald-600">Glifo:</div>
                           <p className="text-[10px] text-gray-500 leading-tight">{detail.glyph.glifo}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'saberes' ? (
          <BlogSection />
        ) : activeTab === 'proyectos' ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
            <div className="p-8 bg-[#2a2a24] stone-texture rounded-[3rem] border border-emerald-900/20 text-center w-full max-w-2xl">
              <Briefcase className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-white uppercase tracking-widest font-lexend mb-4">Proyectos</h2>
              <div className="h-1 w-24 bg-emerald-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-500 italic uppercase text-[10px] tracking-[0.4em] font-black">Próximamente: Iniciativas de Preservación</p>
            </div>
          </div>
        ) : activeTab === 'contacto' ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
             <div className="p-8 bg-[#2a2a24] stone-texture rounded-[3rem] border border-emerald-900/20 text-center w-full max-w-2xl">
              <Mail className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-white uppercase tracking-widest font-lexend mb-4">Contacto</h2>
              <div className="h-1 w-24 bg-emerald-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-500 italic uppercase text-[10px] tracking-[0.4em] font-black">Portal de Comunicación en Construcción</p>
            </div>
          </div>
        ) : activeTab === 'admin-dash' ? (
          <AdminDashboard subTab={adminSubTab} onNavigateSubTab={navigateToAdmin} />
        ) : null}
      </main>

      <footer className={`mt-20 border-t py-12 bg-[#151510] ${isAdminView ? 'border-amber-900/20' : 'border-emerald-900/20'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 text-center">
          <nav className="flex flex-wrap justify-center gap-6 mb-4">
             <FooterLink onClick={() => navigateTo('home')}>Inicio</FooterLink>
             <FooterLink onClick={() => navigateTo('calculator')}>Calcular Tiempo</FooterLink>
             <FooterLink onClick={() => navigateTo('nahuales')}>Nahuales</FooterLink>
             <FooterLink onClick={() => navigateTo('saberes')}>Saberes</FooterLink>
             <FooterLink onClick={() => navigateTo('proyectos')}>Proyectos</FooterLink>
             <FooterLink onClick={() => navigateTo('contacto')}>Contacto</FooterLink>
          </nav>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-emerald-900/60 text-sm font-semibold tracking-widest uppercase italic font-lexend">
                "In Lake'ch Ala K'in — Yo soy otro tú"
              </p>
              <div className="text-[10px] text-emerald-900/30 font-black uppercase tracking-[0.5em]">Digital Alignment — Quetzal Project</div>
            </div>

            <button 
              onClick={() => navigateToAdmin('stats')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-900/10 hover:bg-emerald-900/20 rounded-full border border-emerald-900/20 text-emerald-900 hover:text-amber-500 transition-all text-[9px] font-black uppercase tracking-widest font-lexend"
            >
              <ShieldAlert className="w-3 h-3" />
              Acceso Administrador
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FooterLink: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="text-[10px] font-black text-emerald-900 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors font-lexend"
  >
    {children}
  </button>
);

const NawalDetailSection: React.FC<{ tzolkin: any }> = ({ tzolkin }) => {
  const detail = TZOLKIN_DAY_DETAILS[tzolkin.name];
  return (
    <div className="bg-[#2a2a24] stone-texture rounded-[2rem] p-8 border border-emerald-900/20 space-y-8 animate-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3 text-center md:text-left space-y-4">
          <div className="inline-block p-6 bg-emerald-900/20 rounded-full border border-emerald-500/20 shadow-jade">
            <Gem className="w-12 h-12 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white uppercase tracking-widest font-lexend">
              {tzolkin.number} {tzolkin.kaqchikel}
            </h4>
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-[0.2em] font-lexend">{detail.symbol}</p>
          </div>
        </div>
        <div className="md:w-2/3 space-y-6">
          <p className="text-emerald-100 font-semibold leading-relaxed text-lg font-lexend">{detail.meaning}</p>
          <p className="text-gray-400 text-sm italic leading-relaxed font-normal">{detail.extended}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-lexend">
        <DetailInfoCard icon={<Eye className="w-3 h-3" />} label="Glifo" content={detail.glyph.glifo} />
        <DetailInfoCard icon={<PenTool className="w-3 h-3" />} label="Trazos" content={detail.glyph.trazos} />
        <DetailInfoCard icon={<Sparkles className="w-3 h-3" />} label="Simbolismo" content={detail.glyph.simbolismo} />
      </div>
    </div>
  );
};

const DetailInfoCard: React.FC<{ icon: React.ReactNode; label: string; content: string }> = ({ icon, label, content }) => (
  <div className="p-6 bg-[#151510] rounded-2xl border border-emerald-900/20 space-y-3">
    <div className="flex items-center gap-2 text-emerald-500 uppercase tracking-widest text-[10px] font-semibold">{icon} {label}</div>
    <p className="text-xs text-gray-400 leading-relaxed font-normal font-sans">{content}</p>
  </div>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; isAdmin?: boolean }> = ({ active, onClick, icon, label, isAdmin }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-semibold uppercase tracking-widest whitespace-nowrap shrink-0 font-lexend border ${
      active 
        ? (isAdmin ? 'bg-amber-600 text-white border-amber-400 shadow-lg' : 'bg-emerald-600 text-white border-emerald-400 shadow-lg') 
        : (isAdmin ? 'text-amber-700 border-transparent hover:text-amber-500 hover:border-amber-900/30' : 'text-emerald-700 border-transparent hover:text-emerald-500 hover:border-emerald-900/30')
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MobileMenuButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; isAdmin?: boolean }> = ({ active, onClick, icon, label, isAdmin }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-sm font-black uppercase tracking-widest font-lexend ${
      active 
        ? (isAdmin ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white') 
        : 'bg-[#151510] text-emerald-700'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;

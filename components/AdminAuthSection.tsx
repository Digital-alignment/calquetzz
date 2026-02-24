import React, { useState } from 'react';
import { ShieldAlert, Lock, ArrowRight, UserCircle, Key, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminAuthSectionProps {
    onLoginSuccess: (role: 'admin') => void;
    onNavigateHome: () => void;
}

const AdminAuthSection: React.FC<AdminAuthSectionProps> = ({ onLoginSuccess, onNavigateHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            // El AuthProvider y App.tsx se encargarán de verificar que de verdad sea admin
            // y rechazarán el acceso si su rol es 'user'.
            onLoginSuccess('admin');

        } catch (err: any) {
            console.error(err);
            setError('Acceso denegado. Credenciales no autorizadas o inválidas.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans bg-[#13110e]">
            {/* Background decorations - Amber tinted for Admin */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-amber-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <button
                    onClick={onNavigateHome}
                    className="group flex items-center gap-2 mb-8 text-amber-600/60 hover:text-amber-400 text-xs font-black uppercase tracking-widest transition-colors font-lexend"
                >
                    <div className="p-2 bg-black border border-amber-900/30 rounded-full group-hover:scale-110 transition-transform">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    Abandonar Portal Privado
                </button>

                <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex p-4 bg-black/50 rounded-2xl border border-amber-900/40 shadow-[0_0_30px_rgba(217,119,6,0.15)] relative">
                        <div className="absolute inset-0 border border-amber-500/20 rounded-2xl animate-pulse"></div>
                        <ShieldAlert className="w-10 h-10 text-amber-500" />
                    </div>
                    <h2 className="text-3xl font-black text-amber-100 uppercase tracking-widest font-lexend">
                        Control Maestro
                    </h2>
                    <p className="text-amber-800 font-bold uppercase text-[10px] tracking-[0.4em]">
                        Portal de Administración Segura
                    </p>
                </div>

                <div className="bg-[#1b1915] rounded-[2rem] p-8 border border-amber-900/30 shadow-2xl relative overflow-hidden ring-1 ring-amber-500/5">
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

                    <div className="space-y-6 relative z-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-in shake-in duration-200 shadow-inner">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest font-lexend ml-1">Identificador Admin (Email)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <UserCircle className="w-5 h-5 text-amber-900/60 group-focus-within:text-amber-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#11100c] border border-amber-900/30 rounded-2xl pl-14 pr-5 py-4 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all text-sm font-mono placeholder:text-amber-900/30"
                                        placeholder="sysadmin@maya.art"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-amber-800 uppercase tracking-widest font-lexend ml-1">Clave de Acceso</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Key className="w-5 h-5 text-amber-900/60 group-focus-within:text-amber-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#11100c] border border-amber-900/30 rounded-2xl pl-14 pr-5 py-4 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all text-sm font-mono tracking-widest placeholder:text-amber-900/30 placeholder:tracking-normal"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-amber-600/90 hover:bg-amber-500 text-[#11100c] rounded-2xl transition-all shadow-lg shadow-amber-900/30 font-black uppercase tracking-[0.2em] font-lexend group text-xs relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    {loading ? 'Verificando...' : 'Verificar Identidad'}
                                    {!loading && <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 text-center flex flex-col items-center gap-2">
                    <div className="w-px h-8 bg-gradient-to-b from-amber-900/40 to-transparent"></div>
                    <p className="text-[8px] font-black text-amber-900/40 uppercase tracking-[0.5em] font-lexend text-center max-w-[200px] leading-relaxed">
                        Acceso restringido a guardianes del código
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminAuthSection;

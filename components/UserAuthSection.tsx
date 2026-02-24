import React, { useState } from 'react';
import { UserCircle, Lock, ArrowRight, UserPlus, Mail, LogIn, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserAuthSectionProps {
    onLoginSuccess: (role: 'user') => void;
    onNavigateHome: () => void;
}

const UserAuthSection: React.FC<UserAuthSectionProps> = ({ onLoginSuccess, onNavigateHome }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;

                // El onAuthStateChange en AuthProvider detectará esto y nos dará el rol.
                // App.tsx se encargará de la redirección.
                onLoginSuccess('user');
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                        }
                    }
                });

                if (signUpError) throw signUpError;

                setError('Registro exitoso. Si tu correo requiere confirmación, revisa tu bandeja de entrada.');
                // Opcionalmente auto-loguear si el correo no requiere confirmación:
                // onLoginSuccess('user');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error en la autenticación');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al conectar con Google');
            setLoading(false);
        }
    };

    const GoogleIcon = () => (
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-900/30 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-700/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <button
                    onClick={onNavigateHome}
                    className="group flex items-center gap-2 mb-8 text-emerald-600 hover:text-emerald-400 text-xs font-black uppercase tracking-widest transition-colors font-lexend"
                >
                    <div className="p-2 bg-[#151510] border border-emerald-900/30 rounded-full group-hover:scale-110 transition-transform">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    Volver al Inicio
                </button>

                <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex p-4 bg-[#151510] rounded-3xl border border-emerald-900/50 shadow-jade">
                        {isLogin ? <LogIn className="w-8 h-8 text-emerald-400" /> : <UserPlus className="w-8 h-8 text-emerald-400" />}
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest font-lexend">
                        {isLogin ? 'Mi Santuario' : 'Nueva Esencia'}
                    </h2>
                    <p className="text-emerald-700 font-bold uppercase text-[10px] tracking-[0.3em]">
                        {isLogin ? 'Ingresa para conectar con el tiempo' : 'Inicia tu ciclo de sabiduría'}
                    </p>
                </div>

                <div className="bg-[#2a2a24]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-emerald-900/30 shadow-2xl relative overflow-hidden">
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

                    <div className="space-y-6 relative z-10">
                        {/* Google Social Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-white hover:bg-gray-100 text-gray-800 rounded-2xl transition-all shadow-lg font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                            <GoogleIcon />
                            Continuar con Google
                        </button>

                        <div className="flex items-center gap-4 py-4">
                            <div className="flex-1 h-px bg-emerald-900/40"></div>
                            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-800 font-lexend">o con tu correo</span>
                            <div className="flex-1 h-px bg-emerald-900/40"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-2xl text-amber-400 text-[10px] font-black uppercase tracking-widest text-center animate-in shake-in duration-200">
                                    {error}
                                </div>
                            )}

                            {!isLogin && (
                                <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-[9px] font-black text-emerald-700 uppercase tracking-widest font-lexend ml-1">Nombre Completo</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <UserCircle className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-[#151510] border border-emerald-900/40 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all text-sm"
                                            placeholder="Tu Nombre"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-emerald-700 uppercase tracking-widest font-lexend ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#151510] border border-emerald-900/40 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all text-sm"
                                        placeholder="tu@esencia.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-emerald-700 uppercase tracking-widest font-lexend ml-1">Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-emerald-800 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#151510] border border-emerald-900/40 rounded-2xl pl-12 pr-4 py-4 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all shadow-lg shadow-emerald-900/50 font-black uppercase tracking-[0.2em] font-lexend group text-xs mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Procesando...' : isLogin ? 'Conectar' : 'Empezar Ciclo'}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-emerald-900/20 text-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[10px] font-black text-emerald-600 hover:text-emerald-400 uppercase tracking-widest transition-colors font-lexend"
                            >
                                {isLogin ? '¿No tienes cuenta? Crea una aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAuthSection;

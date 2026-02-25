import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { supabase } from '../../lib/supabase';
import { Camera, Save, RefreshCw, Key, LogOut, Bell, Globe, LayoutGrid, ShieldAlert, BadgeCheck, Loader2 } from 'lucide-react';

type ProfileTab = 'general' | 'suscripcion' | 'seguridad' | 'preferencias';

interface UserProfileData {
    full_name: string;
    avatar_url: string;
    dob: string;
    bio: string;
}

const UserProfile: React.FC = () => {
    const { user, role, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState<ProfileTab>('general');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [profileData, setProfileData] = useState<UserProfileData>({
        full_name: '',
        avatar_url: '',
        dob: '',
        bio: ''
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Computed Plan name based on role
    const planName = role === 'admin' ? 'Administrador' : role === 'user' ? 'Cuenta Gratuita' : 'Usuario';

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, avatar_url, dob, bio')
                .eq('id', user?.id)
                .single();

            if (error) throw error;

            if (data) {
                setProfileData({
                    full_name: data.full_name || '',
                    avatar_url: data.avatar_url || '',
                    dob: data.dob || '',
                    bio: data.bio || ''
                });

                if (data.avatar_url) {
                    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.avatar_url);
                    setAvatarPreview(publicUrl);
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const uploadAvatar = async (): Promise<string | null> => {
        if (!avatarFile || !user) return profileData.avatar_url;

        try {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, avatarFile);

            if (uploadError) throw uploadError;

            return filePath;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    };

    const saveProfile = async () => {
        if (!user) return;

        try {
            setSaving(true);
            setMessage(null);

            let newAvatarUrl = profileData.avatar_url;
            if (avatarFile) {
                const uploadedPath = await uploadAvatar();
                if (uploadedPath) newAvatarUrl = uploadedPath;
            }

            const updates = {
                id: user.id,
                full_name: profileData.full_name,
                avatar_url: newAvatarUrl,
                dob: profileData.dob || null, // null if empty empty date
                bio: profileData.bio,
                updated_at: new Date()
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;

            setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });

            // Update local state with the new path
            setProfileData(prev => ({ ...prev, avatar_url: newAvatarUrl }));
            setAvatarFile(null); // Clear file so we don't re-upload

        } catch (error: any) {
            console.error('Error saving profile:', error);
            setMessage({ type: 'error', text: error.message || 'Error al guardar el perfil.' });
        } finally {
            setSaving(false);
            // Auto-hide success message
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                redirectTo: window.location.origin
            });
            if (error) throw error;
            alert('Se ha enviado un correo para restablecer tu contraseña.');
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-pulse">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-emerald-400 font-lexend uppercase tracking-widest text-sm">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            {/* Profile Header */}
            <div className="bg-[#2a2a24] stone-texture rounded-[2.5rem] p-8 border border-emerald-900/20 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/10 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-1000 -z-0"></div>

                <div className="relative z-10 w-32 h-32 shrink-0 rounded-full border-4 border-[#151510] shadow-[0_0_0_2px_rgba(16,185,129,0.3)] overflow-hidden bg-[#151510] flex items-center justify-center">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <UserPlaceholder />
                    )}

                    <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                        <Camera className="w-8 h-8 text-white mb-1" />
                        <span className="text-[9px] font-black uppercase text-white tracking-widest">Cambiar</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>

                <div className="relative z-10 flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-lexend mb-2">
                        {profileData.full_name || 'Nuevo Usuario'}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <BadgeCheck className="w-4 h-4" /> {planName}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">{user?.email}</span>
                    </div>
                </div>
            </div>

            {/* Tabs Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Nav */}
                <div className="lg:col-span-3">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        <ProfileTabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<LayoutGrid />} label="General" />
                        <ProfileTabButton active={activeTab === 'suscripcion'} onClick={() => setActiveTab('suscripcion')} icon={<BadgeCheck />} label="Suscripción" />
                        <ProfileTabButton active={activeTab === 'seguridad'} onClick={() => setActiveTab('seguridad')} icon={<Key />} label="Seguridad" />
                        <ProfileTabButton active={activeTab === 'preferencias'} onClick={() => setActiveTab('preferencias')} icon={<Bell />} label="Preferencias" />
                    </nav>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 bg-[#1b1b17] border border-emerald-900/20 rounded-[2rem] p-6 sm:p-10 shadow-xl">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/20' : 'bg-red-900/20 text-red-400 border border-red-500/20'}`}>
                            <InfoIcon type={message.type} />
                            {message.text}
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-emerald-600 tracking-widest pl-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        value={profileData.full_name}
                                        onChange={e => setProfileData({ ...profileData, full_name: e.target.value })}
                                        placeholder="Tu nombre y apellido"
                                        className="w-full bg-[#151510] border border-emerald-900/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-emerald-600 tracking-widest pl-1">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        value={profileData.dob}
                                        onChange={e => setProfileData({ ...profileData, dob: e.target.value })}
                                        className="w-full bg-[#151510] border border-emerald-900/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium color-scheme-dark"
                                    />
                                    <p className="text-[10px] text-gray-500 pl-1 italic">Necesario para calcular tu Nahual personal.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-emerald-600 tracking-widest pl-1">Biografía / Acerca de ti</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                    placeholder="Cuéntanos un poco sobre tu conexión con la cosmovisión maya..."
                                    rows={4}
                                    className="w-full bg-[#151510] border border-emerald-900/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium resize-none"
                                />
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button
                                    onClick={saveProfile}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-900/30"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'suscripcion' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="p-6 bg-gradient-to-br from-emerald-900/20 to-black rounded-2xl border border-emerald-900/30">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight font-lexend mb-1">Plan Actual</h3>
                                        <p className="text-sm text-emerald-400 font-medium">{planName}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">Activo</span>
                                </div>

                                <div className="text-sm text-gray-400 mb-6">
                                    Aún no tienes métodos de pago vinculados ya que estás utilizando la versión gratuita del portal.
                                </div>

                                {role === 'user' && (
                                    <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-[#151510] border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all group">
                                        <SparkleIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        Explorar Planes Premium
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'seguridad' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight font-lexend">Credenciales</h3>
                                <div className="p-5 bg-[#151510] border border-emerald-900/30 rounded-xl flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Correo Electrónico</div>
                                        <div className="text-white font-medium mt-1">{user?.email}</div>
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase font-black px-3 py-1 bg-black rounded-lg">Verificado</div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-emerald-900/20">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight font-lexend">Contraseña</h3>
                                <p className="text-sm text-gray-400">Si necesitas cambiar tu contraseña, te enviaremos un enlace seguro de restablecimiento a tu correo electrónico.</p>

                                <button
                                    onClick={handlePasswordReset}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#151510] hover:bg-emerald-900/20 border border-emerald-900/50 text-emerald-400 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
                                >
                                    <Key className="w-4 h-4" />
                                    Enviar enlace de restablecimiento
                                </button>
                            </div>

                            <div className="space-y-4 pt-10 mt-10 border-t border-red-900/20">
                                <h3 className="text-lg font-black text-red-500 uppercase tracking-tight font-lexend">Zona de Peligro</h3>
                                <p className="text-sm text-gray-400">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.</p>

                                <button
                                    className="flex justify-center items-center gap-2 px-6 py-3 bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 text-red-500 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all w-full sm:w-auto"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Eliminar Mi Cuenta
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferencias' && (
                        <div className="space-y-8 animate-in fade-in duration-300 opacity-70">
                            <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-xl flex gap-3 text-amber-500 text-sm mb-6">
                                <ShieldAlert className="w-5 h-5 shrink-0" />
                                <p>Estas opciones se habilitarán en la próxima actualización del sistema.</p>
                            </div>

                            <div className="space-y-6 pointer-events-none filter grayscale-[50%]">
                                <div className="flex items-center justify-between p-4 bg-[#151510] border border-emerald-900/30 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-500"><Bell className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-white font-bold font-lexend mb-0.5">Notificaciones por Correo</div>
                                            <div className="text-xs text-gray-500">Recibir avisos sobre nuevos eventos y contenido.</div>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-emerald-900/50 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[#151510] border border-emerald-900/30 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-500"><Globe className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-white font-bold font-lexend mb-0.5">Idioma de la Interfaz</div>
                                            <div className="text-xs text-gray-500">Español (Predeterminado)</div>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Cambiar</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const ProfileTabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest whitespace-nowrap lg:w-full text-left font-lexend
      ${active
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'bg-[#151510] text-emerald-700 hover:text-emerald-400 hover:bg-[#1b1b17] border border-transparent hover:border-emerald-900/30'
            }`}
    >
        <span className={active ? 'text-emerald-100' : 'text-emerald-700 group-hover:text-emerald-500'}>
            {/* Icon is cloned to enforce size regardless of what is passed */}
            {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
        </span>
        {label}
    </button>
);

const UserPlaceholder = () => (
    <svg className="w-16 h-16 text-emerald-900/50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const InfoIcon = ({ type }: { type: 'success' | 'error' }) => (
    type === 'success'
        ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        : <ShieldAlert className="w-5 h-5" />
);

const SparkleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default UserProfile;

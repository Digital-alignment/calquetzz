import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
    session: Session | null;
    user: User | null;
    role: Role;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    role: null,
    isLoading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Escuchar el estado de la sesión inicialmente
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserRole(session.user.id);
            } else {
                setIsLoading(false);
            }
        });

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchUserRole(session.user.id);
                } else {
                    setRole(null);
                    setIsLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserRole = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, might happen briefly on signup
                console.error('Error fetching role:', error);
            }

            setRole(data?.role as Role ?? 'user'); // Fallback to user if profile not fully ready
        } catch (err) {
            console.error('Unexpected error fetching role', err);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, role, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

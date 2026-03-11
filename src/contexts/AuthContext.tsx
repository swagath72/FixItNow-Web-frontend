import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role?: 'customer' | 'technician';
    profile_image?: string;    // kept for any legacy usage
    profile_pic_url?: string;  // actual URL from backend e.g. /uploads/profile_1_xxx.jpg
    full_name?: string;
    service_type?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            try { return JSON.parse(saved); } catch { return null; }
        }
        return null;
    });

    // Removed the aggressive useEffect that clears localStorage if !token || !user
    // This was causing unexpected logouts on refresh if the user object had a slight mismatch or was loading.

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userLocation');
    };

    // Listen for auth:logout events dispatched by api.ts interceptor on 401 errors.
    // This properly clears both React state AND localStorage, so ProtectedRoute redirects to /login.
    useEffect(() => {
        const handleAuthLogout = () => logout();
        window.addEventListener('auth:logout', handleAuthLogout);
        return () => window.removeEventListener('auth:logout', handleAuthLogout);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const updateUser = (updatedFields: Partial<User>) => {
        if (user) {
            const updated = { ...user, ...updatedFields };
            setUser(updated);
            localStorage.setItem('user', JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

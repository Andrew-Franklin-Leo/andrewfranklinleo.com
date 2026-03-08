"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';

interface UserProfile {
    tier: 'free' | 'practitioner' | 'operator' | 'institutional' | 'analyst' | 'council';
    referralCode: string;
    referralCount: number;
    stripeCustomerId?: string;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const profileDoc = await getDoc(doc(db, 'stakeholders', firebaseUser.uid));
                    if (profileDoc.exists()) {
                        setProfile(profileDoc.data() as UserProfile);
                    } else {
                        setProfile({
                            tier: 'free',
                            referralCode: firebaseUser.uid.slice(0, 8).toUpperCase(),
                            referralCount: 0,
                            createdAt: new Date().toISOString(),
                        });
                    }
                } catch {
                    setProfile({
                        tier: 'free',
                        referralCode: firebaseUser.uid.slice(0, 8).toUpperCase(),
                        referralCount: 0,
                        createdAt: new Date().toISOString(),
                    });
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, profile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

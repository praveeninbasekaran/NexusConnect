'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import type { UserProfile } from '@/lib/types';

// Mock user data since auth is removed
const mockUser: User = {
  uid: 'mock-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://picsum.photos/100',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({
    token: '',
    expirationTime: '',
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
  providerId: '',
};

const mockUserProfile: UserProfile = {
  id: 'mock-user-id',
  name: 'Test User',
  bio: 'A passionate developer.',
  avatarUrl: 'https://picsum.photos/seed/test-user/100/100',
  connections: ['user2', 'user3'], // Example connections
};


interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithToken: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and then set mock user
    setTimeout(() => {
        setUser(mockUser);
        setUserProfile(mockUserProfile);
        setLoading(false);
    }, 500)
  }, []);

  const signInWithToken = async (token: string) => {
    console.log("Signing in with token (mock)", token);
    setLoading(true);
    setTimeout(() => {
        setUser(mockUser);
        setUserProfile(mockUserProfile);
        setLoading(false);
    }, 500)
  };

  const signOut = async () => {
    console.log("Signing out (mock)");
    setLoading(true);
     setTimeout(() => {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
    }, 500)
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signInWithToken, signOut }}>
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

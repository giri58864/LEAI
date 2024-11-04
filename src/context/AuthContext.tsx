import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'user' | 'advisor') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    email: 'advisor@example.com',
    password: 'password123',
    role: 'advisor',
    created_at: new Date().toISOString()
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email: string, password: string) => {
      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    },
    signUp: async (email: string, password: string, role: 'user' | 'advisor') => {
      // In a real app, we would make an API call here
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        created_at: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    },
    signOut: async () => {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
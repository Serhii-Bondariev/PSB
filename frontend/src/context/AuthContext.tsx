// frontend/src/context/AuthContext.tsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { loginUser, fetchUserProfile } from '../utils/api'; // Функції API-запитів

type User = {
  id: string;
  name: string;
  role: 'admin' | 'moderator';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('sportCenterToken');
    if (token) {
      fetchUserProfile(token)
        .then(userData => setUser(userData))
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem('sportCenterToken', token);
      setUser(user);
      return user;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportCenterToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
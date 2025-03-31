// frontend/src/context/AuthContext.tsx
// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'moderator' | 'user';
  email?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean; // Додано
  error?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Додано

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Токен з localStorage:', token);
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const serverUser = response.data;
          const normalizedUser: User = {
            id: serverUser.id,
            name: serverUser.name,
            role: serverUser.role,
          };
          console.log('Отриманий користувач з профілю:', normalizedUser);
          setUser(normalizedUser);
        })
        .catch((error) => {
          console.error('Помилка при отриманні профілю:', error);
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false)); // Завершення завантаження
    } else {
      setLoading(false); // Якщо токена немає, завантаження завершується одразу
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user: serverUser } = response.data;

      console.log('Серверна відповідь user:', serverUser);

      const normalizedUser: User = {
        id: serverUser.id,
        name: serverUser.name,
        role: serverUser.role,
      };

      console.log('Отриманий токен:', token);
      console.log('Нормалізований користувач:', normalizedUser);

      localStorage.setItem('token', token);
      setUser(normalizedUser);
      setLoading(false); // Завершення завантаження після логіну
      return normalizedUser;
    } catch (error) {
      console.error('Помилка входу', error);
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

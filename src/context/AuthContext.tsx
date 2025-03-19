import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  role: 'admin' | 'moderator';
};
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Mock users for demo purposes
const MOCK_USERS = [{
  id: '1',
  email: 'admin@sport.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin' as const
}, {
  id: '2',
  email: 'mod1@sport.com',
  password: 'mod123',
  name: 'Moderator 1',
  role: 'moderator' as const
}, {
  id: '3',
  email: 'mod2@sport.com',
  password: 'mod123',
  name: 'Moderator 2',
  role: 'moderator' as const
}];
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('sportCenterUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const {
        password,
        email,
        ...userWithoutSensitiveData
      } = foundUser;
      setUser(userWithoutSensitiveData);
      localStorage.setItem('sportCenterUser', JSON.stringify(userWithoutSensitiveData));
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportCenterUser');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated: !!user
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
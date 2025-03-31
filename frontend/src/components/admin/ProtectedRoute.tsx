// frontend/src/components/admin/ProtectedRoute.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'admin' | 'moderator';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (requiredRole && user.role !== requiredRole) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, requiredRole, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Показуємо лоадер, поки йде перевірка
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null; // Нічого не рендеримо, якщо перенаправлення відбудеться
  }

  return children;
};

export default ProtectedRoute;

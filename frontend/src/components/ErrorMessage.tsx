// frontend/src/components/ErrorMessage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const ErrorMessage: React.FC = () => {
  const { error } = useAuth();

  if (!error) return null;

  return (
    <div className="error-message">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;

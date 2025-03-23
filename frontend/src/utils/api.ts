// frontend/src/utils/api.ts
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json(); // { token, user }
};

export const fetchUserProfile = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Unauthorized');
  }

  return response.json(); // { id, name, role }
};

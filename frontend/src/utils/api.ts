// frontend/src/utils/api.ts
// frontend/src/utils/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request URL:', config.baseURL + '/' + config.url);
  return config;
});

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('auth/login', { email, password });
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('auth/profile');
  return response.data;
};

export const fetchSchedules = async () => {
  const response = await api.get('schedules');
  return response.data;
};

export const createSchedule = async (data: {
  sport: string;
  name: string;
  phone: string;
  email: string;
  trainer: string;
  location: string;
  schedule: { day: string; time: string }[];
  photo?: string;
  description?: string;
}) => {
  const response = await api.post('schedules', data);
  return response.data;
};

export const updateSchedule = async (
  id: string,
  data: {
    sport: string;
    name: string;
    phone: string;
    email: string;
    trainer: string;
    location: string;
    schedule: { day: string; time: string }[];
    photo?: string;
    description?: string;
  }
) => {
  const response = await api.put(`schedules/${id}`, data);
  return response.data;
};

export const deleteSchedule = async (id: string) => {
  await api.delete(`schedules/${id}`);
};

export const fetchTrainers = async () => {
  const response = await api.get('schedules/trainers');
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get('users');
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'moderator' | 'user';
}) => {
  const response = await api.post('users', data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: { name: string; email: string; role: 'admin' | 'moderator' | 'user'; password?: string }
) => {
  const response = await api.put(`users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`users/${id}`);
};

export default api;
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
// console.log('API_URL:', API_URL); // Діагностика

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log('Request URL:', config.baseURL + '/' + config.url); // Діагностика
//   return config;
// });

// export const loginUser = async (email: string, password: string) => {
//   const response = await api.post('auth/login', { email, password });
//   return response.data;
// };

// export const fetchUserProfile = async () => {
//   const response = await api.get('auth/profile');
//   return response.data;
// };

// export const fetchSchedules = async () => {
//   const response = await api.get('schedules');
//   return response.data;
// };

// export const createSchedule = async (data: {
//   sport: string;
//   trainer: string;
//   location: string;
//   schedule: { day: string; time: string }[];
// }) => {
//   const response = await api.post('schedules', data);
//   return response.data;
// };

// export const updateSchedule = async (
//   id: string,
//   data: {
//     sport: string;
//     trainer: string;
//     location: string;
//     schedule: { day: string; time: string }[];
//   }
// ) => {
//   const response = await api.put(`schedules/${id}`, data);
//   return response.data;
// };

// export const deleteSchedule = async (id: string) => {
//   await api.delete(`schedules/${id}`);
// };

// export const fetchTrainers = async () => {
//   const response = await api.get('schedules/trainers');
//   return response.data;
// };

// export const fetchUsers = async () => {
//   const response = await api.get('users');
//   return response.data;
// };

// export const createUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   role: 'admin' | 'moderator' | 'user';
// }) => {
//   const response = await api.post('users', data);
//   return response.data;
// };

// export const updateUser = async (
//   id: string,
//   data: { name: string; email: string; role: 'admin' | 'moderator' | 'user'; password?: string }
// ) => {
//   const response = await api.put(`users/${id}`, data);
//   return response.data;
// };

// export const deleteUser = async (id: string) => {
//   await api.delete(`users/${id}`);
// };

// export default api;

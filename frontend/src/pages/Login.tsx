
// frontend/src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockIcon, ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        if (user.role === 'admin' || user.role === 'moderator') {
          navigate('/admin/dashboard');
        } else {
          alert('Успішна авторизація! Але у вас немає доступу до адмін-панелі.');
        }
      } else {
        setError('Невірний email або пароль');
      }
    } catch (err) {
      setError('Помилка входу. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-light flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center text-primary hover:text-dark mb-8">
          <ArrowLeftIcon size={20} className="mr-2" />
          Повернутись на головну
        </Link>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-6 text-center">
            <h1 className="text-2xl font-bold">
              Вхід до адміністративної панелі
            </h1>
            <p className="mt-2">Дитячий спортивний центр</p>
          </div>
          <div className="p-6">
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-500" />
                  </div>
                  <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Введіть ваш email" required />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={18} className="text-gray-500" />
                  </div>
                  <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Введіть ваш пароль" required />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-dark transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isLoading ? 'Вхід...' : 'Увійти'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;

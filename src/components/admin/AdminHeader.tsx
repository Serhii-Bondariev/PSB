import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="bg-white shadow-sm border-b border-gray-200 py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary mr-6">Адмін панель</h1>
            <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('uk-UA', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Посилання на повідомлення */}
            <Link to="/admin/messages" className="relative text-gray-500 hover:text-primary transition-colors">
              <BellIcon size={20} />
              <span className="absolute -top-1 -right-1 bg-accent text-dark text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
            </Link>

            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="font-medium text-dark">{user?.name}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
              </div>

              <div className="bg-secondary text-white rounded-full w-9 h-9 flex items-center justify-center">
                <UserIcon size={18} />
              </div>

              <button onClick={handleLogout} className="text-gray-500 hover:text-primary transition-colors" title="Вийти">
                <LogOutIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
  );
};

export default AdminHeader;

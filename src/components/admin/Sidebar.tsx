import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, FileTextIcon, ImageIcon, CalendarIcon, MessageSquareIcon, SettingsIcon, HomeIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  const menuItems = [{
    path: '/admin/dashboard',
    name: 'Дашборд',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    path: '/admin/users',
    name: 'Користувачі',
    icon: <UsersIcon size={20} />,
    adminOnly: true
  }, {
    path: '/admin/content',
    name: 'Контент',
    icon: <FileTextIcon size={20} />
  }, {
    path: '/admin/gallery',
    name: 'Галерея',
    icon: <ImageIcon size={20} />
  }, {
    path: '/admin/schedule',
    name: 'Розклад',
    icon: <CalendarIcon size={20} />
  }, {
    path: '/admin/messages',
    name: 'Повідомлення',
    icon: <MessageSquareIcon size={20} />
  }, {
    path: '/admin/settings',
    name: 'Налаштування',
    icon: <SettingsIcon size={20} />,
    adminOnly: true
  }];
  return <aside className="bg-dark text-white w-64 min-h-screen flex flex-col">
      <div className="flex-col justify-items-center p-5 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-18 h-18 flex items-center justify-center">
            <img src="/boxingLogo.png" alt="Boxing Logo"  />
          </div>
          <div>
            <div>
              <h2 className="font-bold text-sm">Пісківка <br /> Спортивний Центр</h2>
            </div>


            <p className="text-xl text-gray-400">Адміністративна панель</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
          if (item.adminOnly && !isAdmin) return null;
          return <li key={item.path}>
                <Link to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>;
        })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <HomeIcon size={20} />
          <span>На головну сайту</span>
        </Link>
      </div>
    </aside>;
};
export default Sidebar;
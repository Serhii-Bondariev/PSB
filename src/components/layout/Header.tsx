import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon } from 'lucide-react';
import logo from '../../assets/Logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 640 && window.innerWidth < 1024);
  const location = useLocation();

  const navigation = [
    { name: 'Головна', path: '/' },
    { name: 'Про нас', path: '/about' },
    { name: 'Секції', path: '/sections' },
    { name: 'Розклад', path: '/schedule' },
    { name: 'Тренери', path: '/trainers' },
    { name: 'Галерея', path: '/gallery' },
    { name: 'Контакти', path: '/contacts' },
  ];

  // Відстеження зміни розміру екрану
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-20 h-20 flex items-center justify-center">
            <img src={logo} alt="Boxing Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xl block md:hidden">
              Пісківка Спортивний Центр
            </span>
          </Link>

          {/* Планшетне меню */}
          {isTablet && (
            <nav className="flex space-x-4 text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-accent transition-colors ${
                    location.pathname === item.path ? 'text-accent' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Десктопне меню */}
          <nav className="hidden lg:flex space-x-8 text-base">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-accent transition-colors ${
                  location.pathname === item.path ? 'text-accent' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Кнопка входу */}
          <div className="hidden lg:block">
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
            >
              <UserIcon size={18} />
              <span>Вхід</span>
            </Link>
          </div>

          {/* Кнопка мобільного меню */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Мобільне меню */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block hover:text-accent transition-colors ${
                  location.pathname === item.path ? 'text-accent' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserIcon size={18} />
              <span>Вхід</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

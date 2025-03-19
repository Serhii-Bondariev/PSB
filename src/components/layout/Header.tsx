import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/boxingLogo.png" alt="Boxing Logo"  />
              </div>
              <span className="font-bold text-xl block md:hidden">
              Пісківка Спортивний Центр
            </span>
            </Link>

            {/* Tablet Menu */}
            <nav className="hidden sm:flex md:hidden space-x-4 text-sm overflow-x-auto">
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

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 text-base ">
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

            {/* Login Button */}
            <div className="hidden md:block">
              <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
              >
                <UserIcon size={18} />
                <span>Вхід</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-4">
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
                    className="flex items-center space-x- bg-secondary px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors w-fit"
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



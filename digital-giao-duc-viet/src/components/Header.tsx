import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { getUser, removeUser } from '../utils/storage.tsx';
import { useLanguage } from '../context/LanguageContext';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'home', href: '/hoc-sinh' },
  { label: 'courses', href: '/khoa-hoc' },
  { label: 'my_courses', href: '/hoc-vien' },
  { label: 'about_us', href: '/gioi-thieu' },
  { label: 'contact', href: '/lien-he' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          {/* Logo mới thay cho logo cũ */}
          <img
            src="/1-Photoroom.png"
            alt="Digital Education Logo"
            className="h-12 w-auto inline-block align-middle object-contain"
            style={{ maxHeight: '3rem' }}
          />
          {/* Ảnh kế logo */}
          <img
            src="/2-Photoroom.png"
            alt="Digital Education Text"
            className="h-12 max-h-6 w-auto inline-block align-middle object-contain"
            style={{ maxHeight: '1.65rem', position: 'relative', top: '1px' }}
          />
        </Link>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.filter(item => item.label !== 'my_courses').map((item, idx, arr) => {
            if (item.label === 'courses' && user) {
              return [
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {t(item.label)}
                </Link>,
                <Link
                  key="/hoc-vien"
                  to="/hoc-vien"
                  className={`font-medium ${
                    location.pathname === '/hoc-vien'
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {t('my_courses')}
                </Link>
              ];
            }
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`font-medium ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/ho-so"
                className={`font-medium ${
                  location.pathname === '/ho-so'
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {t('profile')}
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary"
              >
                <LogOut size={18} />
                {t('logout')}
              </Button>
              <Button onClick={toggleLanguage} variant="outline" className="ml-4">
                {language === 'vi' ? 'English' : 'Tiếng Việt'}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button onClick={handleLoginClick} variant="outline" className="ml-4">
                {t('sign_in')}
              </Button>
              <Button onClick={toggleLanguage} variant="outline">
                {language === 'vi' ? 'English' : 'Tiếng Việt'}
              </Button>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navItems.filter(item => item.label !== 'my_courses').map((item, idx, arr) => {
              if (item.label === 'courses' && user) {
                return [
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium py-2 ${
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {t(item.label)}
                  </Link>,
                  <Link
                    key="/hoc-vien"
                    to="/hoc-vien"
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium py-2 ${
                      location.pathname === '/hoc-vien'
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {t('my_courses')}
                  </Link>
                ];
              }
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
            {user ? (
              <>
                <Link
                  to="/ho-so"
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-2 ${
                    location.pathname === '/ho-so'
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`}
                >
                  {t('profile')}
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="flex items-center gap-2 text-gray-600"
                >
                  <LogOut size={18} />
                  {t('logout')}
                </Button>
                <Button onClick={toggleLanguage} variant="outline" className="w-full">
                  {language === 'vi' ? 'English' : 'Tiếng Việt'}
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Button onClick={handleLoginClick} variant="outline" className="w-full">
                  {t('sign_in')}
                </Button>
                <Button onClick={toggleLanguage} variant="outline" className="w-full">
                  {language === 'vi' ? 'English' : 'Tiếng Việt'}
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

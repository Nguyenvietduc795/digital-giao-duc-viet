import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { getUser, removeUser } from '../utils/storage.tsx';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/hoc-sinh' },
  { label: 'Khóa học', href: '/khoa-hoc' },
  { label: 'Khóa học của tôi', href: '/hoc-vien' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary">Digital Education</div>
        </Link>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.filter(item => item.label !== 'Khóa học của tôi').map((item, idx, arr) => {
            if (item.label === 'Khóa học' && user) {
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
                  {item.label}
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
                  Khóa học của tôi
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
                {item.label}
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
                Hồ sơ
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary"
              >
                <LogOut size={18} />
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Button onClick={handleLoginClick} variant="outline" className="ml-4">
              Đăng nhập
            </Button>
          )}
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navItems.filter(item => item.label !== 'Khóa học của tôi').map((item, idx, arr) => {
              if (item.label === 'Khóa học' && user) {
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
                    {item.label}
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
                    Khóa học của tôi
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
                  {item.label}
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
                  Hồ sơ
                </Link>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  variant="ghost"
                  className="flex items-center gap-2 justify-center w-full text-gray-600"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLoginClick();
                }}
                variant="outline"
                className="w-full"
              >
                Đăng nhập
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

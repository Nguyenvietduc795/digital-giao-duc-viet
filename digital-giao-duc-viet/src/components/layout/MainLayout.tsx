import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative">
      <button ref={bellRef} onClick={() => setOpen(o => !o)} className="focus:outline-none">
        <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      {open && (
        <div ref={popupRef} className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 border">
          <div className="p-4 border-b font-semibold text-gray-700 flex justify-between items-center">
            <span>Thông báo</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-pink-400 text-lg font-bold focus:outline-none">&times;</button>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            <li className="px-4 py-3 hover:bg-pink-50 cursor-pointer text-sm text-gray-700">Tài liệu mới: "Cú pháp Python cơ bản" đã được đăng.</li>
            <li className="px-4 py-3 hover:bg-pink-50 cursor-pointer text-sm text-gray-700">Bạn có bài tập sắp đến hạn nộp: "Bài tập 2: Biến và kiểu dữ liệu".</li>
            <li className="px-4 py-3 hover:bg-pink-50 cursor-pointer text-sm text-gray-700">Lịch học tuần này đã được cập nhật.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/';
  const showNotificationBell = location.pathname === '/hoc-vien' || location.pathname === '/giao-vien';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      {showNotificationBell && (
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mt-2">
              <NotificationBell />
            </div>
          </div>
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
} 
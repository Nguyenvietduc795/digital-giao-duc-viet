import React from 'react';
import Header from '../Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {children}
      </main>
      {/* Footer có thể thêm sau */}
    </div>
  );
} 
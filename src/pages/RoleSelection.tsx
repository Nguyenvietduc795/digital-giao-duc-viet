
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RoleSelection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Digital Education</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Nền tảng học tập trực tuyến hàng đầu Việt Nam
        </p>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Chọn vai trò của bạn</h2>
        
        <div className="space-y-6">
          <Link to="/hoc-sinh" className="block w-full">
            <Button 
              variant="default" 
              className="w-full py-8 text-xl flex items-center justify-center"
            >
              Tôi là Học sinh
            </Button>
          </Link>
          
          <Link to="/giao-vien" className="block w-full">
            <Button 
              variant="outline" 
              className="w-full py-8 text-xl flex items-center justify-center border-2"
            >
              Tôi là Giáo viên
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-500">
        <p>© 2025 Digital Education - Đồng hành cùng sự phát triển của bạn</p>
      </div>
    </div>
  );
};

export default RoleSelection;

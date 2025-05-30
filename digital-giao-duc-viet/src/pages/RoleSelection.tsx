import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RoleSelection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient/color split */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-pink-100 via-pink-200 via-pink-300 via-pink-400 to-pink-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      <div className="relative z-10 text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text pb-3">Digital Education</h1>
        <p className="text-xl max-w-md mx-auto bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Nền tảng học tập trực tuyến hàng đầu Việt Nam
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Card for Học viên */}
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Học viên</h2>
          <p className="text-gray-600 mb-4">Khám phá các khóa học đa dạng và nâng cao kiến thức chuyên sâu với nền tảng học tập trực tuyến hàng đầu.</p>
          <p className="text-gray-600 mb-8">Khám phá thư viện khóa học phong phú được biên soạn bởi các chuyên gia hàng đầu. Tận hưởng trải nghiệm học tập linh hoạt, cá nhân hóa, theo dõi tiến độ dễ dàng và nhận hỗ trợ tức thời để chinh phục mọi mục tiêu học tập của bạn.</p>
          <Link to="/hoc-sinh" className="block w-full mt-auto">
            <Button
              variant="default"
              className="w-full py-6 text-lg bg-pink-300 hover:bg-pink-400 text-white font-bold"
            >
              Tôi là Học viên
            </Button>
          </Link>
        </div>

        {/* Card for Giáo viên */}
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Giáo viên</h2>
          <p className="text-gray-600 mb-4">Chia sẻ kiến thức, tạo khóa học và kết nối với hàng nghìn học viên trên nền tảng của chúng tôi.</p>
          <p className="text-gray-600 mb-8">Trở thành một phần của cộng đồng giáo viên uy tín. Tận dụng bộ công cụ mạnh mẽ để dễ dàng tạo, quản lý và phát triển các khóa học chuyên sâu. Tiếp cận hàng nghìn học viên tiềm năng và gia tăng thu nhập thông qua nền tảng trực tuyến hàng đầu.</p>
          <Link to="/giao-vien" className="block w-full mt-auto">
            <Button
              variant="default"
              className="w-full py-6 text-lg bg-pink-300 hover:bg-pink-400 text-white font-bold border-0"
            >
              Tôi là Giáo viên
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto text-center text-gray-600">
        <p>© 2025 Digital Education - Đồng hành cùng sự phát triển của bạn</p>
      </div>
    </div>
  );
};

export default RoleSelection;

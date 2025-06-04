import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RoleSelection: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#fcd1e3] via-[#e7b0e6] to-[#a18afc] flex flex-col items-center justify-center p-4">
      {/* Nội dung trang ... */}
      <div className="relative z-10 text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white/80 pb-3">Digital Education</h1>
        <p className="text-xl max-w-md mx-auto text-white/80">Nền tảng học tập trực tuyến hàng đầu Việt Nam</p>
      </div>
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Card for Học viên */}
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center">
          <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#b57be4] to-[#4e9afc] text-transparent bg-clip-text">
            Digital Education
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Học viên</h2>
          <p className="text-gray-600 mb-4">Khám phá các khóa học đa dạng và nâng cao kiến thức chuyên sâu với nền tảng học tập trực tuyến hàng đầu.</p>
          <p className="text-gray-600 mb-8">Khám phá thư viện khóa học phong phú được biên soạn bởi các chuyên gia hàng đầu. Tận hưởng trải nghiệm học tập linh hoạt, cá nhân hóa, theo dõi tiến độ dễ dàng và nhận hỗ trợ tức thời để chinh phục mọi mục tiêu học tập của bạn.</p>
          <Link to="/hoc-sinh" className="block w-full mt-auto">
            <Button
              variant="default"
              className="w-full py-6 text-lg bg-pink-400 hover:bg-pink-500 text-white font-bold"
            >
              Tôi là Học viên
            </Button>
          </Link>
        </div>

        {/* Card for Giáo viên */}
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center">
          <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#b57be4] to-[#4e9afc] text-transparent bg-clip-text">
            Digital Education
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Giáo viên</h2>
          <p className="text-gray-600 mb-4">Chia sẻ kiến thức, tạo khóa học và kết nối với hàng nghìn học viên trên nền tảng của chúng tôi.</p>
          <p className="text-gray-600 mb-8">Trở thành một phần của cộng đồng giáo viên uy tín. Tận dụng bộ công cụ mạnh mẽ để dễ dàng tạo, quản lý và phát triển các khóa học chuyên sâu. Tiếp cận hàng nghìn học viên tiềm năng và gia tăng thu nhập thông qua nền tảng trực tuyến hàng đầu.</p>
          <Link to="/giao-vien" className="block w-full mt-auto">
            <Button
              variant="default"
              className="w-full py-6 text-lg bg-pink-400 hover:bg-pink-500 text-white font-bold border-0"
            >
              Tôi là Giáo viên
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const cloudSrc = '/pngtree-cloud-icon-png-image_10195282-removebg-preview.png';

const RoleSelection: React.FC = () => {
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto chuyển ảnh mỗi 2s
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      // setCarouselIdx(idx => (idx + 1) % featuredCourses.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#fcd1e3] via-[#e7b0e6] to-[#a18afc] flex flex-col items-center justify-center p-4">
      {/* Sóng background lớn phía sau */}
      <img
        src="/wave.svg"
        alt="big wave background"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-15%', // Dịch sang trái để không trùng hoàn toàn
          width: '140%', // To hơn sóng trước nhưng không quá lớn
          height: 'auto',
          zIndex: -2,
          opacity: 0.28, // Nhạt hơn nữa
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'scaleY(1.7)', // Sóng cao hơn
        }}
      />
      {/* Sóng background nhỏ hơn phía trước */}
      <img
        src="/wave.svg"
        alt="wave background"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          zIndex: -1,
          opacity: 0.9, // Rõ nét hơn
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      {/* Clouds */}
      {/* Top Left */}
      <img
        src={cloudSrc}
        alt="cloud"
        className="cloud-anim cloud-top-left pointer-events-none select-none z-0"
        style={{
          position: 'absolute',
          top: 40, // Dời xuống 1 bật (40px)
          left: 0,
          width: 120,
          height: 70,
        }}
      />
      {/* Top Right */}
      <img
        src={cloudSrc}
        alt="cloud"
        className="cloud-anim cloud-top-right pointer-events-none select-none z-0"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 110,
          height: 65,
        }}
      />
      {/* Ba dãy sóng màu trắng phía dưới */}
      {/* White wave background (to, đậm, phía sau, màu trắng, to gấp đôi sóng trắng hiện tại) */}
      <svg
        viewBox="0 0 2880 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="wave-anim-2"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-50%', // Cho sóng dài vượt màn hình
          width: '200%', // To gấp đôi sóng trắng hiện tại
          height: 240,
          zIndex: 1,
          opacity: 0.35,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <path
          d="M0,120 C720,240 2160,0 2880,120 L2880,240 L0,240 Z"
          fill="#fff"
        />
      </svg>
      {/* White wave (nhỏ hơn, nằm trên sóng trắng to, cùng vị trí) */}
      <svg
        viewBox="0 0 2880 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="wave-anim-1"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-50%', // Đảm bảo sóng trắng dài tràn hết màn hình
          width: '200%', // Dài gấp đôi màn hình
          height: 120,
          zIndex: 2,
          opacity: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <path
          d="M0,90 C720,140 2160,20 2880,90 L2880,120 L0,120 Z"
          fill="#fff"
        />
      </svg>
      {/* Nội dung trang ... */}
      <div className="relative z-10 text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-3" style={{
          background: 'linear-gradient(90deg, #e3a6e7 0%, #7ea7f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}>Digital Education</h1>
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
      {/* Boat image chạy từ vị trí dưới card Học viên sang phải */}
      <img
        src="/pngtree-hand-drawn-double-sail-sailboat-illustration-png-image_4708645-removebg-preview.png"
        alt="boat"
        className="boat-anim"
        style={{
          bottom: 20, // Nhích thuyền lên 20px so với mép dưới
          left: -80,
          width: 80,
          height: 'auto',
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
};

export default RoleSelection;

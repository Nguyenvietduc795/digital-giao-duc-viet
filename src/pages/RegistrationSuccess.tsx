import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface LocationState {
  name: string;
  level: string;
}

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  // If no state is passed (direct URL access), redirect to registration page
  if (!state) {
    return <Navigate to="/dang-ky" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 px-6 py-8 text-center">
              <div className="mx-auto rounded-full bg-white w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Đăng ký thành công!</h1>
              <p className="text-green-100">Cảm ơn bạn đã đăng ký học thử tại Digital Education.</p>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Xin chào, {state.name}!</h2>
                <p className="text-gray-600 mb-4">
                  Chúng tôi đã nhận được đăng ký học thử của bạn. Dựa trên thông tin bạn cung cấp, chúng tôi đề xuất bạn nên bắt đầu với các khóa học trình độ <span className="font-semibold">{state.level}</span>.
                </p>
                <div className="bg-pink-50 border border-pink-200 rounded-md p-4 mb-4">
                  <h3 className="font-medium text-pink-800 mb-2">Thông tin buổi học thử</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="font-medium w-32">Thời gian:</span>
                      <span>10:00 - 11:30, {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-32">Hình thức:</span>
                      <span>Trực tuyến qua Zoom</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-32">Giảng viên:</span>
                      <span>Thầy Nguyễn Văn A</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Chúng tôi sẽ gửi email xác nhận cùng với link tham gia buổi học thử trong vòng 24 giờ tới. Vui lòng kiểm tra email của bạn, bao gồm cả thư mục spam.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button asChild className="flex-1">
                  <Link to="/khoa-hoc">Khám phá khóa học</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/hoc-sinh">Quay lại trang chủ</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationSuccess;

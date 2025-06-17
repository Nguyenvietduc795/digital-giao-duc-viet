import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePaidCourses } from '@/context/PaidCoursesContext';
import { supabase } from "@/lib/supabase";

interface LocationState {
  courseId?: number;
  paymentMethod?: 'momo' | 'vnpay' | 'bank';
}

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const { addPaidCourse } = usePaidCourses();
  const { courseId, paymentMethod } = location.state as LocationState;
  const [courseDetails, setCourseDetails] = useState<{ title: string; price: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      addPaidCourse(courseId);

      const fetchCourseDetails = async () => {
        try {
          const { data: course, error } = await supabase
            .from('courses')
            .select('title, price')
            .eq('id', courseId)
            .single();

          if (error) throw error;
          setCourseDetails(course);
        } catch (error) {
          console.error('Error fetching course details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCourseDetails();
    } else {
      setLoading(false);
    }
  }, [courseId, addPaidCourse]);

  // Generate a random order ID
  const orderId = `DGE${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Current date + 1 year for access expiration
  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  const getPaymentMethodName = (method: 'momo' | 'vnpay' | 'bank' | undefined) => {
    switch (method) {
      case 'momo': return 'Ví MoMo';
      case 'vnpay': return 'VNPay';
      case 'bank': return 'Chuyển khoản ngân hàng';
      default: return 'N/A';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 px-6 py-8 text-center">
              <div className="mx-auto rounded-full bg-white w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Thanh toán thành công!</h1>
              <p className="text-green-100">Cảm ơn bạn đã đăng ký khóa học tại Digital Education.</p>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  {courseDetails && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Khóa học:</span>
                      <span className="font-medium">{courseDetails.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Ngày thanh toán:</span>
                    <span>{currentDate.toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Phương thức:</span>
                    <span>{getPaymentMethodName(paymentMethod)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Tổng tiền:</span>
                    {loading ? (
                      <span>Đang tải...</span>
                    ) : courseDetails ? (
                      <span className="font-bold">{courseDetails.price.toLocaleString('vi-VN')}₫</span>
                    ) : (
                      <span className="font-bold">N/A</span>
                    )}
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Quyền truy cập:</span>
                    <span>Đến ngày {expirationDate.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Các bước tiếp theo:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Kiểm tra email xác nhận đã được gửi tới hòm thư của bạn.</li>
                  <li>Đăng nhập vào tài khoản học viên để bắt đầu học ngay.</li>
                  <li>Truy cập đầy đủ vào tất cả các nội dung khóa học.</li>
                  <li>Liên hệ hỗ trợ nếu bạn gặp bất kỳ vấn đề nào.</li>
                </ol>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-700">
                        Nếu bạn không nhận được email xác nhận trong vòng 15 phút, vui lòng kiểm tra thư mục spam hoặc liên hệ với chúng tôi qua hotline: 028 1234 5678.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button asChild className="flex-1">
                  <Link to="/hoc-vien">Đi đến trang học viên</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/khoa-hoc">Khám phá thêm khóa học</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;

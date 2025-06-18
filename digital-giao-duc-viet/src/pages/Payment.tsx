import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/lib/supabase";

// QR code mẫu cho các phương thức thanh toán
const PAYMENT_QR_CODES = {
  momo: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=momo://payment?ref=123456",
  vnpay: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=vnpay://payment?ref=789012",
  bank: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bank://transfer?acc=123456789"
};

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
};

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'bank'>('momo');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Lấy ID khóa học từ state của navigation nếu có
  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state?.courseId) {
      setSelectedCourse(location.state.courseId);
      console.log("Selected course ID from state:", location.state.courseId);
    }
  }, [location.state]);

  // Lấy danh sách khóa học từ Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Không thể tải danh sách khóa học');
      }
    };

    fetchCourses();
  }, []);

  const handlePayment = async () => {
    if (!selectedCourse) {
      toast.error("Vui lòng chọn khóa học");
      return;
    }

    setLoading(true);
    
    try {
      // Lấy thông tin người dùng hiện tại
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw new Error("Không thể xác thực người dùng");
      if (!user) throw new Error("Vui lòng đăng nhập để thanh toán");

      // Kiểm tra vai trò người dùng
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw new Error("Không thể kiểm tra thông tin người dùng");
      if (profile.role !== 'student') throw new Error("Chỉ học viên mới có thể đăng ký khóa học");

      // Kiểm tra khóa học và lấy giá
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('price')
        .eq('id', selectedCourse)
        .single();

      if (courseError) throw new Error("Không thể tìm thấy khóa học");
      if (!course) throw new Error("Khóa học không tồn tại");

      // Ghi nhận thanh toán
      const { error: paymentError } = await supabase
        .from('course_payments')
        .insert({
          user_id: user.id,
          course_id: selectedCourse,
          price: course.price,
          payment_method: paymentMethod,
          created_at: new Date().toISOString()
        });

      if (paymentError) throw new Error("Không thể ghi nhận thanh toán");

      // Thành công
      toast.success("Thanh toán thành công!");
      navigate('/thanh-toan/thanh-cong', { state: { courseId: selectedCourse, paymentMethod: paymentMethod } });
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Thanh toán khóa học</h1>
        
        {/* Phần chọn khóa học */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Khóa học</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCourse === course.id ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCourse(course.id)}
              >
                {course.image_url && (
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                <p className="text-primary font-bold">
                  {course.price.toLocaleString('vi-VN')}đ
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phần chọn phương thức thanh toán */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <div 
              className={`border rounded-md p-4 flex items-center cursor-pointer ${
                paymentMethod === 'momo' ? 'border-primary' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('momo')}
            >
              <div className={`w-5 h-5 rounded-full border mr-3 ${
                paymentMethod === 'momo' ? 'border-4 border-primary' : 'border border-gray-300'
              }`}></div>
              <div className="bg-pink-500 text-white px-3 py-1 rounded-md mr-3">
                MoMo
              </div>
              <span>Ví MoMo</span>
            </div>

            <div 
              className={`border rounded-md p-4 flex items-center cursor-pointer ${
                paymentMethod === 'vnpay' ? 'border-primary' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('vnpay')}
            >
              <div className={`w-5 h-5 rounded-full border mr-3 ${
                paymentMethod === 'vnpay' ? 'border-4 border-primary' : 'border border-gray-300'
              }`}></div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-md mr-3">
                VNPay
              </div>
              <span>VNPay</span>
            </div>

            <div 
              className={`border rounded-md p-4 flex items-center cursor-pointer ${
                paymentMethod === 'bank' ? 'border-primary' : 'border-gray-200'
              }`}
              onClick={() => setPaymentMethod('bank')}
            >
              <div className={`w-5 h-5 rounded-full border mr-3 ${
                paymentMethod === 'bank' ? 'border-4 border-primary' : 'border border-gray-300'
              }`}></div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-md mr-3">
                Bank
              </div>
              <span>Chuyển khoản ngân hàng</span>
            </div>
          </div>

          {/* Hiển thị QR Code */}
          {paymentMethod && (
            <div className="mt-6 p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quét mã QR để thanh toán</h3>
              <div className="flex flex-col items-center">
                <img 
                  src={PAYMENT_QR_CODES[paymentMethod]} 
                  alt={`QR Code ${paymentMethod}`}
                  className="w-48 h-48 mb-4"
                />
                <p className="text-sm text-gray-600">
                  {paymentMethod === 'momo' && 'Mở ứng dụng MoMo và quét mã QR để thanh toán'}
                  {paymentMethod === 'vnpay' && 'Mở ứng dụng VNPay và quét mã QR để thanh toán'}
                  {paymentMethod === 'bank' && 'Quét mã QR để xem thông tin chuyển khoản'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Nút thanh toán */}
        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

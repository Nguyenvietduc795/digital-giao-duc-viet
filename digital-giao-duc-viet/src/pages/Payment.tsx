
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type PackageType = 'single' | 'combo' | 'test';

interface PackageOption {
  id: PackageType;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('single');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'zalopay' | 'bank'>('momo');
  const [loading, setLoading] = useState(false);

  const packages: PackageOption[] = [
    {
      id: 'single',
      name: 'Khóa học đơn lẻ',
      price: '1.990.000₫',
      features: [
        'Truy cập 1 khóa học trong 6 tháng',
        'Bài tập và dự án thực hành',
        'Chứng chỉ hoàn thành',
        'Hỗ trợ qua email'
      ]
    },
    {
      id: 'combo',
      name: 'Combo khóa học',
      price: '4.490.000₫',
      features: [
        'Truy cập 3 khóa học trong 12 tháng',
        'Bài tập và dự án thực hành',
        'Chứng chỉ hoàn thành',
        'Hỗ trợ qua email và Zoom',
        'Giảm 25% so với mua lẻ'
      ],
      recommended: true
    },
    {
      id: 'test',
      name: 'Gói luyện thi',
      price: '3.490.000₫',
      features: [
        'Khóa học và tài liệu luyện thi',
        '10 bài thi thử & đánh giá',
        'Tư vấn hướng nghiệp 1-1',
        'Hỗ trợ qua email và Zoom',
        'Bảo đảm đạt kết quả'
      ]
    }
  ];

  const handlePayment = () => {
    setLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      toast.success("Thanh toán thành công!");
      navigate('/thanh-toan/thanh-cong');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-bold text-white">Chọn gói khóa học</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`border rounded-md p-6 relative cursor-pointer transition-all ${
                        selectedPackage === pkg.id 
                          ? 'border-primary shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      } ${pkg.recommended ? 'md:transform md:-translate-y-2' : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.recommended && (
                        <div className="absolute top-0 right-0 bg-secondary text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2">
                          Phổ biến nhất
                        </div>
                      )}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-primary mt-2">{pkg.price}</div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2 mt-1">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <div className={`w-6 h-6 rounded-full border ${
                          selectedPackage === pkg.id 
                            ? 'border-4 border-primary' 
                            : 'border border-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-primary px-6 py-4">
                <h2 className="text-xl font-bold text-white">Phương thức thanh toán</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      paymentMethod === 'zalopay' ? 'border-primary' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('zalopay')}
                  >
                    <div className={`w-5 h-5 rounded-full border mr-3 ${
                      paymentMethod === 'zalopay' ? 'border-4 border-primary' : 'border border-gray-300'
                    }`}></div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-md mr-3">
                      ZaloPay
                    </div>
                    <span>ZaloPay</span>
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
                    <span>Chuyển khoản</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gói khóa học</span>
                    <span>
                      {packages.find(pkg => pkg.id === selectedPackage)?.name || ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá gốc</span>
                    <span>
                      {packages.find(pkg => pkg.id === selectedPackage)?.price || ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương thức thanh toán</span>
                    <span>
                      {paymentMethod === 'momo' ? 'Ví MoMo' : 
                       paymentMethod === 'zalopay' ? 'ZaloPay' : 'Chuyển khoản'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {packages.find(pkg => pkg.id === selectedPackage)?.price || ''}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handlePayment} 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
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

export default Payment;

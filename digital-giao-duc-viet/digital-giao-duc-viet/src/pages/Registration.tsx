import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    goal: '',
    experience: 'beginner'
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ");
      return false;
    }

    // Basic phone validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goal) {
      toast.error("Vui lòng chia sẻ mục tiêu học tập của bạn");
      return;
    }

    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      
      // Display success message
      toast.success("Đăng ký học thử thành công!");
      
      // Assign level based on experience (just for visual simulation)
      let assignedLevel = '';
      switch (formData.experience) {
        case 'beginner':
          assignedLevel = 'Cơ bản';
          break;
        case 'intermediate':
          assignedLevel = 'Trung cấp';
          break;
        case 'advanced':
          assignedLevel = 'Nâng cao';
          break;
        default:
          assignedLevel = 'Cơ bản';
      }
      
      // Redirect to confirmation page after successful submission
      navigate('/dang-ky/thanh-cong', { state: { name: formData.fullName, level: assignedLevel } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h1 className="text-xl font-bold text-white">Đăng ký học thử</h1>
              <p className="text-pink-100">Trải nghiệm khóa học miễn phí và khám phá phương pháp học tập hiệu quả.</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                    1
                  </div>
                  <div className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                    2
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm font-medium">Thông tin cá nhân</span>
                  <span className="text-sm font-medium">Mục tiêu học tập</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="0912345678"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="button" 
                        onClick={handleNextStep} 
                        className="w-full"
                      >
                        Tiếp tục
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm của bạn</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      >
                        <option value="beginner">Mới bắt đầu</option>
                        <option value="intermediate">Đã có kiến thức cơ bản</option>
                        <option value="advanced">Đã có nhiều kinh nghiệm</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu học tập</label>
                      <textarea
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Chia sẻ mục tiêu học tập của bạn..."
                      ></textarea>
                    </div>

                    <div className="flex items-center pt-4 space-x-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setStep(1)} 
                        className="flex-1"
                      >
                        Quay lại
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? 'Đang xử lý...' : 'Đăng ký học thử'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;

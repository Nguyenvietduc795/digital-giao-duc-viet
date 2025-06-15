import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/courseData';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'teacher' | 'faq'>('overview');

  // Find the course based on the ID from URL params
  const course = courses.find(course => course.id === Number(id));

  // If course not found
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
            <p className="text-gray-600 mb-6">Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
              <Link to="/khoa-hoc">Quay lại danh sách khóa học</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-r from-pink-600 to-pink-500 relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <span className="bg-pink-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                  {course.category}
                </span>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <div className="flex items-center">
                  <span className="mr-4">Giảng viên: {course.teacher}</span>
                  <span className="mr-4">Trình độ: {course.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Course Details */}
            <div className="lg:col-span-2">
              {/* Tabs Navigation */}
              <div className="bg-white rounded-lg shadow-md mb-8">
                <div className="flex border-b">
                  <button 
                    className={`px-4 py-3 text-center flex-1 ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Tổng quan
                  </button>
                  <button 
                    className={`px-4 py-3 text-center flex-1 ${activeTab === 'curriculum' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('curriculum')}
                  >
                    Chương trình học
                  </button>
                  <button 
                    className={`px-4 py-3 text-center flex-1 ${activeTab === 'teacher' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('teacher')}
                  >
                    Giảng viên
                  </button>
                  <button 
                    className={`px-4 py-3 text-center flex-1 ${activeTab === 'faq' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('faq')}
                  >
                    FAQ
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Giới thiệu khóa học</h2>
                      <p className="text-gray-700 mb-4">
                        {course.description}
                      </p>
                      <p className="text-gray-700 mb-4">
                        Khóa học này được thiết kế để giúp học viên nắm vững kiến thức và kỹ năng cần thiết trong lĩnh vực {course.category.toLowerCase()}. Với phương pháp giảng dạy hiện đại, kết hợp giữa lý thuyết và thực hành, học viên sẽ có cơ hội áp dụng kiến thức vào các dự án thực tế.
                      </p>
                      <h3 className="text-lg font-bold mb-2">Bạn sẽ học được gì</h3>
                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>Nắm vững kiến thức nền tảng về {course.title.toLowerCase()}</li>
                        <li>Phát triển kỹ năng thực hành thông qua các bài tập và dự án</li>
                        <li>Hiểu và áp dụng được các nguyên lý cốt lõi vào thực tế</li>
                        <li>Tự tin giải quyết các vấn đề trong lĩnh vực {course.category.toLowerCase()}</li>
                      </ul>
                      <h3 className="text-lg font-bold mb-2">Đối tượng phù hợp</h3>
                      <p className="text-gray-700">
                        Khóa học phù hợp với những học viên có trình độ {course.level.toLowerCase()}, mong muốn phát triển và nâng cao kỹ năng trong lĩnh vực {course.category.toLowerCase()}.
                      </p>
                    </div>
                  )}

                  {activeTab === 'curriculum' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Chương trình học</h2>
                      <div className="space-y-4">
                        <div className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-4 font-medium">
                            Phần 1: Giới thiệu
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 1: Tổng quan về {course.title}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 2: Cài đặt môi trường làm việc</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-4 font-medium">
                            Phần 2: Kiến thức cơ bản
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 3: Nguyên lý hoạt động</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 4: Các kỹ thuật cơ bản</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 5: Giải quyết vấn đề đơn giản</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-md overflow-hidden">
                          <div className="bg-gray-50 p-4 font-medium">
                            Phần 3: Kiến thức nâng cao
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 6: Phương pháp tiếp cận nâng cao</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 7: Dự án thực tế</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">✅</span>
                              <span>Bài 8: Đánh giá và tối ưu hóa</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'teacher' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Thông tin giảng viên</h2>
                      <div className="flex items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mr-6">
                          <img 
                            src={`https://i.pravatar.cc/200?u=${course.teacher}`} 
                            alt={course.teacher} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{course.teacher}</h3>
                          <p className="text-gray-600 mb-2">Chuyên gia trong lĩnh vực {course.category}</p>
                          <p className="text-gray-600">5+ năm kinh nghiệm giảng dạy</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {course.teacher} là một giảng viên đầy nhiệt huyết và giàu kinh nghiệm trong lĩnh vực {course.category.toLowerCase()}. Với hơn 5 năm kinh nghiệm giảng dạy, giảng viên đã đào tạo hàng nghìn học viên và nhận được nhiều phản hồi tích cực.
                      </p>
                      <p className="text-gray-700">
                        Ngoài việc giảng dạy, giảng viên còn tham gia vào nhiều dự án thực tế, mang lại cho học viên những kinh nghiệm và kiến thức thực tế, cập nhật nhất trong ngành.
                      </p>
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Khóa học này có phù hợp với người mới bắt đầu không?</h3>
                          <p className="text-gray-700">
                            {course.level === "Cơ bản" 
                              ? "Khóa học này được thiết kế đặc biệt cho người mới bắt đầu, không yêu cầu kiến thức nền tảng trước đó." 
                              : "Khóa học này yêu cầu học viên có kiến thức cơ bản trong lĩnh vực này. Nếu bạn là người mới bắt đầu, chúng tôi khuyên bạn nên học các khóa cơ bản trước."}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Thời gian hoàn thành khóa học là bao lâu?</h3>
                          <p className="text-gray-700">
                            Khóa học kéo dài 8 tuần với 2 buổi học mỗi tuần. Mỗi buổi học kéo dài khoảng 2 giờ. Ngoài ra, bạn cần dành thêm thời gian để hoàn thành bài tập và dự án.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Tôi có được cấp chứng chỉ sau khi hoàn thành khóa học không?</h3>
                          <p className="text-gray-700">
                            Có, bạn sẽ nhận được chứng chỉ hoàn thành khóa học sau khi hoàn thành tất cả các bài học và dự án. Chứng chỉ này có thể được chia sẻ trên LinkedIn và các nền tảng khác.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Tôi có thể học lại các bài học đã qua không?</h3>
                          <p className="text-gray-700">
                            Có, bạn có thể truy cập lại tất cả các bài học trong khóa học bất cứ lúc nào sau khi đăng ký. Tài khoản của bạn sẽ có quyền truy cập vĩnh viễn vào nội dung khóa học.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Làm thế nào để tôi có thể liên hệ với giảng viên nếu có thắc mắc?</h3>
                          <p className="text-gray-700">
                            Bạn có thể đặt câu hỏi trong diễn đàn của khóa học hoặc gửi email trực tiếp cho giảng viên. Các câu hỏi thường được trả lời trong vòng 24-48 giờ.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Course Registration */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Đăng ký khóa học</h3>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Học phí:</span>
                    <span className="text-2xl font-bold text-primary">1.990.000₫</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Thanh toán một lần, truy cập vĩnh viễn
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Truy cập toàn bộ nội dung khóa học</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Hỗ trợ trực tiếp từ giảng viên</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Chứng chỉ hoàn thành khóa học</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Bài tập và dự án thực tế</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link to="/thanh-toan">Đăng ký ngay</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dang-ky">Đăng ký học thử</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;

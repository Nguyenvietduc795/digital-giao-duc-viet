import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pink-500">
      <main className="flex-grow py-8 bg-pink-50">
        {/* Hero Section */}
        <section className="bg-pink-500 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Học tập là hành trình khám phá không ngừng
                </h1>
                <p className="text-lg mb-6 max-w-lg">
                  Digital Education cung cấp các khóa học chất lượng cao, giúp bạn phát triển kỹ năng và đạt được mục tiêu học tập trong thời đại số.
                </p>
                <Button asChild size="lg" className="bg-secondary text-black hover:bg-yellow-300">
                  <Link to="/dang-ky">Đăng ký học thử</Link>
                </Button>
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Học sinh đang học" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Khám phá lĩnh vực yêu thích</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-8 flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" 
                  alt="Lập trình" 
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-bold mb-3">Khóa học lập trình & CNTT</h3>
                <p className="text-gray-600 mb-4">
                  Học lập trình với các ngôn ngữ hot nhất, phát triển web, ứng dụng di động, trí tuệ nhân tạo và nhiều lĩnh vực CNTT khác.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link to="/khoa-hoc" className="flex items-center">
                    Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="card p-8 flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" 
                  alt="Tiếng Anh" 
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-bold mb-3">Khóa học tiếng Anh & chứng chỉ</h3>
                <p className="text-gray-600 mb-4">
                  Luyện thi IELTS, TOEIC, tiếng Anh giao tiếp và các khóa học ngôn ngữ chất lượng cao với giáo viên giỏi.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link to="/khoa-hoc" className="flex items-center">
                    Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn Digital Education?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Chất lượng hàng đầu</h3>
                <p className="text-gray-600">
                  Đội ngũ giảng viên giàu kinh nghiệm, chương trình học được thiết kế chuyên sâu.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Học phí hợp lý</h3>
                <p className="text-gray-600">
                  Mức học phí phù hợp với nhiều đối tượng học viên, cam kết chất lượng tương xứng.
                </p>
              </div>
              
              <div className="card text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Học linh hoạt</h3>
                <p className="text-gray-600">
                  Học mọi lúc, mọi nơi với nền tảng học trực tuyến thân thiện và dễ sử dụng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sẵn sàng bắt đầu hành trình học tập của bạn?
            </h2>
            <p className="text-white text-lg mb-8 max-w-xl mx-auto">
              Đăng ký học thử miễn phí ngay hôm nay và trải nghiệm phương pháp học hiệu quả tại Digital Education.
            </p>
            <Button asChild size="lg" className="bg-secondary text-black hover:bg-yellow-300">
              <Link to="/dang-ky">Đăng ký học thử miễn phí</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

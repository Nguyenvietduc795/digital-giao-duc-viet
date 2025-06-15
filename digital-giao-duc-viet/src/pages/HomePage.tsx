import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Slider images cho phần nền hero
const sliderImages = [
  "https://images.unsplash.com/photo-1503676382389-4809596d5290", // ảnh trường học tung mũ tốt nghiệp
  "https://images.unsplash.com/photo-1513258496099-48168024aec0", // ảnh nhóm học sinh học tập
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"  // ảnh màn hình code
];

// Slider images cho carousel khóa học tiêu biểu
const featuredSliderImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
];

const heroImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

const HomePage: React.FC = () => {
  const [sliderIdx, setSliderIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIdx(idx => (idx + 1) % sliderImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-pink-500">
      <main className="flex-grow pt-0 pb-8 bg-pink-50">
        {/* Hero Section */}
        <section className="relative pt-0 md:pt-4 pb-8 md:pb-16">
          <div className="w-full px-0 relative flex justify-center">
            {/* Ảnh lớn nằm bên trên, phủ lên khối hồng bán trong suốt */}
            <div className="hidden md:block">
              <img
                src={heroImage}
                alt="Học sinh đang học"
                className="absolute z-20 rounded-2xl shadow-2xl"
                style={{
                  right: "4vw", // luôn cách phải 1 khoảng nhỏ, responsive
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28vw", // responsive theo viewport width
                  maxWidth: 420,
                  minWidth: 240,
                  height: "38vw", // responsive theo viewport height
                  maxHeight: 340,
                  minHeight: 180,
                  objectFit: "cover",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)"
                }}
              />
            </div>
            {/* Khối màu hồng bán trong suốt với slider nền và nội dung */}
            <div
              // === CHỈNH KÍCH THƯỚC KHỐI MÀU HỒNG BÁN TRONG SUỐT Ở ĐÂY ===
              className="relative w-full rounded-2xl overflow-hidden shadow-lg min-h-[600px] flex items-center justify-start"
              style={{ width: "100vw", maxWidth: "100vw" }} // <-- full chiều dài màn hình
            >
              {/* Slider nền phủ toàn bộ */}
              <img
                src={sliderImages[sliderIdx]}
                alt={`slide ${sliderIdx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{zIndex: 0, filter: "blur(2px) brightness(0.7)"}}
              />
              {/* Overlay hồng bán trong suốt */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(244, 143, 177, 0.85) 0%, rgba(123, 104, 238, 0.85) 100%)"
                }}
              />
              {/* Nội dung nằm trên cùng */}
              <div className="relative z-20 p-10 md:p-14 flex flex-col justify-center items-start w-full md:w-3/5">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                  Học tập là hành trình khám phá không ngừng
                </h1>
                <p className="text-lg mb-6 max-w-xl text-white drop-shadow flex items-center gap-2">
                  cung cấp các khóa học chất lượng cao, giúp bạn phát triển kỹ năng và đạt được mục tiêu học tập trong thời đại số.
                </p>
                <Button asChild size="lg" className="bg-yellow-300 text-black hover:bg-yellow-400">
                  <Link to="/dang-ky">Đăng ký học thử</Link>
                </Button>
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

        {/* Carousel khóa học tiêu biểu ở phần giao nhau giữa hồng và trắng */}
        <div className="w-full flex justify-center" style={{ marginTop: '30px', marginBottom: '30px' }}>
          <div className="relative w-full max-w-6xl h-[480px] flex flex-col items-center">
            {/* Carousel images */}
            <div id="carousel-images" className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center relative">
              <img
                src={featuredSliderImages[sliderIdx]}
                alt={`slide ${sliderIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                draggable={false}
              />
              {sliderIdx === 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-xl shadow text-xl font-bold text-pink-500">
                  IELTS 6.0+ trong 3 tháng
                </div>
              )}
              {sliderIdx === 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-xl shadow text-xl font-bold text-pink-500">
                  TOEIC 750+ trong 2 tháng
                </div>
              )}
              {sliderIdx === 2 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-xl shadow text-xl font-bold text-pink-500">
                  Lập trình Python cơ bản
                </div>
              )}
            </div>
            {/* Dots and controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {featuredSliderImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-5 h-5 rounded-full border-2 border-white ${sliderIdx === idx ? 'bg-pink-400' : 'bg-gray-300'} transition-all`}
                  style={{ boxShadow: sliderIdx === idx ? '0 0 0 2px #f472b6' : undefined }}
                  onClick={() => setSliderIdx(idx)}
                  aria-label={`Chọn ảnh ${idx + 1}`}
                />
              ))}
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <button
                onClick={() => setSliderIdx((sliderIdx - 1 + featuredSliderImages.length) % featuredSliderImages.length)}
                className="bg-white/90 hover:bg-white rounded-full shadow-xl p-4 text-2xl"
                aria-label="Trước"
                style={{ minWidth: 56, minHeight: 56 }}
              >
                &#8592;
              </button>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <button
                onClick={() => setSliderIdx((sliderIdx + 1) % featuredSliderImages.length)}
                className="bg-white/90 hover:bg-white rounded-full shadow-xl p-4 text-2xl"
                aria-label="Sau"
                style={{ minWidth: 56, minHeight: 56 }}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default HomePage;

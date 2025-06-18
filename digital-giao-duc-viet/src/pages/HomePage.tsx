import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { courses } from '../data/courseData'; // Import courses
import CourseCard from '@/components/CourseCard'; // Import CourseCard
import useInViewAnimation from '../hooks/useInViewAnimation'; // Import the custom hook

// Slider content linked to courses
const heroSliderContent = [
  {
    courseId: "de1a9152-85ea-42a7-b654-1cbe8422f5c0", // Luyện nói tiếng Anh giao tiếp
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  },
  {
    courseId: "0e5ca3cc-9477-441e-bf09-30c94d6c8d46", // IELTS 6.0+ trong 3 tháng
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  },
  {
    courseId: "1b1ff90a-f8ca-421e-96a0-1ea50041cf74", // TOEIC 750+ trong 2 tháng
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    courseId: "aa205b7a-01af-47a6-a62f-2679da9946bf", // Lập trình Python cơ bản
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  }
];

const HomePage: React.FC = () => {
  const [sliderIdx, setSliderIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIdx(idx => (idx + 1) % heroSliderContent.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSliderContent[sliderIdx];
  const currentCourse = courses.find(course => course.id === currentSlide.courseId);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-0 pb-8">
        {/* Hero Section (formerly Featured Courses Carousel) */}
        <section className="relative pt-0 pb-8 md:pb-16">
          <div className="w-full px-0 relative flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg min-h-[800px] flex items-center justify-start" style={{ width: "100vw", maxWidth: "100vw" }}>
              <div id="carousel-images" className="w-full h-[650px] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center relative">
                <img
                  src={currentSlide.image}
                  alt={`slide ${sliderIdx + 1}`}
                  className="w-full h-full object-cover transition-all duration-550"
                  draggable={false}
                />
                {currentCourse && (
                  <div className="absolute top-2/4 left+1/2 -translate-x-1/3 -translate-y-1/3 flex flex-col items-center text-center bg-white/80 p-6 rounded-lg shadow-xl max-w-lg animate__animated animate__fadeInUp animate__faster">
                    <h2 className="text-3xl font-bold text-pink-700 mb-2">{currentCourse.title}</h2>
                    <p className="text-gray-800 text-lg mb-4 line-clamp-2">{currentCourse.description}</p>
                    <Button asChild size="lg" className="bg-pink-500 text-white hover:bg-pink-600">
                      <Link to={`/khoa-hoc/${currentCourse.id}`}>Đăng ký học ngay</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                  {heroSliderContent.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-5 h-5 rounded-full border-2 border-white ${sliderIdx === idx ? 'bg-pink-400' : 'bg-gray-300'} transition-all`}
                      style={{ boxShadow: sliderIdx === idx ? '0 0 0 2px #f472b6' : undefined }}
                      onClick={() => setSliderIdx(idx)}
                      aria-label={`Chọn ảnh ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <PopularCoursesSection courses={courses} />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Courses Categories */}
        <CoursesCategories />

        {/* Features */}
        <FeaturesSection />

        {/* CTA Section */}
        <CtaSection />
      </main>
    </div>
  );
};

interface HeroTextBoxProps {
  currentCourse: typeof courses[0];
}

const HeroTextBox: React.FC<HeroTextBoxProps> = ({ currentCourse }) => {
  const [ref, isInView] = useInViewAnimation<HTMLDivElement>(0.1); // Adjust threshold as needed
  return (
    <div
      ref={ref}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center bg-white/80 p-6 rounded-lg shadow-xl max-w-lg ${
        isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'
      }`}
    >
      <h2 className="text-3xl font-bold text-pink-700 mb-2">{currentCourse.title}</h2>
      <p className="text-gray-800 text-lg mb-4 line-clamp-2">{currentCourse.description}</p>
      <Button asChild size="lg" className="bg-pink-500 text-white hover:bg-pink-600">
        <Link to={`/khoa-hoc/${currentCourse.id}`}>Đăng ký học ngay</Link>
      </Button>
    </div>
  );
};

interface PopularCoursesSectionProps {
  courses: typeof courses;
}

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({ courses }) => {
  const [ref, isInView] = useInViewAnimation<HTMLElement>(0.1);
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>Khóa học nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.slice(0, 4).map(course => (
            <CourseCard key={course.id} course={course} isPaid={false} className={`${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const [ref, isInView] = useInViewAnimation<HTMLElement>(0.1);
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>Lời chứng thực từ học viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className={`bg-white p-6 rounded-lg shadow-md ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <p className="text-gray-700 italic mb-4">"Chương trình học rất thực tế và giảng viên tận tâm. Tôi đã nâng cao kỹ năng lập trình đáng kể!"</p>
            <p className="font-semibold text-pink-700">- Nguyễn Văn A</p>
            <p className="text-sm text-gray-600">Học viên khóa Lập trình Python</p>
          </div>
          {/* Testimonial 2 */}
          <div className={`bg-white p-6 rounded-lg shadow-md ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <p className="text-gray-700 italic mb-4">"Khóa học IELTS đã giúp tôi đạt được mục tiêu 6.5 chỉ sau 3 tháng. Rất khuyến khích!"</p>
            <p className="font-semibold text-pink-700">- Trần Thị B</p>
            <p className="text-sm text-gray-600">Học viên khóa IELTS</p>
          </div>
          {/* Testimonial 3 */}
          <div className={`bg-white p-6 rounded-lg shadow-md ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <p className="text-gray-700 italic mb-4">"Nền tảng học trực tuyến rất dễ sử dụng và linh hoạt. Tôi có thể học mọi lúc, mọi nơi."</p>
            <p className="font-semibold text-pink-700">- Lê Văn C</p>
            <p className="text-sm text-gray-600">Học viên khóa Thiết kế Web</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesCategories: React.FC = () => {
  const [ref, isInView] = useInViewAnimation<HTMLElement>(0.1);
  return (
    <section ref={ref} className="pt-8 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>Khám phá lĩnh vực yêu thích</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" 
              alt="Lập trình" 
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold mb-3 text-gray-800">Khóa học lập trình & CNTT</h3>
            <p className="text-gray-600 mb-4">
              Học lập trình với các ngôn ngữ hot nhất, phát triển web, ứng dụng di động, trí tuệ nhân tạo và nhiều lĩnh vực CNTT khác.
            </p>
            <Button asChild className="bg-pink-500 text-white hover:bg-pink-600 mt-auto">
              <Link to="/khoa-hoc" className="flex items-center">
                Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className={`bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" 
              alt="Tiếng Anh" 
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold mb-3 text-gray-800">Khóa học tiếng Anh & chứng chỉ</h3>
            <p className="text-gray-600 mb-4">
              Luyện thi IELTS, TOEIC, tiếng Anh giao tiếp và các khóa học ngôn ngữ chất lượng cao với giáo viên giỏi.
            </p>
            <Button asChild className="bg-pink-500 text-white hover:bg-pink-600 mt-auto">
              <Link to="/khoa-hoc" className="flex items-center">
                Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  const [ref, isInView] = useInViewAnimation<HTMLElement>(0.1);
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>Tại sao chọn Digital Education?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Chất lượng hàng đầu</h3>
            <p className="text-gray-600">
              Đội ngũ giảng viên giàu kinh nghiệm, chương trình học được thiết kế chuyên sâu.
            </p>
          </div>
          
          <div className={`bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Học phí hợp lý</h3>
            <p className="text-gray-600">
              Mức học phí phù hợp với nhiều đối tượng học viên, cam kết chất lượng tương xứng.
            </p>
          </div>
          
          <div className={`bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Học linh hoạt</h3>
            <p className="text-gray-600">
              Học mọi lúc, mọi nơi với nền tảng học trực tuyến thân thiện và dễ sử dụng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => {
  const [ref, isInView] = useInViewAnimation<HTMLElement>(0.1);
  return (
    <section ref={ref} className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl font-bold text-white mb-6 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
          Sẵn sàng bắt đầu hành trình học tập của bạn?
        </h2>
        <p className={`text-white text-lg mb-8 max-w-xl mx-auto ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
          Đăng ký học thử miễn phí ngay hôm nay và trải nghiệm phương pháp học hiệu quả tại Digital Education.
        </p>
        <Button asChild size="lg" className={`bg-yellow-400 text-white font-bold shadow-xl hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1 ${isInView ? 'animate__animated animate__fadeInUp animate__faster' : 'opacity-0'}`}>
          <Link to="/dang-ky">Đăng ký học thử miễn phí</Link>
        </Button>
      </div>
    </section>
  );  
};

export default HomePage;

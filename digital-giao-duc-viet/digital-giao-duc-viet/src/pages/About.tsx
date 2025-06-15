import React from 'react';
import { Info, Target, GraduationCap, Rocket, Users, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="relative flex justify-center items-start min-h-[calc(100vh-80px)] py-8 bg-gradient-to-br from-[#fddde6] via-[#fbeff4] to-[#f8c6d8] overflow-hidden">
      {/* Nền trang trí */}
      <div className="absolute inset-0 -z-20">
        <img src="/profile-bg.svg" alt="bg" className="w-full h-full object-cover opacity-70" />
        {/* Blob lớn */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] bg-pink-200 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] bg-pink-100 opacity-10 rounded-full blur-2xl"></div>
        {/* Chấm tròn lớn nổi bật */}
        <div className="absolute top-[120px] left-[calc(50%-180px)] w-32 h-32 bg-pink-300 opacity-50 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-[120px] right-[calc(50%-180px)] w-24 h-24 bg-pink-400 opacity-40 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[60%] left-[20%] w-20 h-20 bg-pink-200 opacity-50 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[30%] right-[15%] w-16 h-16 bg-pink-400 opacity-30 rounded-full blur animate-pulse"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto px-2 relative z-10">
        <div className="rounded-3xl shadow-2xl bg-white/80 border border-white/40 backdrop-blur-xl relative overflow-hidden pt-10 pb-10 px-8 mb-8">
          {/* Tiêu đề */}
          <div className="flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-pink-400 mr-2" />
            <h1 className="text-3xl font-bold text-center text-pink-500">Về Chúng Tôi - Digital Education</h1>
          </div>
          <p className="text-xl text-gray-700 text-center mb-6">
            Trong một thế giới đang chuyển mình mạnh mẽ bởi công nghệ, <strong className="text-pink-500">giáo dục không còn là đặc quyền, mà là quyền lợi của tất cả mọi người</strong>.
          </p>
          {/* Vision Section */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-6 text-center">
              Chúng tôi tin rằng <em className="text-pink-500 font-medium">"mỗi cá nhân đều có tiềm năng vươn xa nếu được tiếp cận đúng tri thức, đúng phương pháp và đúng thời điểm"</em>.<br/>
              Digital Education không chỉ đơn thuần là một nền tảng học trực tuyến, mà là một hệ sinh thái giáo dục toàn diện – nơi mọi người có thể học hỏi, kết nối và phát triển bền vững.
            </p>
          </div>
          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-pink-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Sứ Mệnh Của Chúng Tôi</h2>
            </div>
            <div className="bg-white/80 rounded-2xl shadow p-6 mb-4">
              <p className="text-lg text-gray-600 text-center">
                Sứ mệnh của chúng tôi là <strong className="text-pink-500">"Mang lại cơ hội học tập chất lượng cao cho mọi người, không phân biệt độ tuổi, nghề nghiệp hay nơi sinh sống"</strong>.<br/>
                Dù bạn là học sinh, sinh viên, người đi làm hay người đang tìm hướng đi mới, Digital Education đều có thể trở thành người bạn đồng hành đáng tin cậy trong hành trình học tập của bạn.
              </p>
            </div>
          </div>
          {/* Features Grid */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Chúng Tôi Có Gì Đặc Biệt?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon={<GraduationCap className="w-6 h-6" />} 
              title="500+ Khóa Học Chất Lượng" 
              description="Được thiết kế bởi các chuyên gia đầu ngành, từ cơ bản đến nâng cao" 
            />
            <FeatureCard 
              icon={<Rocket className="w-6 h-6" />} 
              title="Nội Dung Cập Nhật" 
              description="Bám sát xu hướng thực tiễn và nhu cầu thị trường" 
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />} 
              title="Cộng Đồng Học Tập" 
              description="Diễn đàn trao đổi, hỏi đáp và chia sẻ kinh nghiệm" 
            />
          </div>
          {/* Development Journey */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-pink-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Hành Trình Phát Triển</h2>
            </div>
            <p className="text-lg text-gray-600 text-center">
              Bắt đầu từ một nhóm những người yêu giáo dục và công nghệ, chúng tôi đã không ngừng nỗ lực để xây dựng một nền tảng học tập uy tín.<br/>
              Tính đến nay, Digital Education đã thu hút được hơn <strong className="text-pink-500">10.000 học viên</strong> trên toàn quốc và đang mở rộng ra thị trường quốc tế.
            </p>
          </div>
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl p-8 md:p-12 text-center text-white mb-2 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Hãy Gia Nhập Cộng Đồng Học Tập Của Chúng Tôi!</h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-4">
              Nếu bạn đang tìm kiếm một nơi để nâng cao kiến thức, phát triển kỹ năng và chạm đến những ước mơ nghề nghiệp – thì bạn đã tìm đúng địa chỉ.
            </p>
            <p className="text-xl font-semibold">
              Digital Education – Học tập không giới hạn, phát triển không ngừng.
            </p>
          </div>
          {/* Hiệu ứng gợn sóng phía dưới card */}
          <img src="/wave.svg" alt="wave" className="absolute left-0 bottom-0 w-full pointer-events-none select-none" style={{zIndex:0}} />
        </div>
      </div>
    </div>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col items-center">
      <div className="p-3 bg-pink-100 rounded-xl text-pink-500 mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default About; 
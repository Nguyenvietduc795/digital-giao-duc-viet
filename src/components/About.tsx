import { MainLayout } from "./layout/MainLayout"
import { GraduationCap, Users, Target, Award, Rocket, Heart } from "lucide-react"

export function About() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px]" />
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Về Chúng Tôi - Digital Education
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Trong một thế giới đang chuyển mình mạnh mẽ bởi công nghệ, 
              <strong className="text-white"> giáo dục không còn là đặc quyền, mà là quyền lợi của tất cả mọi người</strong>.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Vision Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi tin rằng <em className="text-blue-600 font-medium">"mỗi cá nhân đều có tiềm năng vươn xa nếu được tiếp cận đúng tri thức, đúng phương pháp và đúng thời điểm"</em>. 
                Digital Education không chỉ đơn thuần là một nền tảng học trực tuyến, mà là một hệ sinh thái giáo dục toàn diện – nơi mọi người có thể học hỏi, kết nối và phát triển bền vững.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">Sứ Mệnh Của Chúng Tôi</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                Sứ mệnh của chúng tôi là <strong className="text-blue-600">"Mang lại cơ hội học tập chất lượng cao cho mọi người, không phân biệt độ tuổi, nghề nghiệp hay nơi sinh sống"</strong>. 
                Dù bạn là học sinh, sinh viên, người đi làm hay người đang tìm hướng đi mới, Digital Education đều có thể trở thành người bạn đồng hành đáng tin cậy trong hành trình học tập của bạn.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Chúng Tôi Có Gì Đặc Biệt?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </div>

          {/* Development Journey */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">Hành Trình Phát Triển</h2>
            </div>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Bắt đầu từ một nhóm những người yêu giáo dục và công nghệ, chúng tôi đã không ngừng nỗ lực để xây dựng một nền tảng học tập uy tín. 
              Tính đến nay, Digital Education đã thu hút được hơn <strong className="text-blue-600">10.000 học viên</strong> trên toàn quốc và đang mở rộng ra thị trường quốc tế.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Hãy Gia Nhập Cộng Đồng Học Tập Của Chúng Tôi!</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Nếu bạn đang tìm kiếm một nơi để nâng cao kiến thức, phát triển kỹ năng và chạm đến những ước mơ nghề nghiệp – thì bạn đã tìm đúng địa chỉ.
            </p>
            <p className="text-xl font-semibold">
              Digital Education – Học tập không giới hạn, phát triển không ngừng.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 ml-4">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
} 
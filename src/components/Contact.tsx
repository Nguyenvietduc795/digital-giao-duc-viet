import { MainLayout } from "./layout/MainLayout"
import { Phone, MapPin, Mail, Facebook, Globe, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-lg text-gray-600">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Contact Information */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left Column - Contact Details */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Hotline</h3>
                      <p className="text-lg text-gray-600 hover:text-blue-600 transition-colors">
                        <a href="tel:0901234567">0901 234 567</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Địa Chỉ</h3>
                      <p className="text-lg text-gray-600">
                        123 Đường ABC, Phường XYZ,<br />
                        Quận 1, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:lienhe@onlinehoc.vn"
                        className="text-lg text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        lienhe@onlinehoc.vn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Social Links & Map */}
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Kết Nối Với Chúng Tôi
                    </h3>
                    <div className="space-y-4">
                      <a 
                        href="https://facebook.com/onlinehoc" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Facebook className="w-6 h-6" />
                        </div>
                        <span className="text-lg">Facebook</span>
                      </a>
                      <a 
                        href="https://tiktok.com/@onlinehoc" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-lg">TikTok</span>
                      </a>
                      <a 
                        href="https://zalo.me/0901234567" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <span className="text-lg">Zalo</span>
                      </a>
                    </div>
                  </div>

                  {/* Quick Response Promise */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      Phản Hồi Nhanh Chóng
                    </h3>
                    <p className="text-blue-100">
                      Chúng tôi cam kết phản hồi mọi yêu cầu của bạn trong vòng 24 giờ làm việc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

enum TabType {
  Documents = 'documents',
  Assignments = 'assignments',
  Schedule = 'schedule'
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Documents);

  const courseProgress = 30; // 30% progress
  const studentName = "Nguyễn Văn A";
  const courseTitle = "Lập trình Python cơ bản";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Xin chào, {studentName}!
                  </h1>
                  <p className="text-pink-100">
                    Chào mừng bạn quay trở lại với khóa học {courseTitle}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button asChild className="bg-white text-primary hover:bg-gray-100">
                    <Link to="/khoa-hoc">Khám phá thêm khóa học</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Tiến độ học tập của bạn</h2>
              <div className="mb-2 flex justify-between">
                <span>Hoàn thành: {courseProgress}%</span>
                <span>{courseProgress}% / 100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex border-b">
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Documents ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Documents)}
              >
                Tài liệu
              </button>
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Assignments ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Assignments)}
              >
                Bài tập
              </button>
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Schedule ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Schedule)}
              >
                Lịch học
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === TabType.Documents && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Tài liệu khóa học</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-pink-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Giới thiệu về Python</h3>
                            <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-pink-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Cú pháp cơ bản trong Python</h3>
                            <p className="text-sm text-gray-600">PDF • 4.1 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-pink-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polygon points="23 7 16 12 23 17 23 7"></polygon>
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Hướng dẫn cài đặt Python</h3>
                            <p className="text-sm text-gray-600">Video • 10:23</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Xem
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-pink-100 p-2 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">Bài tập thực hành tuần 1</h3>
                            <p className="text-sm text-gray-600">ZIP • 1.7 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Tải xuống
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === TabType.Assignments && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Bài tập của khóa học</h2>
                  
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Bài tập 1: Viết chương trình Hello World</h3>
                          <p className="text-gray-600 mb-2">Hạn nộp: 15/05/2025</p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Đã hoàn thành
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-700">
                          Viết một chương trình Python đơn giản in ra màn hình dòng chữ "Hello, World!". 
                          Sau đó mở rộng chương trình để nhận tên người dùng từ bàn phím và hiển thị lời 
                          chào với tên đó.
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Điểm: 10/10</span>
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Bài tập 2: Biến và kiểu dữ liệu</h3>
                          <p className="text-gray-600 mb-2">Hạn nộp: 22/05/2025</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Đang làm
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-700">
                          Viết chương trình Python để thực hiện các phép tính cơ bản (cộng, trừ, nhân, chia) 
                          với hai số nguyên nhập từ bàn phím. Hiển thị kết quả của từng phép tính.
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Thời gian còn lại: 7 ngày</span>
                        <Button variant="outline" size="sm">
                          Nộp bài
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Bài tập 3: Cấu trúc điều khiển</h3>
                          <p className="text-gray-600 mb-2">Hạn nộp: 29/05/2025</p>
                        </div>
                        <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          Chưa mở
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-700">
                          Viết chương trình kiểm tra một số nhập vào có phải là số nguyên tố hay không. 
                          Sử dụng cấu trúc điều khiển if-else và vòng lặp để thực hiện kiểm tra.
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Bài tập sẽ được mở sau khi bạn hoàn thành Bài tập 2.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === TabType.Schedule && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Lịch học</h2>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <div>
                        <p className="text-sm text-yellow-700">
                          Buổi học tới sẽ diễn ra vào ngày mai (13/05/2025) lúc 19:00. Vui lòng chuẩn bị bài tập và câu hỏi trước giờ học.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-primary text-white px-4 py-2 font-medium">
                        Tuần này
                      </div>
                      <div className="p-4">
                        <div className="mb-6 last:mb-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Bài 3: Hàm và Module trong Python</div>
                            <div className="text-primary font-medium">13/05/2025</div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <div>Giảng viên: Thầy Nguyễn Văn A</div>
                            <div>19:00 - 21:00</div>
                          </div>
                        </div>
                        
                        <div className="mb-6 last:mb-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Thực hành: Xây dựng ứng dụng đơn giản</div>
                            <div className="text-primary font-medium">15/05/2025</div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <div>Giảng viên: Thầy Nguyễn Văn A</div>
                            <div>19:00 - 21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 font-medium">
                        Tuần sau
                      </div>
                      <div className="p-4">
                        <div className="mb-6 last:mb-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Bài 4: Xử lý tệp tin</div>
                            <div className="text-primary font-medium">20/05/2025</div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <div>Giảng viên: Thầy Nguyễn Văn A</div>
                            <div>19:00 - 21:00</div>
                          </div>
                        </div>
                        
                        <div className="mb-6 last:mb-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Thực hành: Đọc và ghi tệp tin</div>
                            <div className="text-primary font-medium">22/05/2025</div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <div>Giảng viên: Thầy Nguyễn Văn A</div>
                            <div>19:00 - 21:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ClassItem {
  id: number;
  name: string;
  schedule: string;
  students: number;
  progress: number;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
}

const TeacherDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Bài tập 1: Viết chương trình Hello World",
      course: "Lập trình Python cơ bản",
      dueDate: "15/05/2025",
      submissions: 18,
      totalStudents: 20
    },
    {
      id: 2,
      title: "Bài tập 2: Biến và kiểu dữ liệu",
      course: "Lập trình Python cơ bản",
      dueDate: "22/05/2025",
      submissions: 12,
      totalStudents: 20
    },
    {
      id: 3,
      title: "Bài tập 1: Từ vựng chủ đề công nghệ",
      course: "TOEIC 750+",
      dueDate: "18/05/2025",
      submissions: 15,
      totalStudents: 25
    }
  ]);

  const classes: ClassItem[] = [
    {
      id: 1,
      name: "Lập trình Python cơ bản - Lớp A",
      schedule: "Thứ 3, Thứ 5 (19:00 - 21:00)",
      students: 20,
      progress: 30
    },
    {
      id: 2,
      name: "TOEIC 750+ - Lớp B",
      schedule: "Thứ 2, Thứ 4, Thứ 6 (18:00 - 19:30)",
      students: 25,
      progress: 45
    },
    {
      id: 3,
      name: "Thiết kế web với HTML, CSS và JavaScript - Lớp C",
      schedule: "Thứ 7, Chủ nhật (9:00 - 12:00)",
      students: 15,
      progress: 60
    }
  ];

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    toast.success("Đã xóa bài tập thành công!");
  };

  const sendZoomLink = (classId: number) => {
    toast.success("Đã gửi link Zoom cho lớp học!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Xin chào, Thầy Nguyễn Văn A!
                  </h1>
                  <p className="text-blue-100">
                    Bạn có 3 lớp học đang diễn ra và 18 bài tập cần đánh giá.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 space-x-3">
                  <Button asChild className="bg-secondary text-black hover:bg-yellow-300">
                    <Link to="#">Tạo bài tập mới</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Classes Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Lớp học của tôi</h2>
                <Button asChild variant="outline">
                  <Link to="#">Xem tất cả lớp học</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="border rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{classItem.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mr-2 mt-0.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span className="text-gray-600">{classItem.schedule}</span>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mr-2 mt-0.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span className="text-gray-600">{classItem.students} học viên</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Tiến độ</span>
                          <span className="text-sm text-gray-600">{classItem.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${classItem.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to="#">Chi tiết</Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => sendZoomLink(classItem.id)}
                        >
                          Gửi Zoom
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assignments Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Bài tập đã giao</h2>
                <Button asChild variant="outline">
                  <Link to="#">Tạo bài tập mới</Link>
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Tiêu đề</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Lớp học</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Hạn nộp</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Đã nộp</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="font-medium">{assignment.title}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{assignment.course}</td>
                        <td className="py-4 px-4 text-gray-600">{assignment.dueDate}</td>
                        <td className="py-4 px-4">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {assignment.submissions}/{assignment.totalStudents}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => deleteAssignment(assignment.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ClassItem {
  id: number;
  name: string;
  schedule: string;
  students: number;
  progress: number;
  joinLink: string;
}

interface Student {
  id: number;
  name: string;
  submitted: boolean;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  students?: Student[];
  type: string;
  description: string;
}

const TeacherDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Bài tập 1: Viết chương trình Hello World",
      course: "Lập trình Python cơ bản",
      dueDate: "15/05/2025",
      submissions: 18,
      totalStudents: 20,
      students: [
        { id: 1, name: "Nguyễn Văn A", submitted: true },
        { id: 2, name: "Trần Thị B", submitted: false },
        // ... (bổ sung thêm sinh viên)
      ],
      type: "Tự luận",
      description: "Viết chương trình Hello World"
    },
    {
      id: 2,
      title: "Bài tập 2: Biến và kiểu dữ liệu",
      course: "Lập trình Python cơ bản",
      dueDate: "22/05/2025",
      submissions: 12,
      totalStudents: 20,
      students: [
        { id: 1, name: "Nguyễn Văn A", submitted: true },
        { id: 2, name: "Trần Thị B", submitted: false },
        // ... (bổ sung thêm sinh viên)
      ],
      type: "Tự luận",
      description: "Biến và kiểu dữ liệu"
    },
    {
      id: 3,
      title: "Bài tập 1: Từ vựng chủ đề công nghệ",
      course: "TOEIC 750+",
      dueDate: "18/05/2025",
      submissions: 15,
      totalStudents: 25,
      students: [
        { id: 1, name: "Nguyễn Văn A", submitted: true },
        { id: 2, name: "Trần Thị B", submitted: false },
        // ... (bổ sung thêm sinh viên)
      ],
      type: "Trắc nghiệm",
      description: "Từ vựng chủ đề công nghệ"
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    class: '',
    type: '',
    description: '',
    deadline: ''
  });
  const [detailAssignment, setDetailAssignment] = useState<Assignment | null>(null);
  const [detailClass, setDetailClass] = useState<ClassItem | null>(null);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editingClassLink, setEditingClassLink] = useState<string>('');

  const [classes, setClasses] = useState<ClassItem[]>([
    {
      id: 1,
      name: "Lập trình Python cơ bản - Lớp A",
      schedule: "Thứ 3, Thứ 5 (19:00 - 21:00)",
      students: 20,
      progress: 30,
      joinLink: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      name: "Lập trình Python cơ bản - Lớp B",
      schedule: "Thứ 2, Thứ 4, Thứ 6 (18:00 - 19:30)",
      students: 25,
      progress: 45,
      joinLink: "https://zoom.us/j/1234567890"
    },
    {
      id: 3,
      name: "Thiết kế web với HTML, CSS và JavaScript - Lớp C",
      schedule: "Thứ 7, Chủ nhật (9:00 - 12:00)",
      students: 15,
      progress: 60,
      joinLink: "https://teams.microsoft.com/l/meetup/"
    },
    {
      id: 4,
      name: " Lập trình Python cơ bản - Lớp C",
      schedule: "Thứ 2, Thứ 6 (9:00 - 11:00)",
      students: 18,
      progress: 75,
      joinLink: "https://zoom.us/j/1234567890"
    },
    {
      id: 5,
      name: "Thiết kế web với HTML, CSS và JavaScript - Lớp B",
      schedule: "Thứ 4, Chủ nhật (14:00 - 16:00)",
      students: 22,
      progress: 50,
      joinLink: "https://teams.microsoft.com/l/meetup/"
    },
    {
      id: 6,
      name: "Thiết kế web với HTML, CSS và JavaScript - Lớp D",
      schedule: "Thứ 3, Thứ 7 (17:00 - 19:00)",
      students: 17,
      progress: 85,
      joinLink: "https://jitsi.org/meet/ketoan-doanhnghiep"
    }
  ]);

  const displayedClasses = showAllClasses ? classes : classes.slice(0, 3);

  useEffect(() => {
    // Display notifications for new class schedules on component mount
    classes.slice(0, 3).forEach((classItem) => {
      toast.info(`Bạn có lịch dạy lớp học mới: ${classItem.name}`);
    });
  }, []);

  useEffect(() => {
    if (detailClass) {
      setEditingClassLink(detailClass.joinLink);
    }
  }, [detailClass]);

  const handleSaveClassLink = () => {
    if (detailClass) {
      setClasses(prevClasses =>
        prevClasses.map(cls =>
          cls.id === detailClass.id ? { ...cls, joinLink: editingClassLink } : cls
        )
      );
      setDetailClass(null);
      toast.success("Đã cập nhật link lớp học!");
    }
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    toast.success("Đã xóa bài tập thành công!");
  };

  const sendZoomLink = (classId: number) => {
    const classToSend = classes.find(cls => cls.id === classId);
    if (classToSend) {
      toast.success(`Đã gửi link Zoom cho lớp học "${classToSend.name}": ${classToSend.joinLink}. (Giả lập: Đã gửi đến ${classToSend.students} học viên)`);
    } else {
      toast.error("Không tìm thấy lớp học này!");
    }
  };

  // Hàm tiện ích để định dạng ngày sang DD/MM/YYYY
  const formatDateToDDMMYYYY = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignmentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/zip',
        'application/x-zip-compressed',
        'multipart/x-zip',
        'application/x-compressed',
      ];
      const filesArr = Array.from(e.target.files).filter(f => allowedTypes.includes(f.type) || f.name.endsWith('.zip'));
      setUploadedFiles(filesArr);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentForm.title.trim() || !assignmentForm.class.trim()) {
      toast.error('Vui lòng nhập đầy đủ Tiêu đề và Lớp học!');
      return;
    }
    // Tạo assignment mới
    const newAssignment = {
      id: Date.now(),
      title: assignmentForm.title,
      course: assignmentForm.class,
      dueDate: formatDateToDDMMYYYY(assignmentForm.deadline),
      submissions: 0,
      totalStudents: 0,
      type: assignmentForm.type,
      description: assignmentForm.description,
      students: []
    };
    setAssignments(prev => [newAssignment, ...prev]); // Thêm vào đầu danh sách
    toast.success('✅ Bài tập đã được tạo thành công!');
    setAssignmentForm({ title: '', class: '', type: '', description: '', deadline: '' });
    setShowCreateModal(false);
    setUploadedFiles([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-pink-300 px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Xin chào, Thầy Nguyễn Văn A!
                </h1>
                <p className="text-gray-600 dark:text-gray-400"></p>
              </div>
              <div className="mt-4 md:mt-0 space-x-3">
                <Button className="bg-secondary text-black hover:bg-yellow-300" onClick={() => setShowCreateModal(true)}>
                  Tạo bài tập mới
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Lớp học của tôi</h2>
              {classes.length > 3 && (
                <Button
                  variant="default"
                  className="bg-pink-500 text-white hover:bg-pink-600"
                  onClick={() => setShowAllClasses(!showAllClasses)}
                >
                  {showAllClasses ? "Thu gọn" : "Xem tất cả lớp học"}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedClasses.map((classItem) => (
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
                        <span className="text-sm text-pink-800">Tiến độ</span>
                        <span className="text-sm text-pink-800">{classItem.progress}%</span>
                      </div>
                      <div className="w-full bg-pink-50 rounded-full h-2">
                        <div 
                          className="bg-pink-300 h-2 rounded-full" 
                          style={{ width: `${classItem.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm" className="flex-1" onClick={() => setDetailClass(classItem)}>
                        <Link to="#">Chi tiết</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => sendZoomLink(classItem.id)}
                        title="Gửi Zoom"
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Bài tập đã giao</h2>
              <Button variant="outline" onClick={() => setShowCreateModal(true)}>
                Tạo bài tập mới
              </Button>
            </div>
            {/* Modal tạo bài tập mới */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowCreateModal(false)}>&times;</button>
                  <h3 className="text-xl font-bold mb-4">Tạo bài tập mới</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="assignmentTitle" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài tập</label>
                      <input
                        type="text"
                        id="assignmentTitle"
                        name="title"
                        value={assignmentForm.title}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Nhập tiêu đề bài tập"
                        title="Tiêu đề bài tập"
                      />
                    </div>
                    <div>
                      <label htmlFor="assignmentClass" className="block text-sm font-medium text-gray-700 mb-1">Lớp học</label>
                      <select
                        id="assignmentClass"
                        name="class"
                        value={assignmentForm.class}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        title="Chọn lớp học"
                      >
                        <option value="">Chọn lớp học</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.name}>{cls.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="assignmentType" className="block text-sm font-medium text-gray-700 mb-1">Loại bài tập</label>
                      <select
                        id="assignmentType"
                        name="type"
                        value={assignmentForm.type}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        title="Chọn loại bài tập"
                      >
                        <option value="">Chọn loại</option>
                        <option value="Tự luận">Tự luận</option>
                        <option value="Trắc nghiệm">Trắc nghiệm</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="assignmentDescription" className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
                      <textarea
                        id="assignmentDescription"
                        name="description"
                        value={assignmentForm.description}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Mô tả chi tiết bài tập..."
                        title="Mô tả bài tập"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="assignmentDeadline" className="block text-sm font-medium text-gray-700 mb-1">Hạn nộp</label>
                      <input
                        type="date"
                        id="assignmentDeadline"
                        name="deadline"
                        value={assignmentForm.deadline}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        title="Hạn nộp bài tập"
                      />
                    </div>
                    {/* File Upload Section */}
                    <div className="mb-4">
                      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Tệp đính kèm (tùy chọn)</label>
                      <div
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const files = Array.from(e.dataTransfer.files);
                          const allowedTypes = [
                            'application/pdf',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/msword',
                            'application/zip',
                            'application/x-zip-compressed',
                            'multipart/x-zip',
                            'application/x-compressed',
                          ];
                          const filesArr = files.filter(f => allowedTypes.includes(f.type) || f.name.endsWith('.zip'));
                          setUploadedFiles(filesArr);
                        }}
                      >
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Tải lên tệp</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} ref={fileInputRef} title="Tải lên tệp" />
                            </label>
                            <p className="pl-1">hoặc kéo và thả</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOCX, ZIP (tối đa 10MB)
                          </p>
                        </div>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700">Tệp đã chọn:</p>
                          <ul className="mt-2 text-sm text-gray-600">
                            {uploadedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                      <Button variant="outline" onClick={() => setShowCreateModal(false)} title="Hủy tạo bài tập">Hủy</Button>
                      <Button type="submit" title="Tạo bài tập mới">Tạo bài tập</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
                        <span className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded">
                          {assignment.submissions}/{assignment.totalStudents}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setDetailAssignment(assignment)}
                          >
                            Chi tiết
                          </Button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => deleteAssignment(assignment.id)}
                            title="Xóa bài tập"
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

      {/* Class Detail Modal */}
      {detailClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Chi tiết lớp học: {detailClass.name}</h2>
            <p className="mb-2">Lịch học: {detailClass.schedule}</p>
            <p className="mb-2">Số học viên: {detailClass.students}</p>
            <p className="mb-4">Tiến độ: {detailClass.progress}%</p>

            <div className="mb-4">
              <label htmlFor="joinLinkInput" className="block text-sm font-medium text-gray-700 mb-1">Link vào học</label>
              <input
                type="text"
                id="joinLinkInput"
                value={editingClassLink}
                onChange={(e) => setEditingClassLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nhập link vào học"
                title="Link vào học của lớp học"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                <Link to={detailClass.joinLink} target="_blank" rel="noopener noreferrer">Vào học</Link>
              </Button>
              <Button onClick={handleSaveClassLink} className="bg-blue-500 text-white hover:bg-blue-600" title="Lưu link lớp học">Lưu</Button>
              <Button onClick={() => setDetailClass(null)} title="Đóng chi tiết lớp học">Đóng</Button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Detail Modal */}
      {detailAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Chi tiết bài tập: {detailAssignment.title}</h2>
            <p className="mb-2">Khóa học: {detailAssignment.course}</p>
            <p className="mb-2">Loại: {detailAssignment.type}</p>
            <p className="mb-2">Hạn nộp: {detailAssignment.dueDate}</p>
            <p className="mb-4">Mô tả: {detailAssignment.description}</p>
            <h3 className="text-lg font-bold mb-2">Danh sách nộp bài ({detailAssignment.submissions}/{detailAssignment.totalStudents})</h3>
            {detailAssignment.students && detailAssignment.students.length > 0 ? (
              <ul className="list-disc pl-5 mb-4 max-h-40 overflow-y-auto">
                {detailAssignment.students.map(student => (
                  <li key={student.id} className="flex justify-between items-center">
                    <span>{student.name}</span>
                    {student.submitted ? (
                      <span className="text-green-600">Đã nộp</span>
                    ) : (
                      <span className="text-red-600">Chưa nộp</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mb-4">Chưa có sinh viên nào nộp bài.</p>
            )}
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setDetailAssignment(null)} title="Đóng chi tiết bài tập">Đóng</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;

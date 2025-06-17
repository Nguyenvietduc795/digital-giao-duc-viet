import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePaidCourses } from '@/context/PaidCoursesContext';
import { courses as allCourses } from '@/data/courseData';
import CourseCard from '@/components/CourseCard';
import { toast } from 'sonner';
import { supabase } from "@/lib/supabase";
import { useLanguage } from '@/context/LanguageContext';
import { Course } from '@/components/CourseCard';

enum TabType {
  Registered = 'registered',
  Documents = 'documents',
  Assignments = 'assignments',
  Schedule = 'schedule'
}

interface ClassItem {
  description: string;
}

interface DocumentItem {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

interface AssignmentItem {
  id: number;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD format for consistency with getTimeLeft
  status: 'completed' | 'in_progress' | 'not_opened';
  score?: number;
  teacherComment?: string;
  submittedFile?: { name: string; url: string };
  submittedAt?: string;
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Registered);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [now, setNow] = useState(new Date());
  const { paidCourses } = usePaidCourses();
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [showAllRegisteredCourses, setShowAllRegisteredCourses] = useState(false);
  const { t, language } = useLanguage();

  const [scheduledCourses, setScheduledCourses] = useState([
    { courseId: "aa205b7a-01af-47a6-a62f-2679da9946bf", date: "18/06/2025", time: "19:00 - 21:00", zoomLink: "https://meet.google.com/abc-defg-hij" },
    { courseId: "1b1ff90a-f8ca-421e-96a0-1ea50041cf74", date: "20/06/2025", time: "19:00 - 21:00", zoomLink: "https://zoom.us/j/1234567890" },
    { courseId: "aa205b7a-01af-47a6-a62f-2679da9946bf", date: "25/06/2025", time: "19:00 - 21:00", zoomLink: "https://meet.google.com/abc-defg-hij" },
    { courseId: "1b1ff90a-f8ca-421e-96a0-1ea50041cf74", date: "27/06/2025", time: "19:00 - 21:00", zoomLink: "https://zoom.us/j/1234567890" },
  ]);

  const thisWeekSchedule = scheduledCourses.filter(item => ["18/06/2025", "20/06/2025"].includes(item.date));
  const nextWeekSchedule = scheduledCourses.filter(item => ["25/06/2025", "27/06/2025"].includes(item.date));

  const [assignments, setAssignments] = useState<AssignmentItem[]>([
    {
      id: 1,
      title: "Chi tiết bài tập 1: Lập trình Python cơ bản",
      description: "Thực hành xây dựng một ứng dụng Python đơn giản, bao gồm các kiến thức về biến, kiểu dữ liệu, cấu trúc điều khiển và hàm.",
      dueDate: "2025-07-05",
      status: "in_progress",
    },
    {
      id: 2,
      title: "Chi tiết bài tập 1: TOEIC 750+ trong 2 tháng",
      description: "Bài test đọc và nghe TOEIC cơ bản.",
      dueDate: "2025-06-18",
      status: "completed",
      score: 10,
      teacherComment: "Bạn đã hoàn thành rất tốt bài test cơ bản của khóa học TOEIC!",
      submittedFile: { name: "toeic_test_1.pdf", url: "/files/toeic_test_1.pdf" },
      submittedAt: "2025-06-30 10:00",
    },
    {
      id: 3,
      title: "Chi tiết bài tập 2: TOEIC 750+ trong 2 tháng",
      description: "Luyện tập kỹ năng nghe TOEIC, phần 1 và 2: Câu hỏi - Đáp án.",
      dueDate: "2025-07-12",
      status: "in_progress",
    },
    {
      id: 4,
      title: "Chi tiết bài tập 3: TOEIC 750+ trong 2 tháng",
      description: "Luyện tập kỹ năng đọc TOEIC, phần 5 và 6: Hoàn thành câu và hoàn thành đoạn văn.",
      dueDate: "2025-07-19",
      status: "not_opened",
    },
  ]);

  const courseProgress = 30; // 30% progress
  const studentName = "Nguyễn Văn A";
  const courseTitle = "Lập trình Python cơ bản";

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 1,
      name: "Giới thiệu về Python",
      type: "PDF",
      size: "2.3 MB",
      url: "/files/gioi_thieu_python.pdf", // Placeholder URL - replace with actual path or Supabase URL
    },
    {
      id: 2,
      name: "Cú pháp cơ bản trong Python",
      type: "PDF",
      size: "4.1 MB",
      url: "/files/cu_phap_co_ban_python.pdf", // Placeholder URL
    },
    {
      id: 3,
      name: "Hướng dẫn cài đặt Python",
      type: "Video",
      size: "10:23",
      url: "https://www.youtube.com/embed/your_video_id", // Example YouTube embed or direct video URL
    },
    {
      id: 4,
      name: "Bài tập thực hành tuần 1",
      type: "ZIP",
      size: "1.7 MB",
      url: "/files/bai_tap_tuan_1.zip", // Placeholder URL
    },
  ]);

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Đang tải xuống: ${fileName}`);
  };

  const handleView = (url: string, type: string) => {
    if (type === "Video" || type === "PDF") {
      window.open(url, '_blank'); // Open in new tab
    } else {
      toast.error("Không thể xem trực tiếp loại tệp này. Vui lòng tải xuống.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft(dueDateStr: string) {
    const dueDate = new Date(dueDateStr + 'T23:59:59');
    const diff = dueDate.getTime() - now.getTime();
    if (diff <= 0) return t('expired');
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    let str = '';
    if (days > 0) str += `${days} ${t('days')} `;
    if (hours > 0 || days > 0) str += `${hours} ${t('hours')} `;
    str += `${mins} ${t('minutes')}`;
    return str;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-pink-300 to-pink-400 px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {t('hello')}, {studentName}!
                  </h1>
                  <p className="text-pink-100">
                    {t('welcome_back')} {courseTitle}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button asChild className="bg-yellow-300 text-black hover:bg-yellow-400">
                    <Link to="/khoa-hoc">{t('explore_more_courses')}</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t('your_study_progress')}</h2>
              <div className="mb-2 flex justify-between">
                <span>{t('completed_progress')}: {courseProgress}%</span>
                <span>{courseProgress}% / 100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-pink-300 h-2.5 rounded-full" 
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
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Registered ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Registered)}
              >
                {t('my_classes')}
              </button>
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Documents ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Documents)}
              >
                {t('course_materials')}
              </button>
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Assignments ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Assignments)}
              >
                {t('course_assignments')}
              </button>
              <button
                className={`px-4 py-3 text-center flex-1 ${activeTab === TabType.Schedule ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(TabType.Schedule)}
              >
                {t('study_schedule')}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === TabType.Registered && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{t('my_classes')}</h2>
                    {paidCourses.length > 3 && (
                      <Button
                        variant="default"
                        className="bg-pink-500 text-white hover:bg-pink-600"
                        onClick={() => {
                          setShowAllRegisteredCourses(!showAllRegisteredCourses);
                        }}
                      >
                        {showAllRegisteredCourses ? t('collapse') : t('view_all_classes')}
                      </Button>
                    )}
                  </div>
                  {paidCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {(showAllRegisteredCourses ? paidCourses : paidCourses.slice(0, 3)).map(courseId => {
                        const course = allCourses.find(c => c.id === courseId);
                        return course ? <CourseCard key={course.id} course={course} isPaid={true} /> : null;
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">{t('no_registered_courses')}</h3>
                      <p className="text-gray-600 mb-6">
                        {t('explore_our_courses_desc')}
                      </p>
                      <Button asChild>
                        <Link to="/khoa-hoc">{t('explore_more_courses')}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === TabType.Documents && (
                <div>
                  <h2 className="text-xl font-bold mb-4">{t('course_materials')}</h2>
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border rounded-lg p-4">
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
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.type} - {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleDownload(doc.url, doc.name)}>{t('download')}</Button>
                            {doc.type !== 'ZIP' && (
                              <Button size="sm" variant="outline" onClick={() => handleView(doc.url, doc.type)}>{t('view')}</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === TabType.Assignments && (
                <div>
                  <h2 className="text-xl font-bold mb-4">{t('course_assignments')}</h2>
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{assignment.title}</h3>
                            <span className="text-gray-600 mb-2">{t('due_date')}: {getTimeLeft(assignment.dueDate) !== t('expired') ? assignment.dueDate.split('-').reverse().join('/') : t('expired')}</span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            assignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {assignment.status === 'completed' ? t('completed') :
                            assignment.status === 'in_progress' ? t('in_progress') :
                            t('not_opened')}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-700">
                            {assignment.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          {assignment.status === 'completed' && assignment.score !== undefined ? (
                            <span className="text-sm text-gray-500">{t('score')}: {assignment.score}/10</span>
                          ) : assignment.status === 'in_progress' ? (
                            <span className="text-sm text-gray-500">{t('time_left')}: {getTimeLeft(assignment.dueDate)}</span>
                          ) : (
                            <span className="text-sm text-gray-500">{t('assignment_will_open')} 2.</span>
                          )}
                          <div className="flex gap-2">
                            {assignment.status !== 'not_opened' && (
                              <Button variant="outline" size="sm" className="bg-white text-black border border-gray-300"
                                onClick={() => {
                                  setSelectedAssignment({
                                    id: assignment.id,
                                    title: assignment.title,
                                    description: assignment.description,
                                    dueDate: assignment.dueDate.split('-').reverse().join('/'),
                                    status: assignment.status,
                                    score: assignment.score,
                                    teacherComment: assignment.teacherComment,
                                    submittedFile: assignment.submittedFile,
                                    submittedAt: assignment.submittedAt
                                  });
                                  setShowDetailModal(true);
                                }}>
                                {t('view_details')}
                              </Button>
                            )}
                            {assignment.status === 'in_progress' && (
                              <Button variant="outline" size="sm" className="bg-white text-black border border-gray-300"
                                onClick={() => {
                                  setSelectedAssignment({
                                    id: assignment.id,
                                    title: assignment.title,
                                    description: assignment.description,
                                    dueDate: assignment.dueDate.split('-').reverse().join('/'),
                                    status: 'in_progress',
                                  });
                                  setShowSubmitModal(true);
                                }}>
                                {t('submit_assignment')}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === TabType.Schedule && (
                <div>
                  <h2 className="text-xl font-bold mb-4">{t('study_schedule')}</h2>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <div>
                        <p className="text-sm text-yellow-700">
                          {t('next_session')} ({thisWeekSchedule[0]?.date || 'N/A'}) {t('at')} {thisWeekSchedule[0]?.time.split('-')[0] || 'N/A'}. {t('please_prepare')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-primary text-white px-4 py-2 font-medium">
                        {t('this_week')}
                      </div>
                      <div className="p-4">
                        {thisWeekSchedule.map((item, index) => {
                          const course = allCourses.find(c => c.id === item.courseId);
                          if (!course) return null; 

                          return (
                            <div key={index} className="mb-6 last:mb-0">
                              <div className="flex justify-between mb-2 items-center">
                                <span className="font-medium">{course.title}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-pink-400 font-medium">{item.date}</span>
                                  <Button size="sm" className="bg-pink-400 text-white hover:bg-pink-500" onClick={() => window.open(item.zoomLink, '_blank')}>{t('go_to_class')}</Button>
                                </div>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <div>{t('instructor')}: {course.teacher}</div>
                                <div>{item.time}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 font-medium">
                        {t('next_week')}
                      </div>
                      <div className="p-4">
                        {nextWeekSchedule.map((item, index) => {
                          const course = allCourses.find(c => c.id === item.courseId);
                          if (!course) return null; 

                          return (
                            <div key={index} className="mb-6 last:mb-0">
                              <div className="flex justify-between mb-2 items-center">
                                <span className="font-medium">{course.title}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-pink-400 font-medium">{item.date}</span>
                                  <Button size="sm" className="bg-pink-400 text-white hover:bg-pink-500" onClick={() => window.open(item.zoomLink, '_blank')}>{t('go_to_class')}</Button>
                                </div>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <div>{t('instructor')}: {course.teacher}</div>
                                <div>{item.time}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showDetailModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowDetailModal(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">{t('assignment_details')}</h2>
            <div className="mb-2 font-medium">{selectedAssignment.title}</div>
            <div className="mb-2 text-gray-600">{selectedAssignment.description}</div>
            <div className="mb-2 text-gray-500">{t('due_date')}: {selectedAssignment.dueDate}</div>
            <div className="mb-2 text-gray-500">{t('status')}: {t(selectedAssignment.status)}</div>
            {selectedAssignment.score !== undefined && (
              <div className="mb-2 text-green-600 font-semibold">{t('score')}: {selectedAssignment.score}</div>
            )}
            {selectedAssignment.teacherComment && (
              <div className="mb-2 text-gray-700 italic">{t('teacher_comment')}: {selectedAssignment.teacherComment}</div>
            )}
            {selectedAssignment.submittedFile && (
              <div className="mb-2">
                <a href={selectedAssignment.submittedFile.url} className="text-blue-500 underline" download>{selectedAssignment.submittedFile.name}</a>
                <span className="ml-2 text-xs text-gray-500">({t('submitted_at')}: {selectedAssignment.submittedAt})</span>
              </div>
            )}
            {selectedAssignment.status !== 'completed' && (
              <Button onClick={() => { setShowDetailModal(false); setShowSubmitModal(true); }}>{t('submit_assignment')}</Button>
            )}
          </div>
        </div>
      )}

      {/* Modal nộp bài */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => { setShowSubmitModal(false); setUploadFiles([]); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4">{t('assignment_submission')}</h2>
            <div className="mb-2 font-medium">{selectedAssignment.title}</div>
            <div className="mb-4 text-gray-600">{selectedAssignment.description}</div>
            <form onSubmit={e => { e.preventDefault(); /* Xử lý nộp bài ở đây */ setShowSubmitModal(false); setUploadFiles([]); }}>
              <div className="mb-4">
                <label htmlFor="student-upload-input" className="block text-sm font-medium mb-1">{t('select_files_to_submit')}</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="bg-pink-300 text-pink-900 font-semibold rounded px-4 py-2 border border-pink-400 hover:bg-pink-400 transition"
                    onClick={() => document.getElementById('student-upload-input')?.click()}
                  >
                    {t('select_files')}
                  </button>
                  <input
                    id="student-upload-input"
                    type="file"
                    multiple
                    onChange={e => setUploadFiles(Array.from(e.target.files || []))}
                    className="sr-only"
                  />
                  {uploadFiles.length > 0 && (
                    <span className="text-sm text-gray-600">{uploadFiles.length} {t('files_selected')}</span>
                  )}
                </div>
              </div>
              {uploadFiles.length > 0 && (
                <ul className="list-disc pl-5 mb-4 text-sm text-gray-600">
                  {uploadFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => { setShowSubmitModal(false); setUploadFiles([]); }}>{t('cancel')}</Button>
                <Button type="submit">{t('submit')}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;

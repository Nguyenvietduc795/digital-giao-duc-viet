import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dummy translations for now. Will be moved to a separate file later.
const translations: Record<Language, Record<string, string>> = {
  vi: {
    'home': 'Trang chủ',
    'courses': 'Khóa học',
    'my_courses': 'Khóa học của tôi',
    'about_us': 'Giới thiệu',
    'contact': 'Liên hệ',
    'profile': 'Hồ sơ',
    'logout': 'Đăng xuất',
    'digital_education_tagline': 'Nền tảng học tập trực tuyến hàng đầu Việt Nam, đem đến trải nghiệm học tập hiệu quả và tiện lợi.',
    'quick_links': 'Liên kết nhanh',
    'course_categories': 'Khóa học',
    'support': 'Hỗ trợ',
    'contact_info': 'Liên hệ',
    'email': 'Email',
    'hotline': 'Hotline',
    'address': 'Địa chỉ',
    'all_rights_reserved': 'Tất cả quyền được bảo lưu.',
    'explore_favorite_fields': 'Khám phá lĩnh vực yêu thích',
    'programming_it_courses': 'Khóa học lập trình & CNTT',
    'learn_programming_desc': 'Học lập trình với các ngôn ngữ hot nhất, phát triển web, ứng dụng di động, trí tuệ nhân tạo và nhiều lĩnh vực CNTT khác.',
    'explore_now': 'Khám phá ngay',
    'english_certificate_courses': 'Khóa học tiếng Anh & chứng chỉ',
    'ielts_toeic_desc': 'Luyện thi IELTS, TOEIC, tiếng Anh giao tiếp và các khóa học ngôn ngữ chất lượng cao với giáo viên giỏi.',
    'why_choose_digital_education': 'Tại sao chọn Digital Education?',
    'top_quality': 'Chất lượng hàng đầu',
    'experienced_teachers_desc': 'Đội ngũ giảng viên giàu kinh nghiệm, chương trình học được thiết kế chuyên sâu.',
    'reasonable_fees': 'Học phí hợp lý',
    'affordable_fees_desc': 'Mức học phí phù hợp với nhiều đối tượng học viên, cam kết chất lượng tương xứng.',
    'flexible_learning': 'Học linh hoạt',
    'flexible_learning_desc': 'Học mọi lúc, mọi nơi với nền tảng học trực tuyến thân thiện và dễ sử dụng.',
    'start_your_learning_journey': 'Sẵn sàng bắt đầu hành trình học tập của bạn?',
    'free_trial_desc': 'Đăng ký học thử miễn phí ngay hôm nay và trải nghiệm phương pháp học hiệu quả tại Digital Education.',
    'register_for_free_trial': 'Đăng ký học thử miễn phí',
    'my_classes': 'Lớp học của tôi',
    'view_all_classes': 'Xem tất cả lớp học',
    'collapse': 'Thu gọn',
    'no_registered_courses': 'Bạn chưa đăng kí khóa học nào',
    'explore_our_courses_desc': 'Khám phá các khóa học hấp dẫn của chúng tôi và đăng kí ngay hôm nay!',
    'course_materials': 'Tài liệu khóa học',
    'download': 'Tải xuống',
    'view': 'Xem',
    'cannot_view_file': 'Không thể xem trực tiếp loại tệp này. Vui lòng tải xuống.',
    'downloading': 'Đang tải xuống',
    'course_assignments': 'Bài tập của khóa học',
    'due_date': 'Hạn nộp',
    'expired': 'Đã hết hạn',
    'completed': 'Đã hoàn thành',
    'in_progress': 'Đang làm',
    'not_opened': 'Chưa mở',
    'score': 'Điểm',
    'teacher_comment': 'Nhận xét',
    'submitted_at': 'Nộp lúc',
    'view_details': 'Xem chi tiết',
    'submit_assignment': 'Nộp bài',
    'assignment_will_open': 'Bài tập sẽ được mở sau khi bạn hoàn thành Bài tập',
    'study_schedule': 'Lịch học',
    'next_session': 'Buổi học tới sẽ diễn ra vào ngày mai',
    'please_prepare': 'Vui lòng chuẩn bị bài tập và câu hỏi trước giờ học.',
    'this_week': 'Tuần này',
    'next_week': 'Tuần sau',
    'instructor': 'Giảng viên',
    'go_to_class': 'Vào học',
    'assignment_details': 'Chi tiết bài tập',
    'assignment_submission': 'Nộp bài tập',
    'select_files_to_submit': 'Chọn tệp để nộp (có thể chọn nhiều tệp)',
    'select_files': 'Chọn tệp',
    'cancel': 'Hủy',
    'submit': 'Nộp bài',
    'hello': 'Xin chào',
    'welcome_back': 'Chào mừng bạn quay trở lại với khóa học',
    'your_study_progress': 'Tiến độ học tập của bạn',
    'completed_progress': 'Hoàn thành',
    'explore_more_courses': 'Khám phá thêm khóa học',
    'sign_in': 'Đăng nhập',
    'register_now': 'Đăng ký ngay',
    'register_trial_course': 'Đăng ký học thử',
    'basic_python_programming': 'Lập trình Python cơ bản',
    'ielts_in_3_months': 'IELTS 6.0+ trong 3 tháng',
    'web_design_html_css_javascript': 'Thiết kế web với HTML, CSS và JavaScript',
    'advanced_math_grade_12': 'Toán cao cấp cho lớp 12',
    'toeic_in_2_months': 'TOEIC 750+ trong 2 tháng',
    'mobile_app_development_react_native': 'Lập trình ứng dụng di động với React Native',
    'university_physics_prep': 'Luyện thi đại học môn Vật lý',
    'conversational_english': 'Luyện nói tiếng Anh giao tiếp',
    'days': 'ngày',
    'hours': 'giờ',
    'minutes': 'phút',
    'at': 'lúc',
  },
  en: {
    'home': 'Home',
    'courses': 'Courses',
    'my_courses': 'My Courses',
    'about_us': 'About Us',
    'contact': 'Contact',
    'profile': 'Profile',
    'logout': 'Logout',
    'digital_education_tagline': 'Vietnam\'s leading online learning platform, offering an effective and convenient learning experience.',
    'quick_links': 'Quick Links',
    'course_categories': 'Courses',
    'support': 'Support',
    'contact_info': 'Contact Info',
    'email': 'Email',
    'hotline': 'Hotline',
    'address': 'Address',
    'all_rights_reserved': 'All rights reserved.',
    'explore_favorite_fields': 'Explore Favorite Fields',
    'programming_it_courses': 'Programming & IT Courses',
    'learn_programming_desc': 'Learn programming with the hottest languages, web development, mobile applications, artificial intelligence, and many other IT fields.',
    'explore_now': 'Explore Now',
    'english_certificate_courses': 'English & Certificate Courses',
    'ielts_toeic_desc': 'IELTS, TOEIC, conversational English, and high-quality language courses with excellent teachers.',
    'why_choose_digital_education': 'Why Choose Digital Education?',
    'top_quality': 'Top Quality',
    'experienced_teachers_desc': 'Experienced teaching staff, in-depth curriculum design.',
    'reasonable_fees': 'Reasonable Fees',
    'affordable_fees_desc': 'Affordable tuition fees for various student groups, committed to equivalent quality.',
    'flexible_learning': 'Flexible Learning',
    'flexible_learning_desc': 'Learn anytime, anywhere with a user-friendly and convenient online learning platform.',
    'start_your_learning_journey': 'Ready to start your learning journey?',
    'free_trial_desc': 'Register for a free trial today and experience effective learning methods at Digital Education.',
    'register_for_free_trial': 'Register for Free Trial',
    'my_classes': 'My Classes',
    'view_all_classes': 'View all classes',
    'collapse': 'Collapse',
    'no_registered_courses': 'You have not registered for any courses yet',
    'explore_our_courses_desc': 'Explore our exciting courses and register today!',
    'course_materials': 'Course Materials',
    'download': 'Download',
    'view': 'View',
    'cannot_view_file': 'Cannot view this file type directly. Please download.',
    'downloading': 'Downloading',
    'course_assignments': 'Course Assignments',
    'due_date': 'Due Date',
    'expired': 'Expired',
    'completed': 'Completed',
    'in_progress': 'In progress',
    'not_opened': 'Not opened yet',
    'score': 'Score',
    'teacher_comment': 'Teacher Comment',
    'submitted_at': 'Submitted at',
    'view_details': 'View Details',
    'submit_assignment': 'Submit Assignment',
    'assignment_will_open': 'Assignment will open after you complete Assignment',
    'study_schedule': 'Study Schedule',
    'next_session': 'The next session will take place tomorrow',
    'please_prepare': 'Please prepare assignments and questions before class.',
    'this_week': 'This Week',
    'next_week': 'Next Week',
    'instructor': 'Instructor',
    'go_to_class': 'Go to Class',
    'assignment_details': 'Assignment Details',
    'assignment_submission': 'Assignment Submission',
    'select_files_to_submit': 'Select files to submit (can select multiple files)',
    'select_files': 'Select files',
    'cancel': 'Cancel',
    'submit': 'Submit',
    'hello': 'Hello',
    'welcome_back': 'Welcome back to the course',
    'your_study_progress': 'Your Study Progress',
    'completed_progress': 'Completed',
    'explore_more_courses': 'Explore more courses',
    'sign_in': 'Sign In',
    'register_now': 'Register Now',
    'register_trial_course': 'Register for Trial Course',
    'basic_python_programming': 'Basic Python Programming',
    'ielts_in_3_months': 'IELTS 6.0+ in 3 months',
    'web_design_html_css_javascript': 'Web Design with HTML, CSS, and JavaScript',
    'advanced_math_grade_12': 'Advanced Math for Grade 12',
    'toeic_in_2_months': 'TOEIC 750+ in 2 months',
    'mobile_app_development_react_native': 'Mobile App Development with React Native',
    'university_physics_prep': 'University Physics Preparation',
    'conversational_english': 'Conversational English Training',
    'days': 'days',
    'hours': 'hours',
    'minutes': 'minutes',
    'at': 'at',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('app-language');
    return (storedLang === 'vi' || storedLang === 'en') ? storedLang : 'vi';
  });

  const t = (key: string): string => {
    return translations[language][key] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 
import { Course } from '../components/CourseCard';

export const courses: Course[] = [
  {
    id: 1,
    title: "Lập trình Python cơ bản",
    description: "Khóa học giúp bạn làm quen với ngôn ngữ lập trình Python từ cơ bản đến nâng cao, xây dựng các ứng dụng thực tế.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    category: "Lập trình & CNTT",
    level: "Cơ bản",
    teacher: "Thầy Nguyễn Văn A",
    gender: "Nam",
    curriculum: [
      {
        title: "Phần 1: Giới thiệu lập trình Python",
        lessons: [
          { title: "Bài 1: Tổng quan về Python và môi trường phát triển" },
          { title: "Bài 2: Cài đặt và cấu hình môi trường làm việc" },
        ],
      },
      {
        title: "Phần 2: Kiến thức cơ bản về Python",
        lessons: [
          { title: "Bài 3: Cú pháp cơ bản và biến" },
          { title: "Bài 4: Kiểu dữ liệu và cấu trúc điều khiển" },
          { title: "Bài 5: Hàm và Module" },
        ],
      },
      {
        title: "Phần 3: Lập trình nâng cao với Python",
        lessons: [
          { title: "Bài 6: Lập trình hướng đối tượng (OOP)" },
          { title: "Bài 7: Thao tác tệp và xử lý ngoại lệ" },
          { title: "Bài 8: Xây dựng dự án thực tế" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "IELTS 6.0+ trong 3 tháng",
    description: "Phương pháp luyện thi IELTS hiệu quả, tập trung vào các kỹ năng nghe, nói, đọc, viết với lộ trình rõ ràng, giúp học viên đạt band điểm mong muốn.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    category: "Tiếng Anh & Chứng chỉ",
    level: "Trung cấp",
    teacher: "Cô Trần Thị B",
    gender: "Nữ",
    curriculum: [
      {
        title: "Phần 1: Giới thiệu IELTS và chiến lược",
        lessons: [
          { title: "Bài 1: Tổng quan về kỳ thi IELTS và thang điểm" },
          { title: "Bài 2: Chiến lược làm bài cho từng kỹ năng" },
        ],
      },
      {
        title: "Phần 2: Luyện kỹ năng Nghe và Đọc",
        lessons: [
          { title: "Bài 3: Luyện nghe IELTS Part 1-4" },
          { title: "Bài 4: Các dạng bài đọc và cách giải quyết" },
          { title: "Bài 5: Tăng tốc độ đọc và hiểu" },
        ],
      },
      {
        title: "Phần 3: Luyện kỹ năng Viết và Nói",
        lessons: [
          { title: "Bài 6: Viết Task 1: Mô tả biểu đồ và bản đồ" },
          { title: "Bài 7: Viết Task 2: Viết luận và phát triển ý" },
          { title: "Bài 8: Luyện nói Part 1, 2, 3: Từ vựng và phát âm" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Thiết kế web với HTML, CSS và JavaScript",
    description: "Học cách tạo và thiết kế trang web từ đầu với HTML, CSS và JavaScript, tạo các trang web đẹp mắt và đáp ứng.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    category: "Lập trình & CNTT",
    level: "Cơ bản",
    teacher: "Thầy Lê Văn C",
    gender: "Nam",
    curriculum: [
      {
        title: "Phần 1: HTML và cấu trúc trang web",
        lessons: [
          { title: "Bài 1: Cấu trúc cơ bản của HTML" },
          { title: "Bài 2: Các thẻ HTML phổ biến và ý nghĩa" },
        ],
      },
      {
        title: "Phần 2: CSS và thiết kế giao diện",
        lessons: [
          { title: "Bài 3: Giới thiệu CSS và cách áp dụng" },
          { title: "Bài 4: Thuộc tính CSS cơ bản và nâng cao" },
          { title: "Bài 5: Thiết kế Responsive với Flexbox và Grid" },
        ],
      },
      {
        title: "Phần 3: JavaScript và tương tác người dùng",
        lessons: [
          { title: "Bài 6: Các khái niệm cơ bản của JavaScript" },
          { title: "Bài 7: Thao tác DOM và sự kiện" },
          { title: "Bài 8: Xây dựng ứng dụng web tương tác" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Toán cao cấp cho lớp 12",
    description: "Giúp học sinh lớp 12 nắm vững kiến thức toán học cao cấp, chuẩn bị tốt cho kỳ thi đại học sắp tới.",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=600&q=80",
    category: "Toán học nâng cao",
    level: "Nâng cao",
    teacher: "Cô Phạm Thị D",
    gender: "Nữ",
    curriculum: [
      {
        title: "Phần 1: Đại số và Hàm số",
        lessons: [
          { title: "Bài 1: Phương trình, bất phương trình, hệ phương trình" },
          { title: "Bài 2: Hàm số, giới hạn và đạo hàm" },
        ],
      },
      {
        title: "Phần 2: Hình học và Tích phân",
        lessons: [
          { title: "Bài 3: Hình học không gian và tọa độ" },
          { title: "Bài 4: Nguyên hàm và tích phân" },
          { title: "Bài 5: Ứng dụng tích phân" },
        ],
      },
      {
        title: "Phần 3: Lượng giác và Số phức",
        lessons: [
          { title: "Bài 6: Phương trình và bất phương trình lượng giác" },
          { title: "Bài 7: Số phức và ứng dụng" },
          { title: "Bài 8: Tổng ôn và luyện đề thi đại học" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "TOEIC 750+ trong 2 tháng",
    description: "Khóa học tập trung vào các kỹ thuật làm bài thi TOEIC, giúp học viên đạt điểm cao trong thời gian ngắn.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    category: "Tiếng Anh & Chứng chỉ",
    level: "Cao cấp",
    teacher: "Thầy Hoàng Văn E",
    gender: "Nam",
    curriculum: [
      {
        title: "Phần 1: Giới thiệu TOEIC và chiến lược",
        lessons: [
          { title: "Bài 1: Tổng quan về kỳ thi TOEIC và cấu trúc đề thi" },
          { title: "Bài 2: Các chiến lược làm bài hiệu quả" },
        ],
      },
      {
        title: "Phần 2: Luyện nghe và Đọc Part 1-4",
        lessons: [
          { title: "Bài 3: Nghe Part 1: Mô tả tranh" },
          { title: "Bài 4: Nghe Part 2: Hỏi đáp" },
          { title: "Bài 5: Nghe Part 3-4: Hội thoại và bài nói ngắn" },
        ],
      },
      {
        title: "Phần 3: Luyện Đọc Part 5-7 và tổng ôn",
        lessons: [
          { title: "Bài 6: Đọc Part 5-6: Hoàn thành câu và đoạn văn" },
          { title: "Bài 7: Đọc Part 7: Đọc hiểu đoạn đơn và đoạn kép" },
          { title: "Bài 8: Tổng ôn và giải đề full test" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Lập trình ứng dụng di động với React Native",
    description: "Học cách phát triển ứng dụng di động đa nền tảng với React Native, từ thiết kế giao diện đến xuất bản ứng dụng.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    category: "Lập trình & CNTT",
    level: "Nâng cao",
    teacher: "Thầy Trần Văn F",
    gender: "Nam",
    curriculum: [
      {
        title: "Phần 1: Giới thiệu React Native và môi trường",
        lessons: [
          { title: "Bài 1: Tổng quan về React Native và ưu điểm" },
          { title: "Bài 2: Cài đặt môi trường phát triển" },
        ],
      },
      {
        title: "Phần 2: Xây dựng giao diện người dùng",
        lessons: [
          { title: "Bài 3: Component cơ bản và Styling" },
          { title: "Bài 4: Navigation và quản lý màn hình" },
          { title: "Bài 5: State Management với React Hooks" },
        ],
      },
      {
        title: "Phần 3: Tương tác với API và triển khai ứng dụng",
        lessons: [
          { title: "Bài 6: Gọi API và xử lý dữ liệu" },
          { title: "Bài 7: Lưu trữ cục bộ và Offline-first" },
          { title: "Bài 8: Triển khai ứng dụng lên App Store/Google Play" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Luyện thi đại học môn Vật lý",
    description: "Khóa học giúp học sinh ôn tập toàn diện kiến thức vật lý, giải các dạng bài tập khó trong đề thi đại học.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    category: "Luyện thi đại học",
    level: "Nâng cao",
    teacher: "Thầy Đặng Văn G",
    gender: "Nam",
    curriculum: [
      {
        title: "Phần 1: Cơ học và Dao động",
        lessons: [
          { title: "Bài 1: Động học và Động lực học chất điểm" },
          { title: "Bài 2: Công, năng lượng và Định luật bảo toàn" },
        ],
      },
      {
        title: "Phần 2: Điện học và Từ học",
        lessons: [
          { title: "Bài 3: Dòng điện xoay chiều và Mạch RLC" },
          { title: "Bài 4: Từ trường và Cảm ứng điện từ" },
          { title: "Bài 5: Sóng ánh sáng và Giao thoa" },
        ],
      },
      {
        title: "Phần 3: Quang học và Vật lý hạt nhân",
        lessons: [
          { title: "Bài 6: Thấu kính và Hệ quang học" },
          { title: "Bài 7: Lượng tử ánh sáng và Hiện tượng quang điện" },
          { title: "Bài 8: Hạt nhân nguyên tử và Phóng xạ" },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Luyện nói tiếng Anh giao tiếp",
    description: "Tập trung vào kỹ năng giao tiếp tiếng Anh hàng ngày, giúp học viên tự tin nói tiếng Anh trong mọi tình huống.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    category: "Tiếng Anh & Chứng chỉ",
    level: "Cơ bản",
    teacher: "Cô Nguyễn Thị H",
    gender: "Nữ",
    curriculum: [
      {
        title: "Phần 1: Giới thiệu và làm quen",
        lessons: [
          { title: "Bài 1: Giới thiệu bản thân và người khác" },
          { title: "Bài 2: Các cụm từ giao tiếp cơ bản hàng ngày" },
        ],
      },
      {
        title: "Phần 2: Phát triển kỹ năng nghe và nói",
        lessons: [
          { title: "Bài 3: Luyện nghe các đoạn hội thoại ngắn" },
          { title: "Bài 4: Thực hành nói về các chủ đề quen thuộc" },
          { title: "Bài 5: Thảo luận và đưa ra ý kiến cá nhân" },
        ],
      },
      {
        title: "Phần 3: Giao tiếp trong các tình huống cụ thể",
        lessons: [
          { title: "Bài 6: Giao tiếp tại nơi làm việc và trong các cuộc họp" },
          { title: "Bài 7: Giao tiếp khi đi du lịch và mua sắm" },
          { title: "Bài 8: Thuyết trình và đối thoại tự tin" },
        ],
      },
    ],
  },
];

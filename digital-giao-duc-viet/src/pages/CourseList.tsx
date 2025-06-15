import React, { useState, useMemo } from 'react';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/courseData';
import { usePaidCourses } from '@/context/PaidCoursesContext';

// Define course categories and levels for filters
const categories = ["Tất cả", "Lập trình & CNTT", "Tiếng Anh & Chứng chỉ", "Toán học nâng cao", "Luyện thi đại học"];
const levels = ["Tất cả", "Cơ bản", "Trung cấp", "Nâng cao", "Cao cấp"];

const CourseList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedLevel, setSelectedLevel] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const { paidCourses } = usePaidCourses();

  // Filter courses based on selected filters and search term
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filter by category
      const matchesCategory = selectedCategory === "Tất cả" || course.category === selectedCategory;
      
      // Filter by level
      const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel;
      
      // Filter by search term
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Khám phá các khóa học</h1>
            <p className="text-gray-600">
              Tìm kiếm và đăng ký các khóa học phù hợp với nhu cầu và mục tiêu học tập của bạn.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm khóa học</label>
              <input
                type="text"
                id="search"
                placeholder="Nhập tên khóa học, giáo viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Trình độ</label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course Results */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">Kết quả ({filteredCourses.length} khóa học)</h2>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isPaid={paidCourses.includes(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Không tìm thấy khóa học nào</h3>
              <p className="text-gray-600">
                Vui lòng thử lại với các tiêu chí tìm kiếm khác.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseList;

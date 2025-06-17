import React, { useState, useMemo, useEffect } from 'react';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/courseData';
import { usePaidCourses } from '@/context/PaidCoursesContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from "@/lib/supabase";

// Define course categories and levels for filters
const categories = ["Tất cả", "Lập trình & CNTT", "Tiếng Anh & Chứng chỉ", "Toán học nâng cao", "Luyện thi đại học"];
const levels = ["Tất cả", "Cơ bản", "Trung cấp", "Nâng cao", "Cao cấp"];

const CourseList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedLevel, setSelectedLevel] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const { paidCourses } = usePaidCourses();
  const { t } = useLanguage();

  // Test Supabase connection
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .limit(1);
        
        if (error) {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection successful:", data);
        }
      } catch (error) {
        console.error("Error testing Supabase connection:", error);
      }
    };
    
    testSupabaseConnection();
  }, []);

  // Filter courses based on selected filters and search term
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filter by category
      const matchesCategory = selectedCategory === t('all') || course.category === selectedCategory;
      
      // Filter by level
      const matchesLevel = selectedLevel === t('all') || course.level === selectedLevel;
      
      // Filter by search term
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchTerm, t]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{t('explore_courses')}</h1>
            <p className="text-gray-600">
              {t('explore_courses_desc')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">{t('search_courses')}</label>
              <input
                type="text"
                id="search"
                placeholder={t('search_courses_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{t('field')}</label>
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
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">{t('level')}</label>
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
            <h2 className="text-xl font-bold">{t('results')} ({filteredCourses.length} {t('courses')})</h2>
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
              <h3 className="text-lg font-semibold mb-2">{t('no_courses_found')}</h3>
              <p className="text-gray-600">
                {t('try_different_search_criteria')}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseList;

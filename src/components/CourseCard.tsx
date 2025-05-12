
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  teacher: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="card">
      <img 
        src={course.image} 
        alt={course.title}
        className="w-full h-48 object-cover rounded-t-lg mb-4" 
      />
      <div className="flex justify-between mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {course.category}
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
          {course.level}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Giảng viên: {course.teacher}</span>
      </div>
      <Button asChild className="w-full">
        <Link to={`/khoa-hoc/${course.id}`}>Xem chi tiết</Link>
      </Button>
    </div>
  );
};

export default CourseCard;

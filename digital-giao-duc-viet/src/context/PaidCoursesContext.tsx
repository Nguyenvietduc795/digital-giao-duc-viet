import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaidCoursesContextType {
  paidCourses: number[];
  addPaidCourse: (courseId: number) => void;
}

const PaidCoursesContext = createContext<PaidCoursesContextType | undefined>(undefined);

export const PaidCoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paidCourses, setPaidCourses] = useState<number[]>([]);

  const addPaidCourse = (courseId: number) => {
    setPaidCourses((prevCourses) => {
      if (!prevCourses.includes(courseId)) {
        return [...prevCourses, courseId];
      }
      return prevCourses;
    });
  };

  return (
    <PaidCoursesContext.Provider value={{ paidCourses, addPaidCourse }}>
      {children}
    </PaidCoursesContext.Provider>
  );
};

export const usePaidCourses = () => {
  const context = useContext(PaidCoursesContext);
  if (context === undefined) {
    throw new Error('usePaidCourses must be used within a PaidCoursesProvider');
  }
  return context;
}; 
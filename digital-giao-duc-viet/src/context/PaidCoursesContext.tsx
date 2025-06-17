import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaidCoursesContextType {
  paidCourses: string[];
  addPaidCourse: (courseId: string) => void;
}

const PaidCoursesContext = createContext<PaidCoursesContextType | undefined>(undefined);

export const PaidCoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paidCourses, setPaidCourses] = useState<string[]>([]);

  const addPaidCourse = (courseId: string) => {
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
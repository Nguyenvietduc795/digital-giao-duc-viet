import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { courses as allCourses } from '@/data/courseData';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('courses'); // Default to courses management

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('admin_dashboard_title')}</h1>

          <div className="flex space-x-4 mb-8">
            <Button 
              variant={activeSection === 'courses' ? "default" : "outline"}
              onClick={() => setActiveSection('courses')}
            >
              {t('manage_courses')}
            </Button>
            <Button 
              variant={activeSection === 'users' ? "default" : "outline"}
              onClick={() => setActiveSection('users')}
            >
              {t('manage_users')}
            </Button>
            <Button 
              variant={activeSection === 'assignments' ? "default" : "outline"}
              onClick={() => setActiveSection('assignments')}
            >
              {t('manage_assignments')}
            </Button>
            <Button 
              variant={activeSection === 'roles' ? "default" : "outline"}
              onClick={() => setActiveSection('roles')}
            >
              {t('manage_roles')}
            </Button>
            <Button 
              variant={activeSection === 'stats' ? "default" : "outline"}
              onClick={() => setActiveSection('stats')}
            >
              {t('view_statistics')}
            </Button>
            <Button 
              variant={activeSection === 'settings' ? "default" : "outline"}
              onClick={() => setActiveSection('settings')}
            >
              {t('settings')}
            </Button>
          </div>

          {activeSection === 'courses' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('course_management')}</h2>
              <Button className="mb-4">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_course')}
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('course_id')}</TableHead>
                    <TableHead>{t('course_title')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('level')}</TableHead>
                    <TableHead>{t('teacher')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{course.level}</TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell className="text-right flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('user_management')}</h2>
              <p>{t('user_management_desc')}</p>
            </div>
          )}

          {activeSection === 'assignments' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('assignment_management')}</h2>
              <p>{t('assignment_management_desc')}</p>
            </div>
          )}

          {activeSection === 'roles' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('role_management')}</h2>
              <p>{t('role_management_desc')}</p>
            </div>
          )}

          {activeSection === 'stats' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('statistics_view')}</h2>
              <p>{t('statistics_view_desc')}</p>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('settings')}</h2>
              <p>{t('settings_desc')}</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 
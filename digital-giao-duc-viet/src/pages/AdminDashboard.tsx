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
import { courses as initialCourses } from '@/data/courseData';
import { users as allUsersData } from '@/data/userData';
import { assignments as initialAssignments } from '@/data/assignmentData';
import { roles as allRoles } from '@/data/roleData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  teacher: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('courses'); // Default to courses management
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [users, setUsers] = useState<User[]>(allUsersData);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [roles, setRoles] = useState<Role[]>(allRoles);

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  // Placeholder functions for user management
  const handleEditUser = (id: string) => {
    console.log(`Editing user with ID: ${id}`);
    // Implement actual edit logic here
  };

  const handleDeleteUser = (id: string) => {
    console.log(`Deleting user with ID: ${id}`);
    // Implement actual delete logic here
  };

  // Placeholder functions for assignment management
  const handleEditAssignment = (id: string) => {
    console.log(`Editing assignment with ID: ${id}`);
    // Implement actual edit logic here
  };

  const handleDeleteAssignment = (id: string) => {
    console.log(`Deleting assignment with ID: ${id}`);
    // Implement actual delete logic here
  };

  // Placeholder functions for role management
  const handleEditRole = (id: string) => {
    const roleToEdit = roles.find(role => role.id === id);
    if (roleToEdit) {
      setCurrentRole(roleToEdit);
      setIsEditRoleModalOpen(true);
    }
  };

  const handleDeleteRole = (id: string) => {
    if (window.confirm(t('confirm_delete_role'))) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
    setIsAddCourseModalOpen(false);
  };

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setIsAddUserModalOpen(false);
  };

  const handleAddAssignment = (newAssignment: Assignment) => {
    setAssignments([...assignments, newAssignment]);
    setIsAddAssignmentModalOpen(false);
  };

  const handleAddRole = (newRole: Role) => {
    setRoles([...roles, newRole]);
    setIsAddRoleModalOpen(false);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => (role.id === updatedRole.id ? updatedRole : role)));
    setIsEditRoleModalOpen(false);
    setCurrentRole(null);
  };

  const CourseForm: React.FC<{ onSubmit: (course: Course) => void }> = ({
    onSubmit,
  }) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [teacher, setTeacher] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, title, category, level, teacher });
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="id" className="text-right">
            Mã khóa học
          </Label>
          <Input id="id" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Tên khóa học
          </Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Danh mục
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lập trình & CNTT">Lập trình & CNTT</SelectItem>
              <SelectItem value="Tiếng Anh & Chứng chỉ">Tiếng Anh & Chứng chỉ</SelectItem>
              <SelectItem value="Toán học nâng cao">Toán học nâng cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="level" className="text-right">
            Cấp độ
          </Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn cấp độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cơ bản">Cơ bản</SelectItem>
              <SelectItem value="Trung cấp">Trung cấp</SelectItem>
              <SelectItem value="Nâng cao">Nâng cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="teacher" className="text-right">
            Giảng viên
          </Label>
          <Input id="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit">Thêm khóa học</Button>
        </DialogFooter>
      </form>
    );
  };

  const UserForm: React.FC<{ onSubmit: (user: User) => void }> = ({
    onSubmit,
  }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, name, email, role, status });
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userId" className="text-right">
            Mã người dùng
          </Label>
          <Input id="userId" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userName" className="text-right">
            Tên người dùng
          </Label>
          <Input id="userName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userEmail" className="text-right">
            Email
          </Label>
          <Input id="userEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userRole" className="text-right">
            Vai trò
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userStatus" className="text-right">
            Trạng thái
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Thêm người dùng</Button>
        </DialogFooter>
      </form>
    );
  };

  const AssignmentForm: React.FC<{ onSubmit: (assignment: Assignment) => void }> = ({
    onSubmit,
  }) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, title, course, dueDate, status });
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignmentId" className="text-right">
            Mã bài tập
          </Label>
          <Input id="assignmentId" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignmentTitle" className="text-right">
            Tên bài tập
          </Label>
          <Input id="assignmentTitle" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignmentCourse" className="text-right">
            Khóa học
          </Label>
          <Input id="assignmentCourse" value={course} onChange={(e) => setCourse(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignmentDueDate" className="text-right">
            Ngày đến hạn
          </Label>
          <Input id="assignmentDueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="assignmentStatus" className="text-right">
            Trạng thái
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Thêm bài tập</Button>
        </DialogFooter>
      </form>
    );
  };

  const RoleForm: React.FC<{ onSubmit: (role: Role) => void }> = ({
    onSubmit,
  }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, name, description });
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="roleId" className="text-right">
            {t('role_id')}
          </Label>
          <Input id="roleId" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="roleName" className="text-right">
            {t('role_name')}
          </Label>
          <Input id="roleName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="roleDescription" className="text-right">
            {t('role_description')}
          </Label>
          <Input id="roleDescription" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit">{t('add_new_role')}</Button>
        </DialogFooter>
      </form>
    );
  };

  const EditRoleForm: React.FC<{ initialData: Role; onSubmit: (role: Role) => void }> = ({
    initialData,
    onSubmit,
  }) => {
    const [id, setId] = useState(initialData.id);
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ id, name, description });
    };

    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editRoleId" className="text-right">
            {t('role_id')}
          </Label>
          <Input id="editRoleId" value={id} onChange={(e) => setId(e.target.value)} className="col-span-3" disabled />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editRoleName" className="text-right">
            {t('role_name')}
          </Label>
          <Input id="editRoleName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editRoleDescription" className="text-right">
            {t('role_description')}
          </Label>
          <Input id="editRoleDescription" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit">{t('update_role')}</Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{t('admin_dashboard_title')}</h1>

          <div className="flex space-x-4 mb-8">
            <Button 
              variant="adminNav"
              className={activeSection === 'courses' ? "active" : ""}
              onClick={() => setActiveSection('courses')}
            >
              {t('manage_courses')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'users' ? "active" : ""}
              onClick={() => setActiveSection('users')}
            >
              {t('manage_users')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'assignments' ? "active" : ""}
              onClick={() => setActiveSection('assignments')}
            >
              {t('manage_assignments')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'roles' ? "active" : ""}
              onClick={() => setActiveSection('roles')}
            >
              {t('manage_roles')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'stats' ? "active" : ""}
              onClick={() => setActiveSection('stats')}
            >
              {t('view_statistics')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'mailbox' ? "active" : ""}
              onClick={() => setActiveSection('mailbox')}
            >
              {t('mailbox')}
            </Button>
            <Button 
              variant="adminNav"
              className={activeSection === 'settings' ? "active" : ""}
              onClick={() => setActiveSection('settings')}
            >
              {t('settings')}
            </Button>
          </div>

          {activeSection === 'courses' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('course_management')}</h2>
              <Button className="mb-4" variant="default" onClick={() => setIsAddCourseModalOpen(true)}>
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
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{t(course.category as any)}</TableCell>
                      <TableCell>{t(course.level as any)}</TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell className="text-right flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => console.log(`Editing course with ID: ${course.id}`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => console.log(`Deleting course with ID: ${course.id}`)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Add Course Modal */}
          <Dialog open={isAddCourseModalOpen} onOpenChange={setIsAddCourseModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm khóa học mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin khóa học mới vào đây. Nhấn thêm khi hoàn tất.
                </DialogDescription>
              </DialogHeader>
              <CourseForm onSubmit={handleAddCourse} />
            </DialogContent>
          </Dialog>

          {activeSection === 'users' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('user_management')}</h2>
              <Button className="mb-4" variant="default" onClick={() => setIsAddUserModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_user')}
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('user_id')}</TableHead>
                    <TableHead>{t('user_name')}</TableHead>
                    <TableHead>{t('user_email')}</TableHead>
                    <TableHead>{t('user_role')}</TableHead>
                    <TableHead>{t('user_status')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{t(user.role as any)}</TableCell>
                      <TableCell>{t(user.status as any)}</TableCell>
                      <TableCell className="text-right flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Add User Modal */}
          <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin người dùng mới vào đây. Nhấn thêm khi hoàn tất.
                </DialogDescription>
              </DialogHeader>
              <UserForm onSubmit={handleAddUser} />
            </DialogContent>
          </Dialog>

          {activeSection === 'assignments' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('assignment_management')}</h2>
              <Button className="mb-4" variant="default" onClick={() => setIsAddAssignmentModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_assignment')}
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('assignment_id')}</TableHead>
                    <TableHead>{t('assignment_title')}</TableHead>
                    <TableHead>{t('assignment_course')}</TableHead>
                    <TableHead>{t('assignment_due_date')}</TableHead>
                    <TableHead>{t('assignment_status')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.id}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{new Date(assignment.dueDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                      <TableCell>{t(assignment.status as any)}</TableCell>
                      <TableCell className="text-right flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditAssignment(assignment.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAssignment(assignment.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Add Assignment Modal */}
          <Dialog open={isAddAssignmentModalOpen} onOpenChange={setIsAddAssignmentModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm bài tập mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin bài tập mới vào đây. Nhấn thêm khi hoàn tất.
                </DialogDescription>
              </DialogHeader>
              <AssignmentForm onSubmit={handleAddAssignment} />
            </DialogContent>
          </Dialog>

          {activeSection === 'roles' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('role_management')}</h2>
              <Button className="mb-4" variant="default" onClick={() => setIsAddRoleModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_role')}
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('role_id')}</TableHead>
                    <TableHead>{t('role_name')}</TableHead>
                    <TableHead>{t('role_description_table_header')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.id}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{t(role.description)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleEditRole(role.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRole(role.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Add Role Modal */}
          <Dialog open={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm vai trò mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin vai trò mới vào đây. Nhấn thêm khi hoàn tất.
                </DialogDescription>
              </DialogHeader>
              <RoleForm onSubmit={handleAddRole} />
            </DialogContent>
          </Dialog>

          {/* Edit Role Modal */}
          {currentRole && (
            <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('edit_role')}</DialogTitle>
                  <DialogDescription>
                    {t('edit_role_details')}
                  </DialogDescription>
                </DialogHeader>
                <EditRoleForm initialData={currentRole} onSubmit={handleUpdateRole} />
              </DialogContent>
            </Dialog>
          )}

          {activeSection === 'stats' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('statistics_view')}</h2>
              <p>Đây là phần hiển thị các thống kê và biểu đồ về người dùng, khóa học và doanh thu. Ví dụ: số lượng người dùng mới, số khóa học đã hoàn thành, doanh thu hàng tháng/năm.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Tổng số người dùng</h3>
                  <p className="text-2xl font-bold">1200</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Số khóa học đang hoạt động</h3>
                  <p className="text-2xl font-bold">50</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
                  <p className="text-2xl font-bold">150,000,000 VND</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Khóa học phổ biến nhất</h3>
                  <p className="text-xl font-bold">Lập trình Python cơ bản</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold">Người dùng hoạt động nhiều nhất</h3>
                  <p className="text-xl font-bold">Nguyễn Văn A</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mailbox' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('mailbox')}</h2>
              <p>{t('mailbox_desc')}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Hộp thư đến</h3>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Phản hồi từ người dùng A:</strong> "Tôi gặp vấn đề khi truy cập tài liệu khóa học." -{' '}
                    <span className="text-gray-500 text-sm">2023-10-26 10:30 AM</span>
                  </li>
                  <li className="mb-2">
                    <strong>Đề xuất từ người dùng B:</strong> "Nên có thêm các bài tập thực hành cho khóa học React." -{' '}
                    <span className="text-gray-500 text-sm">2023-10-25 09:00 AM</span>
                  </li>
                  <li>
                    <strong>Báo cáo lỗi từ người dùng C:</strong> "Nút nộp bài tập không hoạt động trên trình duyệt Chrome." -{' '}
                    <span className="text-gray-500 text-sm">2023-10-24 02:15 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t('settings')}</h2>
              <p>{t('settings_desc')}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ngôn ngữ</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant={t('language') === 'vi' ? 'default' : 'outline'}
                      onClick={() => {
                        console.log('Set language to Vietnamese');
                        // setLanguage('vi');
                      }}
                    >
                      Tiếng Việt
                    </Button>
                    <Button
                      variant={t('language') === 'en' ? 'default' : 'outline'}
                      onClick={() => {
                        console.log('Set language to English');
                        // setLanguage('en');
                      }}
                    >
                      English
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Thông báo</h3>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Nhận thông báo qua email</span>
                  </label>
                </div>
                <div>
                  <Button variant="default">Lưu cài đặt</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 
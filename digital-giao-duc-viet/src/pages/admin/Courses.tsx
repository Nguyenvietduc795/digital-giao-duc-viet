import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase" // Import supabase client

interface Course {
  id: number;
  name: string;
  category: string;
  level: string;
  instructor: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
      setError(error.message);
      setCourses([]);
    } else {
      setCourses(data as Course[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const level = formData.get('level') as string;
    const instructor = formData.get('instructor') as string;

    if (currentCourse) {
      // Edit course
      const { error } = await supabase
        .from('courses')
        .update({ name, category, level, instructor })
        .eq('id', currentCourse.id);
      if (error) {
        setError(error.message);
      } else {
        fetchCourses();
      }
    } else {
      // Add new course
      const { error } = await supabase.from('courses').insert([{ name, category, level, instructor }]);
      if (error) {
        setError(error.message);
      } else {
        fetchCourses();
      }
    }
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Quản lý Khóa học</h2>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm" onClick={handleAddCourse}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khóa học mới
        </Button>
      </div>

      <div className="relative flex-1 rounded-md border bg-white p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 uppercase text-gray-600">
              <TableHead className="w-[100px]">Mã khóa học</TableHead>
              <TableHead>Tên khóa học</TableHead>
              <TableHead>category</TableHead>
              <TableHead>Trình độ</TableHead>
              <TableHead>Giảng viên</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">Không có khóa học nào.</TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-600" onClick={() => handleEditCourse(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-600" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCourse ? 'Chỉnh sửa Khóa học' : 'Thêm Khóa học mới'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Tên khóa học</Label>
                <Input id="name" name="name" defaultValue={currentCourse?.name || ''} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" name="category" defaultValue={currentCourse?.category || ''} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">Trình độ</Label>
                <Input id="level" name="level" defaultValue={currentCourse?.level || ''} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructor" className="text-right">Giảng viên</Label>
                <Input id="instructor" name="instructor" defaultValue={currentCourse?.instructor || ''} className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white">
                {currentCourse ? 'Lưu thay đổi' : 'Thêm Khóa học'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
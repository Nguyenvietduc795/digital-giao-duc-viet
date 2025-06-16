import { useState } from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, MoreHorizontal, Search, Edit, Trash2 } from "lucide-react"

// Mock data
const assignments = [
  {
    id: 1,
    title: "Bài tập React Hooks",
    course: "Lập trình Web với React",
    dueDate: "15/03/2024",
    submissions: 45,
    status: "active",
  },
  {
    id: 2,
    title: "Bài tập Python cơ bản",
    course: "Python cho người mới bắt đầu",
    dueDate: "20/03/2024",
    submissions: 30,
    status: "active",
  },
  {
    id: 3,
    title: "Bài tập Machine Learning",
    course: "Machine Learning cơ bản",
    dueDate: "25/03/2024",
    submissions: 20,
    status: "draft",
  },
]

export default function Assignments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Quản lý Bài tập</h2>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm bài tập mới
        </Button>
      </div>

      <div className="flex items-center space-x-2 rounded-md border bg-white p-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài tập..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo khóa học" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khóa học</SelectItem>
            <SelectItem value="react">Lập trình Web với React</SelectItem>
            <SelectItem value="python">Python cho người mới bắt đầu</SelectItem>
            <SelectItem value="ml">Machine Learning cơ bản</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 uppercase text-gray-600">
              <TableHead>Tên bài tập</TableHead>
              <TableHead>Khóa học</TableHead>
              <TableHead>Hạn nộp</TableHead>
              <TableHead>Số bài nộp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.submissions}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      assignment.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {assignment.status === "active" ? "Đang mở" : "Bản nháp"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 
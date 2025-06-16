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
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, Search, Edit, Trash2 } from "lucide-react"

// Mock data
const roles = [
  {
    id: 1,
    name: "Quản trị viên",
    description: "Toàn quyền truy cập và quản lý hệ thống",
    users: 3,
    permissions: ["all"],
  },
  {
    id: 2,
    name: "Giảng viên",
    description: "Quản lý khóa học và bài tập",
    users: 15,
    permissions: ["manage_courses", "manage_assignments", "view_students"],
  },
  {
    id: 3,
    name: "Học viên",
    description: "Truy cập khóa học và nộp bài tập",
    users: 150,
    permissions: ["view_courses", "submit_assignments"],
  },
]

export default function Roles() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Quản lý Phân quyền</h2>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò mới
        </Button>
      </div>

      <div className="flex items-center space-x-2 rounded-md border bg-white p-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm vai trò..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 uppercase text-gray-600">
              <TableHead>Tên vai trò</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Số người dùng</TableHead>
              <TableHead>Quyền</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.users}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {permission === "all"
                          ? "Tất cả quyền"
                          : permission === "manage_courses"
                          ? "Quản lý khóa học"
                          : permission === "manage_assignments"
                          ? "Quản lý bài tập"
                          : permission === "view_students"
                          ? "Xem học viên"
                          : permission === "view_courses"
                          ? "Xem khóa học"
                          : "Nộp bài tập"}
                      </span>
                    ))}
                  </div>
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
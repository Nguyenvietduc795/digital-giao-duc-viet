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
const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "student",
    status: "active",
    joinedDate: "01/01/2024",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "teacher",
    status: "active",
    joinedDate: "15/01/2024",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "student",
    status: "inactive",
    joinedDate: "20/01/2024",
  },
]

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Quản lý Người dùng</h2>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng mới
        </Button>
      </div>

      <div className="flex items-center space-x-2 rounded-md border bg-white p-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value="student">Học viên</SelectItem>
            <SelectItem value="teacher">Giảng viên</SelectItem>
            <SelectItem value="admin">Quản trị viên</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 uppercase text-gray-600">
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "teacher"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role === "teacher"
                      ? "Giảng viên"
                      : user.role === "admin"
                      ? "Quản trị viên"
                      : "Học viên"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                  </span>
                </TableCell>
                <TableCell>{user.joinedDate}</TableCell>
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
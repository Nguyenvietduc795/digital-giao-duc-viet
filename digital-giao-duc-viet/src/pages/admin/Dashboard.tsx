import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react"
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Tổng số học viên",
    value: "1,234",
    icon: Users,
    description: "Tăng 12% so với tháng trước",
    trend: "up",
  },
  {
    title: "Khóa học đang mở",
    value: "45",
    icon: BookOpen,
    description: "Tăng 5% so với tháng trước",
    trend: "up",
  },
  {
    title: "Giảng viên",
    value: "28",
    icon: GraduationCap,
    description: "Tăng 3% so với tháng trước",
    trend: "up",
  },
  {
    title: "Doanh thu tháng",
    value: "₫45,678,000",
    icon: DollarSign,
    description: "Tăng 8% so với tháng trước",
    trend: "up",
  },
]

export default function Dashboard() {
  const adminNavItems = [
    {
      title: "Quản lý khóa học",
      path: "/admin/khoa-hoc",
    },
    {
      title: "Quản lý người dùng",
      path: "/admin/nguoi-dung",
    },
    {
      title: "Quản lý bài tập",
      path: "/admin/bai-tap",
    },
    {
      title: "Phân quyền",
      path: "/admin/phan-quyen",
    },
    {
      title: "Thống kê",
      path: "/admin/statistics",
    },
    {
      title: "Cài đặt",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bảng Điều Khiển Quản Trị</h1>

      <nav className="admin-nav mb-8 flex space-x-1 rounded-lg bg-white p-1 shadow-sm">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex-1 rounded-md px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-gray-100",
                isActive
                  ? "bg-pink-500 text-white hover:bg-pink-600 shadow"
                  : "text-gray-700"
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-[300px] w-full rounded-lg bg-gray-100"></div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Khóa học phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Khóa học {i}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 1000)} học viên
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    {Math.floor(Math.random() * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-9 w-9 rounded-full bg-gray-100"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Người dùng {i} đã đăng ký khóa học mới
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i} phút trước
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium">
                    Cập nhật phiên bản {i}.0.0
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Đã thêm tính năng mới và sửa lỗi
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
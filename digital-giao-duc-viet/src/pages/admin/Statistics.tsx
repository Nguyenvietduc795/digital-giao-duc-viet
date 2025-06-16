import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, DollarSign, Activity, TrendingUp, TrendingDown } from "lucide-react"

export default function Statistics() {
  const stats = [
    {
      title: "Tổng số khóa học",
      value: "150",
      icon: BookOpen,
      description: "",
      color: "text-pink-500",
    },
    {
      title: "Tổng số học viên",
      value: "1,200",
      icon: Users,
      description: "",
      color: "text-blue-500",
    },
    {
      title: "Doanh thu tháng này",
      value: "50,000,000₫",
      icon: DollarSign,
      description: "",
      color: "text-green-500",
    },
    {
      title: "Người dùng hoạt động",
      value: "850",
      icon: Activity,
      description: "Tăng 5% so với tuần trước",
      trend: "up",
    },
    {
      title: "Đăng ký mới",
      value: "75",
      icon: Users,
      description: "Giảm 2% so với hôm qua",
      trend: "down",
    },
    {
      title: "Hoàn thành khóa học",
      value: "30",
      icon: GraduationCap,
      description: "Tăng 10% so với tháng trước",
      trend: "up",
    },
  ];

  const topCourses = [
    { id: 1, name: "Lập trình Python cơ bản", students: 320 },
    { id: 2, name: "IELTS 6.0+ trong 3 tháng", students: 280 },
    { id: 3, name: "Thiết kế web với HTML, CSS và JavaScript", students: 250 },
    { id: 4, name: "Toán cao cấp cho lớp 12", students: 190 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-800">Thống kê</h2>
      <p className="text-muted-foreground">Tổng quan về hiệu suất hệ thống của bạn.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.description && (
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {stat.trend === 'up' && <TrendingUp className="inline h-3 w-3 mr-1" />}
                  {stat.trend === 'down' && <TrendingDown className="inline h-3 w-3 mr-1" />}
                  {stat.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Biểu đồ đăng ký học viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Placeholder cho biểu đồ đường]
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Placeholder cho biểu đồ cột]
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Khóa học phổ biến nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {topCourses.map(course => (
              <li key={course.id} className="flex justify-between items-center">
                <span className="font-medium">{course.name}</span>
                <span className="text-sm text-gray-600">{course.students} học viên</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Thống kê danh mục khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Placeholder cho biểu đồ tròn]
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-medium">Nguyễn Văn A</span> đã đăng ký khóa học mới <span className="font-medium">"Lập trình React cơ bản"</span>. <span className="text-gray-500 text-xs">5 phút trước</span></li>
              <li><span className="font-medium">Trần Thị B</span> đã hoàn thành bài tập <span className="font-medium">"Bài tập JavaScript nâng cao"</span>. <span className="text-gray-500 text-xs">1 giờ trước</span></li>
              <li><span className="font-medium">Lê Văn C</span> đã tạo khóa học mới <span className="font-medium">"Thiết kế UI/UX với Figma"</span>. <span className="text-gray-500 text-xs">3 giờ trước</span></li>
              <li><span className="font-medium">Phạm Thị D</span> đã cập nhật hồ sơ cá nhân. <span className="text-gray-500 text-xs">1 ngày trước</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
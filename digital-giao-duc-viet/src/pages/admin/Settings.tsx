import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Cài đặt</h2>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow-sm">
          Lưu thay đổi
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4 rounded-md border bg-white p-6">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>
                Cấu hình thông tin cơ bản của hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Tên trang web</Label>
                <Input id="site-name" defaultValue="Digital Education" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Mô tả</Label>
                <Input
                  id="site-description"
                  defaultValue="Nền tảng học trực tuyến hàng đầu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email liên hệ</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="contact@digitaleducation.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ngôn ngữ và múi giờ</CardTitle>
              <CardDescription>
                Cấu hình ngôn ngữ và múi giờ mặc định.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select defaultValue="asia/hanoi">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/hanoi">Hà Nội (GMT+7)</SelectItem>
                    <SelectItem value="asia/singapore">
                      Singapore (GMT+8)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>
                Cấu hình các tùy chọn bảo mật hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xác thực hai yếu tố</Label>
                  <p className="text-sm text-muted-foreground">
                    Yêu cầu người dùng xác thực hai yếu tố khi đăng nhập
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Giới hạn đăng nhập sai</Label>
                  <p className="text-sm text-muted-foreground">
                    Khóa tài khoản sau 5 lần đăng nhập sai
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mã hóa dữ liệu</Label>
                  <p className="text-sm text-muted-foreground">
                    Mã hóa dữ liệu nhạy cảm trong hệ thống
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>
                Cấu hình các tùy chọn thông báo hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo email</Label>
                  <p className="text-sm text-muted-foreground">
                    Gửi thông báo qua email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo đẩy</Label>
                  <p className="text-sm text-muted-foreground">
                    Gửi thông báo đẩy đến trình duyệt
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Gửi thông báo qua SMS
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Giao diện</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Chọn giao diện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Sáng</SelectItem>
                    <SelectItem value="dark">Tối</SelectItem>
                    <SelectItem value="system">Theo hệ thống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Màu chủ đạo</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Chọn màu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Xanh dương</SelectItem>
                    <SelectItem value="green">Xanh lá</SelectItem>
                    <SelectItem value="purple">Tím</SelectItem>
                    <SelectItem value="pink">Hồng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Shield,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

const sidebarItems = [
  {
    title: "Tổng quan",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Khóa học",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Bài tập",
    href: "/admin/assignments",
    icon: FileText,
  },
  {
    title: "Phân quyền",
    href: "/admin/roles",
    icon: Shield,
  },
  {
    title: "Thống kê",
    href: "/admin/statistics",
    icon: BarChart3,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            title="Đóng sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100",
                location.pathname === item.href && "bg-gray-100 font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            title="Mở sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100"
                  title="Tài khoản admin"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200">
                    <img
                      src="/avatar.png"
                      alt="Avatar"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
} 
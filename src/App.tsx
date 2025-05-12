
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import HomePage from "./pages/HomePage";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Registration from "./pages/Registration";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import StudentDashboard from "./pages/StudentDashboard";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/hoc-sinh" element={<HomePage />} />
          <Route path="/khoa-hoc" element={<CourseList />} />
          <Route path="/khoa-hoc/:id" element={<CourseDetail />} />
          <Route path="/dang-ky" element={<Registration />} />
          <Route path="/dang-ky/thanh-cong" element={<RegistrationSuccess />} />
          <Route path="/hoc-vien" element={<StudentDashboard />} />
          <Route path="/thanh-toan" element={<Payment />} />
          <Route path="/thanh-toan/thanh-cong" element={<PaymentSuccess />} />
          <Route path="/giao-vien" element={<TeacherDashboard />} />
          <Route path="/giao-vien/dashboard" element={<TeacherDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

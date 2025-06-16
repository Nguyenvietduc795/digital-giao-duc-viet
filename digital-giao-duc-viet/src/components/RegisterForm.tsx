import { supabase } from "@/lib/supabase";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';
import { Eye, EyeOff } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!fullName.trim()) {
      setMessage("Vui lòng nhập họ và tên.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setMessage("Email không hợp lệ.");
      return;
    }

    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (phone && !phoneRegex.test(phone)) {
      setMessage("Số điện thoại không hợp lệ.");
      return;
    }

    if (!email && !phone) {
      setMessage("Vui lòng nhập email hoặc số điện thoại.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setMessage("Lỗi đăng ký: " + error.message);
        return;
      }

      if (data.user) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: data.user.id,
          name: fullName,
          email: email,
          phone: phone || null,
          gender: gender || "Khác",
          role: "student",
        });

        if (insertError) {
          setMessage("Lỗi lưu thông tin hồ sơ: " + insertError.message);
          return;
        }

        setMessage("Đăng ký thành công!");
        setUser({ id: data.user.id, fullName, email, phone, gender, password });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Lỗi không xác định: " + err.message);
      } else {
        setMessage("Lỗi không xác định.");
      }
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      if (access_token && refresh_token) {
        supabase.auth.setSession({
          access_token,
          refresh_token,
        }).then(() => {
          navigate("/role-selection");
        });
      }
    }
  }, [navigate]);

  return (
    <div className="auth-page-container">
      <div className="logo flex items-center mb-10" style={{ justifyContent: 'center' }}>
        <img
          src="/Blue_and_Yellow_Minimalist_Modern_University_Logo__3_-removebg-preview.png"
          alt="Digital Education Logo"
          className="h-28 w-28 object-contain mr-4"
          style={{ minWidth: 112 }}
        />
        <span className="block" style={{
          fontSize: 48,
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #e18df9, #888ff7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          whiteSpace: 'nowrap'
        }}>
          Digital Education
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div className="form-group">
          <Label htmlFor="gender">Chọn giới tính</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4 mt-2" id="gender">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nam" id="gender-male" />
              <Label htmlFor="gender-male">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nữ" id="gender-female" />
              <Label htmlFor="gender-female">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Khác" id="gender-other" />
              <Label htmlFor="gender-other">Khác</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7266f0] transition" tabIndex={-1}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="password-wrapper">
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7266f0] transition" tabIndex={-1}>
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit">Đăng ký</button>
        {message && <div className={`message${message === 'Đăng ký thành công!' ? ' text-green-600' : ''}`}>{message}</div>}
        <div className="auth-links">
          <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

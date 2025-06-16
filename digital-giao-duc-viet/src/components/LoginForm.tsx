import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { setUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Vui lòng nhập email.');
      return;
    }

    if (!password) {
      setMessage('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Lỗi đăng nhập: " + error.message);
        return;
      }

      if (data.user) {
        setMessage('Đăng nhập thành công!');
        setUser({
          id: data.user.id,
          email: data.user.email,
          password: password,
        });

        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error: any) {
      setMessage("Có lỗi xảy ra: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage('');
          }}
          disabled={isLoading}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage('');
            }}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            className="togglePassword bg-gray-100 rounded-full flex items-center justify-center w-8 h-8 p-0 hover:bg-gray-200 transition absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        {message && (
          <div className={`message${message === 'Đăng nhập thành công!' ? ' text-green-600' : ''}`}>{message}</div>
        )}
        <div className="auth-links">
          <Link to="/forgot-password">Quên mật khẩu?</Link>
          <Link to="/register">Đăng ký tài khoản mới</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

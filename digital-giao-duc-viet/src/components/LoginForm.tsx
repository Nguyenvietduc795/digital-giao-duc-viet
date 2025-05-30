import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';

const LoginForm: React.FC = () => {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateInput = () => {
        if (!loginInput.trim()) {
            setMessage('Vui lòng nhập email hoặc số điện thoại.');
            return false;
        }
        if (!password) {
            setMessage('Vui lòng nhập mật khẩu.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateInput()) {
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const user = getUser();

            if (!user) {
                setMessage('Chưa có người dùng nào được đăng ký.');
                return;
            }

            if ((loginInput !== user.phone && loginInput !== user.email)) {
                setMessage('Email hoặc số điện thoại không đúng.');
                return;
            }

            if (password !== user.password) {
                setMessage('Mật khẩu không đúng.');
                return;
            }

            setMessage('Đăng nhập thành công!');
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            navigate('/');
        } catch (error) {
            setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="logo">Digital Education</div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email hoặc SĐT"
                    value={loginInput}
                    onChange={(e) => {
                        setLoginInput(e.target.value);
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
                        className="togglePassword"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Ẩn' : 'Hiện'}
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
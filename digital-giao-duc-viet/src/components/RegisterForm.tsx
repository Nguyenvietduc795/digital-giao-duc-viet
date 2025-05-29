import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setMessage('Email không hợp lệ.');
            return;
        }

        // Validate phone format (Vietnam phone number)
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (phone && !phoneRegex.test(phone)) {
            setMessage('Số điện thoại không hợp lệ.');
            return;
        }

        if (!email && !phone) {
            setMessage('Vui lòng nhập email hoặc số điện thoại.');
            return;
        }

        // Save user data
        setUser({ email, phone, password });
        setMessage('Đăng ký thành công!');
        
        // Redirect to login page after successful registration
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="auth-page-container">
            <div className="logo">Digital Education</div>
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setMessage('');
                    }}
                />
                <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        setMessage('');
                    }}
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
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setMessage('');
                        }}
                        required
                    />
                    <button
                        type="button"
                        className="togglePassword"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                    </button>
                </div>
                <button type="submit">Đăng ký</button>
                {message && <div className="message">{message}</div>}
                <div className="auth-links">
                    <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
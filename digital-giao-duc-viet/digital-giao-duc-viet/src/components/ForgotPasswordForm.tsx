import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, setUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';
import { Eye, EyeOff } from 'lucide-react';

const ForgotPasswordForm: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra xem identifier là email hay số điện thoại
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        const isEmail = emailRegex.test(identifier);
        const isPhone = phoneRegex.test(identifier);

        if (!isEmail && !isPhone) {
            setMessage('Vui lòng nhập email hoặc số điện thoại hợp lệ.');
            return;
        }

        // Kiểm tra mật khẩu mới
        if (newPassword.length < 6) {
            setMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        // Lấy thông tin người dùng
        const user = getUser();
        if (!user) {
            setMessage('Không tìm thấy tài khoản.');
            return;
        }

        // Kiểm tra xem identifier có khớp với thông tin đăng ký không
        if ((isEmail && user.email !== identifier) || (isPhone && user.phone !== identifier)) {
            setMessage('Email hoặc số điện thoại không khớp với tài khoản nào.');
            return;
        }

        // Cập nhật mật khẩu mới
        setUser({
            ...user,
            password: newPassword
        });

        setMessage('Đặt lại mật khẩu thành công!');

        // Chuyển về trang đăng nhập sau 1.5 giây
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="auth-page-container">
            <div className="logo">Digital Education</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email hoặc số điện thoại"
                    value={identifier}
                    onChange={(e) => {
                        setIdentifier(e.target.value);
                        setMessage('');
                    }}
                    required
                />
                <div className="password-wrapper">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setMessage('');
                        }}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7266f0] transition"
                        tabIndex={-1}
                    >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setMessage('');
                        }}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7266f0] transition"
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <button type="submit">Đặt lại mật khẩu</button>
                {message && (
                  <div className={`message${message === 'Đặt lại mật khẩu thành công!' ? ' text-green-600' : ''}`}>{message}</div>
                )}
                <div className="auth-links">
                    <Link to="/login">Quay lại đăng nhập</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
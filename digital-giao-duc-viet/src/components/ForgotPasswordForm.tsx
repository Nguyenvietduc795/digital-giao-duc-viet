import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, setUser } from '../utils/storage.tsx';
import '../styles/auth-pages.css';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from "@/lib/supabase";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(''); // State cho mã OTP
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [step, setStep] = useState<'request_email' | 'enter_otp' | 'reset_success'>('request_email'); // Quản lý các bước
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Xóa thông báo cũ

        if (step === 'request_email') {
            // Bước 1: Gửi email đặt lại mật khẩu
            if (!email.trim()) {
                setMessage('Vui lòng nhập địa chỉ email.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setMessage("Email không hợp lệ.");
                return;
            }

            try {
                const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'http://localhost:5173/reset-password' }); // Đặt lại mật khẩu qua email

                if (error) {
                    setMessage("Lỗi gửi email: " + error.message);
                } else {
                    setMessage("Mã xác nhận đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.");
                    setStep('enter_otp');
                }
            } catch (err: any) {
                setMessage("Lỗi không xác định: " + err.message);
            }
        } else if (step === 'enter_otp') {
            // Bước 2: Xác nhận mã OTP và đặt lại mật khẩu
            if (!otp.trim()) {
                setMessage('Vui lòng nhập mã xác nhận.');
                return;
            }
            if (newPassword.length < 6) {
                setMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
                return;
            }
            if (newPassword !== confirmPassword) {
                setMessage('Mật khẩu xác nhận không khớp.');
                return;
            }

            try {
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    email: email,
                    token: otp,
                    type: 'email',
                });

                if (verifyError) {
                    setMessage("Mã xác nhận không hợp lệ hoặc đã hết hạn: " + verifyError.message);
                    return;
                }

                const { error: updateError } = await supabase.auth.updateUser({
                    password: newPassword,
                });

                if (updateError) {
                    setMessage("Lỗi đặt lại mật khẩu: " + updateError.message);
                } else {
                    setMessage("Đặt lại mật khẩu thành công!");
                    setStep('reset_success');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } catch (err: any) {
                setMessage("Lỗi không xác định: " + err.message);
            }
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
                <span className="block" style={{ fontSize: 48, fontWeight: 'bold', background: 'linear-gradient(to right, #e18df9, #888ff7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', whiteSpace: 'nowrap' }}>Digital Education</span>
            </div>
            <form onSubmit={handleSubmit}>
                {step === 'request_email' && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}

                {step === 'enter_otp' && (
                    <>
                        <input
                            type="text"
                            placeholder="Mã xác nhận (OTP)"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
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
                    </>
                )}

                <button type="submit">
                    {step === 'request_email' && 'Gửi mã xác nhận'}
                    {step === 'enter_otp' && 'Đặt lại mật khẩu'}
                </button>

                {message && (
                    <div className={`message${step === 'reset_success' ? ' text-green-600' : ''}`}>{message}</div>
                )}
                <div className="auth-links">
                    <Link to="/login">Quay lại đăng nhập</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
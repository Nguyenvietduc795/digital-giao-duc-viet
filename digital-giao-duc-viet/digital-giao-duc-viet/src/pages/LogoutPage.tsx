import React from 'react';
import LogoutForm from '../components/LogoutForm';

const LogoutPage: React.FC = () => {
    return (
        <div className="logout-page">
            <h2>Đăng xuất tài khoản</h2>
            <LogoutForm />
        </div>
    );
};

export default LogoutPage; 
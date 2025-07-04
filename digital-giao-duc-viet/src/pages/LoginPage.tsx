import React from 'react';
import LoginForm from '../components/LoginForm.tsx';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
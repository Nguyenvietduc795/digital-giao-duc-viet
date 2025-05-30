import React from 'react';
import RegisterForm from '../components/RegisterForm.tsx';

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
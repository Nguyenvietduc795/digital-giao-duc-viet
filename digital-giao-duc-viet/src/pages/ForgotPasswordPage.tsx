import React, { useState } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm.tsx';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100">
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPasswordPage;
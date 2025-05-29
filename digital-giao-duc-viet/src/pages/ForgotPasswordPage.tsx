import React, { useState } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm.tsx';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="forgot-password-page">
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPasswordPage;
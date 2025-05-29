import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/storage.tsx';

const LogoutForm = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleLogout = () => {
            removeUser();
            navigate('/login');
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default LogoutForm; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Import supabase

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        if (profileData && profileData.role) {
          const role = profileData.role;
          if (role === "admin") {
            navigate("/admin");
          }
        }
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      // You might want to show a user-friendly error message here
    }
  };

  return (
    <div>LoginForm</div>
  );
};

export default LoginForm; 
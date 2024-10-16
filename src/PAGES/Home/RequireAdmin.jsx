import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || role !== 'admin') {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default RequireAdmin;

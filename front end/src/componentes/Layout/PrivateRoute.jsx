import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from "../../stores/useAuthStore"


const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user, loading } = useAuthStore();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && (!user || user.rol !== requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
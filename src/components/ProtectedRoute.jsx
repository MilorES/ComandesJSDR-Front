import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Comprovant sessió...</p>;


  // Si no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "Administrator") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem('admin_token');

  if (!token) {
    // Redirect to login with return location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

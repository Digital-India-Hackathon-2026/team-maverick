import { Navigate, Outlet } from 'react-router-dom';

/**
 * Mock Protected Route Wrapper
 * In a real application, this would use a robust AuthContext to check if the user is authenticated 
 * and has the correct role. For this frontend-only showcase, we'll simulate a logged-in state.
 */
export default function ProtectedRoute() {
  // Simulate auth check. Change to false to test redirect to /auth
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the child routes (e.g., Dashboards)
  return <Outlet />;
}

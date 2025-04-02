import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const roleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        
    if (token) {
        if (roles.some((role: string) => allowedRoles.includes(role))) {
        return <>{children}</>; 
        } else {
        return <Navigate to="/" replace />; 
        }
    }

    return <Navigate to="/home" replace />;
}

export default roleGuard;

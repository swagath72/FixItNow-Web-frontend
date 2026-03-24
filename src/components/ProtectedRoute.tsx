import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { WebLayout } from './WebLayout';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRole?: 'customer' | 'technician' | 'admin';
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRole && user?.role) {
        if (user.role.toLowerCase() !== allowedRole) {
            return <Navigate to="/role-selection" replace />;
        }

        // Logic for unverified technicians
        if (user.role.toLowerCase() === 'technician' &&
            user.verification_status?.toLowerCase() !== 'approved' &&
            user.verification_status?.toLowerCase() !== 'verified' &&
            !['/technician/documents', '/technician/verification-pending', '/technician/register'].includes(location.pathname)) {
            return <Navigate to="/technician/verification-pending" replace />;
        }
    }

    // List of paths that should NOT have the layout even if protected
    const excludeLayoutPaths = ['/role-selection', '/location-selection', '/technician/register', '/technician/documents'];
    const shouldShowLayout = !excludeLayoutPaths.includes(location.pathname);

    if (shouldShowLayout) {
        return (
            <WebLayout role={user?.role?.toLowerCase() as 'customer' | 'technician' | 'admin'}>
                {children}
            </WebLayout>
        );
    }

    return <>{children}</>;
}

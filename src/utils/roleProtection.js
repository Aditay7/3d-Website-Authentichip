import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, decodeToken } from './auth';

/**
 * Hook to protect routes based on user role
 * Redirects to login if not authenticated
 * Redirects to appropriate dashboard if wrong role
 */
export const useRoleProtection = (requiredRole = null) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();

        // Not logged in - redirect to login
        if (!token) {
            navigate('/login');
            return;
        }

        // If a specific role is required, check it
        if (requiredRole) {
            // First try to get role from localStorage (faster)
            const storedUser = localStorage.getItem('user');
            let userRole = null;

            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    userRole = user.role;
                } catch (e) {
                    console.error('Failed to parse stored user:', e);
                }
            }

            // Fallback: decode token
            if (!userRole) {
                const payload = decodeToken(token);
                userRole = payload?.role;
            }

            // Wrong role - redirect to their correct dashboard
            if (userRole && userRole !== requiredRole) {
                if (userRole === 'admin') {
                    navigate('/admin');
                } else if (userRole === 'worker') {
                    navigate('/worker');
                } else {
                    navigate('/');
                }
            }
        }
    }, [navigate, requiredRole]);
};

/**
 * Get current user info from localStorage or token
 */
export const getCurrentUser = () => {
    const token = getAuthToken();

    if (!token) {
        return null;
    }

    // Try localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            return JSON.parse(storedUser);
        } catch (e) {
            console.error('Failed to parse stored user:', e);
        }
    }

    // Fallback: decode token
    const payload = decodeToken(token);
    return payload ? {
        role: payload.role,
        email: payload.sub,
        // Add other fields from token if available
    } : null;
};

/**
 * Check if user has a specific role
 */
export const hasRole = (role) => {
    const user = getCurrentUser();
    return user?.role === role;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getAuthToken();
};

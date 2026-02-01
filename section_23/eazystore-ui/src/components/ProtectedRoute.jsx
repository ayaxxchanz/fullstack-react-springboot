import React, {useEffect} from 'react'
import { Outlet, Navigate, useLocation } from 'react-router'
// import { useAuth } from '../store/auth-context'
import { useSelector } from 'react-redux'; // replace context with redux
import { selectIsAuthenticated } from '../store/auth-slice';

export default function ProtectedRoute() {
    // const { isAuthenticated } = useAuth();
    const isAuthenticated = useSelector(selectIsAuthenticated); // replace context with redux
    const location = useLocation();

    useEffect(() => {
        const skipRedirect = sessionStorage.getItem("skipRedirectPath") === true;
        if(!isAuthenticated && location.pathname !== '/login' && !skipRedirect) {
            // Save the current path to redirect after login
            sessionStorage.setItem("redirectPath", location.pathname);
        }
    }, [isAuthenticated, location.pathname]);
    
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

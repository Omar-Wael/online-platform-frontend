import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    // If user is not authenticated, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children (protected component)
    return children;
};

export default ProtectedRoute;

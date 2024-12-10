// src/components/Layout.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Layout.css'; // Add your styles for the layout

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext); // Get user and logout function from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="layout">
            <nav className="navbar">
                {user ? (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <a href='#' onClick={handleLogout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>)}
            </nav>
            <div className="main-content">
                <aside className="sidebar">
                    {user && (
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    )}
                </aside>
                <section className="content">{children}</section>
            </div>
        </div>
    );
};

export default Layout;

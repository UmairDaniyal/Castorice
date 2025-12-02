import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { currentUser, login, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Failed to log in", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setShowDropdown(false);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link to="/" className="logo-link">
                <div className="logo">Castorice</div>
            </Link>

            <div className="nav-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}>Categories</Link>
                <Link to="/cuisine/Indian" className={location.pathname === '/cuisine/Indian' ? 'active' : ''}>Indian Cuisine</Link>
                <Link to="/wishlist" className={location.pathname === '/wishlist' ? 'active' : ''}>Wishlist</Link>
                <Link to="/cooked" className={location.pathname === '/cooked' ? 'active' : ''}>Cooked</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            </div>

            <div className="auth-section">
                {currentUser ? (
                    <div className="user-menu" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        <img src={currentUser.photoURL} alt="User" className="user-avatar" />
                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    className="dropdown-menu"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <button onClick={handleLogin} className="login-btn">
                        Login with Google
                    </button>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;

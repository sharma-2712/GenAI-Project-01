import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import { useInterview } from '../hooks/useInterview';
import '../style/navbar.scss'; 

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, handleLogout } = useAuth(); // Assuming logout is in your useAuth
    const { reports } = useInterview();
    
    const navigate = useNavigate();
    const location = useLocation();

    // Functional Guard: User must be logged in for these to exist
    const hasReports = user && reports && reports.length > 0;

    const handleNavClick = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const onLogout = async () => {
        await handleLogout();
        navigate('/login'); // Redirect to login after logout
    };
    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                {/* Logo - Always visible */}
                <div className="navbar-brand" onClick={() => navigate('/')}>
                    <div className="brand-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                    </div>
                    <span className="brand-text">Interview<span className="highlight">AI</span></span>
                </div>

                {/* Mobile Toggle - Text will disappear on small screens per your protocol */}
                <button 
                    className="hamburger-menu" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </button>

                <div className={`navbar-links ${isMobileMenuOpen ? 'navbar-links--open' : ''}`}>
                    {user ? (
                        <>
                            

                            {/* Function 2: Reports (Login + Data check) */}
                            {hasReports && (
                                <button 
                                    className={`nav-link ${location.pathname === `/interview/:${reports[0]._id}` ? 'nav-link--active' : ''}`}
                                    onClick={() => handleNavClick(`/interview/${reports[0]._id}`)}
                                >
                                    <span className="nav-label">My Reports</span>
                                </button>
                            )}

                            <div className="navbar-divider" />

                            {/* User Profile & Logout */}
                            <div className="user-section">
                                <div className="user-info">
                                    <div className="user-avatar">{user.username?.charAt(0) || 'A'}</div>
                                    <span className="user-name">{user.username}</span>
                                </div>
                                <button className="logout-btn" onClick={onLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                    <span className="nav-label">Logout</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <button className="login-btn" onClick={() => handleNavClick('/login')}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
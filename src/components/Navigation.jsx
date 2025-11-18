import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

/**
 * Navigation Component - Activity 1 & 3
 * Provides routing between pages with active state
 * Integrated with Session Context for user information
 */
const Navigation = () => {
  const location = useLocation();
  const { session } = useSession();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🎉</span>
          EventEase
        </Link>

        <div className="nav-links">
          <Link to="/" className={isActive('/')}>
            Events
          </Link>
          <Link to="/registration" className={isActive('/registration')}>
            Register
          </Link>
          <Link to="/attendance" className={isActive('/attendance')}>
            My Events
          </Link>
        </div>

        {session.user && (
          <div className="user-info">
            <span className="user-name">👤 {session.user.name}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

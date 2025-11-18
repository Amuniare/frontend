import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NotFound Page - Activity 2
 * Error page for invalid routes (404)
 * Part of routing error handling implementation
 */
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-message">
            Oops! The page you're looking for doesn't exist.
            <br />
            It might have been moved or deleted.
          </p>
          <div className="not-found-actions">
            <button className="btn btn-primary" onClick={handleGoHome}>
              Go to Home Page
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
        <div className="not-found-illustration">
          <span className="not-found-icon">🔍</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

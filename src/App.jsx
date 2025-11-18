import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import Navigation from './components/Navigation';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import Attendance from './pages/Attendance';
import NotFound from './pages/NotFound';
import './styles/App.css';

/**
 * Main App Component - Activities 1, 2, & 3
 * Sets up routing, navigation, and session management
 * Error boundaries for Activity 2 error handling
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <Router>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                {/* Activity 1: Basic routing */}
                <Route path="/" element={<EventList />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/registration" element={<Registration />} />

                {/* Activity 3: Advanced features */}
                <Route path="/attendance" element={<Attendance />} />

                {/* Activity 2: Error handling - catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="app-footer">
              <p>&copy; 2025 EventEase. All rights reserved.</p>
              <p className="copilot-credit">Built with AI assistance</p>
            </footer>
          </div>
        </Router>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default App;

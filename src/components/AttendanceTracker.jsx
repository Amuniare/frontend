import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockEvents } from '../models/mockData';

/**
 * AttendanceTracker Component - Activity 3
 * Displays user's registered events and attendance status
 * Part of state management implementation
 */
const AttendanceTracker = () => {
  const navigate = useNavigate();
  const { session, markAttended, unregisterFromEvent, clearSession } = useSession();

  if (!session.user) {
    return (
      <div className="attendance-empty">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No Registration Yet</h3>
          <p>You haven't registered for any events.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  if (session.registeredEvents.length === 0) {
    return (
      <div className="attendance-empty">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No Events Registered</h3>
          <p>Start exploring events and register to see them here.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const getEventDetails = (eventId) => {
    return mockEvents.find(e => e.id === eventId);
  };

  const handleMarkAttended = (eventId) => {
    markAttended(eventId);
  };

  const handleUnregister = (eventId) => {
    if (window.confirm('Are you sure you want to unregister from this event?')) {
      unregisterFromEvent(eventId);
    }
  };

  const handleViewEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out? This will clear your session.')) {
      clearSession();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const upcomingEvents = session.registeredEvents.filter(reg => {
    const event = getEventDetails(reg.eventId);
    return event && new Date(event.date) >= new Date();
  });

  const pastEvents = session.registeredEvents.filter(reg => {
    const event = getEventDetails(reg.eventId);
    return event && new Date(event.date) < new Date();
  });

  return (
    <div className="attendance-tracker">
      <div className="tracker-header">
        <div className="user-profile">
          <h2>Welcome, {session.user.name}!</h2>
          <p className="user-email">{session.user.email}</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="tracker-stats">
        <div className="stat-card">
          <span className="stat-number">{session.registeredEvents.length}</span>
          <span className="stat-label">Total Registrations</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{upcomingEvents.length}</span>
          <span className="stat-label">Upcoming Events</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {session.registeredEvents.filter(e => e.attended).length}
          </span>
          <span className="stat-label">Events Attended</span>
        </div>
      </div>

      {upcomingEvents.length > 0 && (
        <div className="events-section">
          <h3>Upcoming Events</h3>
          <div className="registered-events-list">
            {upcomingEvents.map(registration => {
              const event = getEventDetails(registration.eventId);
              if (!event) return null;

              return (
                <div key={registration.eventId} className="registered-event-card">
                  <div className="event-card-content">
                    <div className="event-main-info">
                      <h4>{event.name}</h4>
                      <div className="event-meta">
                        <span>📅 {formatDate(event.date)}</span>
                        <span>📍 {event.location}</span>
                      </div>
                      <p className="registration-date">
                        Registered on {formatDate(registration.registeredAt)}
                      </p>
                    </div>

                    <div className="event-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewEvent(event.id)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleUnregister(event.id)}
                      >
                        Unregister
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="events-section">
          <h3>Past Events</h3>
          <div className="registered-events-list">
            {pastEvents.map(registration => {
              const event = getEventDetails(registration.eventId);
              if (!event) return null;

              return (
                <div
                  key={registration.eventId}
                  className={`registered-event-card ${registration.attended ? 'attended' : ''}`}
                >
                  <div className="event-card-content">
                    <div className="event-main-info">
                      <h4>{event.name}</h4>
                      <div className="event-meta">
                        <span>📅 {formatDate(event.date)}</span>
                        <span>📍 {event.location}</span>
                      </div>
                      {registration.attended ? (
                        <p className="attendance-status attended">
                          ✓ Attended on {formatDate(registration.attendedAt)}
                        </p>
                      ) : (
                        <p className="attendance-status not-attended">
                          Did not attend
                        </p>
                      )}
                    </div>

                    <div className="event-actions">
                      {!registration.attended && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleMarkAttended(event.id)}
                        >
                          Mark as Attended
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleViewEvent(event.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;

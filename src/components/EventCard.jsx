import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EventCard Component - Activity 1
 * Displays event information with two-way data binding
 * Optimized with React.memo for Activity 2 performance improvement
 */
const EventCard = React.memo(({ event }) => {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate availability percentage
  const availabilityPercentage = ((event.capacity - event.registrations) / event.capacity) * 100;

  // Determine availability status color
  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return '#4caf50';
    if (availabilityPercentage > 20) return '#ff9800';
    return '#f44336';
  };

  const handleViewDetails = () => {
    navigate(`/event/${event.id}`);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    navigate(`/registration?eventId=${event.id}`);
  };

  return (
    <div className="event-card" onClick={handleViewDetails}>
      <div className="event-card-header">
        <h3 className="event-name">{event.name}</h3>
        <span className="event-category">{event.category}</span>
      </div>

      <div className="event-card-body">
        <div className="event-info">
          <div className="info-row">
            <span className="info-label">📅 Date:</span>
            <span className="info-value">{formatDate(event.date)}</span>
          </div>

          <div className="info-row">
            <span className="info-label">📍 Location:</span>
            <span className="info-value">{event.location}</span>
          </div>

          <div className="info-row">
            <span className="info-label">👥 Availability:</span>
            <span className="info-value" style={{ color: getAvailabilityColor() }}>
              {event.spotsRemaining} / {event.capacity} spots available
            </span>
          </div>
        </div>

        <p className="event-description">
          {event.description.substring(0, 120)}...
        </p>
      </div>

      <div className="event-card-footer">
        <button
          className="btn btn-secondary"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button
          className="btn btn-primary"
          onClick={handleRegister}
          disabled={!event.isAvailable}
        >
          {event.isAvailable ? 'Register Now' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;

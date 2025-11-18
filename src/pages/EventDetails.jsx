import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../models/mockData';

/**
 * EventDetails Page - Activity 1 & 2
 * Displays detailed information about a single event
 * Includes error handling for invalid event IDs (Activity 2)
 */
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching with validation (Activity 2)
    try {
      const eventId = parseInt(id);

      if (isNaN(eventId)) {
        throw new Error('Invalid event ID');
      }

      const foundEvent = mockEvents.find(e => e.id === eventId);

      if (!foundEvent) {
        throw new Error('Event not found');
      }

      setEvent(foundEvent);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegister = () => {
    navigate(`/registration?eventId=${event.id}`);
  };

  const handleBackToEvents = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Oops! {error}</h2>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={handleBackToEvents}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const availabilityPercentage = ((event.capacity - event.registrations) / event.capacity) * 100;

  return (
    <div className="page-container">
      <button className="back-button" onClick={handleBackToEvents}>
        ← Back to Events
      </button>

      <div className="event-details-container">
        <div className="event-details-header">
          <div className="details-title-section">
            <h1>{event.name}</h1>
            <span className="event-category-badge">{event.category}</span>
          </div>
        </div>

        <div className="event-details-content">
          <div className="details-section">
            <h3>📅 Date & Time</h3>
            <p className="detail-value">{formatDate(event.date)}</p>
          </div>

          <div className="details-section">
            <h3>📍 Location</h3>
            <p className="detail-value">{event.location}</p>
          </div>

          <div className="details-section">
            <h3>📝 About This Event</h3>
            <p className="detail-description">{event.description}</p>
          </div>

          <div className="details-section">
            <h3>👥 Availability</h3>
            <div className="availability-info">
              <div className="availability-bar">
                <div
                  className="availability-fill"
                  style={{
                    width: `${100 - availabilityPercentage}%`,
                    backgroundColor: availabilityPercentage > 50 ? '#4caf50' : availabilityPercentage > 20 ? '#ff9800' : '#f44336'
                  }}
                />
              </div>
              <p className="availability-text">
                <strong>{event.registrations}</strong> registered •
                <strong> {event.spotsRemaining}</strong> spots remaining out of
                <strong> {event.capacity}</strong> total
              </p>
            </div>
          </div>
        </div>

        <div className="event-details-footer">
          <button
            className="btn btn-primary btn-large"
            onClick={handleRegister}
            disabled={!event.isAvailable}
          >
            {event.isAvailable ? 'Register for This Event' : 'Event Full - Registration Closed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

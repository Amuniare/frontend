import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import { mockEvents } from '../models/mockData';

/**
 * Registration Page - Activity 1 & 3
 * Main page for event registration
 * Uses RegistrationForm component with validation
 */
const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [preselectedEvent, setPreselectedEvent] = useState(null);

  useEffect(() => {
    const eventId = searchParams.get('eventId');
    if (eventId) {
      const event = mockEvents.find(e => e.id === parseInt(eventId));
      setPreselectedEvent(event);
    }
  }, [searchParams]);

  const handleRegistrationSuccess = (event) => {
    // Show success and redirect after a delay
    setTimeout(() => {
      navigate('/attendance');
    }, 2500);
  };

  return (
    <div className="page-container">
      <div className="registration-container">
        <div className="registration-header">
          <h1>Event Registration</h1>
          <p className="registration-subtitle">
            Fill out the form below to register for your chosen event
          </p>
        </div>

        {preselectedEvent && (
          <div className="preselected-event-info">
            <h3>Selected Event</h3>
            <div className="event-info-box">
              <h4>{preselectedEvent.name}</h4>
              <p>📅 {preselectedEvent.date}</p>
              <p>📍 {preselectedEvent.location}</p>
            </div>
          </div>
        )}

        <div className="registration-form-container">
          <RegistrationForm
            preselectedEventId={preselectedEvent?.id}
            onSuccess={handleRegistrationSuccess}
          />
        </div>

        <div className="registration-info">
          <h3>What happens after registration?</h3>
          <ul>
            <li>You'll receive a confirmation email with event details</li>
            <li>Your registration will be saved in "My Events"</li>
            <li>You'll get reminders before the event date</li>
            <li>You can manage your registrations anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Registration;

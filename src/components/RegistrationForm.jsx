import React, { useState } from 'react';
import { validation } from '../utils/validation';
import { useSession } from '../context/SessionContext';
import { mockEvents } from '../models/mockData';

/**
 * RegistrationForm Component - Activity 3
 * Form with validation for event registration
 * Integrates with SessionContext for state management
 */
const RegistrationForm = ({ preselectedEventId = null, onSuccess }) => {
  const { registerUser, registerForEvent, isRegisteredForEvent } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: preselectedEventId || ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate individual field on blur
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!validation.isRequired(value)) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!validation.isRequired(value)) {
          newErrors.email = 'Email is required';
        } else if (!validation.isValidEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value && !validation.isValidPhone(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'eventId':
        if (!value) {
          newErrors.eventId = 'Please select an event';
        } else {
          delete newErrors.eventId;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      eventId: true
    });

    // Validate all fields
    const validationResult = validation.validateRegistration(formData);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    // Check if already registered for this event
    if (isRegisteredForEvent(parseInt(formData.eventId))) {
      setErrors({ eventId: 'You are already registered for this event' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const selectedEvent = mockEvents.find(e => e.id === parseInt(formData.eventId));

      // Register user and event in session
      registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });

      registerForEvent(parseInt(formData.eventId), selectedEvent.name);

      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(selectedEvent);
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventId: preselectedEventId || ''
        });
        setErrors({});
        setTouched({});
        setSubmitSuccess(false);
      }, 2000);
    }, 1000);
  };

  const getInputClassName = (fieldName) => {
    let className = 'form-input';
    if (touched[fieldName] && errors[fieldName]) {
      className += ' error';
    } else if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      className += ' valid';
    }
    return className;
  };

  if (submitSuccess) {
    return (
      <div className="registration-success">
        <div className="success-icon">✓</div>
        <h3>Registration Successful!</h3>
        <p>You're all set for the event. Check your email for confirmation details.</p>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName('name')}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {touched.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName('email')}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName('phone')}
          placeholder="(123) 456-7890"
          disabled={isSubmitting}
        />
        {touched.phone && errors.phone && (
          <span className="error-message">{errors.phone}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="eventId" className="form-label">
          Select Event <span className="required">*</span>
        </label>
        <select
          id="eventId"
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName('eventId')}
          disabled={isSubmitting || preselectedEventId}
        >
          <option value="">-- Choose an event --</option>
          {mockEvents
            .filter(event => event.isAvailable)
            .map(event => (
              <option key={event.id} value={event.id}>
                {event.name} - {event.date}
              </option>
            ))}
        </select>
        {touched.eventId && errors.eventId && (
          <span className="error-message">{errors.eventId}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-large"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Complete Registration'}
      </button>
    </form>
  );
};

export default RegistrationForm;

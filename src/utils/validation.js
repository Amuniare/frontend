/**
 * Validation utilities for EventEase app
 * Used for Activity 2 - Input validation
 */

export const validation = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  /**
   * Validate required field (not empty)
   */
  isRequired: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  },

  /**
   * Validate phone number (US format)
   */
  isValidPhone: (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 10;
  },

  /**
   * Validate date format and ensure it's not in the past
   */
  isValidDate: (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date instanceof Date && !isNaN(date) && date >= today;
  },

  /**
   * Validate event data object
   */
  validateEvent: (event) => {
    const errors = {};

    if (!validation.isRequired(event.name)) {
      errors.name = 'Event name is required';
    }

    if (!validation.isRequired(event.date)) {
      errors.date = 'Event date is required';
    } else if (!validation.isValidDate(event.date)) {
      errors.date = 'Event date must be today or in the future';
    }

    if (!validation.isRequired(event.location)) {
      errors.location = 'Event location is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Validate registration form data
   */
  validateRegistration: (formData) => {
    const errors = {};

    if (!validation.isRequired(formData.name)) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!validation.isRequired(formData.email)) {
      errors.email = 'Email is required';
    } else if (!validation.isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validation.isValidPhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.eventId) {
      errors.eventId = 'Please select an event';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * SessionContext - Activity 3
 * State management for user sessions and registered events
 * Persists data to localStorage for session continuity
 */

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    // Load from localStorage on initial render
    const savedSession = localStorage.getItem('eventease_session');
    return savedSession ? JSON.parse(savedSession) : {
      user: null,
      registeredEvents: [],
      lastActivity: null
    };
  });

  // Persist to localStorage whenever session changes
  useEffect(() => {
    localStorage.setItem('eventease_session', JSON.stringify(session));
  }, [session]);

  /**
   * Register user and create session
   */
  const registerUser = (userData) => {
    setSession(prev => ({
      ...prev,
      user: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        registeredAt: new Date().toISOString()
      },
      lastActivity: new Date().toISOString()
    }));
  };

  /**
   * Add event registration to user's session
   */
  const registerForEvent = (eventId, eventName) => {
    setSession(prev => {
      // Check if already registered
      if (prev.registeredEvents.some(e => e.eventId === eventId)) {
        return prev;
      }

      return {
        ...prev,
        registeredEvents: [
          ...prev.registeredEvents,
          {
            eventId,
            eventName,
            registeredAt: new Date().toISOString(),
            attended: false
          }
        ],
        lastActivity: new Date().toISOString()
      };
    });
  };

  /**
   * Mark event as attended
   */
  const markAttended = (eventId) => {
    setSession(prev => ({
      ...prev,
      registeredEvents: prev.registeredEvents.map(event =>
        event.eventId === eventId
          ? { ...event, attended: true, attendedAt: new Date().toISOString() }
          : event
      ),
      lastActivity: new Date().toISOString()
    }));
  };

  /**
   * Unregister from event
   */
  const unregisterFromEvent = (eventId) => {
    setSession(prev => ({
      ...prev,
      registeredEvents: prev.registeredEvents.filter(e => e.eventId !== eventId),
      lastActivity: new Date().toISOString()
    }));
  };

  /**
   * Check if user is registered for event
   */
  const isRegisteredForEvent = (eventId) => {
    return session.registeredEvents.some(e => e.eventId === eventId);
  };

  /**
   * Get registration count for user
   */
  const getRegistrationCount = () => {
    return session.registeredEvents.length;
  };

  /**
   * Clear session (logout)
   */
  const clearSession = () => {
    setSession({
      user: null,
      registeredEvents: [],
      lastActivity: null
    });
    localStorage.removeItem('eventease_session');
  };

  const value = {
    session,
    registerUser,
    registerForEvent,
    markAttended,
    unregisterFromEvent,
    isRegisteredForEvent,
    getRegistrationCount,
    clearSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

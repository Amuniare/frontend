import React from 'react';
import AttendanceTracker from '../components/AttendanceTracker';

/**
 * Attendance Page - Activity 3
 * Page wrapper for AttendanceTracker component
 */
const Attendance = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Events</h1>
        <p className="page-subtitle">
          Track your event registrations and attendance
        </p>
      </div>
      <AttendanceTracker />
    </div>
  );
};

export default Attendance;

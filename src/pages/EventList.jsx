import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard';
import { mockEvents } from '../models/mockData';

/**
 * EventList Page - Activity 1 & 2
 * Displays all events with filtering and search
 * Performance optimized with useMemo for Activity 2
 */
const EventList = () => {
  const [events] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories - memoized for performance
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(events.map(event => event.category))];
    return cats.sort();
  }, [events]);

  // Filter events based on search and category - memoized for performance (Activity 2)
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Upcoming Events</h1>
        <p className="page-subtitle">
          Discover and register for amazing events
        </p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events by name, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="no-results">
            <p>No events found matching your criteria.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="results-count">
        Showing {filteredEvents.length} of {events.length} events
      </div>
    </div>
  );
};

export default EventList;

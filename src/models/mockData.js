import { Event } from './Event.js';

/**
 * Mock event data for testing and development
 */
export const mockEvents = [
  new Event(
    1,
    'Annual Tech Conference 2025',
    '2025-03-15',
    'San Francisco Convention Center, CA',
    'Join industry leaders for the biggest tech conference of the year. Featuring keynote speakers, workshops, and networking opportunities.',
    500,
    'Technology'
  ),
  new Event(
    2,
    'Spring Networking Mixer',
    '2025-04-10',
    'Downtown Hotel Ballroom, NYC',
    'Connect with professionals from various industries in a relaxed, social atmosphere. Includes dinner and drinks.',
    150,
    'Networking'
  ),
  new Event(
    3,
    'Startup Pitch Competition',
    '2025-05-20',
    'Innovation Hub, Austin, TX',
    'Watch aspiring entrepreneurs pitch their startup ideas to a panel of investors. Grand prize: $50,000 in funding.',
    300,
    'Business'
  ),
  new Event(
    4,
    'Web Development Workshop',
    '2025-06-05',
    'Tech Academy, Seattle, WA',
    'Hands-on workshop covering modern web development practices, React, and deployment strategies.',
    80,
    'Education'
  ),
  new Event(
    5,
    'Corporate Leadership Summit',
    '2025-07-12',
    'Business Center, Chicago, IL',
    'Executive-level summit focusing on leadership strategies, team management, and organizational growth.',
    200,
    'Corporate'
  ),
  new Event(
    6,
    'Summer Music Festival',
    '2025-08-18',
    'Riverside Park, Portland, OR',
    'Three-day music festival featuring local and international artists across multiple genres.',
    2000,
    'Entertainment'
  ),
  new Event(
    7,
    'AI and Machine Learning Symposium',
    '2025-09-22',
    'University Campus, Boston, MA',
    'Academic and industry experts discuss the latest advancements in artificial intelligence and machine learning.',
    400,
    'Technology'
  ),
  new Event(
    8,
    'Charity Gala Dinner',
    '2025-10-08',
    'Grand Ballroom, Los Angeles, CA',
    'Formal fundraising event supporting local education initiatives. Black-tie attire required.',
    250,
    'Charity'
  ),
  new Event(
    9,
    'Product Launch Event',
    '2025-11-15',
    'Innovation Center, Denver, CO',
    'Be the first to experience our revolutionary new product line. Includes live demos and exclusive early access.',
    350,
    'Corporate'
  ),
  new Event(
    10,
    'Year-End Celebration',
    '2025-12-20',
    'City Plaza, Miami, FL',
    'Ring in the new year early with food, entertainment, and community celebration.',
    1000,
    'Social'
  )
];

// Add some registrations to make data more realistic
mockEvents[0].registrations = 235;
mockEvents[1].registrations = 87;
mockEvents[2].registrations = 156;
mockEvents[3].registrations = 72;
mockEvents[4].registrations = 189;
mockEvents[5].registrations = 1450;
mockEvents[6].registrations = 203;
mockEvents[7].registrations = 98;
mockEvents[8].registrations = 127;
mockEvents[9].registrations = 542;

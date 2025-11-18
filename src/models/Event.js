/**
 * Event data model
 */
export class Event {
  constructor(id, name, date, location, description, capacity, category) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.capacity = capacity;
    this.category = category;
    this.registrations = 0;
  }

  get isAvailable() {
    return this.registrations < this.capacity;
  }

  get spotsRemaining() {
    return this.capacity - this.registrations;
  }

  incrementRegistrations() {
    if (this.isAvailable) {
      this.registrations++;
      return true;
    }
    return false;
  }
}

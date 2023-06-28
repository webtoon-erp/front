import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch events
    setTimeout(() => {
      const fetchedEvents = [
        {
          title: '일정 1',
          start: '2023-06-28',
          end: '2023-06-29',
        },
        {
          title: '일정 2',
          start: '2023-07-01',
          end: '2023-07-02',
        },
        // Additional events...
      ];
      setEvents(fetchedEvents);
      setIsLoading(false);
    }, ); // Simulating a 2-second loading delay
  }, []);

  return (
    <div className={`calendar-area ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <div className="skeleton-loader"></div>
      ) : (
        <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} events={events} />
      )}
    </div>
  );
};

export default CalendarArea;
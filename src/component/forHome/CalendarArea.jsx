import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios'; // Import axios for making the HTTP request
import { Button, Modal } from 'antd';

const CalendarArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://146.56.98.153:8080/plans', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response.data);
          const formattedEvents = response.data.map((eventData) => ({
            title: eventData.title,
            start: eventData.startDate,
            end: eventData.endDate,
          }));
          setEvents(formattedEvents);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error('Failed to fetch events');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching events:', error);
      });
  }, []);
  

  return (
    <div className={`calendar-area ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <div className="skeleton-loader" />
      ) : (
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek',
          }}
        />
      )}
    </div>
  );
};

export default CalendarArea;

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarArea = () => {
  const events = [
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
    // 추가적인 일정들...
  ];

  return (
    <div>
      <FullCalendar 
        defaultView="dayGridMonth" 
        plugins={[dayGridPlugin]}
        events={events}
      />
    </div>
  );
};

export default CalendarArea;

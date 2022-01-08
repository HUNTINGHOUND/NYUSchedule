import moment from "moment";
import React from 'react';
import WeekCalendar from "react-week-calendar";

const Calendar = (props) => {
  return (
    <div className="calendar">
      <WeekCalendar 
        firstDay={moment().day(1)}
        dayFormat="ddd"
        startTime={moment({h:6, m:0})}
        endTime={moment({h:22, m:40})}
        selectedIntervals={props.selectedIntervals}
        onIntervalSelect={props.handleIntervalSelect}
        onIntervalUpdate={props.handleIntervalUpdate}
        onIntervalRemove={props.handleIntervalRemove}
      />
    </div>
  );
};

export default Calendar;

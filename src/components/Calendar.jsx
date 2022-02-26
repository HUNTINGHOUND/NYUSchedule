import moment from "moment";
import React from 'react';
import WeekCalendar from "react-week-calendar";
import Event from "./Event";
import CalendarModal from "./CalendarModal";

/**
 * Wrapper of the WeekCalendar component. Display a week view calendar.
 */
const Calendar = (props) => {
  return (
    <div className="calendar">
      <WeekCalendar 
        eventComponent={Event}
        modalComponent={CalendarModal}
        firstDay={moment().day(1)}
        dayFormat="ddd"
        scaleUnit={5}
        startTime={moment({h:6, m:0})}
        endTime={moment({h:21, m:0})}
        numberOfDays={5}
        selectedIntervals={props.selectedIntervals}
        onIntervalSelect={props.handleIntervalSelect}
        onIntervalUpdate={props.handleIntervalUpdate}
        onIntervalRemove={props.handleIntervalRemove}
      />
    </div>
  );
};

export default Calendar;

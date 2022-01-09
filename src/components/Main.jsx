import React, { useState } from "react";
import Searcher from "./Searcher";
import Calendar from "./Calendar";
import useList from "./use-list";

/**
 * Component to hold the calendar and the searcher. Also act as a bubble up state holder for the calendar.
 */
const Main = () => {
  /**
   * See the react-week-calendar to learn details.
   *
   * The calendar uses selectedIntervals to track information about events it should display.
   * Each interval needs a id to uniquely identify it, available_uid gives the next available uid.
   */
  const selectedIntervals = useList([]);
  const [available_uid, setUid] = useState(1);

  /**
   * Handle removal of an interval given the object
   * @param {*} event interval to be removed.
   */
  const handleEventRemove = (event) => {
    const index = selectedIntervals.list.findIndex(
      (interval) => interval.uid === event.uid
    );

    if (index > -1) selectedIntervals.deleteList(index);
  };

  /**
   * Handle updating event given the interval object.
   * @param {*} event interval to be updated.
   */
  const handleEventUpdate = (event) => {
    const index = selectedIntervals.findIndex(
      (interval) => interval.uid === event.uid
    );

    if (index > -1) selectedIntervals.updateList(index, event);
  };

  /**
   * Handle a list of intervals to be added.
   * @param {*} newIntervals a list of intervals to be added. 
   */
  const handleSelect = (newIntervals) => {
    const intervals = newIntervals.map((interval, index) => {
      return {
        ...interval,
        uid: available_uid + index,
      };
    });

    selectedIntervals.concatList(intervals);
    setUid((prev) => prev + 1);
  };

  /**
   * Handle adding a single interval given the start time, end time, and value.
   * @param {moment} start Start time
   * @param {moment} end End time
   * @param {string} value String to be displayed.
   */
  const handleAddCourse = (start, end, value) => {
    const interval = {
      start: start,
      end: end,
      value: value,
      uid: available_uid,
    };

    selectedIntervals.addList(interval);
    setUid((prev) => prev + 1);
  };

  return (
    <div className="main">
      <Searcher handleAddCourse={handleAddCourse} />
      <Calendar
        selectedIntervals={selectedIntervals.list}
        handleIntervalSelect={handleSelect}
        handleIntervalUpdate={handleEventUpdate}
        handleIntervalRemove={handleEventRemove}
      />
    </div>
  );
};

export default Main;

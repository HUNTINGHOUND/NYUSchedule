import React, {useState} from 'react';
import Searcher from './Searcher';
import Calendar from './Calendar';
import useList from './use-list';

const Main = () => {
    const selectedIntervals = useList([]);
    const [available_uid, setUid]= useState(1);

    const handleEventRemove = (event) => {
        const index = selectedIntervals.list.findIndex(
          (interval) => interval.uid === event.uid
        );
    
        if (index > -1) selectedIntervals.deleteList(index);
      };
    
      const handleEventUpdate = (event) => {
        const index = selectedIntervals.findIndex(
          (interval) => interval.uid === event.uid
        );
    
        if (index > -1) selectedIntervals.updateList(index, event);
      };
    
      const handleSelect = (newIntervals) => {
          const intervals = newIntervals.map((interval, index) => {
              return {
                  ...interval,
                  uid: available_uid + index
              }
          });
    
          selectedIntervals.concatList(intervals);
          setUid(prev => prev + 1);
      }

      const handleAddCourse = (start, end, value) => {
          const interval = {
              start: start,
              end: end,
              value: value,
              uid: available_uid
          }

          selectedIntervals.addList(interval);
          setUid(prev => prev + 1);
      }

    return (
        <div className="main">
            <Searcher handleAddCourse={handleAddCourse}/>
            <Calendar selectedIntervals={selectedIntervals.list} handleIntervalSelect={handleSelect} handleIntervalUpdate={handleEventUpdate} handleIntervalRemove={handleEventRemove} />
        </div>
    )
}

export default Main;
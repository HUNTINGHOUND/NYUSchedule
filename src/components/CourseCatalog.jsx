import React from 'react';
import SearchItems from './SearchItems.jsx';

/**
 * Component that represent an entire course (note there are multiple class for one course).
 */
const CourseCatalog = (props) => {
  /**
   * A wrapper functions that prepend the symbol of the course on to the value to be displayed on the calendar.
   * @param {moment} start The start time of the interval
   * @param {moment} end The end time of the interval
   * @param {string} value The value to be displayed on the calendar
   */
  const handleAddCourse = (start, end, value) => {
    const name = (props.name.match(/\w+-\w+.*\d+/)[0]).slice(0, -1);
    props.handleAddCourse(start, end, name + "\n" + value);
  }

  /**
   * Get all the classes under this course and render their component. Pass down the required props.
   */
  const getAllClass = () => {
    var classes = [];

    var index = 0;
    for(let classObj of props.course.classes) {
      classes.push(<SearchItems key={index} info={classObj} handleAddCourse={handleAddCourse}/>);

      index++;
    }

    return classes;
  };


  return (
    <div className="course-cata">
      <h3 className="course-title" style={{'whiteSpace': 'pre-line'}}>{props.name}</h3>
      {getAllClass()}
    </div>
    )
}

export default CourseCatalog
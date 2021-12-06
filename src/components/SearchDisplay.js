import React from 'react';
import CourseCatalog from './CourseCatalog.js';

const SearchDisplay = (props) => {
  const getCourses = () => {
    let courses = [];
    if (!props.data) return courses;


    let index = 0;
    for (const [name, info] of Object.entries(props.data)) {
      courses.push(<CourseCatalog key={index} course={info} name={name} />);
      index++;
    }

    return courses;
  }

  return (
    <div className="searcher-display">
      <h1>Search Results</h1>
      <div className="display">
        {getCourses()}
      </div>
    </div>)
}

export default SearchDisplay;
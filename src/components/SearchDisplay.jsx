import React from 'react';
import CourseCatalog from './CourseCatalog';

/**
 * Component that gathers courses. This display the search result once the query is completed.
 */
const SearchDisplay = (props) => {
  /**
   * Create a list of course components using the info passed through props.
   * @returns A list of course components. 
   */
  const getCourses = () => {
    let courses = [];
    if (!props.data) return courses;


    let index = 0;
    for (const [name, info] of Object.entries(props.data)) {
      courses.push(<CourseCatalog key={index} course={info} name={name} handleAddCourse={props.handleAddCourse}/>);
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
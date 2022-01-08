import React from 'react';
import CourseCatalog from './CourseCatalog';
import ReactTooltip from 'react-tooltip';

const SearchDisplay = (props) => {
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
      <ReactTooltip place='right' type='dark' effect='float' multiline={true} />
    </div>)
}

export default SearchDisplay;
import React from 'react';
import ReactTooltip from 'react-tooltip'
import SearchItems from './SearchItems.js';

const CourseCatalog = (props) => {
  const getAllClass = () => {
    var classes = [];

    var index = 0;
    for(let classObj of props.course) {
      classObj.Instructor = classObj.Instructor.split(', ');
      classes.push(<SearchItems key={index} info={classObj} />);

      index++;
    }

    return classes;
  }

  return (
    <div className="course-cata">
      <h3 className="course-title">{props.name}</h3>
      {getAllClass()}
      <ReactTooltip place='right' type='dark' effect='float' multiline={true} />
    </div>
    )
}

export default CourseCatalog
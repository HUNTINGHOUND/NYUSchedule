import React from 'react';
import SearchItems from './SearchItems.jsx';
import ReactTooltip from 'react-tooltip';

const CourseCatalog = (props) => {
  const getAllClass = () => {
    var classes = [];

    var index = 0;
    for(let classObj of props.course) {
      const newClassObj = {};
      Object.assign(newClassObj, classObj);
      newClassObj.Instructor = classObj.Instructor.split(', ');

      let name = props.name.match(/\w+-\w+ \d+ -/)[0];
      name = name.slice(0, -1);
      classes.push(<SearchItems key={index} info={newClassObj} courseName={name} handleAddCourse={props.handleAddCourse}/>);

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
import React from 'react';
import {SearchItems} from './SearchItems.js';

export class CourseCatalog extends React.Component {
  getAllClass() {
    var classes = [];

    var index = 0;
    for(let classObj of this.props.course) {
      classObj.Instructor = classObj.Instructor.split(', ');
      console.log(classObj);
      classes.push(<SearchItems key={index} info={classObj} />);

      index += 1;
    }

    return classes
  }

  render() {
    return (
      <div className="course-cata">
        <h3 className="course-title">{this.props.name}</h3>
        {this.getAllClass()}
      </div>
    )
  }
}

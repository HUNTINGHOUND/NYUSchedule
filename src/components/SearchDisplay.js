import React from 'react';
import { CourseCatalog } from './CourseCatalog.js';

export class SearchDisplay extends React.Component {
  getCourses() {
    var courses = [];

    var index = 0;
    for(const [name, info] of Object.entries(this.props.data)) {
      courses.push(<CourseCatalog key={index} course={info} name={name} />);
      index += 1;
    }

    return courses;
  }

  render() {
    return(
      <div className="searcher-display">
        <h1>Search Results</h1>
        <div className="display">
          {this.getCourses()}
        </div>
      </div>
    )
  }
}

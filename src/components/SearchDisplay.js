import React from 'react';
import InfiniteScroll from 'react';
import { CourseCatalog } from './CourseCatalog.js';

class SearchDisplay extends React.Component {
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
      <div className="display">
        {this.getCourses()}
      </div>
    )
  }
}

export default SearchDisplay;

import React, {useState} from 'react';
import SearchDisplay  from './SearchDisplay.jsx';
import SearchOption from './SearchOption.jsx';

/**
 * Searcher component that gathers the search component and the display component.
 */
const Searcher = (props) => {
  const [data, setData] = useState({});

  /**
   * Handle search result. Save the result to the state which is then passed down the the display component.
   * @param {*} res Result of the search.
   */
  const handleSearch = (res) => {
    setData(res)
  }

  return (
    <div className="searcher">
      <SearchOption handleSearch={handleSearch} />
      <SearchDisplay data={data} handleAddCourse={props.handleAddCourse} />
    </div>)
}

export default Searcher;

import React, {useState} from 'react';
import SearchDisplay  from './SearchDisplay.jsx';
import SearchOption from './SearchOption.jsx';

const Searcher = (props) => {
  const [data, setData] = useState({});

  const handleSearch = (res) => {
    setData(res.courses)
  }

  return (
    <div className="searcher">
      <SearchOption handleSearch={handleSearch} />
      <SearchDisplay data={data} handleAddCourse={props.handleAddCourse} />
    </div>)
}

export default Searcher;

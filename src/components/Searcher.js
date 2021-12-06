import React, {useState} from 'react';
import SearchDisplay  from './SearchDisplay.js';
import SearchOption from './SearchOption.js';

const Searcher = (props) => {
  const [data, setData] = useState({});

  const handleSearch = (res) => {
    setData(res.courses)
  }

  return (
    <div className="searcher">
      <SearchOption handleSearch={handleSearch} />
      <SearchDisplay data={data} />
    </div>)
}

export default Searcher;

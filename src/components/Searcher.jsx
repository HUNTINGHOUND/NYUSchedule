import React, {useState, useMemo} from 'react';
import SearchDisplay  from './SearchDisplay.jsx';
import SearchOption from './SearchOption.jsx';

/**
 * Searcher component that gathers the search component and the display component.
 */
const Searcher = (props) => {
  const [data, setData] = useState({});
  const [catalog_nbr, setCatalogNbr] = useState('');
  const [keyword, setKeyword] = useState('');
  const [class_nbr, setClassNbr] = useState('');

  const handleCatalogChange = cat => setCatalogNbr(cat)
  const handleKeywordChange = word => setKeyword(word)
  const handleClassChange = cla => setClassNbr(cla)

  const filtered_data = useMemo(() => {
    let processed = {}
    for (let course in data) {
      if (course.search(catalog_nbr) >= 0) {
        processed[course] = data[course]
      }
    }

    return processed
  }, [data, catalog_nbr])
  

  /**
   * Handle search result. Save the result to the state which is then passed down the the display component.
   * @param {*} res Result of the search.
   */
  const handleSearch = (res) => {
    setData(res)
  }

  return (
    <div className="searcher">
      <SearchOption handleSearch={handleSearch} 
        handleCatalogChange={handleCatalogChange}
        handleKeywordChange={handleKeywordChange}
        handleClassChange={handleClassChange}
      />
      <SearchDisplay data={filtered_data} 
        handleAddCourse={props.handleAddCourse} 
        />
    </div>)
}

export default Searcher;

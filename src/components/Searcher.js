import React from 'react';
import { SearchDisplay } from './SearchDisplay.js';
import { SearchOption } from './SearchOption.js';

class Searcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(data) {
    console.log("search response = ", data);
    this.setState({data: data.courses});
  }

  render() {
    return (
      <div className="searcher">
        <SearchOption handleSearch={this.handleSearch} />
        <SearchDisplay data={this.state.data} />
      </div>
    )
  }
}

export default Searcher;

import React from 'react';
import raw from 'raw.macro';
import {Select, Input, Button} from 'antd';

const {Option} = Select;

export class SearchOption extends React.Component {
  constructor(props) {
    super(props);

    this.options = JSON.parse(raw('../resource/options.json'));

    this.state = {
      term_code: 0,
      acad_group: '',
      acad_name: '',
      subject: '',
      catalog_nbr: 0,
      keyword: '',
      class_nbr: '',
      terms: []
    };

    this.changeAcad = this.changeAcad.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
    this.changeSubject = this.changeSubject.bind(this);
    this.onCatalogChange = this.onCatalogChange.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    console.log("sending request for terms");
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        console.log("Recieved terms: ", xhr.responseText);
        this.setState({
          terms: JSON.parse(xhr.responseText)
        });
      }
    });

    var url = 'https://nyuscheduleserver.herokuapp.com/albert/getTerms';

    xhr.open('GET', url);
    xhr.send();
  }

  getSubject() {
    var options = [];

    if (this.state.acad_name === '') {
      options.push(
        <Option key={0} value=''>
          Select a school first
        </Option>
      );
      return options
    }

    var i = 0;
    for (let sub in this.options.acad_group[this.state.acad_name].subject) {
      options.push(
        <Option
          key={i}
          value={`${this.options.acad_group[this.state.acad_name].subject[sub]}:${sub}`}>
          {this.options.acad_group[this.state.acad_name].subject[sub]}
        </Option>
      );

      i += 1;
    }

    return options;
  }

  changeSubject(sub) {
    console.log(typeof(sub))
    var index = sub.search(':');
    var code = sub.substring(index + 1, sub.length);
    console.log("subject changed to ", code);
    this.setState({subject: code});
  }

  getTerms() {
    var options = [];
    if (this.state.terms.length <= 0) {
      return options;
    }

    var index = 0;
    for (let t of this.state.terms) {
      options.push(
        <Option key={index} value={t[1]}>
          {t[1]}
        </Option>
      );

      index += 1;
    }

    return options;
  }

  changeTerm(term) {
    for (let t of this.state.terms) {
      if (t[1] === term) {
        console.log("set term to ", t[0]);
        this.setState({term_code: t[0]});
        return;
      }
    }
  }

  getAcad() {
    var schools = [];

    var index = 0;
    for (const name in this.options.acad_group) {
      schools.push(
        <Option key={index} value={name}>
          {name}
        </Option>
      );

      index += 1;
    }

    return schools;
  }

  changeAcad(acad) {
    this.setState({acad_group: this.options.acad_group[acad].code, acad_name: acad});
    console.log(this.options.acad_group[acad].code);
  }

  onSearch() {
    var xhr = new XMLHttpRequest();

    var info = {};
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        info = JSON.parse(xhr.responseText);
        this.props.handleSearch(info);
      }
    });

    var param = `term_code=${this.state.term_code}&acad_group=${this.state.acad_group}&subject=${this.state.subject}&catalog_nbr=${this.state.catalog_nbr}&keyword=${this.state.keyword}&class_nbr=${this.state.class_nbr}`;

    console.log("parameters", param);

    var url = 'https://nyuscheduleserver.herokuapp.com/albert/getcourse';

    xhr.open('GET', url + '?' + param);
    xhr.send();
  }

  onCatalogChange(e) {
    this.setState({catalog_nbr: e.target.value});
  }

  onKeywordChange(e) {
    this.setState({keyword_nbr: e.target.value});
  }

  onClassChange(e) {
    this.setState({class_nbr: e.target.value});
  }

  render() {
    return (
      <div className="search-option">
        <div className="select-container">
          <div className="search-field">
            <label>*Term</label>
            <div className="search-select">
              <Select
                style={{
                  width: '100%'
                }}
                showSearch="showSearch"
                placeholder="Select a term"
                optionFilterProp="children"
                onChange={this.changeTerm}
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
              }>
              {this.getTerms()}
            </Select>
          </div>
        </div>

        <div className="search-field">
          <label>*School</label>
          <div className="search-select">
            <Select
              style={{
                width: '100%'
              }}
              showSearch="showSearch"
              placeholder="Select a school"
              optionFilterProp="children"
              onChange={this.changeAcad}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {this.getAcad()}
            </Select>
          </div>
        </div>

        <div className="search-field">
          <label>*Subject</label>
          <div className="search-select">
            <Select
              style={{
                width: '100%'
              }}
              showSearch="showSearch"
              placeholder="Select a subject"
              optionFilterProp="children"
              onChange={this.changeSubject}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {this.getSubject()}
            </Select>
          </div>
        </div>
      </div>

      <div className="input-container">
        <div className="search-field">
          <label>Keyword</label>
          <div className="search-input">
            <Input
              style={{
                width: '100%'
              }}
              placeholder="Input keyword"
              onChange={this.onKeywordChange}/>
          </div>
        </div>

        <div className="small-container">

          <div className="search-field">
            <label>
              Catalog Number
            </label>
            <div className="search-input">
              <Input
                style={{
                  width: '100%'
                }}
                placeholder="Input catalog"
                onChange={this.onCatalogChange}/>
            </div>
          </div>

          <div className="search-field">
            <label>
              Class Number
            </label>
            <div className="search-input">
              <Input
                style={{
                  width: '100%'
                }}
                placeholder="Input keyword"
                onChange={this.onClassChange}/>
            </div>
          </div>
        </div>
      </div>

      <Button type="primary" onClick={this.onSearch}>Search</Button>

    </div>
  );
}
}

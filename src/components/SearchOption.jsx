import React, { useEffect, useState, useCallback} from 'react';
import { Select, Input, Button } from 'antd';
import axios from 'axios';
import useAsync from './use-async';

const { Option } = Select;

/**
 * Component represents the search options and search button. 
 */
const SearchOption = (props) => {
  const [options, setOptions] = useState(null)
  useEffect(() => {
    const url = process.env.REACT_APP_BACK_END_URL + '/albert/getoptions';
    axios.get(url).then(res => {
      setOptions(res.data)
    })
  }, []);

  const [term, setTerm] = useState('');
  const [acad_name, setAcadName] = useState('');
  const [subject, setSubject] = useState('');
  const [catalog_nbr, setCatalogNbr] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [class_nbr, setClassNbr] = useState('');

  /**
   * Async function for sending request that get courses based on the configuration chosen by the user. 
   * useCallback hook to make sure useAsync would not fall into a loop.
   * @return course information in JSON
   */
  const onSearchCallBack = useCallback( async () => {
    var param = `term=${term}&school=${acad_name}&major=${subject}`;
    const url = process.env.REACT_APP_BACK_END_URL + '/albert/getcourse';
    let res = await axios.get(url + "?" + param);
    return res.data;
  }, [term, acad_name, subject]);

  const searchAsyncFunction = useAsync(onSearchCallBack, false);

  /**
   * When the search is successful, pass the values to parent component that will handle the value.
   */
  useEffect(() => {
    if(searchAsyncFunction.status === "success") {
      props.handleSearch(searchAsyncFunction.value);
    }
  }, [searchAsyncFunction.value, searchAsyncFunction.status, props]);

  /**
   * Get the option components for the majors. The components changes based on which school the user picked previously. 
   * @returns A list of option components.
   */
  const getSubject = () => {
    let sub_option = [];

    if (acad_name === '') {
      sub_option.push(
        <Option key={0} value="">
          Select a school first
        </Option>
      );
      return sub_option;
    }

    var i = 0;
    for (let sub of options[term][acad_name]) {
      sub_option.push(
        <Option
          key={i}
          value={sub}
        >
          {sub}
        </Option>
      );

      i += 1;
    }

    return sub_option;
  };

  /**
   * Handle changing major selection.
   * @param {*} sub Subject that is to be switched to.
   */
  const changeSubject = (sub) => {
    setSubject(sub);
  };

  /**
   * Get option components for the semester terms.
   * @returns A list options components.
   */
  const getTerms = () => {
    let options_components = [];
    if (!options) {
      return options_components;
    }

    let index = 0;
    for (let term in options) {
      options_components.push(
        <Option key={index} value={term}>
          {term}
        </Option>
      );

      index += 1;
    }

    return options_components;
  };

  /**
   * Handle term change. 
   * @param {*} term Term to be switched to.
   */
  const changeTerm = (term) => {
    setTerm(term)
  };

  /**
   * Get option components for the academic group (aka schools).
   * @returns 
   */
  const getAcad = () => {
    let schools = [];

    if (term === '') {
      schools.push(
        <Option key={0} value="">
          Select a term first
        </Option>
      );
      return schools;
    }

    let index = 0;
    for (const name in options[term]) {
      schools.push(
        <Option key={index} value={name}>
          {name}
        </Option>
      );

      index += 1;
    }

    return schools;
  }

  /**
   * Handle change the acad group
   * @param {*} acad acad group to be changed into.
   */
  const changeAcad = (acad) => {
    setAcadName(acad);
  }

  /**
   * Handle changing catalog number
   * @param {*} e Change event
   */
  const onCatalogChange = e => {
    setCatalogNbr(e.target.value);
  }

  /**
   * Handle changing keyword
   * @param {*} e Change event
   */
  const onKeywordChange = e => {
    setKeyword(e.target.value);
  }

  /**
   * Handle changing class number
   * @param {*} e Change event
   */
  const onClassChange = e => {
    setClassNbr(e.target.value);
  }

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
                onChange={changeTerm}
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
                filterSort={(optionA, optionB) => {
                  let a_year = parseInt(optionA.value.substr(optionA.value.search(' ') + 1), 10)
                  let a_term = optionA.value.substr(0, optionA.value.search(' '))

                  let b_year = parseInt(optionB.value.substr(optionB.value.search(' ') + 1), 10)
                  let b_term = optionB.value.substr(0, optionB.value.search(' '))

                  if (a_year !== b_year) return a_year < b_year
                  else {
                    if (a_term === 'January') a_term = 1
                    else if (a_term === 'Spring') a_term = 2
                    else if (a_term === 'Summer') a_term = 3
                    else a_term = 4

                    if (b_term === 'January') a_term = 1
                    else if (b_term === 'Spring') a_term = 2
                    else if (b_term === 'Summer') a_term = 3
                    else b_term = 4

                    return a_term < b_term
                  }
                }}
                >
              {getTerms()}
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
              onChange={changeAcad}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {getAcad()}
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
              onChange={changeSubject}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {getSubject()}
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
              onChange={onKeywordChange}/>
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
                onChange={onCatalogChange}/>
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
                onChange={onClassChange}/>
            </div>
          </div>
        </div>
      </div>

      <Button type="primary" onClick={searchAsyncFunction.execute} disabled={searchAsyncFunction.status === "pending"}>Search</Button>

    </div>
  )
};

export default SearchOption;
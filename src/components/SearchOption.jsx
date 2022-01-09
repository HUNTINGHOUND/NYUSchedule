import React, { useEffect, useMemo, useState, useCallback} from 'react';
import raw from 'raw.macro';
import { Select, Input, Button } from 'antd';
import axios from 'axios';
import useAsync from './use-async';

const { Option } = Select;

/**
 * Component represents the search options and search button. 
 */
const SearchOption = (props) => {
  /**
   * See /src/resource/options.json for more details. 
   * The file contains add the school name and their respective majors.
   */
  const options = useMemo(() => JSON.parse(raw('../resource/options.json')), []);

  const [term_code, setTermCode] = useState(0);
  const [acad_group, setAcadGroup] = useState('');
  const [acad_name, setAcadName] = useState('');
  const [subject, setSubject] = useState('');
  const [catalog_nbr, setCatalogNbr] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [class_nbr, setClassNbr] = useState('');
  const [terms, setTerms] = useState([]);

  /**
   * Async function for sending request that get courses based on the configuration chosen by the user. 
   * useCallback hook to make sure useAsync would not fall into a loop.
   * @return course information in JSON
   */
  const onSearchCallBack = useCallback( async () => {
    var param = `term_code=${term_code}&acad_group=${acad_group}&subject=${subject}&catalog_nbr=${catalog_nbr}&keyword=${keyword}&class_nbr=${class_nbr}`;
    const url = 'https://nyuscheduleserver.herokuapp.com/albert/getcourse';
    let res = await axios.get(url + "?" + param);
    return res.data;
  }, [term_code, acad_group, subject, catalog_nbr, keyword, class_nbr]);

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
   * When components first mounts, get the available terms.
   */
  useEffect(() => {
    console.log('Sending request for terms');
    const url = 'https://nyuscheduleserver.herokuapp.com/albert/getTerms';

    axios.get(url).then((res) => {
      console.log('Recieved terms:', res.data);
      setTerms(res.data);
    });
  }, []);

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
    for (let sub in options.acad_group[acad_name].subject) {
      sub_option.push(
        <Option
          key={i}
          value={`${options.acad_group[acad_name].subject[sub]}:${sub}`}
        >
          {options.acad_group[acad_name].subject[sub]}
        </Option>
      );

      i += 1;
    }

    return sub_option;
  };

  /**
   * Handle changing major selection. Note that the value of major is formatted as "longname:symbol". Since the server only takes symbol for
   * major parameter, this format is used as a key-value pair.
   * @param {*} sub Subject that is to be switched to.
   */
  const changeSubject = (sub) => {
    setSubject(sub.substring(sub.search(':') + 1, sub.length));
  };

  /**
   * Get option components for the semester terms.
   * @returns A list options components.
   */
  const getTerms = () => {
    let options = [];
    if (terms.length <= 0) {
      return options;
    }

    let index = 0;
    for (let term of terms) {
      options.push(
        <Option key={index} value={term[1]}>
          {term[1]}
        </Option>
      );

      index += 1;
    }

    return options;
  };

  /**
   * Handle term change. 
   * @param {*} term Term to be switched to.
   */
  const changeTerm = (term) => {
    for (let t of terms) {
      if (t[1] === term) {
        setTermCode(t[0]);
        return;
      }
    }
  };

  /**
   * Get option components for the academic group (aka schools).
   * @returns 
   */
  const getAcad = () => {
    let schools = [];

    let index = 0;
    for (const name in options.acad_group) {
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
    setAcadGroup(options.acad_group[acad].code);
    setAcadName(acad);
    console.log("set acad_group to", options.acad_group[acad].code);
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
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
              }>
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
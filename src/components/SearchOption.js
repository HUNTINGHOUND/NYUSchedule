import React, { useEffect, useMemo, useState } from 'react';
import raw from 'raw.macro';
import { Select, Input, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const SearchOption = (props) => {
  const options = useMemo(() => JSON.parse(raw('../resource/options.json')), []);
  const [term_code, setTermCode] = useState(0);
  const [acad_group, setAcadGroup] = useState('');
  const [acad_name, setAcadName] = useState('');
  const [subject, setSubject] = useState('');
  const [catalog_nbr, setCatalogNbr] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [class_nbr, setClassNbr] = useState('');
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    console.log('Sending request for terms');
    const url = 'https://nyuscheduleserver.herokuapp.com/albert/getTerms';

    axios.get(url).then((res) => {
      console.log('Recieved terms:', res.data);
      setTerms(res.data);
    });
  }, []);

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

  const changeSubject = (sub) => {
    setSubject(sub.substring(sub.search(':') + 1, sub.length));
  };

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

  const changeTerm = (term) => {
    for (let t of terms) {
      if (t[1] === term) {
        console.log('set term to ', t[0]);
        setTermCode(t[0]);
        return;
      }
    }
  };

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

  const changeAcad = (acad) => {
    setAcadGroup(options.acad_group[acad].code);
    setAcadName(acad);
    console.log("set acad_group to", options.acad_group[acad].code);
  }

  const onSearch = () => {
    var param = `term_code=${term_code}&acad_group=${acad_group}&subject=${subject}&catalog_nbr=${catalog_nbr}&keyword=${keyword}&class_nbr=${class_nbr}`;
    const url = 'https://nyuscheduleserver.herokuapp.com/albert/getcourse';
    axios.get(url + "?" + param)
      .then(res => {
        props.handleSearch(res.data);
      })
  }

  const onCatalogChange = e => {
    setCatalogNbr(e.target.value);
  }

  const onKeywordChange = e => {
    setKeyword(e.target.value);
  }

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

      <Button type="primary" onClick={onSearch}>Search</Button>

    </div>
  )
};

export default SearchOption;
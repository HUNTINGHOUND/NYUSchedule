import React from 'react';
import ReactDOM from 'react-dom';
import SearchDisplay from './components/SearchDisplay.js';
import './index.css';
import reportWebVitals from './reportWebVitals';


var xhr = new XMLHttpRequest();

var info = {};
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    info = JSON.parse(this.responseText);
    console.log(info);
    ReactDOM.render(<SearchDisplay  data={info['courses']}/>, document.getElementById('root'));
  }
});

var param = 'term_code=1218&acad_group=UA&subject=CSCI-UA'
var url = 'https://nyuscheduleserver.herokuapp.com/albert/getcourse';

xhr.open('GET', url + '?' + param);
xhr.send();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import axios from "axios";
import React, { useEffect } from "react";
import useList from "./use-list";
import moment from "moment";
import ReactTooltip from "react-tooltip";

/**
 * Component rendering the key-value pair of a class.
 */
const Info = (props) => {
  return (
    <li>
        <b style={{float:'left', paddingRight:"10px"}}>{props.name}:</b> <div style={{float:'left'}}>{props.message}</div>
    </li>
  );
};

const SearchItems = (props) => {
  const prof = useList([]);

  /**
   * Display info passed in through a format accepted by react-tool-tip
   * @param {*} prof Info to display
   * @returns String that can be used by tool tip.
   */
  const gettip = (prof) => {
    let result = "";
    if (!prof) {
      return "No profile on RMP";
    }

    for (const [key, value] of Object.entries(prof)) {
      if (key === "url" || key === "tid") {
        continue;
      }

      result =
        result + `<br />${key}: ${key === "Tags" ? value.join(", ") : value}`;
    }

    return result.length === 0 ? "No profile on RMP" : result;
  };

  /**
   * When the component first renders, try to get the instructor/s information from Rate My Professor
   */
  useEffect(() => {
    prof.setList([]);
    if(!props.info["Instructor"]) {
      return
    }
    for (let name of props.info["Instructor"]) {
      if (name === "Staff") {
        prof.addList({});
        continue;
      }
      var param = "name=" + name;
      var url =  process.env.REACT_APP_BACK_END_URL + "/rmp/getProf";

      axios.get(url + "?" + param)
        .then((res) => {
          prof.addList(res.data);
        });

    }
    // eslint-disable-next-line
  }, [props.info]);

  /**
   * Rebuild the tool tip for dynamic content
   */
  useEffect(() => {
    ReactTooltip.rebuild();
  })

  /**
   * Construct a list of components that represent the key-value pair of info of the class. 
   * @returns A list of components to be rendered.
   */
  const displayInfo = () => {
    let infolist = [];

    let index = 0;
    for (const [name, message] of Object.entries(props.info)) {
      if (name === "class_name" || name === "Notes") {
        continue;
      }

      if (name === "Instructor") {
        for (let i = 0; i < message.length; i += 1) {
          infolist.push(
            <Info
              key={index}
              name={name}
              message={
                <a
                  href={
                    prof.list[i] && prof.list[i].url
                      ? "//" + prof.list[i].url
                      : "#"
                  }
                  data-tip={gettip(prof.list[i])}
                  target="_blank"
                  rel="noreferrer"
                  onClick={()=>{}}
                >
                  {message[i]}
                </a>
              }
            />
          );

          index += 1;
        }
      } else {
        infolist.push(<Info key={index} name={name} message={name === 'Class Status' ? 
          (message === 'Open' ? <div style={{color:"blue", float:'left'}}>{message}</div> : (message === 'Closed' || message === 'Cancelled' ? <div style={{color:"red"}}>{message}</div> 
          : 
          <div style={{color:"#FF8C00"}}>{message}</div>)) : message}/>);
        index += 1;

      }
    }

    return infolist;
  };

  /**
   * Handle when a course is clicked. Will use call back function given by props to add interval to the calendar. 
   * @param {*} e The click event
   */
  const onCourseClick = (e) => {
    if(e.target.tagName === 'A') return;
    const date_strings = props.info["Days/Times"].substr(0, props.info["Days/Times"].search(' '))
    const time_strings = props.info["Days/Times"].substr(props.info["Days/Times"].search(' ') + 1)
    const weekdays = date_strings.split(',');
    const start_time = moment(time_strings.split(' - ')[0], 'hh.mm A');
    const end_time = moment(time_strings.split(' - ')[1], 'hh.mm A');


    for(let day of weekdays) {
      let start_date = moment();
      let end_date = moment();

      if(day === 'Mon') {
        start_date = moment().day(1);
        end_date = moment().day(1);
      } else if(day === 'Tue') {
        start_date = moment().day(2);
        end_date = moment().day(2);
      } else if(day === 'Wed') {
        start_date = moment().day(3);
        end_date = moment().day(3);
      } else if(day === 'Thu') {
        start_date = moment().day(4);
        end_date = moment().day(4);
      } else if(day === 'Fri') {
        start_date = moment().day(5);
        end_date = moment().day(5);
      } else {
        continue;
      }

      start_date.hour(start_time.hour());
      start_date.minute(start_time.minute());
      start_date.second(0);

      end_date.hour(end_time.hour());
      end_date.minute(end_time.minute());
      end_date.second(0);

      props.handleAddCourse(start_date, end_date, props.info["Class#"]);
    }
  }

  return (
    <button className="search-item" onClick={onCourseClick}>
      <div className="item-name">{props.info["class_name"]}</div>
      <div className="info-container" data-tip={props.info['Notes'] ? props.info['Notes'] : 'No Notes'}>
        <span
          className="info-circle"
        >
          i
        </span>
      </div>
      <ul className="item-attrib-collection">{displayInfo()}</ul>
    </button>
  );
};

export default SearchItems;

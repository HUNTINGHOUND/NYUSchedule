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
    for (let name of props.info["Instructor"]) {
      if (name === "Staff") {
        prof.addList({});
        continue;
      }
      var param = "name=" + name;
      var url = "https://nyuscheduleserver.herokuapp.com/rmp/getProf";

      axios.get(url + "?" + param)
        .then((res) => {
          prof.addList(res.data);
        });

    }
    // eslint-disable-next-line
  }, [props]);

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
      if (name === "class_name" || name === "link") {
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
        infolist.push(<Info key={index} name={name} message={name === 'Status' ? 
          (message === 'Open' ? <div style={{color:"blue", float:'left'}}>{message}</div> : (message === 'Closed' ? <div style={{color:"red"}}>{message}</div> 
          : 
          <div style={{color:"#FF8C00"}}>{message}</div>)) : message}/>);
        index += 1;

      }
    }

    return infolist;
  };

  const onCourseClick = (e) => {
    if(e.target.tagName === 'A') return;
    const date_strings = props.info["Days/Times"].split(' ');
    const weekdays = date_strings[0].match(/.{1,2}/g);
    const start_time = moment(date_strings[1], 'hh:mm a');
    const end_time = moment(date_strings[3], 'hh:mm a');

    for(let day of weekdays) {
      let start_date = moment();
      let end_date = moment();

      if(day === 'Mo') {
        start_date = moment().day(1);
        end_date = moment().day(1);
      } else if(day === 'Tu') {
        start_date = moment().day(2);
        end_date = moment().day(2);
      } else if(day === 'We') {
        start_date = moment().day(3);
        end_date = moment().day(3);
      } else if(day === 'Th') {
        start_date = moment().day(4);
        end_date = moment().day(4);
      } else if(day === 'Fr') {
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

      props.handleAddCourse(start_date, end_date, props.info["class_name"]);
    }
  }

  return (
    <button className="search-item" onClick={onCourseClick}>
      <div className="item-name">{props.info["class_name"]}</div>
      <div className="info-container" data-tip="Click me to see details.">
        <a
          className="info-circle"
          href={props.info["link"]}
          target="_blank"
          rel="noreferrer"
        >
          i
        </a>
      </div>
      <ul className="item-attrib-collection">{displayInfo()}</ul>
    </button>
  );
};

export default SearchItems;

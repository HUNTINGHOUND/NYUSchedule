import React, { useEffect } from 'react';
import useList from './use-list';

const Info = (props) => {
  return (
    <li>
      <b>{props.name}</b>: {props.message}
    </li>
  );
};

const SearchItems = (props) => {
  const prof = useList([]);

  useEffect(() => {
    var xhr = new XMLHttpRequest();

    var info = {};
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        info = JSON.parse(xhr.responseText);
        prof.addList(info);
      }
    });

    for (let name of props.info['Instructor']) {
      if (name === 'Staff') {
        prof.addList({});
        continue;
      }
      var param = 'name=' + name;
      var url = 'http://127.0.0.1:5000/rmp/getProf';

      xhr.open('GET', url + '?' + param);
      xhr.send();
    }
  }, [props]);

  const gettip = (prof) => {
    let result = '';
    if (!prof) {
      return 'No profile on RMP';
    }

    for (const [key, value] of Object.entries(prof)) {
      if (key === 'url' || key === 'tid') {
        continue;
      }

      result =
        result + `<br />${key}: ${key === 'Tags' ? value.join(', ') : value}`;
    }

    return result.length === 0 ? 'No profile on RMP' : result;
  };

  const displayInfo = () => {
    let infolist = [];

    let index = 0;
    for (const [name, message] of Object.entries(props.info)) {
      if (name === 'class_name' || name === 'link') {
        continue;
      }

      if (name === 'Instructor') {
        for (let i = 0; i < message.length; i += 1) {
          infolist.push(
            <Info
              key={index}
              name={name}
              message={
                <a
                  href={
                    prof.list[i] && prof.list[i].url
                      ? '//' + prof.list[i].url
                      : '#'
                  }
                  data-tip={gettip(prof.list[i])}
                  target="_blank"
                  rel="noreferrer"
                >
                  {message[i]}
                </a>
              }
            />
          );

          index += 1;
        }
        continue;
      }

      infolist.push(<Info key={index} name={name} message={message} />);
      index += 1;
    }

    return infolist;
  };

  return (
    <div className="search-item">
      <div className="item-name">{props.info['class_name']}</div>
      <div className="info-container" data-tip="Click me to see details.">
        <a
          className="info-circle"
          href={props.info['link']}
          target="_blank"
          rel="noreferrer"
        >
          i
        </a>
      </div>
      <ul className="item-attrib-collection">{displayInfo()}</ul>
    </div>
  );
};

export default SearchItems;

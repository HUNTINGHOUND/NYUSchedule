import React from 'react'
import ReactTooltip from 'react-tooltip'

export class SearchItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prof : []
    };

  }

  componentDidMount(){
    var xhr = new XMLHttpRequest();

    var info = {};
    xhr.addEventListener("readystatechange", () => {
      if(xhr.readyState === 4) {
        info = JSON.parse(xhr.responseText);
        console.log("prof = ", info);
        this.setState((prevState) => {
          return {prof: [...prevState.prof, info]}
        });
      }
    });

    for(let name of this.props.info['Instructor']) {
      var param = 'name=' + name;
      var url = 'https://nyuscheduleserver.herokuapp.com/rmp/getProf';

      xhr.open('GET', url + '?' + param);
      xhr.send();
    }

  }

  gettip(prof) {
    let result = ""
    if(!prof) {
      return "No profile on RMP";
    }

    for(const [key, value] of Object.entries(prof)) {
      if(key === 'url' || key === 'tid') {
        continue;
      }


      result = result + `<br />${key}: ${key === 'Tags' ? value.join(', ') : value}`;
    }

    return result.length == 0 ? "No profile on RMP" : result;
  }

  displayInfo() {
    let infolist = [];

    let index = 0;
    for(const [name, message] of Object.entries(this.props.info)) {

      if(name === 'class_name') {
        continue;
      }

      if(name === 'Instructor') {
        for(let i = 0; i < message.length; i += 1) {
          infolist.push(<Info key={index} name={name} message={
              <a href={(this.state.prof[i] && this.state.prof[i].url) ? ('//' + this.state.prof[i].url) : '#'}
                data-tip={this.gettip(this.state.prof[i])}
                target='_blank'>{message[i]}</a>
          }/>);

          index += 1;
        }
        continue;
      }

      infolist.push(<Info key={index} name={name} message={message} />);
      index += 1;
    }

    return infolist;
  }

  render() {
    return(
      <div className="search-item">
        <div className="item-name">{this.props.info['class_name']}</div>
        <ul className="item-attrib-collection">
          {this.displayInfo()}
        </ul>
        <ReactTooltip place='right' type='dark' effect='float' multiline={true}/>
      </div>
    );
  }
}

function Info(props) {
  return <li><b>{props.name}</b>: {props.message}</li>;
}

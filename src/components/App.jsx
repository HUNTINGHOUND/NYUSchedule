import React from "react";
import Main from "./Main";
import TopBar from "./Topbar";
import ReactTooltip from "react-tooltip";
import {Helmet} from 'react-helmet';

/**
 * The component that represent the entire application.
 */
const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>NYUSchedule</title>
      </Helmet>
      <TopBar />
      <Main />
      <ReactTooltip place='right' type='dark' effect='solid' multiline={true} />
    </div>
  );
};

export default App;

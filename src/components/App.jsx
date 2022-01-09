import React from "react";
import Main from "./Main";
import TopBar from "./Topbar";
import ReactTooltip from "react-tooltip"

/**
 * The component that represent the entire application.
 */
const App = () => {
  return (
    <div className="app">
      <TopBar />
      <Main />
      <ReactTooltip place='right' type='dark' effect='solid' multiline={true} />
    </div>
  );
};

export default App;

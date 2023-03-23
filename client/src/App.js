import Onboarding from "./components/Onboarding";
import React, { useState } from "react";
import Homepage from "./components/Homepage";
import classes from "./App.module.css";

const App = () => {
  const [isStartClicked, setIsStartClicked] = useState(false);
  const startClickedHandler = () => {
    setIsStartClicked(true);
  };
  return (
    <div className={classes.App}>
      {isStartClicked ? (
        <Onboarding />
      ) : (
        <Homepage onStartClicked={startClickedHandler} />
      )}
    </div>
  );
};

export default App;

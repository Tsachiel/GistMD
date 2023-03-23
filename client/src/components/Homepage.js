import React from "react";
import classes from "./Homepage.module.css";

const Homepage = ({ onStartClicked }) => {
  const startClickedHandler = () => {
    onStartClicked();
  };
  return (
    <div className={classes.homepage}>
      <h1 className={classes.titleAndDescription}>Welcome!</h1>
      <h2 className={classes.titleAndDescription}>Create Your patient</h2>
      <h2>profile to make life</h2>
      <h2>easier- for you both.</h2>
      <button className={classes.button} onClick={startClickedHandler}>
        Start
      </button>
    </div>
  );
};

export default Homepage;

import React from "react";
import StageOption from "./UI/StageOption";
import classes from "./PatientSummary.module.css";

const PatientSummary = ({ selectedOptions, titles, icons }) => {
  let optionsList = selectedOptions.map((option, index) => (
    <StageOption
      key={option + index}
      id={option}
      isChecklist={true}
      title={titles[index]}
      icon={icons[index]}
    />
  ));
  return (
    <>
      <h1 className={classes.header}>Your Patient Profile:</h1>
      <div className={classes.options}>{optionsList}</div>
      <p className={classes.summaryText}>
        Thanks for choosing the best Personalized Patient Engagement Platform!
      </p>
    </>
  );
};

export default PatientSummary;

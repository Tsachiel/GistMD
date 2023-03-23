import React from "react";
import StageOption from "./UI/StageOption";
import classes from "./OnboardingStage.module.css";

const OnboardingStage = ({
  title,
  description,
  stageOptions,
  onSelect,
  currentStageSelectedOption,
}) => {
  const selectOptionClass = `${classes.selected}`;
  const unselectOptionClass = `${classes.option}`;
  let optionsList = stageOptions.map((option) => {
    return (
      <StageOption
        key={option.icon}
        id={option.icon}
        onSelect={onSelect}
        isChecklist={false}
        option={option.option}
        icon={option.icon}
        optionObj={option}
        optionClassName={
          option.option === currentStageSelectedOption
            ? selectOptionClass
            : unselectOptionClass
        }
      />
    );
  });

  return (
    <>
      {/* <h1 className={classes.titleAndDescription}>{title}</h1> */}
      <h2 className={classes.titleAndDescription}>{description}</h2>
      <div className={classes.options}>{optionsList}</div>
    </>
  );
};

export default OnboardingStage;

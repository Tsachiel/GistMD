import React, { useEffect, useRef, useState, useReducer } from "react";
import OnboardingStage from "./OnboardingStage";
import PatientSummary from "./PatientSummary";
import classes from "./Onboarding.module.css";

const titlesList = [];
const defaultStagesState = {
  stages: [],
  stageNumber: 0,
  currentStage: null,
  selectedOptions: [],
  selectedIcons: [],
};
const stagesStateReducer = (state, action) => {
  if (action.type === "DATA_FETCHED_FROM_SERVER") {
    return {
      stages: action.value,
      stageNumber: 0,
      currentStage: action.value[0],
      selectedOptions: state.selectedOptions,
      selectedIcons: state.selectedIcons,
    };
  } else if (action.type === "NEXT_BTN_CLICKED") {
    return {
      stages: state.stages,
      stageNumber: state.stageNumber + 1,
      currentStage: state.stages[state.stageNumber + 1],
      selectedOptions: state.selectedOptions,
      selectedIcons: state.selectedIcons,
    };
  } else if (action.type === "BACK_BTN_CLICKED") {
    return {
      stages: state.stages,
      stageNumber: state.stageNumber - 1,
      currentStage: state.stages[state.stageNumber - 1],
      selectedOptions: state.selectedOptions,
      selectedIcons: state.selectedIcons,
    };
  } else if (action.type === "OPTION_SELECTED") {
    if (!state.selectedOptions.includes(action.value)) {
      state.selectedOptions[state.stageNumber] = action.value.option;
      state.selectedIcons[state.stageNumber] = action.value.icon;
    }
    return {
      stages: state.stages,
      stageNumber: state.stageNumber,
      currentStage: state.stages[state.stageNumber],
      selectedOptions: state.selectedOptions,
      selectedIcons: state.selectedIcons,
    };
  }
  return defaultStagesState;
};
const Onboarding = () => {
  const [stagesState, dispatchStagesState] = useReducer(
    stagesStateReducer,
    defaultStagesState
  );
  const [showChecklist, setShowChecklist] = useState(false);
  // const [selectCurrent, setSelectCurrent] = useState(false);
  // const [selectPrev, setSelectPrev] = useState(false);
  // const [currentStageSelectedOption, setCurrentStageSelectedOption] = useState('');

  const nextButtonRef = useRef();

  const optionSelectedHandler = (newOption) => {
    dispatchStagesState({ type: "OPTION_SELECTED", value: newOption });
    // setCurrentStageSelectedOption(newOption);
  };

  const moveToNextStageHandler = () => {
    if (stagesState.stageNumber === stagesState.stages.length - 1) {
      setShowChecklist(true);
    } else {
      dispatchStagesState({ type: "NEXT_BTN_CLICKED" });
      if (stagesState.stageNumber === stagesState.stages.length - 2) {
        nextButtonRef.current.innerText = "Gist it!";
      }
    }
  };
  const moveToPrevStageHandler = () => {
    if (stagesState.stageNumber === stagesState.stages.length - 1) {
      nextButtonRef.current.innerText = "Next";
    }
    dispatchStagesState({ type: "BACK_BTN_CLICKED" });
  };
  const parseOnboardingStages = async (iData) => {
    const responseData = iData;
    const stagesList = [];
    for (const key in responseData) {
      if (key === "_id") {
        continue;
      }
      titlesList.push(key);
      stagesList.push({
        id: key,
        title: key,
        stageOptions: responseData[key].options,
        description: responseData[key].description,
        icon: responseData[key].icon,
      });
    }
    return stagesList;
  };
  useEffect(() => {
    const fetchStagesData = async () => {
      let responseData;
      try {
        responseData = await fetch("http://localhost:4000/getOptions", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => parseOnboardingStages(data))
          .catch((err) => console.error(err));
      } catch (err) {
        console.log(err);
      }
      dispatchStagesState({
        type: "DATA_FETCHED_FROM_SERVER",
        value: responseData,
      });
    };
    fetchStagesData();
  }, []);
  return (
    <div className={classes.onboarding}>
      {!showChecklist && stagesState.stages[0] && (
        <div>
          <div>
            <OnboardingStage
              id={stagesState.stages[stagesState.stageNumber].id}
              title={stagesState.stages[stagesState.stageNumber].title}
              description={
                stagesState.stages[stagesState.stageNumber].description
              }
              isFirstStage={stagesState.stageNumber === 0}
              // icon={stagesState.stages[stagesState.stageNumber].icon}
              stageOptions={stagesState.currentStage.stageOptions}
              className={classes.total}
              currentStageSelectedOption={
                stagesState.selectedOptions[stagesState.stageNumber]
              }
              onSelect={optionSelectedHandler}
            />
          </div>
          {stagesState.stageNumber > 0 && (
            <button className={classes.button} onClick={moveToPrevStageHandler}>
              Back
            </button>
          )}
          <button
            className={classes.button}
            onClick={moveToNextStageHandler}
            ref={nextButtonRef}
            disabled={
              stagesState.selectedOptions[stagesState.stageNumber]
                ? false
                : true
            }
          >
            Next
          </button>
          <h1 className={classes.stagesNumbers}>
            {stagesState.stageNumber + 1} / {stagesState.stages.length}
          </h1>
        </div>
      )}
      {showChecklist && (
        <PatientSummary
          selectedOptions={stagesState.selectedOptions}
          titles={titlesList}
          icons={stagesState.selectedIcons}
        />
      )}
      {/* {stagesState.stages[0] && <img src={logo} alt="" className="" />} */}
    </div>
  );
};
export default Onboarding;

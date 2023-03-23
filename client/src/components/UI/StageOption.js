import React from "react";

const StageOption = ({
  id,
  optionObj,
  onSelect,
  isChecklist,
  title,
  option,
  icon,
  optionClassName,
}) => {
  const handleClick = () => {
    if (!isChecklist) {
      onSelect(optionObj);
    }
  };
  return (
    <h2 className={optionClassName} id={id} onClick={handleClick}>
      {isChecklist ? (
        <div>
          {title} : {id}
          <img src={icon} alt={optionClassName} />
        </div>
      ) : (
        <>
          <img src={icon} alt={optionClassName} />
          <p>{option}</p>
        </>
      )}
    </h2>
  );
};

export default StageOption;

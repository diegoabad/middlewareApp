import React from "react";

const WorkingTime = ({workExperience, handleChange, editValue}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Tiempo trabajado</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <input
          type="text"
          className={`form-control ${!editValue && "green-shadow"}`}
          value={workExperience.workingTime}
          onChange={handleChange}
          name="workingTime"
          required
        />
      </div>
    </div>
  );
};

export default WorkingTime;

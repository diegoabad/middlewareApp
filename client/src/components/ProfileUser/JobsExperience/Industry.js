import React from "react";

const Industry = ({workExperience, handleChange, editValue}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Industria</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <input
          className={`form-control ${!editValue && "green-shadow"}`}
          type="text"
          value={workExperience.industry}
          onChange={handleChange}
          name="industry"
          required
        />
      </div>
    </div>
  );
};

export default Industry;

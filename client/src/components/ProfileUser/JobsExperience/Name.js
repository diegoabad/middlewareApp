import React from "react";

const Name = ({workExperience, editValue, handleChange}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Nombre de la compania</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <input
          className={`form-control ${!editValue && "green-shadow"}`}
          type="text"
          name="companyName"
          value={workExperience.companyName}
          onChange={handleChange}
         required
        />
      </div>
    </div>
  );
};

export default Name;

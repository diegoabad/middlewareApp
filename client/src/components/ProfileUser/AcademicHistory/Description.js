import React from "react";

const Description = ({academicHistory, handleChange}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Descripción</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <textarea
          type="text"
          className={`form-control green-shadow`}
          value={academicHistory.description}
          onChange={handleChange}
          name="description"
          required
        />
      </div>
    </div>
  );
};

export default Description;

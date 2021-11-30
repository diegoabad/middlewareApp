import React from "react";

const Description = ({ infoJobs, editValue, handleChange }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Descripción</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <textarea
            className="form-control"
            type="text"
            name="description"
            onChange={handleChange}
            value={infoJobs.description}
          />
        ) : (
          <span>{infoJobs.description}</span>
        )}
        {/* <span>{infoJobs.description}</span> */}
      </div>
    </div>
  );
};

export default Description;

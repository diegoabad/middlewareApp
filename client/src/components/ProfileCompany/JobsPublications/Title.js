import React from "react";

const Title = ({ infoJobs, editValue, handleChange }) => {
  return (
    <div className="row mb-3">

      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Titulo</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <input
            className="form-control"
            type="text"
            name="title"
            value={infoJobs.title}
            onChange={handleChange}
          />
        ) : (
          <span>{infoJobs.title}</span>
        )}
      </div>
    </div>
  );
};

export default Title;

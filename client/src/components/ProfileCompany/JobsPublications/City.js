import React from "react";
import State from "../../CreatePublications/State";

const City = ({ infoJobs, editValue, handleChange, state }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary text-secondary">Ciudad</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <State
            state={state}
            handleChange={handleChange}
            infoJobs={infoJobs}
          />
        ) : (
          <span>{infoJobs.city}</span>
        )}
      </div>
    </div>
  );
};

export default City;

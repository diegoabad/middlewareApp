import React from "react";
import CountryState from "../../CreatePublications/CountryState";

const Country = ({ infoJobs, editValue, handleChange, setState }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">País</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <CountryState
            setState={setState}
            handleChange={handleChange}
            infoJobs={infoJobs}
          />
        ) : (
          <span>{infoJobs.country}</span>
        )}
      </div>
    </div>
  );
};

export default Country;

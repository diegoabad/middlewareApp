import React from "react";

const Status = ({ infoJobs, editValue, handleChange }) => {


  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Estado</h6>
      </div>
      <div className="col-sm-8 ">
        {!editValue ? (
          <select onChange={handleChange} value={infoJobs.status} name='status' className="form-select">
            <option  value="active">Activo</option>
            <option  value="paused">Pausado</option>
            <option  value="closed">Cerrado</option>
          </select>
        ) : (
          <span>{infoJobs.status}</span>
        )}
      </div>
    </div>
  );
};

export default Status;

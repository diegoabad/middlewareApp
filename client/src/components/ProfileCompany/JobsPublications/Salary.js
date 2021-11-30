import React from "react";

const Salary = ({ infoJobs, editValue, handleChange }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Salario</h6>
      </div>
      <div className="col-sm-8 ">
        <span>
          {!editValue ? (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                name="salary"
                onChange={handleChange}
                value={infoJobs.salary}
              />
              <select
                onChange={handleChange}
                name="currency"
                className="form-select"
                value={infoJobs.currency}
              >
                <option value="dollar">Dollar</option>
                <option value="euro">Euro</option>
                <option value="peso">Peso</option>
              </select>
            </div>
          ) : (
            <span>{infoJobs.salary + " " + infoJobs.currency}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Salary;

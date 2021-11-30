import React from "react";

const NameInstitute = ({academicHistory, handleChange}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Nombre de la institución</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <input
          className={`form-control green-shadow`}
          type="text"
          name="institute"
          value={academicHistory.institute}
          onChange={handleChange}
         required
        />
      </div>
    </div>
  );
};

export default NameInstitute;

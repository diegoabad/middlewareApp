import React from "react";

const Title = ({academicHistory, handleChange, editValue}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Titulo</h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <input
          className={`form-control green-shadow`}
          type="text"
          value={academicHistory.title}
          onChange={handleChange}
          name="title"
          required={true}
        />
      </div>
    </div>
  );
};

export default Title;

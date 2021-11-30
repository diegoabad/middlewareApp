import React from 'react'

const WorkPosition = ({workExperience, handleChange, editValue}) => {
   return (
      <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Tareas</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <textarea
              type="text"
              className={`form-control ${!editValue && "green-shadow"}`}
              value={workExperience.workPosition}
              onChange={handleChange}
              name="workPosition"
              required
            />
          </div>
        </div>
   )
}

export default WorkPosition

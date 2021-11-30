import React from 'react'

const Date = ({academicHistory, handleChange, editValue}) => {
   return (
      <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Tiempo de estudio</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input
              type="text"
              className={`form-control green-shadow`}
              value={academicHistory.date}
              onChange={handleChange}
              name="date"
              required

            />
          </div>
        </div>
   )
}

export default Date

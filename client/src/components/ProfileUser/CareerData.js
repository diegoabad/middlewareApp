import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Languages from "./Languages";
import Technologies from "./Technologies";
// import Softskills from "./SoftSkills";
import OpenTo from "./OpenTo";

const CareerData = ({ infoUser, setInfoUser }) => {
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      [e.target.name]: e.target.value,
    }));
  };
  const [editValue, setEditValue] = useState(true);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Titular</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input
              className={`form-control ${!editValue && "green-shadow"}`}
              type="text"
              required
              value={infoUser.title}
              onChange={handleChange}
              name="title"
              placeholder="ej: Front End | Javascript | Back End"
              disabled={editValue}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Technologies</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <Technologies setInfoUser={setInfoUser} infoUser={infoUser} />
            <br />
          </div>
        </div>
        {/* <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Technologies</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <Softskills setInfoUser={setInfoUser} infoUser={infoUser} />

            <br />
          </div>
        </div> */}
        <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Languages</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <Languages setInfoUser={setInfoUser} infoUser={infoUser} />
          </div>
        </div>
        <OpenTo
          editValue={editValue}
          infoUser={infoUser}
          setInfoUser={setInfoUser}
        />
        {/* <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Algo</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input
              type="text"
              className={`form-control ${!editValue && "green-shadow"}`}
              value={infoUser.city}
              onChange={handleChange}
              name="city"
              disabled={editValue}
            />
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-secondary">
            <button
              className="btn btn-outline-dark px-4"
              onClick={() => setEditValue((d) => !d)}
            >
              {editValue ? "editar" : "aceptar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerData;

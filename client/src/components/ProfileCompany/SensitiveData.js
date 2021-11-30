import { useState } from "react";
import CountryState from "../CreatePublications/CountryState";
import State from "../CreatePublications/State";

const SensitiveData = ({ infoUser, setEditValue, editValue, setInfoUser }) => {
  const [state, setState] = useState(null);

  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="row mb-3 ">
        <div className="col-sm-3 ">
          <h6 className="mb-0">Nombre de la empresa</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            className={`form-control ${!editValue && "green-shadow"}`}
            type="text"
            name="name"
            value={infoUser.name}
            onChange={handleChange}
            disabled={editValue}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Email</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            className={`form-control ${!editValue && "green-shadow"}`}
            type="text"
            value={infoUser.gmail}
            onChange={handleChange}
            name="gmail"
            disabled={editValue}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">linkedIn</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            type="text"
            className={`form-control ${!editValue && "green-shadow"}`}
            value={infoUser.linkedin}
            onChange={handleChange}
            name="linkedin"
            disabled={editValue}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Página Web</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <input
            type="text"
            className={`form-control ${!editValue && "green-shadow"}`}
            value={infoUser.webpage}
            onChange={handleChange}
            name="webpage"
            disabled={editValue}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">País</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <CountryState
            infoJobs={infoUser}
            setState={setState}
            handleChange={handleChange}
            editValue={editValue}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-3">
          <h6 className="mb-0">Ciudad</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          <State
            state={state}
            infoJobs={infoUser}
            handleChange={handleChange}
            editValue={editValue}
          />
        </div>
      </div>

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
    </>
  );
};

export default SensitiveData;

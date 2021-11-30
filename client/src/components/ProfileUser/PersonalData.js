import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Languages from "./Languages";
import Technologies from "./Technologies";

const PersonalData = ({ infoUser, setInfoUser }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      [e.target.name]: e.target.value,
    }));
  };
  const [editValue, setEditValue] = useState(true);

  //en cada edicion de datos tiene que viajar a la db
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(infoUser(infoUser));
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Nombre Completo</h6>
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
            <h6 className="mb-0">Celular</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input
              type="number"
              className={`form-control ${!editValue && "green-shadow"}`}
              value={infoUser.phone}
              onChange={handleChange}
              name="phone"
              disabled={editValue}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-3">
            <h6 className="mb-0">Ciudad</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input
              type="text"
              className={`form-control ${!editValue&&'green-shadow'}`}
              value={infoUser.city}
              onChange={handleChange}
              name="city"
              disabled={editValue}
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
      </div>
    </div>
  );
};

export default PersonalData;

import { useState } from "react";
import ModalDeletAccount from "../ProfileUser/ModalDeletAccount";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/actions";
import ChangePicture from "./../ProfileUser/ChangePicture";

const Prueba2left = ({ setInfoUser, infoUser, editValue }) => {
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      description: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const handleDelete = (infoUser) => {
    dispatch(deleteCompany(infoUser.idFireBase));
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center text-center">
        <img
          src={infoUser.photograph}
          alt="Admin"
          className="rounded-circle p-1 bg-primary"
          width="140"
        />
        <ChangePicture setInfoUser={setInfoUser} />
        <div className="mt-3">
          <h4>{infoUser.name}</h4>
          <p className="text-secondary mb-1">
            {infoUser.title === "" ? "Tu Titulo" : infoUser.title}
          </p>
          <p className="text-muted font-size-sm">
            {infoUser.city === "" ? "Córdoba, Argentina" : infoUser.city}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row mb-3">
        <div className="col-sm-12 text-secondary">
          <textarea
            className={`form-control ${!editValue && "green-shadow"}`}
            type="text"
            value={infoUser.description}
            placeholder="Cuentanos de tu empresa . . ."
            onChange={handleChange}
            name="description"
            disabled={editValue}
          />
        </div>
        <div className='mt-4'>
          <ModalDeletAccount handleDelete={handleDelete} infoUser={infoUser} />
        </div>
      </div>
    </>
  );
};

export default Prueba2left;

import { useState } from "react";
// import CareerData from "./CareerData";
import ChangePicture from "./ChangePicture";
import SocialMedia from "./SocialMedia";

import ModalDeletAccount from "./ModalDeletAccount";
import CardShowExperience from "./ShowWorkExperience/CardShowExperience";
import CardShowAcademicExperience from "./ShowAcademicExperience/CardShowAcademicExperience";
import { useDispatch } from "react-redux";
import { deleteJuniors } from "../../redux/actions";
import ShowWorkPostulated from "./ShowWorkPostulated/ShowWorkPostulated";

const Prueba2left = ({
  user,
  setInfoUser,
  infoUser,
  setWorkExperience,
  setAcademicHistory,
}) => {
  const dispatch = useDispatch();

  const [editValue, setEditValue] = useState(true);
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: true,
      description: e.target.value,
    }));
  };
  const handleDelete = (infoUser) => {
    dispatch(deleteJuniors(infoUser.idUser));
  };
  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            {infoUser.photograph ? (
              <img
                src={infoUser.photograph}
                alt="Admin"
                className="rounded-circle p-1 bg-primary"
                width="140"
              />
            ) : (
              "loading.."
            )}
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
                placeholder="Quien eres? . . ."
                onChange={handleChange}
                name="description"
                disabled={editValue}
              />
            </div>
          </div>
          <button
            className="btn btn-outline-dark px-4"
            onClick={() => setEditValue((d) => !d)}
          >
            {editValue ? "editar" : "aceptar"}
          </button>
        </div>
        <ModalDeletAccount handleDelete={handleDelete} infoUser={infoUser} />
      </div>
      <SocialMedia setInfoUser={setInfoUser} infoUser={infoUser} />
      <ShowWorkPostulated infoUser={infoUser} />

      <CardShowExperience
        setInfoUser={setInfoUser}
        setWorkExperience={setWorkExperience}
        infoUser={infoUser}
      />
      <CardShowAcademicExperience
        setAcademicHistory={setAcademicHistory}
        setInfoUser={setInfoUser}
        infoUser={infoUser}
      />
    </div>
  );
};

export default Prueba2left;

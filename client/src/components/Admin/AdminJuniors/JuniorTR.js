import { useState, useEffect } from "react";
import ModalDelete from "../AdminJobs/ModalDelete";
import ModalDeleteJunior from "./ModalDeleteJunior";

const JuniorTR = ({ junior, handleDelete, setDeleteUsr,  setUser, i }) => {
  // console.log(user, "junn");
  
  return (
    <tr className="border-bottom">
      <td>
        <div className="p-2">
          <small>{i+1}</small>
        </div>
      </td>
      <td>
        <div className="p-2">
          <small>{junior.date}</small>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src={junior.photograph} width="40" className="rounded-circle" />
          <div className="d-flex flex-column ">
            <span className="d-block  font-weight-bold">{junior.name}</span>
            <small className="text-muted">{junior.gmail}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2 text-center">
          <span className="font-weight-bold">{junior.publications.length}</span>
        </div>
      </td>
      <td>
        <div className="p-2  text-center ">
          <span>{junior.postulationsJobs.length}</span>
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <ModalDeleteJunior
            setDeleteUsr={setDeleteUsr}
            setUser={setUser}
            handleDelete={handleDelete}
            junior={junior}
          />
        </div>
      </td>
    </tr>
  );
};

export default JuniorTR;

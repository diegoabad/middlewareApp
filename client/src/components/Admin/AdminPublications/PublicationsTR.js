import React from "react";
import ModalDeletePublications from "./ModalDeletePublications";

const PublicationsTR = ({
  publication,
  i,
  handleDelete,
  setDeleteUsr,
  setUser,
}) => {
  return (
    <tr className="border-bottom">
      <td>
        <div className="p-2">
          <small>{i + 1}</small>
        </div>
      </td>
      <td>
        <div className="p-2">
          <small>{publication.date}</small>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img
            src={
              publication.junior
                ? publication.junior.photograph
                : publication.company.photograph
            }
            width="40"
            className="rounded-circle"
          />
          <div className="d-flex flex-column ">
            <span className="d-block  font-weight-bold">
              {publication.junior
                ? publication.junior.name
                : publication.company.name}
            </span>
            <small className="text-muted">
              {publication.junior
                ? publication.junior.gmail
                : publication.company.gmail}
            </small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2 text-center">
          <span className="font-weight-bold">
            {publication.junior ? "junior" : "company"}
          </span>
        </div>
      </td>
      <td>
        <div className="p-2  text-center ">
          <img
            src={publication.photograph && publication.photograph}
            width="130"
            className=""
          />
          {/* <span>{publication.photograph&&publication.photograph}</span> */}
        </div>
      </td>
      <td>
        <ModalDeletePublications
          handleDelete={handleDelete}
          publication={publication}
          setDeleteUsr={setDeleteUsr}
          setUser={setUser}
        />
      </td>
    </tr>
  );
};

export default PublicationsTR;

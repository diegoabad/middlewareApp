import ModalDeleteJunior from "../AdminJuniors/ModalDeleteJunior";

const CompanyTR = ({ company, handleDelete, setDeleteUsr, setUser, i }) => {
  return (
    <tr className="border-bottom">
      <td>
        <div className="p-2">
          <small>{i+1}</small>
        </div>
      </td>
      <td>
        <div className="p-2">
          <small>{company.date}</small>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src={company.photograph} width="40" className="rounded-circle" />
          <div className="d-flex flex-column ">
            <span className="d-block  font-weight-bold">{company.name}</span>
            <small className="text-muted">{company.gmail}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2 text-center">
          <span className="font-weight-bold">
            {company.publications.length}
          </span>
        </div>
      </td>
      <td>
        <div className="p-2  text-center ">
          <span>{company.jobs.length}</span>
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <ModalDeleteJunior
            setDeleteUsr={setDeleteUsr}
            setUser={setUser}
            handleDelete={handleDelete}
            junior={company}
          />
        </div>
      </td>
    </tr>
  );
};

export default CompanyTR;

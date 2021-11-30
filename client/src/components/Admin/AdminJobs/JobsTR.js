import React from "react";
import ModalDelete from "./ModalDelete";

const JobsTR = ({ job, i, handleDelete }) => {
  // console.log(job, "jobsssss");
  const { date, company, juniors, status, premium } = job;
  return job? (
    <tr className="border-bottom">
      <td>
        <div className="p-2">
          <small>{i+1}</small>
        </div>
      </td>
      <td>
        <div className="p-2">
          <small>{date}</small>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src={company&&company.photograph} width="40" className="rounded-circle" />
          <div className="d-flex flex-column ">
            <span className="d-block  font-weight-bold">{company&&company.name}</span>
            <small className="text-muted">{company&&company.gmail}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2 text-center">
          <span className="font-weight-bold">{juniors.length}</span>
        </div>
      </td>
      <td>
        <div className="p-2  text-center ">
          <span>{status}</span>
          {/* <img src={job.photograph&&job.photograph} width="130" className="" /> */}
        </div>
      </td>
      <td>
        <div className="p-2  text-center ">
          <span>{premium}</span>
          {/* <img src={job.photograph&&job.photograph} width="130" className="" /> */}
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <ModalDelete handleDelete={handleDelete} job={job} />
          {/* <i onClick={()=>handleDelete(job._id)} className="btn bi bi-trash-fill"></i> */}
        </div>
      </td>
    </tr>
  ):'cargando';
};

export default JobsTR;

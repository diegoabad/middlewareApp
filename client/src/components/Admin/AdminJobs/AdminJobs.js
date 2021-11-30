import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteJobsAction } from "../../../redux/actions";
import JobsTR from "./JobsTR";

const AdminJobs = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getJobs());
  }, []);
  const handleDelete = (idJob) => {
    dispatch(deleteJobsAction(idJob))
  }

  return (
    <div className="container mt-5">
      <table className="table  table-borderless table-responsive card-1 p-4">
        <thead>
          <tr className="border-bottom text-center">
            <th>
              <span className="ml-2">Nº</span>
            </th>
            <th>
              <span className="ml-2">Fecha de creacion</span>
            </th>
            <th>
              <span className="ml-2">Company</span>
            </th>
            <th>
              <span className="ml-2">Postulados</span>
            </th>
            <th>
              <span className="ml-2">Estado</span>
            </th>
            <th>
              <span className="ml-2">Nivel de premium</span>
            </th>
            <th>
              <span className="ml-4">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.data.length > 0 ? (
            jobs.data.map((job, i) => (
              <Fragment key={job._id}>
                <JobsTR i={i} handleDelete={handleDelete} job={job} />
              </Fragment>
            ))
          ) : (
            <tr className="container text-center">
              <td>cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobs;

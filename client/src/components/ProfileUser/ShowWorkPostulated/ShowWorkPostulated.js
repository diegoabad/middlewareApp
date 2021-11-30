import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getJobs } from "../../../redux/actions";

const ShowWorkPostulated = ({ infoUser }) => {
  const [jobsAplied, setJobsAplied] = useState([]);
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getJobs());
  }, [infoUser]);
  useEffect(() => {
    if (jobs.data.length > 0 && infoUser.postulationsJobs.length > 0) {
      const jobsAplied = infoUser.postulationsJobs.map((j) => {
        const jjobs = jobs.data.find((job) => {
          return job._id === j;
        });
        return jjobs;
      });
      setJobsAplied(jobsAplied);
    }
  }, [jobs]);

  return (
    <div className="card">
      <h5 className="text-center">Tus postulaciones laborales</h5>
      <div className="card-body">
        {infoUser && infoUser.postulationsJobs.length === 0
          ? "No te has postulado"
          : jobsAplied &&
            jobsAplied.map(
              (u) =>
                u && (
                  <Link
                    className="d-block"
                    key={u._id}
                    to={`/empleos/${u._id}`}
                  >
                    {u.title}
                  </Link>
                )
            )}
      </div>
    </div>
  );
};

export default ShowWorkPostulated;

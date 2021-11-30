import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Country from "./Country";
import Description from "./Description";
import Title from "./Title";
import City from "./City";
import Salary from "./Salary";
import Postulates from "./Postulates";
import Technologies from "./Technologies";
import Status from "./Status";
import Premium from "./Premium";
import {
  editJobPostulationsAction,
  deleteJobsAction,
} from "../../../redux/actions";
import ModalDelete from "../../Admin/AdminJobs/ModalDelete";

const JobsPublications = ({ infoUser, job }) => {
  const [editValue, setEditValue] = useState(true);
  const { technologies } = useSelector((state) => state);
  const [postulatiosTechnoliges, setPostulatiosTechnoliges] = useState([]);
  const [juniorsAplied, setJuniorsAplied] = useState([]);
  const [state, setState] = useState(null);
  const dispatch = useDispatch();

  const [infoJobs, setInfoJobs] = useState({
    title: "",
    description: "",
    photograph: "",
    country: "",
    city: "",
    currency: "",
    technologies: [],
    salary: 0,
    date: "",
    premium: "",
    status: "",
    _id: "",
    idCompany: "",
    idFireBase: "",
  });
  const handleChange = (e) => {
    // console.log("entrando", e.target.name, e.target.value);
    setInfoJobs((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = (idJob) => {
    setEditValue((d) => !d);
    if (!editValue) dispatch(editJobPostulationsAction(idJob, infoJobs));
    //hacer el dipatch y que todo funcione
  };

  const handleDelete = () => {
    dispatch(deleteJobsAction(infoJobs._id));
  };

  useEffect(() => {
    let techUsed = job.technologies.map((tech) => {
      const techn = technologies.find((t) => t._id === tech);
      return techn;
    });
    setPostulatiosTechnoliges(techUsed);
    setInfoJobs({
      title: job.title,
      description: job.description,
      photograph: job.photograph,
      country: job.country,
      city: job.city,
      currency: job.currency,
      technologies: [...techUsed],
      salary: job.salary,
      date: job.date,
      premium: job.premium,
      status: job.status,
      _id: job._id,
      idCompany: infoUser._id,
      idFireBase: infoUser.idUser,
    });
  }, []);

  return (
    <div className="accordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapseOne-${job._id}`}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapseOne-${job._id}`}
          >
            <div className="col-sm-6">{infoJobs.title}</div>
            <div className="col-sm-6">Postulados {juniorsAplied.length}</div>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapseOne-${job._id}`}
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <Title
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Description
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Country
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
              setState={setState}
            />
            <City
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
              state={state}
            />
            <Salary
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
            />
            <Technologies
              infoJobs={infoJobs}
              editValue={editValue}
              setInfoJobs={setInfoJobs}
              postulatiosTechnoliges={postulatiosTechnoliges}
            />
            <Postulates
              infoJobs={infoJobs}
              editValue={editValue}
              handleChange={handleChange}
              job={job}
              juniorsAplied={juniorsAplied}
              setJuniorsAplied={setJuniorsAplied}
            />
            <Status
              infoJobs={infoJobs}
              editValue={editValue}
              setInfoJobs={setInfoJobs}
              handleChange={handleChange}
            />
            <div className="row mb-3">
              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Nivel de Premium</h6>
              </div>
              <div className="col-sm-8 ">
                {editValue ? (
                  <span>{infoJobs.premium}</span>
                ) : (
                  <Premium infoJobs={infoJobs} />
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-4"></div>
              <div className="col-sm-8 ">
                <div className="row">
                  <div className="col-md-3">
                    <button
                      className="btn btn-outline-dark  px-4"
                      onClick={() => handleClick(infoJobs._id)}
                    >
                      {editValue ? "Editar" : "Guardar"}
                    </button>
                  </div>
                  <div className="  col-md-6">
                    <ModalDelete
                      handleDelete={handleDelete}
                      profile={true}
                      job={infoJobs}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPublications;

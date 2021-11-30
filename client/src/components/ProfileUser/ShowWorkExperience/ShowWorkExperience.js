

const ShowWorkExperience = ({
  job,
  setWorkExperience,
  handleDelete,
}) => {
  const handleEdit = () => {
    job.edit = true;
    setWorkExperience(job);
  };

  return (
    <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapseOne--${job._id}`}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapseOne--${job._id}`}
          >
            <div className="col-sm-6">{job.companyName}</div>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapseOne--${job._id}`}
          className="accordion-collapse collapse "
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Titulo</h6>
              </div>
              <div className="col-sm-8 ">
                <span>{job.companyName}</span>
              </div>
              <hr />
              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">industry</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{job.industry}</p>
              </div>
              <hr />

              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Tareas</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{job.workPosition}</p>
              </div>
              <hr />

              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Tiempo</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{job.workingTime}</p>
              </div>
            </div>
            <div className="mt-3 text-center ">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleDelete(job._id)}
                type="button"
              >
                Eliminar
              </button>
              <button
                onClick={handleEdit}
                className="btn btn-outline-dark "
                type="button"
              >
                editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowWorkExperience;

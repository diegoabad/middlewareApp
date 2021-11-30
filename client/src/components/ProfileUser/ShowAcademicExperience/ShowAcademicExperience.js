const ShowAcademicExperience = ({
  acad,
  setAcademicHistory,
  handleDelete,
}) => {
  const handleEdit = () => {
    acad.edit = true;
    setAcademicHistory(acad);
  };
  return (
    <div className="accordion accordion-flush">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapseOne--${acad._id}`}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapseOne--${acad._id}`}
          >
            <div className="col-sm-6">{acad.title}</div>
          </button>
        </h2>
        <div
          id={`panelsStayOpen-collapseOne--${acad._id}`}
          className="accordion-collapse collapse "
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Instituto</h6>
              </div>
              <div className="col-sm-8 ">
                <span>{acad.institute}</span>
              </div>
              <hr />
              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Titulo</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{acad.title}</p>
              </div>
              <hr />

              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Fecha</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{acad.date}</p>
              </div>
              <hr />

              <div className="col-sm-4">
                <h6 className="mb-0 text-secondary">Descripción</h6>
              </div>
              <div className="col-sm-8 ">
                <p>{acad.description}</p>
              </div>
            </div>
            <div className="mt-3 text-center ">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleDelete(acad._id)}
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

export default ShowAcademicExperience;

const ModalDeletePublications = ({ publication, setUser, setDeleteUsr }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => setUser(publication)}
        className="btn bi bi-trash-fill text-danger "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Eliminar Trabajo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Estas seguro que deseas eliminar este trabajo? no se podrá
              revertir
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={() => setDeleteUsr(true)}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Si
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletePublications;

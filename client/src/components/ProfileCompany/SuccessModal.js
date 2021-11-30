import React from "react";

const SuccessModal = ({handleClick}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-dark btn-outline-light"
        data-bs-toggle="modal"
        data-bs-target="#Succ"
        onClick={handleClick}
      >
        Guardar Cambios
      </button>

      <div
        className="modal fade"
        id="Succ"
        tabIndex="-1"
        aria-labelledby="SuccLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="SuccLabel">
                
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Cambios guardados con exito</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;

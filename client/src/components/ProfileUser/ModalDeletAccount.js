import React from "react";

const ModalDeletAccount = ({ infoUser, handleDelete }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteaccount"
      >
        Borra Tu Cuenta
      </button>

      <div
        className="modal fade"
        id="deleteaccount"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteaccountLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteaccountLabel">
                Eliminar Cuenta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Estas seguro que deseas eliminar tu cuenta? esto no se podra
              revertir y perderas todos los datos.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-block btn-outline-dark"
                data-bs-dismiss="modal"
              >
                No Eliminar
              </button>
              <button
                onClick={() => handleDelete(infoUser)}
                type="button"
                className="btn btn-block btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Si Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeletAccount;

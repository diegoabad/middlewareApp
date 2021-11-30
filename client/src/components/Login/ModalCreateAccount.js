import React from "react";

const ModalCreateAccount = ({ handleClickCreate, name, email, password }) => {
  return (
    <>
      <button
        type="button"
        onClick={handleClickCreate}
        className="btn btn-block btn-outline-light"
        data-bs-toggle="modal"
        data-bs-target={name&&email&&password&&"#staticBackdrop"}
      >
        Crea una Cuenta
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-black">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Validación de tu Cuenta
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Enviamos un correo a tu email </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Voy a me Email
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateAccount;

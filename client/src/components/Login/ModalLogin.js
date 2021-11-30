import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ModalLogin = ({ email, setEmail }) => {
   const auth = getAuth();
  const resetEmail = () => {
      if(email !== ''){
         console.log('email enviado');
      }
  };

  return (
    <div className=''>
      <span
        className=" forgot-text d-inline mt-1 text-secondary "
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Olvidaste tu contraseña?
      </span>
      <div
        className="modal  fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-2"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-black" id="staticBackdropLabel">
                Reestablecer Contraseña
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-black">
              Para reestablecer tu contraseña, enviaremos un email a tu cuenta
              de correo
            </div>

            <input
              placeholder="Escribe tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control w-100"
              required
            />

            <div className="modal-footer">

              <button
                  onClick={() => sendPasswordResetEmail(auth, email)}
               //  onClick={resetEmail}
                type="button"
                className="btn btn-block btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Enviar Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;

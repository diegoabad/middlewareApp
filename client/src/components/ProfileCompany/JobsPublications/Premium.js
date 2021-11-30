import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPlanMercado } from "../../../redux/actions";

const Premium = ({ infoJobs }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [plan, setPlan] = useState("free1");

  function handlePlan(e) {
    setPlan(e.target.value);
  }
  function handlePayment() {
    if (plan !== "free") {
      dispatch(setPlanMercado(plan));
      history.push(`/mercadopago/${infoJobs._id}`);
    }
  }

  return (
    <>
      <button
        type="button"
        className={"btn btn-block btn-dark btn-outline-light"}
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Cambia el posicionamiento
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Elige tu plan para mejorar el posicionamiento:
              </h5>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="aflexRadioDefault"
                  id="aflexRadioDefault1"
                  value="free"
                  onClick={handlePlan}
                />
                <label
                  className="form-check-label"
                  htmlFor="aflexRadioDefault1"
                >
                  FREE $0
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="aflexRadioDefault"
                  id="aflexRadioDefault2"
                  value="standard"
                  onClick={handlePlan}
                />
                <label
                  className="form-check-label"
                  htmlFor="aflexRadioDefault2"
                >
                  STANDARD $600
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="aflexRadioDefault"
                  id="aflexRadioDefault3"
                  value="premium"
                  onClick={handlePlan}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  PREMIUM $900
                </label>
              </div>
            </div>
            <div className="modal-footer">
              {plan === "free1" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handlePayment}
                  disabled
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handlePayment}
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;

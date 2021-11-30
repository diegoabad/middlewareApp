import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePictureProfileAction } from "../../redux/actions";

const ChangePicture = ({ setInfoUser }) => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  // const { user } = useSelector((state) => state);

  const handleChangePicture = (e) => {
    const picture = e.target.files[0];
    setPicture(picture);
  };
  const handlePictureClick = () => {
    if (picture) {
      setInfoUser((info) => ({
        ...info,
        infoUserChanged: true,
      }));
      dispatch(changePictureProfileAction(picture));
    }
  };

  return (
    <>
      <div className="height-10 d-flex mt-2 justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#picture"
        >
          Upload
        </button>
      </div>
      <div
        className="modal fade"
        id="picture"
        tabIndex="-1"
        aria-labelledby="pictureLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pictureLabel">
                Subiendo Foto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="body-desc">
                Porfavor utiliza los siguientes formatos JPG, GIF o PNG.
              </p>
              <div className="photo-input">
                <input
                  type="file"
                  id="loadFile"
                  onChange={handleChangePicture}
                />
                <button
                  className="btn mt-3 btn-sm btn-primary"
                  onClick={handlePictureClick}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Elegir archivo
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <p className="footer-title">
                Si estas teniendo un problema, porfavor intenta con otra foto
                mas chica
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePicture;

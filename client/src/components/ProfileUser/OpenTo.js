import React from "react";

const OpenTo = ({ editValue, infoUser, setInfoUser }) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-3">
        <h6 className="mb-0">Open to </h6>
      </div>
      <div className="col-sm-9 text-secondary">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="Relocate"
            disabled={editValue}
            onChange={() =>
              setInfoUser((info) => ({
                ...info,
                openToRelocate: !info.openToRelocate,
                infoUserChanged: true,
              }))
            }
            checked={infoUser.openToRelocate}
            value={infoUser.openToRelocate}
          />
          <label className="form-check-label" htmlFor="Relocate">
            Relocate
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="Remote"
            disabled={editValue}
            checked={infoUser.openToRemote}
            value={infoUser.openToRemote}
            onChange={() =>
              setInfoUser((info) => ({
                ...info,
                openToRemote: !info.openToRemote,
                infoUserChanged: true,
              }))
            }
          />
          <label className="form-check-label" htmlFor="Remote">
            Remote
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="FullTime"
            checked={infoUser.openToFullTime}
            value={infoUser.openToFullTime}
            disabled={editValue}
            onChange={() =>
              setInfoUser((info) => ({
                ...info,
                openToFullTime: !info.openToFullTime,
                infoUserChanged: true,
              }))
            }
          />
          <label className="form-check-label" htmlFor="FullTime">
            Full Time
          </label>
        </div>
      </div>
    </div>
  );
};

export default OpenTo;

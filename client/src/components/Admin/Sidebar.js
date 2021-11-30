import React from "react";

const Sidebar = ({ setShow, show, logout }) => {
  return (
    <div
      className="d-flex sticky-top flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "300px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        {/* <svg className="bi me-2" width="40" height="32">
        </svg> */}
        <span className="fs-4">Panel admin</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            onClick={() => setShow("")}
            className={`nav-link btn	text-start text-white ${
              show === "" && "active"
            }`}
          >
            <i className="fa fa-home"></i>
            <span className="ms-2">Home</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setShow("juniors")}
            className={`nav-link btn	text-start text-white ${
              show === "juniors" && "active"
            }`}
          >
            <i className="fa fa-dashboard"></i>
            <span className="ms-2">Juniors</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setShow("company")}
            className={`nav-link btn text-start text-white ${
              show === "company" && "active"
            }`}
          >
            <i className="fa fa-first-order"></i>
            <span className="ms-2">Companias</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setShow("publications")}
            className={`nav-link btn text-start text-white ${
              show === "publications" && "active"
            }`}
          >
            <i className="fa fa-cog"></i>
            <span className="ms-2">Publicaciones</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => setShow("jobs")}
            className={`nav-link btn text-start text-white ${
              show === "jobs" && "active"
            }`}
          >
            <i className="fa fa-bookmark"></i>
            <span className="ms-2">Empleos</span>
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong> Admin </strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="/createpublications">
              Nueva Publicacion
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={logout}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

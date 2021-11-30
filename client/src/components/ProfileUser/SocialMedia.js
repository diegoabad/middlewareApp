import { useState } from "react";

const SocialMedia = ({ infoUser, setInfoUser }) => {
  const handleChange = (e) => {
    setInfoUser((info) => ({
      ...info,
      [e.target.name]: e.target.value,
      infoUserChanged: true,
    }));
  };
  const [editValue, setEditValue] = useState(true);

  return (
    <div className="card">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 className="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-globe me-2 icon-inline"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Website
            </h6>
            <input
              className={`form-control mt-1 ${!editValue && "green-shadow"}`}
              type="text"
              value={infoUser.website}
              placeholder="https://yourportfolio.com"
              onChange={handleChange}
              name="website"
              disabled={editValue}
            />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 className="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-github me-2 icon-inline"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Github
            </h6>
            <input
              className={`form-control mt-1 ${!editValue && "green-shadow"}`}
              type="text"
              value={infoUser.github}
              placeholder="https://github.com"
              onChange={handleChange}
              name="github"
              disabled={editValue}
            />
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 className="mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-linkedin me-2 icon-inline text-primary"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              LinkedIn
            </h6>
            <input
              className={`form-control mt-1 ${!editValue && "green-shadow"}`}
              type="text"
              value={infoUser.linkedin}
              placeholder="http://www.linkedin.com"
              onChange={handleChange}
              name="linkedin"
              disabled={editValue}
            />
          </li>
        </ul>
        <button
          className="btn btn-outline-dark mt-3 px-4"
          onClick={() => setEditValue((d) => !d)}
        >
          {editValue ? "editar" : "aceptar"}
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;

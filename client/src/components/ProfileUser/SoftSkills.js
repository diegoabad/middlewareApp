// import React from "react";
import { useSelector } from "react-redux";

const Softskills = ({ setInfoUser, infoUser }) => {
  const { softskills } = useSelector((state) => state);

  const handleSelectsoftskills = (tech) => {
    setInfoUser((r) => {
      if (!r.softskills.length === 0)
        return { ...r, infoUserChanged: true, softskills: [tech] };
      if (!r.softskills.includes(tech)) {
        return {
          ...r,
          infoUserChanged: true,
          softskills: [...r.softskills, tech],
        };
      } else {
        const filter = r.softskills.filter((c) => c._id !== tech._id);
        return { ...r, infoUserChanged: true, softskills: filter };
      }
    });
  };
  return (
    <>
      {softskills &&
        softskills.map((soft, i) => (
          <span key={i}>
            <input
              style={{ focus: "none" }}
              type="checkbox"
              className="btn-check btn-checkbox-focus"
              id={soft._id}
            />
            <label
              className="btn btn-outline-dark m-1 btn-checkbox-focus"
              htmlFor={soft._id}
              style={{ padding: "1px 5px" }}
              onClick={() => handleSelectsoftskills(soft)}
            >
              {soft.name}
            </label>
          </span>
        ))}
    </>
  );
};

export default Softskills;

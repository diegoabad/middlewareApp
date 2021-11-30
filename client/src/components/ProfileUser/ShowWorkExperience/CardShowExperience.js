import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putJuniors } from "../../../redux/actions";
import ShowWorkExperience from "./ShowWorkExperience";

const CardShowExperience = ({ infoUser, setWorkExperience, setInfoUser }) => {
  const dispatch = useDispatch();
  const [updateInfo, setUpdateInfo] = useState(false)
  const handleDelete = (id) => {
    setInfoUser((info) => ({
      ...info,
      jobsExperience: info.jobsExperience.filter((j) => j._id !== id),
    }));
    setUpdateInfo(true)
  };
  useEffect(() => {
   if (updateInfo) {
      dispatch(putJuniors(infoUser, infoUser.idUser));
      setUpdateInfo(false)
    }
  }, [updateInfo]);
  return (
    <div className="card">
      <h5 className="text-center">Tus experiencias laborales</h5>
      <div className="card-body">
        {infoUser.jobsExperience.map((job) => (
          <div key={job._id}>
            <ShowWorkExperience
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              setWorkExperience={setWorkExperience}
              job={job}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardShowExperience;

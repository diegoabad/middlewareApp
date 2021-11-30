import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { putJuniors } from "../../../redux/actions";
import ShowAcademicExperience from "./ShowAcademicExperience";


const CardShowAcademicExperience = ({infoUser, setAcademicHistory, setInfoUser}) => {
   const dispatch = useDispatch();
  const [updateInfo, setUpdateInfo] = useState(false)
  const handleDelete = (id) => {
   setUpdateInfo(true)
   setInfoUser((info) => ({
     ...info,
     academicHistory: info.academicHistory.filter((j) => j._id !== id)
   }));
 };
 useEffect(() => {
   if (updateInfo) {
     console.log('delete');
     dispatch(putJuniors(infoUser, infoUser.idUser));
     setUpdateInfo(false)
   }
 }, [updateInfo]);
  return (
    <div className="card">
       <h5 className='text-center'>Tu formacion académica</h5>
      <div className="card-body">
         {infoUser.academicHistory.map(acad=>(
            <div key={acad._id}>
               <ShowAcademicExperience handleDelete={handleDelete} setInfoUser={setInfoUser} infoUser={infoUser} setAcademicHistory={setAcademicHistory} acad={acad}  />
            </div>
         ))}
      </div>
    </div>
  );
};

export default CardShowAcademicExperience;

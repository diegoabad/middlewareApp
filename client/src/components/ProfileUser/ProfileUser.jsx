import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./helper.css";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  putJuniors,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import LeftData from "./LeftData";
import PersonalData from "./PersonalData";
import CareerData from "./CareerData";
import NavBar from "../NavBar/NavBar";
import JobsExperience from "./JobsExperience/JobsExperience";
import AcademicHistory from "./AcademicHistory/AcademicHistory";

const ProfileUser = () => {
  const { user, languages, technologies } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const [workExperience, setWorkExperience] = useState({
    companyName: "",
    industry: "",
    workPosition: "",
    workingTime: "",
    _id: "",
    edit: false,
  });
  const [academicHistory, setAcademicHistory] = useState({
    institute: "",
    title: "",
    date: "", //ver que onda con el tema de la fecha
    description: "",
    _id: "",
    edit: false,
  });
  const [infoUser, setInfoUser] = useState({
    name: "",
    gmail: "",
    details: "",
    github: "",
    linkedin: "https://linkedin.com/",
    website: "",
    phone: "",
    city: "",
    photography: "",
    publications: [],
    languages: [],
    technologies: [],
    title: "",
    jobsExperience: [],
    softskills: [],
    idUser: "",
    infoUserChanged: false,
    openToRelocate: false,
    openToRemote: false,
    openToFullTime: false,
    academicHistory: [],
    postulationsJobs: [],
  });
  useEffect(() => {
    if (user) {
      setInfoUser({
        idUser: user.idFireBase,
        name: user.name,
        gmail: user.gmail,
        photograph: user.photograph,
        description: user.description,
        languages: user.languages,
        technologies: user.technologies,
        publications: user.publications,
        softskills: user.softskills,
        openToRelocate: user.openToRelocate,
        openToRemote: user.openToRemote,
        openToFullTime: user.openToFullTime,
        postulationsJobs: user.postulationsJobs,
        jobsExperience: user.jobsExperience,
        academicHistory: user.academicHistory,
        phone: user.phone,
        github: user.github||'',
        website: user.website||'',
        city: user.city,
        title: user.title || "",
        linkedin: user.linkedin||'',
      });
    }

    if (languages.length > 0 && technologies.length > 0) return;
    dispatch(getLanguages());
    dispatch(getTechnologies());
  }, [user]);

  // useEffect(() => {
  //   if (infoUser.infoUserChanged) {
  //     console.log("hubo cambio");
  //   }
  // }, [infoUser]);
  
  useEffect(() => {
    dispatch(getUserAction(user));
  }, []);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const handleClick = () => {
    dispatch(putJuniors(infoUser, infoUser.idUser));
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: false,
    }));
  };

  return  (
    <div>
      <NavBar />

      <div className="container mt-3">
        <div className="main-body">
          <div className="row">
            {infoUser.infoUserChanged && (
              <button
                className="btn btn-block btn-dark btn-outline-light"
                type="button"
                onClick={handleClick}
              >
                Guardar cambios
              </button>
            )}
            <LeftData
              setWorkExperience={setWorkExperience}
              setAcademicHistory={setAcademicHistory}
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              user={user}
            />
            <div className="col-lg-8">
              <PersonalData setInfoUser={setInfoUser} infoUser={infoUser} />
              <CareerData setInfoUser={setInfoUser} infoUser={infoUser} />
              <JobsExperience
                workExperience={workExperience}
                setWorkExperience={setWorkExperience}
                setInfoUser={setInfoUser}
                infoUser={infoUser}
              />
              <AcademicHistory
                academicHistory={academicHistory}
                setAcademicHistory={setAcademicHistory}
                setInfoUser={setInfoUser}
                infoUser={infoUser}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  ) 
};

export default ProfileUser;

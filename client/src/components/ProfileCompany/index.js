import { useState, useEffect } from "react";
import LeftData from "./LeftData";
import PersonalData from "./PersonalData";
import JobsPublications from "./JobsPublications/JobsPublications";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getLanguages,
  getTechnologies,
  getUserAction,
  editCompanyDataAction,
} from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Mapa from "../Mapa/Mapa";
import SuccessModal from "./SuccessModal";
const ProfileCompany = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      console.log('onauthstate');
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const [markers, setMarkers] = useState([]); //mapa
  useEffect(() => {
    if (markers.length > 0) {
      setInfoUser((info) => ({
        ...info,
        latitude: markers[0].lat,
        longitude: markers[0].lng,
      }));
    }
  }, [markers]);

  const { user, languages, technologies } = useSelector((state) => state);
  const [infoUser, setInfoUser] = useState({
    idFireBase: "",
    name: "",
    webpage: "",
    gmail: "",
    description: "",
    photograph: "",
    country: "",
    city: "",
    linkedin: "",
    latitude: "",
    longitude: "",
    publications: [],
    jobs: [],
    technologies: [],
    infoUserChanged:false,
    _id: "",
  });
  useEffect(() => {
    if (user) {
      setInfoUser({
        idFireBase: user.idFireBase,
        name: user.name,
        webpage: user.webpage,
        gmail: user.gmail,
        description: user.description,
        photograph: user.photograph,
        country: user.country,
        city: user.city,
        linkedin: user.linkedin,
        latitude: user.latitude,
        longitude: user.longitude,
        publications: user.publications,
        jobs: user.jobs,
        technologies: user.technologies,
        _id: user._id,
      });
      setMarkers([
        {
          lat: user.latitude,
          lng: user.longitude,
        },
      ]);
    }
    if (languages.length > 0 && technologies.length > 0) return;
    dispatch(getLanguages());
    dispatch(getTechnologies());
  }, [user]);

  useEffect(() => {
    if(!user)return
    console.log('userefft');
    dispatch(getUserAction(user));
  }, []);
  
  //en cada edicion de datos tiene que viajar a la db
  const handleClick = () => {
    dispatch(editCompanyDataAction(infoUser));
    setInfoUser((info) => ({
      ...info,
      infoUserChanged: false,
    }));
  };

  return  (
    <>
      <NavBar />
      <div className="container mt-3">
        <div className="main-body">
          <div className="row">
            {infoUser.infoUserChanged && (
              <SuccessModal handleClick={handleClick} />
            )}
            {/* <LeftData
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              user={user}
            /> */}

            <PersonalData
              user={user}
              setInfoUser={setInfoUser}
              infoUser={infoUser}
            />
            {/* <CareerData setInfoUser={setInfoUser} infoUser={infoUser} /> */}
            <div className="card">
              <h5 className="text-center">Selecciona tu ubicación </h5>
              <div className="card-body">
                <div className="accordion">
                  <Mapa
                    setInfoUser={setInfoUser}
                    markers={markers}
                    setMarkers={setMarkers}
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <h5 className="text-center">Tus publicaciones de trabajo </h5>
              <div className="card-body">
                <div className="accordion">
                  {infoUser.jobs.length > 0 &&
                    infoUser.jobs.map((job, i) => (
                      <div key={i}>
                        <JobsPublications
                          job={job}
                          setInfoUser={setInfoUser}
                          infoUser={infoUser}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
};

export default ProfileCompany;

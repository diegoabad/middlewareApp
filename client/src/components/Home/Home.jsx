import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {
  getJuniors,
  getCompanies,
  getTechnologies,

} from "../../redux/actions";
import tokenAuth from "../config/token";

import {
  getUserAction,

} from "../../redux/actions";

import { Search } from "../Search/Search";
import NavBar from "../NavBar/NavBar";
import { CardsCompanies } from "../CardsCompanies/CardsCompanies";
import { CardsJuniors } from "../CardsJuniors/CardsJuniors";
import CardsJobs from "../CardsJobs/CardsJobs";
import "./Home.css";
import { Publications } from "../Publications/Publications";
import Mapa from "../MapaGeneral/Mapa";

const Home = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (token && user) {
      tokenAuth(token);
      dispatch(getTechnologies());
      if (user.userType === "juniors") dispatch(getCompanies());
      if (user.userType === "companies") dispatch(getJuniors());
    }
  }, [user]);
  

  useEffect(() => {
    if (userType === "null") history.push("/");
  }, []);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user && userFirebase.emailVerified) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push(`/`);
    }
  });
  const { tipo } = useParams();
  const companies = useSelector((state) => state.companies);
  const juniors = useSelector((state) => state.juniors);

  const jobs = useSelector((state) => state.jobs.filterData);
  
  let [page, setPage] = useState(0);
  
   const pagination = () => {
    if (juniors.length) return juniors.slice(page, page + 9);
    if (juniors.info) return juniors;
    if (companies.length) return companies.slice(page, page + 9);
    if (companies.info) return companies;
    return [];
    
     
   };
   const array = pagination();
   const nextPage = () => {
     if (companies.length > page + 9) {
       setPage(page + 9);
     }
     if (juniors.length > page + 9) {
      setPage(page + 9);
    }
   };
   const previusPage = () => {
     if (page > 0) {
       setPage(page - 9);
     }
   };

  return (
    <div className="">
      <NavBar />
     
      <div className="">
        <div className="">{tipo && tipo === "empleos" && <Search />}</div>
        <div className="">
          <div className="">
            <div className="">
              {tipo && tipo === "companies" && (
                <CardsCompanies arrayCompanies={array} />
              )}
              {tipo && tipo === "empleos" && <CardsJobs jobs={jobs} />}
              {tipo && tipo === "juniors" && (
                <CardsJuniors arrayJuniors={array} />
              )}
              {tipo && tipo === "publications" && <Publications />}
              {/*{tipo && tipo === "mapa" && <Mapa />}*/}
              {tipo && tipo === "mapa" &&
                <div className="card">
                  <div className="card-body">
                    <div className="accordion">
                      <Mapa />
                    </div>
                  </div>
                </div>
              }
              {/*   <CardsJobs jobs={jobs} /> */}
              
              {tipo && (tipo === "companies" || tipo === "juniors") && 
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-block btn-dark btn-outline-light"
                  onClick={previusPage}
                >
                  &laquo; Anterior
                </button>
                <button
                  type="button"
                  className="btn btn-block btn-dark btn-outline-light"
                  onClick={nextPage}
                >
                  Próximo &raquo;
                </button>
              </div>
              }
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Home;


import { useState } from "react";
import AdminHomeCompany from "./AdminCompani/AdminHomeCompany";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import {
  logOutUserAction,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router";
import "./Admin.css";
import AdminHomeJuniors from "./AdminJuniors/AdminHomeJuniors";
import AdminPublications from "./AdminPublications/AdminPublications";
import AdminJobs from "./AdminJobs/AdminJobs";
import AdminHomeCharts from "./AdminHomeCharts";

const AdminHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState("");
  const logout = () => {
    dispatch(logOutUserAction());
  };
  // const token = localStorage.getItem("token");
  onAuthStateChanged(auth, (userFirebase) => {
    if (!userFirebase) {
      history.push("/admin");
    } 
  });

  // useEffect(() => {
  // dispatch(getCompanies());
  // dispatch(getJuniors());
  // dispatch(getJobs());
  // dispatch(getPublications());

  // }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 ">
          <Sidebar logout={logout} show={show} setShow={setShow} />
        </div>
        <div className="col-md-9">
          {show === "" && <AdminHomeCharts />}
          {show === "juniors" && <AdminHomeJuniors />}
          {show === "company" && <AdminHomeCompany />}
          {show === "publications" && <AdminPublications />}
          {show === "jobs" && <AdminJobs />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

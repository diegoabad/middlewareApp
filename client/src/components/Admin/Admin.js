import { useState } from "react";
import { useDispatch } from "react-redux";
import { singinAdminAction } from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import SingIn from "./SingIn";


const Admin = () => {
  const history = useHistory()
  const [email, setEmail] = useState("info.middlewareapp@gmail.com");
  const [password, setPassword] = useState("appfinalhenry");
  const dispatch = useDispatch();
  const handleClickSingin = () => {
    if(email.trim()===''||password.trim()==='')return
    dispatch(singinAdminAction(email, password))
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      history.push('/admin/home')
    } 
  });




  return (
    <div className="container ">
      <div className="row g-0 pt-5">
        <div className="col-md-6">
          <div className="form-img"></div>
        </div>
        <div className="col-md-6  text-white">
          <div className="bg-dark   p-5 h-100">
            <div className="text-center pb-4">
              <span className="  main-heading ">Bienvenido admin</span>
            </div>
            <div className="p-3 ">
              {" "}
              <SingIn
                setEmail={setEmail}
                setPassword={setPassword}
                email={email}
                password={password}
              />
              <hr className="mt-5" />
              <div className="text-center pt-5">
                <button
                  onClick={handleClickSingin}
                  className="  btn btn-block btn-outline-light"
                >
                  Inicia sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import tokenAuth from "./components/config/token";
import CompanyDetail from "./components/CompanyDetails/CompanyDetails";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import JobsDetails from "./components/JobsDetails/JobsDetails";
//import Publications from './components/Publications/Publications';
import { useEffect } from "react";
import JuniorsDetail from "./components/JuniorsDetails/JuniorsDetails";
import CreatePublications from "./components/CreatePublications/CreatePublications";
import ProfileCompany from "./components/ProfileCompany";
import Socket from './components/socket.js';
import Chat from './components/Chat/Chat2.jsx';
import Admin from "./components/Admin/Admin";
import AdminHome from "./components/Admin/AdminHome";
import Notifications from "./components/Notifications/Notifications";
import MercadoPago from './components/Mercadopago/mercadopago';
import DetailsPublication from './components/DetailsPublication/index.jsx';

function App() {

  useEffect(()=>{

    Socket.emit('conectado', "new new connection")
  }, [])

  //   const { user } = useSelector((state) => state);
  //   const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      tokenAuth(token);
    }
  }, [token]);
  //   useEffect(() => {
  //     if (!user) history.push("/");
  //   }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login/:type" component={Login} />
        <Route path="/home/:tipo" component={Home} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/profileuser/:id" component={ProfileUser} />
        <Route exact path="/profilecompany/:id" component={ProfileCompany} />
        <Route exact path="/jobs/:id" component={JobsDetails} />
        <Route path="/companies/:id" component={CompanyDetail} />
        <Route path="/empleos/:id" component={JobsDetails} />

        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/home" component={AdminHome} />
        {/* <Route exact path="/admin/home/juniors" component={AdminHomeJuniors} /> */}
        <Route
          exact
          path="/createpublications"
          component={CreatePublications}
        />

				<Route path='/juniors/:id' component={JuniorsDetail} />
				<Route path='/chat' component={Chat} />
        <Route path='/notifications' component={Notifications} />
        <Route path='/mercadopago/:idJob' component={MercadoPago} />
        <Route path='/DetailsPublication/:id' component={DetailsPublication} />
				{/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
			</Switch>
		</Router>
	);
}

export default App;
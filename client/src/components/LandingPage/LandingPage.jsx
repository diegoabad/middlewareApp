import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginImage from "./image.png";
import Image from "./image2.jpg"

import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getUserAction } from "../../redux/actions";
import Error from "../Login/Error";

export default function LandingPage() {
  const { user, errorLogin } = useSelector((state) => state);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user && userFirebase.emailVerified)
        dispatch(getUserAction(userFirebase));
    }
  });

  return (
    <div className="langing mt-5">
      <div className="container">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-md-1">
          <div className="container">
            <a className="navbar-brand" href="#">Middleware</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="mx-auto"></div>
              <ul className="navbar-nav">

                <li className="nav-item">
                  <a className="nav-link text-white" href="#row-servicios">Servicios</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#row-nosotros">Sobre nosotros</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white" href="#row-contacto">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="d-flex flex-column justify-content-center h-100">
              <h1 className="d-md-block d-none">Middleware</h1>
              <h2 className="d-md-none">Middleware</h2>
              <h5>Un puente entre empresas y programadores</h5>
              {user ? (
                user.userType === "juniors" ? (
                  <Link
                    className="btn btn-block btn-dark btn-outline-light me-2"
                    to="/login/juniors"
                  >
                    Programador Jr
                  </Link>
                ) : (
                  <Link
                    className="btn btn-block btn-dark btn-outline-light"
                    to="/login/companies"
                  >
                    Empresa
                  </Link>
                )
              ) : (
                <div>
                  <Link
                    className="btn btn-block btn-dark btn-outline-light me-2"
                    to="/login/juniors"
                  >
                    Programador Jr
                  </Link>
                  <Link
                    className="btn btn-block btn-dark btn-outline-light"
                    to="/login/companies"
                  >
                    Empresa
                  </Link>
                </div>
              )}
              {errorLogin && (
                <div className="mt-3">
                  <Error msg={errorLogin} />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12  d-none d-sm-block">
            <img
              src={LoginImage}
              alt="Login Image"
              className={` ${styles.loginImage}`}
            />
          </div>
        </div>



        <div className="row" id="row-servicios">
          <div className="col-lg-12 text-center">
            <h2 className="display-4">Servicios</h2>
          </div>


          <div className="row">

            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">

              <div className="card text-center">
                <i className="bi bi-chat-dots-fill fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="card-title">
                    <h5>Chat online</h5>
                  </div>

                  <div className="card-text">
                    <span>Tendrás acceso a un chat en linea, aumentando la satisfacción de lograr conectar Programador Jr/Empresa en tiempos más breves, agilizando el proceso de selección, y teniendo información adicional al instante.</span>
                  </div>
                </div>


              </div>

            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">

              <div className="card text-center">
                <i className="bi bi-geo-alt-fill fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>Mapa de geolocalización</h5>
                  </div>

                  <div className="card-text">
                    <span>Podrás visualizar un mapa, en la que podrás encontrar el perfil que estás buscando, así como también marcar tu ubicación para que sea más accesible geolocalizarte.</span>
                  </div>
                </div>
              </div>

            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">
                <i className="bi bi-file-earmark-person-fill fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>Perfil</h5>
                  </div>

                  <div className="card-text">
                    <span>Podrás editar tu perfil personal para hacer más completa tu presentación, podrás cargar tu imagen para brindar una identidad que permitirá potenciar la interacción entre usuarios.</span>
                  </div>

                </div>

              </div>
            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="bi bi-gem fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="title">
                    <h5>Perfil premium</h5>
                  </div>

                  <div className="text">
                    <span>Lo más atractivo de obtener una cuenta prémium de Middleware es que te habilitará posicionarte en las primeras búsquedas para que tu perfil sea mucho mas fácil y accesible de encontrar.</span>
                  </div>
                </div>

              </div>
            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="bi bi-check-circle-fill fa-3x" aria-hidden="true"></i>
                <div className="card-body">
                  <div className="card-title">
                    <h5>Notificaciones</h5>
                  </div>

                  <div className="card-text">
                    <span>En cada postulación de empleo que realices, te llegará a ti un correo de confirmación de dicha postulación, y le llegará una notificación a la empresa del empleo al cual te postulaste.</span>
                  </div>
                </div>
              </div>
            </div>





            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card text-center">

                <i className="bi bi-lightbulb-fill fa-3x" aria-hidden="true"></i>
                <div className="card-body">

                  <div className="card-title">
                    <h5>No pierdas más tiempo</h5>
                  </div>

                  <div className="card-text">
                    <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>


        </div>
        <div className="row" id="row-nosotros">
          <div className="col-sx-12 text-center d-sm-none">
            <h2 className="display-4">Sobre nosotros</h2>
          </div>
          <div className="col-xs-12 d-sm-none">
            <div className="card text-center">




              <div className="card-body" >
                <div className="card-text">
                  <h4>Bienvenidos a MIDDLEWARE </h4>
                  <p>Somos un equipo que nació en Latinoamérica, algunos en Venezuela otros en Argentina. Nos encontramos en diferentes partes del pais y a pesar de las distancias y gracias a las distancias comenzamos esta función puente...Sabemos que la
                    mayor parte del talento del mundo se desperdicia porque nunca se expone a las oportunidades correctas . Sin ir más lejos, solo el 3% de los datos en LinkedIn obtienen el trabajo de sus sueños en esa aplicación. Es demasiado extensa. Sabemos que el reclutamiento y la contratación es demasiado serio al punto que puede llevar meses contratar al mejor talento y aún así, jamás sabes si lo contratas. En Middleware somos ese puente, esa conexión necesaria para que nuestros talentos y las empresas de todo el mundo que saben que ya no están limitados a q sus empleados estén en su zona que pueden contribuir remoto. Pueden encontrarse muy fácilmente. Nos enfocamos en juniors y en trainees que sabemos que son los mejores en su área.
                    . De la misma manera que puedes hacer una búsqueda en Google para encontrar la información que estás buscando, en un futuro no muy lejano habrá redes que emparejen el talento con las oportunidades y hacia alli va Middleware</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 text-center d-sm-block d-none">
            <h2 className="display-4">Sobre nosotros</h2>
          </div>
          <div className="col-sm-12 col-xs-12 text-center d-sm-block d-none">
            <div className="card">
              <div className="fade-out-right text-center" >
                <div className="row g-0 ">
                  <div className="col">

                    <img
                      src={Image}
                      alt="Login Image"
                      className="img-fluid rounded-start"
                    />

                  </div>
                  <div className="col-md-8" >
                    <div className="card-body" >

                      <h4>Bienvenidos a MIDDLEWARE </h4>
                      <p>Somos un equipo que nació en Latinoamérica, algunos en Venezuela otros en Argentina. Nos encontramos en diferentes partes del pais y a pesar de las distancias y gracias a las distancias comenzamos esta función puente...Sabemos que la
                        mayor parte del talento del mundo se desperdicia porque nunca se expone a las oportunidades correctas . Sin ir más lejos, solo el 3% de los datos en LinkedIn obtienen el trabajo de sus sueños en esa aplicación. Es demasiado extensa. Sabemos que el reclutamiento y la contratación es demasiado serio al punto que puede llevar meses contratar al mejor talento y aún así, jamás sabes si lo contratas. En Middleware somos ese puente, esa conexión necesaria para que nuestros talentos y las empresas de todo el mundo que saben que ya no están limitados a q sus empleados estén en su zona que pueden contribuir remoto. Pueden encontrarse muy fácilmente. Nos enfocamos en juniors y en trainees que sabemos que son los mejores en su área.
                        . De la misma manera que puedes hacer una búsqueda en Google para encontrar la información que estás buscando, en un futuro no muy lejano habrá redes que emparejen el talento con las oportunidades y hacia alli va Middleware</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="" id="row-contacto">
        <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 mt-5">
          <div className="container text-center">
            <small>Contacto con los administradores de MIDDLEWARE a traves de este correo: info.MiddlewareApp@gmail.com</small>
          </div>

        </footer>
      </div >
    </div >
  );
}

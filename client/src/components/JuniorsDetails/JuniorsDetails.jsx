import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getJuniorsDetails,
  putNotification,
  getUserAction,
} from "../../redux/actions";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import NavBar from "../NavBar/NavBar";
import Socket from "../socket.js";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import tokenAuth from "../config/token";

export default function JuniorsDetail() {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      tokenAuth(token);
      dispatch(getJuniorsDetails(id));
    }
  }, [user]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getJuniorsDetails(id));
  //   console.log(juniors);
  // }, [id]);

  const juniors = useSelector((state) => state.juniorsdetails);

  const [message, setMessage] = useState({});
  var [state, setState] = useState({
    messages: [],
    owners: null,
    ownersNames: null,
    img: null,
  });
  var [idChat, setIdChat] = useState("");
  var [currentIdChat, setCurrentIdChat] = useState("");
  // var [onejunior, setOnejunior] = useState('')

  async function generateChat() {
    let idtemporal =
      juniors._id < user._id ? juniors._id + user._id : user._id + juniors._id;
    setCurrentIdChat(
      juniors._id < user._id ? juniors._id + user._id : user._id + juniors._id
    );

    if (idChat == "") {
      setIdChat(idtemporal);
    }

    const docRef = doc(db, "messages", idtemporal);
    const docSnap = await getDoc(docRef);

    setState({
      messages: docSnap.data() !== undefined ? docSnap.data().chat : [],
      owners: docSnap.data() !== undefined ? docSnap.data().owners : null,
      ownersNames:
        docSnap.data() !== undefined ? docSnap.data().ownersNames : null,
      img: docSnap.data() !== undefined ? docSnap.data().img : null,
    });
  }

  async function sendMessage() {
    try {
      if (idChat === currentIdChat) {
        var list = !state.messages ? [] : state.messages;
        list.push({
          id: !state.messages ? 0 : state.messages.length,
          text: message,
          from: user._id,
          to: juniors._id,
        });
      }

      if (idChat !== currentIdChat) {
        const docRef = doc(db, "messages", currentIdChat);
        const docSnap = await getDoc(docRef);

        setState({
          messages: docSnap.data() !== undefined ? docSnap.data().chat : [],
          owners: docSnap.data() !== undefined ? docSnap.data().owners : null,
          ownersNames:
            docSnap.data() !== undefined ? docSnap.data().ownersNames : null,
          img: docSnap.data() !== undefined ? docSnap.data().img : null,
        });

        var list = !state.messages ? [] : state.messages;

        list.push({
          id: !state.messages ? 0 : state.messages.length,
          text: message,
          from: user._id,
          to: juniors._id,
        });

        setIdChat(currentIdChat);
      }

      await setDoc(doc(db, "messages", currentIdChat), {
        owners:
          state.owners == null
            ? { user1: juniors._id, user2: user._id }
            : state.owners,
        chat: list,
        ownersNames:
          state.ownersNames == null
            ? { user1: juniors.name, user2: user.name }
            : state.ownersNames,
        img:
          state.img == null
            ? { user1: juniors.photograph, user2: user.photograph }
            : state.img,
      });

      dispatch(
        putNotification(juniors._id, user._id, 3, user.name, juniors.userType)
      );

      Socket.emit("notification", {
        typeNotification: 3,
        userName: user.name,
        _id: user._id,
        userPublicationId: juniors._id,
        userType: juniors.userType,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleOnChangeMessage(e) {
    setMessage(e.target.value);
  }

  return (
    <div>
      {/*  Modal  */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Nuevo mensaje
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label className="form-label">Escribe un mensaje</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => handleOnChangeMessage(e)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={sendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="row card ">
              <div className="col-12 bg-white p-0 px-3 py-3 mb-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={juniors.photograph}
                    alt="Imagen no encontrada"
                    className="img-rounded"
                    width="150px"
                    height="150px"
                  ></img>
                  <h3 className="mt-2">{juniors.name}</h3>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {juniors.title}
                  </h6>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-globe me-2 icon-inline"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    {juniors.website}
                  </h6>
                  <h6 className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {juniors.gmail}
                  </h6>
                  <h6 className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-github me-2 icon-inline"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    {juniors.github}
                  </h6>

                  <h6 className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Teléfono: {juniors.phone}
                  </h6>
                  <div className="text-center">
                    {user && user.userType == "companies" ? (
                      <button
                        type="button"
                        onClick={() => generateChat()}
                        type="button"
                        className="btn btn-block btn-dark btn-outline-light mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenter"
                      >
                        Enviar mensaje
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row card">
              <div className="col-12 bg-white p-0 px-3 py-3 mb-3">
                <div className="d-flex flex-column align-items-center">
                  <h3 className="fw-bold h4 mt-3">Tecnologías</h3>
                  <div className="fw-bold h4 mt-3">
                    {juniors.technologies?.map((tec) => (
                      <label className="btn border-bottom">{tec.name}</label>
                    ))}
                  </div>
                  <h3 className="fw-bold h4 mt-3">Idiomas</h3>
                  <div className="fw-bold h4 mt-3">
                    {juniors.languages?.map((lan) => (
                      <label className="btn border-bottom">{lan.name}</label>
                    ))}
                  </div>
                  {/* <div className="fw-bold h4 mt-3">
                  <h3 className="fw-bold h4 mt-3">Habilidades</h3>
                  {juniors.softskills?.map((soft) => (
                    <label
                      className="btn border-bottom"
                    >
                      {soft.name}
                    </label>
                  ))}
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

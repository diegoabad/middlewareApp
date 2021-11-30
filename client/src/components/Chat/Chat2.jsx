import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebaseConfig'
import { collection, getDocs, getDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux'
import "./chat.css"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import {
  getUserAction,
  changePicturePublications,
  resetPicturePublications,
  putNotification,
  deleteNotifications,
  deleteUserNotifications
} from "../../redux/actions";
import tokenAuth from "../config/token";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Socket from '../socket.js'


const Chat2 = () => {


  const user = useSelector(state => state.user)

  var [nameUser2, setNameUser2] = useState(null);

  var [message, setMessage] = useState('')
  var [state, setState] = useState({

    messages: [],
    owners: null,
    ownersNames: null,
    img: null
  })
  var [chat, setChat] = useState(null);
  var [idUser2, setIdUser2] = useState(null);
  var [loading, setLoading] = useState(false);
  var [idChat, setIdChat] = useState(false);
  var [cambio, setCambio] = useState(false);
  var [loadingImg, setLoadingImg] = useState(false);
  var [imgUser2, setImgUser2] = useState("");

  const publiImg = useSelector((state) => state.imgPublication);

  function onChangeState(e) {
    setMessage(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (message == '' && !publiImg) return alert("No puedes enviar un mensaje vacio")
    const list = !state.messages ? [] : state.messages
    const newMessage = {
      from: user._id,
      to: idUser2,
      id: !state.messages ? 0 : state.messages.length,
      text: message,
      img: publiImg
    }
    list.push(newMessage)
    setMessage('')

    // Envia los datos a la db
    try {

      await setDoc(doc(db, "messages", idChat), {
        chat: list,
        owners: state.owners,
        ownersNames: state.ownersNames,
        img: state.img
      });

      setCambio(true)

      dispatch(resetPicturePublications())

      // dispatch(putNotification(idUser2, user._id, 3, user.name, user.userType))

      Socket.emit('notification', {
        typeNotification: 3,
        userName: user.name,
        _id: user._id,
        userPublicationId: idUser2,
        userType: user.userType
      })

    }
    catch (err) {
      console.log(err.message)
    }
  }

  useEffect(()=>{
    dispatch(deleteUserNotifications())
  }, [])

  useEffect(()=>{

    if(user){
      dispatch(deleteNotifications(user?._id, "true"));
    }
  }, [user])

  if (idChat && cambio) {

    const unsub = onSnapshot(doc(db, "messages", idChat), (doc) => {
      setState({
        messages: (!doc.data() ? [] : doc.data().chat),
        owners: (!doc.data() ? null : doc.data().owners),
        ownersNames: (!doc.data() ? null : doc.data().ownersNames),
        img: (!doc.data() ? null : doc.data().img)
      })
    });

    setCambio(false)
  }

  async function getChat(chatId) {
    setLoading(true)

    const docRef = doc(db, "messages", chatId);
    const docSnap = await getDoc(docRef);

    setState({
      messages: (!docSnap.data() ? [] : docSnap.data().chat),
      owners: (!docSnap.data() ? null : docSnap.data().owners),
      ownersNames: (!docSnap.data() ? null : docSnap.data().ownersNames),
      img: (!docSnap.data() ? null : docSnap.data().img),
    })

    if (docSnap.data() !== undefined) {
      setImgUser2(docSnap.data().owners.user1 !== user._id ? docSnap.data().img.user1 : docSnap.data().img.user2)
      setNameUser2(docSnap.data().ownersNames.user1 !== user.name ? docSnap.data().ownersNames.user1 : docSnap.data().ownersNames.user2)
    }

    setLoading(false)
    setMessage('')
    setCambio(true)
  }

  useEffect(async () => {

    // Trae los datos de la db cundo se carga la pagina o el chat
    const querySnapshot = await getDocs(collection(db, "messages"));
    var arrChats = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      // console.log(doc.data().owners);

      if (doc.data().owners.user1 == (user ? user._id : null) || doc.data().owners.user2 == (user ? user._id : null)) {

        let { chat } = doc.data()

        arrChats.push({
          id: doc.id,
          chat: chat,
          owners: doc.data().owners,
          ownersNames: doc.data().ownersNames,
          img: doc.data().img,
        })
        setImgUser2(doc.data().img.user1 !== user._id ? doc.data().img.user1 : doc.data().img.user2)
      }
    });
    setChat(arrChats)

  }, [user]);


  //----------------Autenticacion-----------------

  const { emailVerification } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (token && user) {
      tokenAuth(token);
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
  //----------------Autenticacion-----------------
  async function publicationImg(e) {

    setLoadingImg(true)

    const picture = e.target.files[0]

    await dispatch(changePicturePublications(picture))



    setLoadingImg(false)
  }

  let refChat = useRef(null)

  useEffect(()=>{
    refChat.current.scrollIntoView({behavior: 'smooth'})
  })

  return (<>

    <NavBar />

    <div className="container">
      <div className="row clearfix ">
        <div className="col-lg-12 ls-12">

          <div className="card chat-card chat-app">
            <div id="plist" className="people-list h-100 container">
              <ul className="list-unstyled chat-list mt-2 mb-3">

                {
                  chat ? chat.map((e, i) =>

                    <li className="clearfix" key={i} onClick={() => { setIdUser2(e.owners.user1 !== user._id ? e.owners.user1 : e.owners.user2); getChat(e.id); setIdChat(e.id) }}>
                      <img src={e.owners.user1 !== user._id ? e.img.user1 : e.img.user2} />
                      <div className="about">

                        <div className="name">{e.ownersNames.user1 !== user.name ? e.ownersNames.user1 : e.ownersNames.user2}</div>

                      </div>
                    </li>


                  ) : <h5>Cargando...</h5>
                }

              </ul>
            </div>

            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <img src={imgUser2} alt="avatar" />
                    <div className="chat-about">
                      <h6 className="m-b-0">{nameUser2}</h6>
                    </div>
                  </div>
                </div>
              </div>


              <div className="chat-history container">
                <ul className="mb-3">

                  {
                    state.messages ? state.messages.map((e, i) => (

                      e.from == user._id

                        ? (e.img ? <li className="clearfix" key={i}><img className="imgMessage my-message float-right" src={e.img} alt="imagen" /></li> : <li className="clearfix" key={i}>
                          <div className="message other-message float-right">{e.text}</div>
                        </li>)

                        : (e.img ? <li><img className="imgMessage" src={e.img} alt="imagen" /></li> : <li className="clearfix" key={i}>
                          <div className="message my-message">{e.text}</div>
                        </li>)
                    )

                    ) : <h5>Cargando...</h5>
                  }
                  <div ref={refChat}></div>
                  {/*<li className="clearfix">
                    <div className="message-data">
                    <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">Are we meeting today?</div>
                    </li>
                    
                    <li className="clearfix">
                    <div className="message-data">
                    <span className="message-data-time">10:15 AM, Today</span>
                    </div>
                    <div className="message my-message">Project has been already finished and I have results to show you.</div>
                  </li>*/}

                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="chat-message clearfix">
                  <div className="d-flex">

                    <label className="custom-file-upload">

                      <input type="file" className="inputt" onChange={publicationImg} />
                      <i className="fa fa-cloud-upload"></i>
                    </label>

                    {
                      !loadingImg
                        ? <input type="text" className="form-control" value={message} placeholder="Escribe algo..." onChange={(e) => onChangeState(e)} />
                        : <input type="text" className="form-control" value={message} placeholder="Escribe algo..." disabled onChange={(e) => onChangeState(e)} />
                    }



                    {
                      !loadingImg
                        ? <button type="submit" className="input-group-text"><i className="fa fa-send"></i></button>
                        : <button type="submit" disabled className="input-group-text">Cargando imagen</button>
                    }


                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div >

  </>)
}

export default Chat2

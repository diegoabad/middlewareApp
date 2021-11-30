import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom'
import { auth } from "../../firebaseConfig";
import { getUserAction, deleteNotifications, setUserNotifications, resetUserNotifications } from '../../redux/actions';
import Socket from "../socket.js";
import './Notifications.css'
import { NavLink } from 'react-router-dom'



const Notifications = () => {
  const user = useSelector((state) => state.user);
  var [idUser, setIdUser] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [nameUser2, setNameUser2] = useState(null);
  const [idUser2, setIdUser2] = useState(null);
  const [idPublication, setIdPublication] = useState(null);
  const [userType, setUserType] = useState(null);
  const [typeNotificatoin, setTypeNotificatoin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSocket, setLoadingSocket] = useState(true);

  useEffect(() => {

    setTimeout(() => {

      setIdUser(user?._id)
    }, 500)

  }, [user])

  useEffect(() => {

    Socket.on(`${idUser}`, async (data) => {

      console.log("viene del socket", data.notifications)
      setLoadingSocket(false)
      dispatch(setUserNotifications(data.notifications))
    })
  }, [Socket, idUser])

  useEffect(() => {
    setNotifications(user?.notifications)
  }, [user])

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;

      dispatch(getUserAction(userFirebase));
    } else {
      history.push("/");
    }
  });

  const handleRead = () => {
    dispatch(deleteNotifications(user._id, "false"))
    dispatch(resetUserNotifications())
    setOpen(false);
  };

  return notifications ? (<>

    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal">
            </button>
          </div>
          <div className="modal-body d-flex flex-column">
            {
              typeNotificatoin
                ? <div></div>
                : <NavLink to={`/DetailsPublication/${idPublication}`}><button type="button" className="btn btn-secondary mb-1" data-bs-dismiss="modal">Ir a la publicación</button></NavLink>
            }

            {
              userType === 'juniors'
                ? <NavLink to={`/juniors/${idUser2}`}><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{`Ir al perfil de ${nameUser2}`}</button></NavLink>
                : <NavLink to={`/companies/${idUser2}`}><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{`Ir al perfil de ${nameUser2}`}</button></NavLink>
            }

          </div>
        </div>
      </div>
    </div>

    <div className='icons'>
      <div className='icon' onClick={() => setOpen(!open)}>
        <i className="biIcon bi-bell-fill"></i>
        {notifications.length > 0 &&
          <div className='counter'>{notifications.length}</div>
        }
      </div>

      {open && (

        <div className='notifications'>

          {
            notifications && notifications.map((el, i) =>
            (
              <div className="ulNotification" key={i}>

                {
                  el.typeNotification === 2 || el.typeNotification === 1
                    ? (el.typeNotification === 2
                      ? <div className="notification" key={i} onClick={() => { setNameUser2(el.userName); setIdUser2(el._id); setIdPublication(el.idPublication); setUserType(el.userType); setTypeNotificatoin(false) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{`A ${el.userName} Le gusta tu publicación`}</div>
                      : <div className="notification" key={i} onClick={() => { setNameUser2(el.userName); setIdUser2(el._id); setUserType(el.userType); setTypeNotificatoin(true) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{`${el.userName} Se postulo a tu empleo`}</div>)
                    : <NavLink to="/chat" key={i}><div className="notification">{`${el.userName} Te ha enviado un mensaje`}</div></NavLink>
                }

              </div>
            )

            )}

          <button className='nButton btn btn-outline-dark' onClick={handleRead}>Borrar notificaciones</button>
        </div>
      )}
    </div>
  </>) : ('...No hay notificaciones que mostrar')
}

export default Notifications;

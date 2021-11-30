import { Fragment, useEffect, useState } from "react";
import JuniorTR from "./JuniorTR";
import { useDispatch, useSelector } from "react-redux";
import { getJuniors, deleteJuniors } from "../../../redux/actions";

const AdminHomeJuniors = () => {
  const [user, setUser] = useState();
  const [deleteUsr, setDeleteUsr] = useState(false);

  useEffect(() => {
    if (deleteUsr) {
      setDeleteUsr(false);
      handleDelete(user.idFireBase);
    }
  }, [deleteUsr]);

  const dispatch = useDispatch();
  const { juniors } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getJuniors());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteJuniors(id, "admin"));
  };
  return (
    <div className="container mt-5">
      <table className="table  table-borderless table-responsive card-1 p-4">
        <thead>
          <tr className="border-bottom text-center">
            <th>
              <span className="ml-2">Nº</span>
            </th>
            <th>
              <span className="ml-2">Fecha de creacion</span>
            </th>
            <th>
              <span className="ml-2">Usuario</span>
            </th>
            <th>
              <span className="ml-2">Publicaciones</span>
            </th>
            <th>
              <span className="ml-2">Postulaciones</span>
            </th>
            <th>
              <span className="ml-4">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {juniors.length > 0 ? (
            juniors.map((junior, i) => (
              <Fragment key={junior.idFireBase}>
                <JuniorTR
                  i={i}
                  setUser={setUser}
                  setDeleteUsr={setDeleteUsr}
                  junior={junior}
                  handleDelete={handleDelete}
                />
              </Fragment>
            ))
          ) : (
            <tr className="container text-center">
              <td>cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHomeJuniors;

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications, deletePublications } from "../../../redux/actions";
import PublicationsTR from "./PublicationsTR";

const AdminPublications = () => {
  const dispatch = useDispatch();
  const { publications } = useSelector((state) => state);

  const [user, setUser] = useState();
  const [deleteUsr, setDeleteUsr] = useState(false);

  useEffect(() => {
    dispatch(getPublications(false));
  }, []);
  const handleDelete = (publication, userType) => {
    console.log(publication, userType, "publasd");
    dispatch(
      deletePublications(
        publication._id,
        publication.company ? publication.company._id : publication.junior._id,
        publication.company?'companies':'juniors'
      )
    );
  };
  useEffect(() => {
    if (deleteUsr) {
      setDeleteUsr(false);
      console.log("entroasdasdas");
      handleDelete(user, "admin");
    }
  }, [deleteUsr]);
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
              <span className="ml-2">Tipo de usuario</span>
            </th>
            <th>
              <span className="ml-2">Imagen</span>
            </th>
            <th>
              <span className="ml-4">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {publications.length > 0 ? (
            publications.map((publication, i) => (
              <Fragment key={publication._id}>
                <PublicationsTR
                  i={i}
                  setUser={setUser}
                  setDeleteUsr={setDeleteUsr}
                  handleDelete={handleDelete}
                  publication={publication}
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

export default AdminPublications;

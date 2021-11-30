import { Fragment, useEffect, useState } from "react";
import CompanyTR from "./CompanyTR";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, deleteCompany } from "../../../redux/actions";

const AdminHomeCompanies = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [deleteUsr, setDeleteUsr] = useState(false);
  const { companies } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCompanies());
  }, []);
  const handleDelete = (id, userType) => {
    console.log(id, userType);
    dispatch(deleteCompany(id, userType));
  };

  useEffect(() => {
    if (deleteUsr) {
      setDeleteUsr(false);
      handleDelete(user.idFireBase, "admin");
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
              <span className="ml-2">Publicaciones</span>
            </th>
            <th>
              <span className="ml-2">Empleos</span>
            </th>
            <th>
              <span className="ml-4">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company, i) => (
              <Fragment key={company._id}>
                <CompanyTR
                  i={i}
                  company={company}
                  setUser={setUser}
                  setDeleteUsr={setDeleteUsr}
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

export default AdminHomeCompanies;

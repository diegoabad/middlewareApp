import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Title from "./Title";
import NameInstitute from "./NameInstitute";
import Description from "./Description";
import Date from "./Date";
import { v4 } from "uuid";
import { putJuniors } from "../../../redux/actions";
let a = true;

const AcademicHistory = ({
  infoUser,
  setInfoUser,
  setAcademicHistory,
  academicHistory,
}) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setAcademicHistory((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (
      academicHistory.institute.trim() === "" ||
      academicHistory.title.trim() === "" ||
      academicHistory.date.trim() === "" ||
      academicHistory.description.trim() === ""
    )
      return;
    if (!academicHistory.edit) {
      academicHistory._id = v4();
      setInfoUser((info) => ({
        ...info,
        academicHistory: [...info.academicHistory, academicHistory],
      }));
    } else {
      setInfoUser((info) => ({
        ...info,
        academicHistory: info.academicHistory.map((j) =>
          j._id === academicHistory._id ? academicHistory : j
        ),
      }));
    }
    setAcademicHistory({
      institute: "",
      title: "",
      date: "", 
      description: "",
      _id: "",
      edit: false,
    });
    a = false;
  };
  useEffect(() => {
    if (!a) {
      dispatch(putJuniors(infoUser, infoUser.idUser));
      a = true;
    }
  }, [a]);
  return (
    <div className="card">
      <h4 className="text-center text-secondary">
        Agregar experiencia academica
      </h4>
      <div className="card-body">
        <form onSubmit={handleClick}>
          <NameInstitute
            academicHistory={academicHistory}
            handleChange={handleChange}
          />
          <Title
            academicHistory={academicHistory}
            handleChange={handleChange}
          />

          <Date academicHistory={academicHistory} handleChange={handleChange} />
          <Description
            academicHistory={academicHistory}
            handleChange={handleChange}
          />

          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 text-secondary">
              <input
                type="submit"
                className="btn btn-outline-dark px-4"
                value={
                  academicHistory.edit
                    ? "Editar Experiencia"
                    : "Agregar Experiencia"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademicHistory;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getJuniors } from "../../../redux/actions";

const Postulates = ({
  job,
  juniorsAplied,
  setJuniorsAplied,
}) => {
  const { juniors } = useSelector((state) => state);
 const dispatch = useDispatch()
  useEffect(() => {
    if(!juniors.length>0)dispatch(getJuniors());
    const juniorsAplieded = job.juniors.map((junior) => {
      const juniorData = juniors.find((j) => j._id === junior);
      return juniorData;
    });
    setJuniorsAplied(juniorsAplieded);
  }, [juniors]);
  return juniors.length > 0 ? (
    <div className="row mb-3">
      <div className="col-sm-4">
        <h6 className="mb-0 text-secondary">Postulados</h6>
      </div>
      <div className="col-sm-8 ">
        {juniorsAplied.map((jun, i) => (
          // getPostulators(jun)
          <span key={i}>
            <Link to={`/juniors/${jun&&jun._id}`}>{jun&&jun.name}</Link> ,
          </span>
        ))}
      </div>
    </div>
  ) : (
    "cargando..."
  );
};

export default Postulates;

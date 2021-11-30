import { useState } from "react";

import LeftData from "./LeftData";
import SensitiveData from "./SensitiveData";
// import Languages from "./Languages";
// import Technologies from "./Technologies";

const PersonalData = ({ infoUser, setInfoUser, user }) => {
  const [editValue, setEditValue] = useState(true);
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <LeftData
              user={user}
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              editValue={editValue}
            />
          </div>
          <div className="col-sm-9 text-rigth">
            <SensitiveData
              setInfoUser={setInfoUser}
              infoUser={infoUser}
              editValue={editValue}
              setEditValue={setEditValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;

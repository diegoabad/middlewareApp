import React from "react";

const SingIn = ({ setEmail, setPassword, email, password }) => {
  return (
    <>
      <div className="form-data">
        <h6>Correo</h6>
        <input
          placeholder="Escribe tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={`form-control w-100 `}
          required
        />
      </div>
      <div className="form-data mt-4 ">
        <h6>Contraseña</h6>
        <input
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className={`form-control w-100 `}
          required
        />
      </div>
    </>
  );
};

export default SingIn;

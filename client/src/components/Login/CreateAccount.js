import React from "react";

const CreateAccount2 = ({
  setEmail,
  setPassword,
  errorLogin,
  email,
  password,
  name,
  setName,
}) => {
  return (
    <>
      <div className="form-data">
        <h6>Perfil</h6>{" "}
        <input
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className={`form-control w-100 ${errorLogin && "is-invalid"}`}
          required
        />
      </div>
      <div className="form-data mt-2">
        <h6>Correo</h6>{" "}
        <input
          placeholder="Escribe tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={`form-control w-100 ${errorLogin && "is-invalid"}`}
          required
        />
      </div>
      <div className="form-data mt-2">
        <h6>Contraseña</h6>
        <input
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className={`form-control w-100 ${errorLogin && "is-invalid"}`}
          required
        />
      </div>
    </>
  );
};

export default CreateAccount2;

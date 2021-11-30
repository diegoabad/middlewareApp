import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import tokenAuth from '../config/token';
import {
  getTechnologies,
  postJobs,
  changePicturePublicationAction,
  getUserAction,
  setPlanMercado,
} from '../../redux/actions';
import './CreatePublications.css';
import NavBar from '../NavBar/NavBar';
import CountryState from './CountryState';
import State from './State';

const CreatePublications = () => {
  const { user, idLastJob } = useSelector((state) => state);
  const { technologies } = useSelector((state) => state);
  const { publication } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user) {
      tokenAuth(token);
      dispatch(getTechnologies());
    }
  }, [user]);

  //useEffect(()=>{
  // if(idLastJob === "")return;
  //  history.push(`/mercadopago/${idLastJob}`)
  //},[idLastJob])

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (user) return;
      dispatch(getUserAction(userFirebase));
    } else {
      history.push('/');
    }
  });

  function validate(input) {
    let errors = {};
    if (!input.title) errors.title = 'Campo requerido!';
    if (!input.description) errors.description = 'Campo requerido!';
    if (!input.country) errors.country = 'Campo requerido!';
    if (!input.city) errors.city = 'Campo requerido!';
    if (!input.currency) errors.currency = 'Campo requerido!';
    if (!input.salary) errors.salary = 'Campo requerido!';
    if (!input.technologies) errors.technologies = 'Campo requerido!';
    if (!input.date) errors.date = 'Campo requerido!';
    if (!input.photograph) errors.photograph = 'Imagen opcional!';
    return errors;
  }

  const [plan, setPlan] = useState('free1');
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState(null);
  const [input, setInput] = useState({
    title: '',
    description: '',
    photograph: '' || publication.photograph,
    country: '',
    city: '',
    currency: '',
    technologies: [],
    salary: 0,
    date: '',
    companyId: user && user._id,
    premium: user && user.premium,
    status: 'active',
    idFireBase: user.idFireBase,
    openToRelocate: false,
    openToRemote: false,
    openToFullTime: false,
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      currency: e.target.value,
    });
  }
  function handleSelectTwo(tech) {
    setInput((r) => {
      if (!r.technologies.length === 0) return { ...r, technologies: [tech] };
      if (!r.technologies.includes(tech)) {
        return {
          ...r,
          technologies: [...r.technologies, tech],
        };
      } else {
        const filter = r.technologies.filter((c) => c._id !== tech._id);
        return { ...r, technologies: filter };
      }
    });
  }

  const handleChangePicture = (e) => {
    const picture = e.target.files[0];
    setPicture(picture);
    if (picture) {
      dispatch(changePicturePublicationAction(picture));
    }
  };

  /*  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postJobs(input));
    history.push('/home/companies');
  } */

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postJobs(input));
  }

  // funcion que desabilita el poder enviar el form si no tiene campos rellenados
  (function () {
    'use strict';
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  })();

  function handlePayment() {
    if (plan !== 'free') {
      dispatch(setPlanMercado(plan));
      history.push(`/mercadopago/${idLastJob}`);
    } else {
      history.push('/home/juniors');
    }
  }

  function handlePlan(e) {
    setPlan(e.target.value);
  }

  var modalWin = useRef(null);

  return user ? (
    <div>
      <div
        className='modal fade'
        id='exampleModalCenter'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                El empleo, fue creado. Elige tu plan para mejorar el
                posicionamiento:
              </h5>
            </div>
            <div className='modal-body'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault1'
                  value='free'
                  onClick={handlePlan}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault1'>
                  FREE $0
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault2'
                  value='standard'
                  onClick={handlePlan}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault2'>
                  STANDARD $600
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault3'
                  value='premium'
                  onClick={handlePlan}
                />
                <label className='form-check-label' htmlFor='flexRadioDefault3'>
                  PREMIUM $900
                </label>
              </div>
            </div>
            <div className='modal-footer'>
              {plan === 'free1' ? (
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={handlePayment}
                  disabled
                >
                  Continuar
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={handlePayment}
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavBar />
      <div className='container px-4 py-5 mx-auto'>
        <div className='row d-flex justify-content-center'>
          <div className='card'>
            <form
              onSubmit={handleSubmit}
              className='needs-validation'
              noValidate
            >
              <div className='d-flex flex-column align-items-start text-center'>
                <img
                  alt='img'
                  className='user'
                  src={user.photograph}
                  className='rounded-circle p-1 bg-primary'
                  width='140'
                />
              </div>
              <div className='row m-4 justify-content-start'>
                <div className='col-sm-3'>
                  <h6 className='mb-3 '>{user.name}</h6>
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Titulo</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    className='form-control'
                    value={input.title}
                    onChange={handleChange}
                    name='title'
                    placeholder='Ej: Front/Back-End Jr'
                    required
                  ></input>
                  {errors.title && <p className='perror'>{errors.title}</p>}
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Descripción</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <textarea
                    className='form-control'
                    placeholder='Agrega una descripción a tu publicación'
                    value={input.description}
                    onChange={handleChange}
                    name='description'
                    required
                  ></textarea>
                  {errors.description && (
                    <p className='perror'>{errors.description}</p>
                  )}
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>País</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <CountryState
                    setState={setState}
                    handleChange={handleChange}
                  />
                  {errors.country && <p className='perror'>{errors.country}</p>}
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Ciudad</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <State state={state} handleChange={handleChange} />
                  {errors.city && <p className='perror'>{errors.city}</p>}
                </div>
              </div>

              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Moneda</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <select
                    onChange={(e) => handleSelect(e)}
                    className='form-control'
                    required
                  >
                    <option className='form-control'>Selecciona</option>
                    <option
                      className='text-muted bg-light mt-4 mb-3'
                      value='dollar'
                    >
                      Dolar
                    </option>
                    <option
                      className='text-muted bg-light mt-4 mb-3'
                      value='euro'
                    >
                      Euros
                    </option>
                    <option
                      className='text-muted bg-light mt-4 mb-3'
                      value='peso'
                    >
                      Pesos
                    </option>
                  </select>
                  {errors.currency && (
                    <p className='perror'>{errors.currency}</p>
                  )}
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Salario</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    type='number'
                    className='form-control'
                    value={input.salary}
                    onChange={handleChange}
                    name='salary'
                    required
                  ></input>
                  {errors.salary && <p className='perror'>{errors.salary}</p>}
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Tecnologias</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  {technologies.map((tec, i) => (
                    <span key={i}>
                      <input
                        style={{ focus: 'none' }}
                        type='checkbox'
                        className='btn-check btn-checkbox-focus'
                        value={tec._id}
                        id={tec._id}
                        onChange={() => handleSelectTwo(tec)}
                        checked={
                          input.technologies.find((e) => e._id === tec._id)
                            ? true
                            : false
                        }
                      />
                      <label
                        className='btn btn-outline-dark m-1 btn-checkbox-focus'
                        htmlFor={tec._id}
                        style={{ padding: '1px 5px' }}
                      >
                        {tec.name}
                      </label>
                    </span>
                  ))}
                  {errors.technologies && (
                    <p className='perror'>{errors.technologies}</p>
                  )}
                </div>
              </div>
              {/*<div className='row mb-3'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Fecha</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    className='form-control'
                    value={input.date}
                    onChange={handleChange}
                    name='date'
                    type='date'
                    placeholder='Ej: Buenos Aires/Montevideo'
                    required
                  ></input>
                  {errors.date && <p className='perror'>{errors.date}</p>}
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-2'>
                  <h6 className='mt-1'>Imagen</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    className='form-control notext'
                    accept='.png, .jpg, .jpeg'
                    type='file'
                    id='loadfile'
                   onChange={handleChangePicture} 
                  ></input>
                  {errors.photograph && (
                    <p className='gerror'>{errors.photograph}</p>
                  )}
                </div>
                  </div>*/}
              <div className='row mb-3'>
                <div className='col-sm-2'>
                  <h6 className='mb-0'>Disponibilidad </h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <div className='form-check form-switch'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='Relocate'
                      onChange={() =>
                        setInput((info) => ({
                          ...info,
                          openToRelocate: !info.openToRelocate,
                        }))
                      }
                      required
                      checked={input.openToRelocate}
                    />
                    <label className='form-check-label' htmlFor='Relocate'>
                      Relocación
                    </label>
                  </div>
                  <div className='form-check form-switch'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='Remote'
                      checked={input.openToRemote}
                      onChange={() =>
                        setInput((info) => ({
                          ...info,
                          openToRemote: !info.openToRemote,
                        }))
                      }
                      required
                    />
                    <label className='form-check-label' htmlFor='Remote'>
                      Remoto
                    </label>
                  </div>
                  <div className='form-check form-switch'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='FullTime'
                      checked={input.openToFullTime}
                      onChange={() =>
                        setInput((info) => ({
                          ...info,
                          openToFullTime: !info.openToFullTime,
                        }))
                      }
                      required
                    />
                    <label className='form-check-label' htmlFor='FullTime'>
                      Tiempo Completo
                    </label>
                  </div>
                </div>
              </div>
              {/* <button type="submit" className="btn btn-outline-dark px-4 mt-4">
                Publicar
              </button> */}
              <button
                type='button'
                className={'btn btn-block btn-dark btn-outline-light'}
                data-bs-toggle='modal'
                data-bs-target='#exampleModalCenter'
                onClick={handleSubmit}
              >
                Crear empleo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    '... cargando '
  );
};

export default CreatePublications;

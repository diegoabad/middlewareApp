import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetails, getUserAction } from '../../redux/actions';
import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import s from './JobsDetails.module.css';
import Socket from '../socket.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { postulation } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';

export default function JobsDetails() {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const jobsDetails = useSelector((state) => state.jobsDetails);
	const dispatch = useDispatch();
	const [post, setPost] = useState(false);

	function handlePostulation() {
		dispatch(postulation(id, user._id));
		// dispatch(putNotification(jobsDetails.company._id, user._id, 1, user.name, user.userType))
		Socket.emit('notification', {
			typeNotification: 1,
			userName: user.name,
			_id: user._id,
			userPublicationId: jobsDetails.company._id,
			userType: user.userType,
		});
		setPost(true);
	}
	useEffect(() => {
		dispatch(getJobDetails(id));
	}, [user]);
	const history = useHistory();

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

	function money(currency, salary) {
		if (!salary) {
			return 'Sin especificar';
		} else if (currency === 'dollar') {
			return `U$s${salary}`;
		} else if (currency === 'euro') {
			return `€${salary}`;
		} else {
			return `$${salary}`;
		}
	}

	const [coverLetter, setCoverLetter] = useState('');

	function handlePostulation() {
		dispatch(postulation(id, user._id, coverLetter, user.idFireBase));
		setPost(true);
	}

	var modalWin = useRef(null);

	function handleArea() {
		setCoverLetter(modalWin.current.value);
	}

	return user && jobsDetails ? (
		<div className={s.container}>
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
								Escribe una breve presentacion:
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<div>
								<textarea
									className='form-control'
									id='exampleFormControlTextarea1'
									rows='3'
									ref={modalWin}
									onChange={handleArea}
								></textarea>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-bs-dismiss='modal'
								onClick={handlePostulation}
							>
								Agregar
							</button>
						</div>
					</div>
				</div>
			</div>
			<NavBar />
			<div className={s.card}>
				<div className={s.cardHeader}>
					{user.postulationsJobs.includes(id) || post ? (
						<p className={s.cartelito}>Ya estas postulado para este empleo</p>
					) : (
						''
					)}
					<div className={s.imgContainer}>
						<img src={jobsDetails.photograph} alt='' />
					</div>
					<div className={s.cardHeader_info}>
						<div className={s.cardHeader_info_title}>
							<h1>{jobsDetails.title}</h1>
						</div>
						<Link target='blanck' to={`/companies/${jobsDetails.company._id}`}>
							{jobsDetails.company.name}
						</Link>
					</div>
				</div>
				<div className={s.containerInfo}>
					<p className={s.description}>
						<span>Descripcion del empleo: </span>
						{jobsDetails.description}
					</p>
					<div className={s.info}>
						<div className={s.info_box}>
							<p className={s.info_title}>Pais:</p>
							<p>{jobsDetails.country}</p>
						</div>
						<div className={s.info_box}>
							<p className={s.info_title}>Ciudad:</p>
							<p>{jobsDetails.city !== '' ? jobsDetails.city : 'all world'}</p>
						</div>
						<div className={s.info_box}>
							<p className={s.info_title}>salario:</p>
							<p className={s.textNone}>
								{money(jobsDetails.currency, jobsDetails.salary)}
							</p>
						</div>
					</div>
					<div className={s.info}>
						<div className={s.info_box}>
							<p className={s.info_title}>Relocación:</p>
							<p>{jobsDetails.openToRelocate ? 'Si' : 'No'}</p>
						</div>
						<div className={s.info_box}>
							<p className={s.info_title}>Remoto:</p>
							<p>{jobsDetails.openToRemote ? 'Si' : 'No'}</p>
						</div>
						<div className={s.info_box}>
							<p className={s.info_title}>FullTime:</p>
							<p className={s.textNone}>
								{jobsDetails.openToFullTime ? 'Si' : 'No'}
							</p>
						</div>
					</div>
					<div className={s.containerTechs}>
						<h4>Tecnologias Requeridas:</h4>
						<div className={s.techs}>
							{jobsDetails.technologies?.map((t, i) => (
								<p key={i} className={s.tech}>
									{t.name}
								</p>
							))}
						</div>
					</div>
				</div>
				{user.postulationsJobs.includes(id) ||
				post ||
				jobsDetails.status === 'paused' ? (
					<button
						type='button'
						className={s.btnDisabled}
						data-bs-toggle='modal'
						data-bs-target='#exampleModalCenter'
						disabled
					>
						Postulate
					</button>
				) : (
					<button
						type='button'
						className={s.btnPostularse}
						data-bs-toggle='modal'
						data-bs-target='#exampleModalCenter'
					>
						Postulate
					</button>
				)}
			</div>
		</div>
	) : (
		<div>Cargando...</div>
	);
}

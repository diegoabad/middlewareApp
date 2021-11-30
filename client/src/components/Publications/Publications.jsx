import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPublications2,
	putLike,
	postPublications,
	getUserAction,
	putPublications,
	changePicturePublications,
	deletePublications,
	resetPicturePublications,
} from '../../redux/actions/index';

import s from './Publications.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useHistory } from 'react-router-dom';
import styles from './Publications.module.css';
import Socket from '../socket.js';

export const Publications = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const publications = useSelector((state) => state.publications);
	const user = useSelector((state) => state.user);
	const publiImg = useSelector((state) => state.imgPublication);
	const pages = useSelector((state) => state.pages);
	const finishPage = useSelector((state) => state.finishPage);
	// var [idUser, setIdUser] = useState(null);

	var [idPost, setIdPost] = useState(null);
	var [loadingImg, setLoadingImg] = useState(false);
	var [loadingImg, setLoadingImg] = useState(false);
	var [imgPubli, setImgPubli] = useState(null);

	var [postPublication, setPostPublication] = useState({
		description: '',
		photograph: undefined,
	});

	var [editarPost, setEditarPost] = useState(false);

	var [currentPublications, setCurrentPublications] = useState(1);
	var [loadingPubli, setLoadingPubli] = useState(true);

	var deccriptionWindow = useRef(null);

	useEffect(async () => {
		if (loadingPubli && !finishPage) {
			await dispatch(getPublications2(currentPublications));
			setCurrentPublications(currentPublications + 1);

			await setTimeout(() => {
				setLoadingPubli(false);
			}, 1000);
		} else {
			setLoadingPubli(false);
		}
	}, [loadingPubli]);

	window.addEventListener('scroll', () => {
		if (!finishPage) {
			let scrollTop = document.documentElement.scrollTop;
			let clientHeight = document.documentElement.clientHeight;
			let scrollHeight = document.documentElement.scrollHeight;

			if (scrollHeight - scrollTop === clientHeight) {
				setLoadingPubli(true);
			}
		}
	});

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

		if (scrollHeight - scrollTop === clientHeight) {
			setCurrentPublications(currentPublications + 1);
		}
	};

	function postDescription() {
		if (postPublication.description !== '' && !editarPost) {
			dispatch(
				postPublications(
					{
						description: postPublication.description,
						photograph: publiImg !== null ? publiImg : undefined,
					},
					user.userType,
					user._id
				)
			);
			postPublication.description = '';
			dispatch(resetPicturePublications());
		} else if (editarPost) {
			dispatch(
				putPublications(idPost, user._id, {
					description:
						postPublication.description !== ''
							? postPublication.description
							: undefined,
					photograph: publiImg !== null ? publiImg : undefined,
				})
			);
			postPublication.description = '';
			postPublication.photograph = '';
			dispatch(resetPicturePublications());
		}
	}

	function addLikes(idPublications, userPublicationId) {
		setIdPost(idPublications);
		Socket.emit('notification', {
			typeNotification: 2,
			userName: user.name,
			_id: user._id,
			userPublicationId: userPublicationId,
			idPublication: idPublications,
			userType: user.userType,
		});
		dispatch(putLike(idPublications, user._id));
		// dispatch(putNotification(userPublicationId, user._id, 2, user.name, user.userType, idPublications))
	}

	function handleChange() {
		setPostPublication({
			description: deccriptionWindow.current.value,
		});
	}

	onAuthStateChanged(auth, (userFirebase) => {
		if (userFirebase) {
			if (user) return;
			dispatch(getUserAction(userFirebase));
		} else {
			history.push('/');
		}
	});

	async function publicationImg(e) {
		setLoadingImg(true);

		const picture = e.target.files[0];

		await dispatch(changePicturePublications(picture));

		setImgPubli(publiImg);

		setLoadingImg(false);
	}

	function deletePublication() {
		dispatch(deletePublications(idPost, user._id, user.userType));
	}

	// useEffect(()=>{

	//   Socket.on('liked',(data)=>{
	//     if(data.userPublicationId === idUser){

	//       console.log(data)
	//     }
	//   })

	// }, [Socket, idUser])

	return publications ? (
		<div className='container' onScroll={handleScroll}>
			<br></br>
			{/*  Button trigger modal  */}
			<button
				type='button'
				className='btn btn-block btn-dark btn-outline-light'
				data-bs-toggle='modal'
				data-bs-target='#exampleModalCenter'
				onClick={() => setEditarPost(false)}
			>
				Nueva publicación
			</button>

			{/*  Modal  */}
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
								{editarPost ? 'Editar publicación' : 'Nueva publicación'}
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
								<label className='form-label'>
									{editarPost ? 'Descripción' : 'Escribe algo'}
								</label>
								<textarea
									className='form-control'
									id='exampleFormControlTextarea1'
									rows='3'
									ref={deccriptionWindow}
									onChange={handleChange}
									value={postPublication.description}
								></textarea>
							</div>

							<div className='mb-3 mt-4'>
								<label className='form-label'>Seleciona una imagen</label>
								<input
									className='form-control'
									value={postPublication.photograph}
									type='file'
									id='formFile'
									onChange={(e) => publicationImg(e)}
								/>
							</div>
						</div>
						<div className='modal-footer'>
							{loadingImg ? (
								<button
									type='button'
									className='btn btn-primary'
									data-bs-dismiss='modal'
									onClick={postDescription}
									disabled
								>
									Cargando imagen
								</button>
							) : (
								<button
									type='button'
									className='btn btn-primary'
									data-bs-dismiss='modal'
									onClick={postDescription}
								>
									Agregar
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/*  Modal Delete  */}
			<div
				className='modal fade'
				id='deletePublication'
				aria-labelledby='exampleModalCenterTitle'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<h4>¿Estas seguro que quieres eliminar esta publicación?</h4>

							<div className='modal-footer'>
								<button data-bs-dismiss='modal' className='btn btn-secondary'>
									No
								</button>
								<button
									className='btn btn-primary'
									onClick={() => deletePublication()}
									data-bs-dismiss='modal'
								>
									Si
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='d-flex flex-column align-items-center'>
				<div className='col w-75 p-3'>
					<div className='col'>
						{publications ? (
							publications.map((e, i) => (
								<div className='mb-1' key={i}>
									<div className='card-section'>
										<div
											className={`card text-center  bg-ligth bg-opacity-100${styles.card}`}
										>
											<div className={s.name}>
												<img
													src={
														e.junior
															? e.junior.photograph
															: e.company.photograph
													}
													className='rounded-circle p-1 bg-primary'
													style={{ width: ' 50px ', height: ' 50px ' }}
													alt='Card cap'
												/>

												<span>
													{' '}
													{e.junior ? e.junior.name : e.company.name}{' '}
													<span className={s.spanPequeño}>
														{e.junior ? 'Programador' : 'Empresa'}
													</span>
												</span>

												<span>
													{' '}
													{e.date.slice(8, 10)}
													{e.date.slice(4, 7)}-{e.date.slice(0, 4)}
												</span>
											</div>

											<div className={s.description}>
												<span>{e.description}</span>
											</div>

											{e.photograph ? (
												<div className={s.divDivImg}>
													<div className={s.divImg}>
														<img
															className={s.img}
															src={e.photograph}
															alt='Imagen del post'
														/>
													</div>
												</div>
											) : (
												<div></div>
											)}

											<div className={s.divButton}>
												<span className='me-3'>{e.likesNumber}</span>

												{e.likes.length === e.likesNumber &&
												!e.likes.includes(user?._id) ? (
													<button
														className={s.btnBlue}
														onClick={() => {
															addLikes(
																e._id,
																e.junior ? e.junior._id : e.company._id
															);
															if (
																e.likes.length === e.likesNumber &&
																!e.likes.includes(user._id)
															) {
																e.likesNumber += 1;
															}
														}}
													>
														<i
															className='bi bi-hand-thumbs-up'
															style={{ fontSize: 16 }}
														></i>
													</button>
												) : (
													<button className={s.btnBlueLike} disabled>
														<i
															className='bi bi-hand-thumbs-up'
															style={{ fontSize: 16 }}
														></i>
													</button>
												)}

												{(e.junior ? e.junior._id : e.company._id) ===
												(user ? user._id : '12345') ? (
													<div className='d-flex flex-row'>
														<div>
															<button
																onClick={() => {
																	setEditarPost(true);
																	setIdPost(e._id);
																}}
																type='button'
																className='btn btn-block btn-dark btn-outline-light rounded'
																data-bs-toggle='modal'
																data-bs-target='#exampleModalCenter'
															>
																Editar
															</button>
														</div>

														<div>
															<button
																type='button'
																className='btn btn-block btn-danger btn-outline-light rounded'
																data-bs-toggle='modal'
																data-bs-target='#deletePublication'
																onClick={() => setIdPost(e._id)}
															>
																Eliminar
															</button>
														</div>
													</div>
												) : (
													<div></div>
												)}
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className={s.loader}></div>
						)}
					</div>

					{!loadingPubli ? <div></div> : <div className={s.loader}></div>}
				</div>
			</div>
		</div>
	) : (
		<div className={s.loader}></div>
	);
};

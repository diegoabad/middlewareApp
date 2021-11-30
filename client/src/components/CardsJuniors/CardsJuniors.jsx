import React from 'react';
import { NavLink } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import s from './card.module.css';

export const CardsJuniors = ({ arrayJuniors }) => {
	//const companies = useSelector((state) => state.companies);

	return (
		<div className='container-fluid'>
			<div className='text-center'>
				<h2>Nuestros Programadores</h2>
			</div>
			<div className={s.card1}>
				{arrayJuniors &&
					arrayJuniors.map((e, i) => (
						<>
							<div
								className={`d-flex justify-content-center ${s.divCard2}`}
								key={i}
							>
								<NavLink
									style={{ paddingLeft: 13, textDecoration: 'none' }}
									to={`/juniors/${e._id}`}
								>
									<div className={`${s.card2} p-3 py-4`}>
										<div className='text-center'>
											{' '}
											<img
												src={e.photograph}
												width='100'
												className='rounded-circle'
											/>
											<h3 className={`mt-2 ${s.p}`} style={{ color: 'black' }}>
												{e.name}
											</h3>
											<div className='d-flex flex-column justify-content-center'>
												<div>
													<span className={s.span}>{e.title}</span>
												</div>

												<div>
													<span className={`mt-3 ${s.spanTecnologies}`}>
														{e.technologies.length ? (
															e.technologies.map(
																(el, i) =>
																	i < 5 && (
																		<span
																			className={`m-2 ${s.neo}`}
																			key={i + 1000}
																		>
																			{el.name}
																		</span>
																	)
															)
														) : (
															<span style={{ color: 'black' }}>
																No tiene tecnologías asignadas
															</span>
														)}
													</span>
												</div>
											</div>
										</div>
									</div>
								</NavLink>
							</div>
						</>
					))}
			</div>
		</div>
	);
};

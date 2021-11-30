import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../CardsJuniors/card.module.css';

export const CardsCompanies = ({ arrayCompanies }) => {
	return (
		<div className='container-fluid'>
			<div className='text-center'>
				<h2>Nuestras Empresas</h2>
			</div>
			<div className={s.card1}>
				{arrayCompanies &&
					arrayCompanies.map((e, i) => (
						<>
							<div
								className={`d-flex justify-content-center ${s.divCard2}`}
								key={i}
							>
								<NavLink
									style={{ paddingLeft: 13, textDecoration: 'none' }}
									to={`/companies/${e._id}`}
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
														{e.jobs.length
															? `Esta empresa ha realizado ${e.jobs.length} publicaciones de empleo`
															: 'Ésta empresa no ha realizado publicaciones de empleo'}
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

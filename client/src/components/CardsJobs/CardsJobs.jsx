import React, { useEffect } from 'react';
import s from './CardsJobs.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, resetFilterJobs } from '../../redux/actions';

function CardsJobs() {
	function calculateDate(date) {
		const date1 = new Date().getTime();
		const date2 = new Date(date).getTime();
		const mili = 24 * 60 * 60 * 1000;
		const days = Math.floor(Math.abs(date2 - date1) / mili);
		if (days === 0) {
			return 'Publicado Hoy';
		} else if (days === 1) {
			return 'Publicado hace un día';
		} else if (days > 1 && days < 7) {
			return `Publicado hace ${days} días`;
		} else if (days === 7) {
			return `Publicado hace una semana`;
		} else if (days > 7 && days <= 14) {
			return `Publicado hace más de una semana`;
		} else if (days === 15) {
			return `Publicado hace 2 semanas`;
		} else if (days > 15 && days < 30) {
			return `Publicado hace más de 2 semanas`;
		} else {
			return 'Publicado hace más de un mes';
		}
	}
	function money(currency, salary) {
		if (!salary) {
			return 'Sin especificar';
		} else if (currency === 'dollar') {
			return `U$s ${salary}`;
		} else if (currency === 'euro') {
			return `€ ${salary}`;
		} else {
			return `$ ${salary}`;
		}
	}
	const jobs = useSelector((state) => state.jobs.filterData);
	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetFilterJobs());
		dispatch(getJobs());
	}, [user]);

	return (
		<div className={s.cards}>
			{jobs.length > 0
				? jobs.map((j) =>
						j.company && j.status === 'active' ? (
							<NavLink key={j._id} className={s.link} to={`/empleos/${j._id}`}>
								<div
									className={
										j.premium === 2
											? `${s.card} ${s.cardPremium}`
											: j.premium === 1
											? `${s.card} ${s.cardDefault}`
											: `${s.card}`
									}
								>
									{j.premium === 2 ? (
										<p className={s.premium}>
											<i class='bi bi-star-fill'></i>
											Premium
										</p>
									) : j.premium === 1 ? (
										<p className={s.standard}>
											<i class='bi bi-star-fill'></i>
											Standard
										</p>
									) : null}
									{!j.openToRemote ? (
										<p className={s.country}>{j.country}</p>
									) : (
										<p className={s.country2}>{'Remoto'}</p>
									)}
									<p className={s.date}>{calculateDate(j.date)}</p>
									<div className={s.card_container_logo}>
										<img
											className={s.card_logo}
											src={j.company.photograph}
											alt=''
										/>
									</div>
									<div className={s.card_container_info}>
										<div className={s.containerTitle}>
											<h3>{j.title}</h3>
										</div>
										<p className={s.card_container_info_extra_company}>
											{j.company.name}
										</p>
										<div className={s.card_container_info_extra}>
											<div className={s.card_container_info_extra_general}>
												<div className={s.card_container_info_extra_city}>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														class='h-5 w-5'
														viewBox='0 0 20 20'
														fill='currentColor'
													>
														<path
															fill-rule='evenodd'
															d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
															clip-rule='evenodd'
														/>
													</svg>
													{!j.openToRemote ? (
														<p>{j.city}</p>
													) : (
														<p>{'All World'}</p>
													)}
												</div>
												<div className={s.card_container_info_extra_salary}>
													<p className={s.salary}>salario:</p>
													<p className={s.textNone}>
														{money(j.currency, j.salary)}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</NavLink>
						) : null
				  )
				: 'No hay empleos disponibles...'}
		</div>
	);
}

export default CardsJobs;

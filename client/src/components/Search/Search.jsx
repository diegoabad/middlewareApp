import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchJobsByTitle,
	filterJobsByCountries,
	filterJobsByCities,
	filterJobsBySalaries,
	filterJobsByTechs,
	resetFilterJobs,
	filterJobsRemote,
	filterJobsFullTime,
	filterJobsRelocate,
	sortJobsBy,
} from '../../redux/actions';
import './Search.css';
import CountryState from './CountryState';
import State from './State';

export const Search = () => {
	const button = 'button';
	const dispatch = useDispatch();
	const options = useSelector((store) => store.technologies);

	const handleInputChange = (e) => {
		setSearch(e.target.value.toLowerCase().trim());
		dispatch(searchJobsByTitle(e.target.value.toLowerCase().trim()));
	};

	const byTypeSalary = (e) => {
		dispatch(filterJobsBySalaries(e.target.value));
		setSalary(false);
	};

	const byTecnology = (e) => {
		dispatch(filterJobsByTechs(e.target.value.toLowerCase()));
		setTech(false);
	};
	const byCity = (e) => {
		dispatch(filterJobsByCities(e.target.value));
		setCity(false);
	};
	const byCountry = (e) => {
		dispatch(filterJobsByCountries(e.target.value));
	};

	const handleReset = (e) => {
		dispatch(resetFilterJobs());
		setFullTime(false);
		setRemote(false);
		setRelocate(false);
		setSearch('');
		setSalary(true);
		setTech(true);
		setCountry(true);
		setCity(true);
		setState(null);
		setSort(true);
		dispatch(sortJobsBy('premium'));
	};

	const sortBy = (e) => {
		dispatch(sortJobsBy(e.target.value));
		setSort(false);
	};

	const [relocate, setRelocate] = useState(false);
	const [remote, setRemote] = useState(false);
	const [fullTime, setFullTime] = useState(false);

	const handleRelocate = () => {
		setRelocate((relocate) => {
			dispatch(filterJobsRelocate(!relocate));
			return !relocate;
		});
	};

	const handleFullTime = () => {
		setFullTime((fullTime) => {
			dispatch(filterJobsFullTime(!fullTime));
			return !fullTime;
		});
	};

	const handleRemote = () => {
		setRemote((remote) => {
			dispatch(filterJobsRemote(!remote));
			return !remote;
		});
	};
	const [state, setState] = useState(null);
	const [search, setSearch] = useState('');
	const [country, setCountry] = useState(true);
	const [salary, setSalary] = useState(true);
	const [city, setCity] = useState(true);
	const [sort, setSort] = useState(true);
	const [tech, setTech] = useState(true);
	return (
		<div className='cont'>
			<form>
				<div className='field'>
					<input
						type='text'
						id='searchterm'
						onChange={handleInputChange}
						placeholder='Realiza tu busqueda...'
						value={search}
					/>
				</div>
			</form>
			<div className='field2'>
				<select
					className='form-control'
					name='typePublic'
					onChange={byTypeSalary}
				>
					<option disabled selected={salary}>
						Rango Salarial:
					</option>
					<option value='1'>Menor a $50.000</option>
					<option value='2'>Entre $50.000 y $100.000</option>
					<option value='3'>Entre $101.000 y $150.000</option>
					<option value='4'>Entre $151.000 y $200.000</option>
					<option value='5'>Mayor de $200.000</option>
				</select>

				<select name='typePublic' name='Technologies' onChange={byTecnology}>
					<option disabled selected={tech}>
						Tipo de Tecnología:
					</option>
					{options?.map((p) => (
						<option value={p.name} key={p._id}>
							{p.name}
						</option>
					))}
				</select>
				<CountryState
					setState={setState}
					handleChange={byCountry}
					country={country}
					setCountry={setCountry}
				/>
				<State
					state={state}
					handleChange={byCity}
					city={city}
					setCity={setCity}
				/>
				<select name='typePublic' name='sort' onChange={sortBy}>
					<option value='premium' selected={sort}>
						Más Relevantes
					</option>
					<option value='date'>Más Recientes</option>
				</select>
			</div>
			<div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='Relocate'
						value={relocate}
						onChange={handleRelocate}
						checked={relocate ? true : false}
					/>
					<label className='form-check-label' htmlFor='Relocate'>
						Relocación
					</label>
				</div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='Remote'
						value={remote}
						onChange={handleRemote}
						checked={remote ? true : false}
					/>
					<label className='form-check-label' htmlFor='Remote'>
						Remoto
					</label>
				</div>
				<div>
					<input
						className='form-check-input'
						type='checkbox'
						id='FullTime'
						value={fullTime}
						onChange={handleFullTime}
						checked={fullTime ? true : false}
					/>
					<label className='form-check-label' htmlFor='FullTime'>
						Tiempo Completo
					</label>
				</div>
			</div>
			<p className='clear' onClick={handleReset}>
				Limpiar Filtros
			</p>
		</div>
	);
};

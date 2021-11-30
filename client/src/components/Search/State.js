import React from 'react';

const State = ({ state, infoJobs, handleChange, editValue, city }) => {
	return (
		<>
			<select
				value={infoJobs && infoJobs.city}
				name='city'
				onChange={handleChange}
				className={`form-control ${
					editValue === undefined ? null : !editValue && 'green-shadow'
				}`}
				disabled={editValue && editValue}
			>
				<option disabled selected={city}>
					{infoJobs ? null : 'Selecciona una Provicia/Estado'}
				</option>
				{state &&
					state.map((c) => (
						<option
							defaultValue={infoJobs && infoJobs.city === c.name ? true : false}
							key={c._id}
							value={c.name}
						>
							{c.name}
						</option>
					))}
			</select>
		</>
	);
};

export default State;

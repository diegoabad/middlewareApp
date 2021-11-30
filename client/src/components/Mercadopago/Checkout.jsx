import React, { useEffect } from 'react';

export default function Checkout({ product, dates }) {
	console.log(dates, 'dates');
	useEffect(() => {
		const script = document.createElement('script');

		const attr_data_preference = document.createAttribute('data-preference-id');
		attr_data_preference.value = dates; //id que le devolvems del backend

		script.src =
			'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
		script.setAttributeNode(attr_data_preference);
		script.async = true;

		document.getElementById('form1').appendChild(script);
		return () => {
			// document.getElementById('form1').removeChild(script)
		};
	}, [dates]);

	return (
		<div className=''>
			<form id='form1'>
				<div className='card-title'>
					<h3>Cliente Destacado</h3>
					<i className='bi bi-gem fa-3x' aria-hidden='true'></i>
				</div>

				<div className='form-group'>
					{product === 'Standard' ? (
						<span>
							Obtendrás con este paquete un buen posicionamiento en las
							búsquedas por una semana
						</span>
					) : (
						<span>
							Obtendrás con este paquete un excelente posicionamiento en las
							búsquedas por un mes
						</span>
					)}
					<div>
						{product === 'Standard' ? (
							<label>Nombre del producto: {product} $600 </label>
						) : (
							<label>Nombre del producto: {product} $900</label>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}

export const fetchProducts = async () => {
	try {
		const response = await fetch(
			'https://violetas.lavandadellago.es/ProductsApi/GetProducts',
			{
				method: 'GET',
				headers: {
					'ApiKey':
						'hs73ye8dushwyapslrkfoiedsoprlkwms-7hyduspwlahsudieorpsud7487euff',
				},
			},
		)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return data.JSONResult
	} catch (err) {
		console.error(err)
	}
}

export const fetchIndividualProduct = async (id: number) => {
	try {
		const response = await fetch(
			`https://violetas.lavandadellago.es/ProductsApi/GetProduct/${id}`,
			{
				method: 'GET',
				headers: {
					'ApiKey':
						'hs73ye8dushwyapslrkfoiedsoprlkwms-7hyduspwlahsudieorpsud7487euff',
				},
			},
		)

		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`)
		}

		const data = await response.json()
		return data.JSONResult
	} catch (err) {
		console.error(err)
	}
}

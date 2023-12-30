export interface Fetching {
	url: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: object;
	headers?: any;
}

export interface Devuelve {
	isError: boolean,
	status: number,
	msj: string,
	json: any
}

export const fetching = async ({ url, body, method, headers }: Fetching): Promise<Devuelve> => {
	try {
		const f = await fetch(url, {
			body: JSON.stringify(body),
			method,
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});

		// Si el estado de la response es un numero diferente a 200, se ejecuta este if
		if (!f.ok) {
			return {
				isError: true,
				status: f.status,
				json: [],
				msj: "Error en la response"
			};
		}

		const json = await f.json();
		return {
			isError: false,
			json,
			msj: "Todo bien",
			status: 200
		};

	} catch (error) {
		return {
			isError: true,
			msj: "Error",
			status: 404,
			json: []
		};
	}
};

interface Fetching {
	url: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: object;
	headers?: any;
}

export const fetching = async ({ url, body, method, headers }: Fetching) => {
	try {
		const f = await fetch(url, {
			body: JSON.stringify(body),
			method,
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});

		if (!f.ok) {
			return {
				isError: true,
				status: f.status,
			};
		}

		const json = await f.json();
		return {
			isError: false,
			json,
		};
		
	} catch (error) {
		return {
			isError: true,
			msj: "Error",
		};
	}
};

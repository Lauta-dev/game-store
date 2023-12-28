import React, { useState } from "react";
import { saveUser } from "./save-user";
import { fetching } from "../../util/fetch";
import { useLocation } from "wouter";
import { LocalStorage } from "../../util/LocalStorage";
import { AuthUser } from "../../backend/AuthUser";

export interface FormInput {
	firstname: string;
	lastname: string;
	username: string;
}

const t =
	"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

export function CreateUser() {
	const [user, setUser] = useState();
	const [error, setError] = useState<boolean>();
	const [created, setCreated] = useState<boolean>(false);

	const setLocation = useLocation()[1];

	if (new LocalStorage().get({ name: "token" })) {
		setLocation("/");
		return;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const { firstname, lastname, username }: FormInput = {
			firstname: data.get("first_name") as string,
			lastname: data.get("last_name") as string,
			username: data.get("user_name") as string,
		};

		const zod = saveUser({
			username,
			lastname,
			firstname,
		});

		if (!zod.success) {
			console.log(zod.error.errors[0].message);
			return;
		}

		const { json, isError } = await AuthUser.createUser({
			firstname,
			username,
			lastname,
		});

		if (isError) {
			return setError(isError);
		}

		const { msj, created } = json;
		setCreated(created);

		setError(false);

		if (created) {
			const login = await fetching({
				url: "http://backend:5000/auth/login",
				method: "POST",
				body: { userName: user_name },
			});

			new LocalStorage().save({
				name: "token",
				body: { token: login.json.token },
			});
			location.reload();

			return;
		}

		return setUser(msj);
	}

	return (
		<>
			<section className="bg-white dark:bg-gray-900 h-200">
				<div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
							<div className="w-full">
								<label
									htmlFor="brand"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Nombre de usuario
								</label>
								<input
									type="text"
									name="user_name"
									className={`${t} ${
										!created ? "dark:bg-red-400" : "dark-bg-red-100"
									}`}
									placeholder="Ejemplo: lauta123"
									required
								/>
								{!created ? (
									<p className="dark:text-red-400 text-black">{user}</p>
								) : null}
							</div>

							<div className="w-full">
								<label
									htmlFor="brand"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Primer nombre
								</label>
								<input
									type="text"
									name="first_name"
									className={t}
									placeholder="Ejemplo: Lautaro"
									required
								/>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="brand"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Apellido
								</label>
								<input
									type="text"
									name="last_name"
									className={t}
									placeholder="Ejemplo: Diaz"
									required
								/>
							</div>

							<button
								type="submit"
								className="dark:text-white inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-200 hover:bg-primary-200"
							>
								Registarse
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

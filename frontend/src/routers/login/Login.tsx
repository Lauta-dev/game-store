import { useEffect, useState } from "react";
import { LocalStorage } from "../../util/LocalStorage";
import "./spinner.css";
import { AuthUser } from "../../backend/AuthUser";

interface LoginInterface {
	open: boolean;
	setOpenModal: () => void;
}

export function Login({ open, setOpenModal }: LoginInterface) {
	const [existUser, setExistUser] = useState<{ exist: boolean; msj: string }>();
	const [loading, setLoading] = useState(false);
	async function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const { username } = Object.fromEntries(data);

		setLoading(true);

		setTimeout(async () => {
			try {
				const login = await AuthUser.loginUser(username as string);

				if (!login.json.exist) {
					setExistUser({
						exist: login.json.exist,
						msj: login.json.msj,
					});
					return;
				}

				setExistUser({
					exist: login.json.exist,
					msj: login.json.msj,
				});

				new LocalStorage().save({
					name: "token",
					body: { token: login.json.token },
				});
				location.reload();
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}, 3000);
	}

	return (
		<>
			<dialog
				className="fixed inset-0 z-10 overflow-y-auto bg-black  p-10 rounded-md"
				aria-modal={true}
				open={open}
			>
				<form onSubmit={handleSubmitLogin}>
					<fieldset disabled={loading}>
						<label
							htmlFor="username"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Nombre de usuario
						</label>
						<input
							type="text"
							name="username"
							id="username"
							required={true}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						/>

						<p className="text-red-300">
							{!existUser?.exist && existUser?.msj}
						</p>

						<div className="flex pt-5 gap-10">
							<button
								className="text-white bg-blue-400 p-2 rounded-md"
								type="submit"
							>
								{loading ? <div className="spinner"></div> : "Iniciar sesión"}
							</button>

							<button
								id="defaultModalButton"
								data-modal-target="defaultModal"
								data-modal-toggle="defaultModal"
								className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								type="button"
								onClick={() => {
									setOpenModal();
								}}
							>
								Cerrar modal
							</button>
						</div>
					</fieldset>
				</form>
			</dialog>
		</>
	);
}

import { useState } from "react";
import { Link } from "wouter";
import { UserToken } from "../util/GetToken";
import { Login } from "../routers/login/Login";

function Auth({ logout }: { logout: () => void }) {
	return (
		<>
			<button
				className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
				onClick={logout}
			>
				Cerrar sesión
			</button>
			<Link
				className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
				href="/account"
			>
				Cuenta
			</Link>
		</>
	);
}

function NotAuth() {
	const [openModal, setOpenModal] = useState(false);

	function handleClick() {
		setOpenModal(!openModal);
	}

	return (
		<>
			<Link
				className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
				href="/create"
			>
				Crear cuenta
			</Link>
			<button
				onClick={handleClick}
				className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
			>
				Iniciar sesión
			</button>

			<Login open={openModal} setOpenModal={handleClick} />
		</>
	);
}

export function Header() {
	const token = UserToken.getToken();

	function handleClickLogout() {
		UserToken.removeToken();
		location.reload();
	}

	return (
		<>
			<header>
				<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
					<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
						<Link className="text-white" href={location.origin}>
							Home
						</Link>
						<div className="flex items-center lg:order-2">
							{token ? <Auth logout={handleClickLogout} /> : <NotAuth />}
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}

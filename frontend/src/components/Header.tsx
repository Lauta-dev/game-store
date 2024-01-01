import { useState } from "react";
import { Link } from "wouter";
import { UserToken } from "../util/GetToken";
import { Login } from "../routers/login/Login";
import { myRouters } from "@/metadata";
import { useAdmin } from "@/hook/isAdmin";

function Auth({ logout }: { logout: () => void }) {
	return (
		<>
			<button
				onClick={logout}
			>
				Cerrar sesión
			</button>
			<Link
				href={myRouters.account}
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
				href={myRouters.createAccount}
			>
				Crear cuenta
			</Link>
			<button
				onClick={handleClick}
			>
				Iniciar sesión
			</button>

			<Login open={openModal} setOpenModal={handleClick} />
		</>
	);
}

export function Header() {
	const { isAdmin, loading } = useAdmin()
	const token = UserToken.getToken();


	function handleClickLogout() {
		UserToken.removeToken();
		location.reload();
	}

	return (
		<>
			<header>
				<nav className="flex justify-between  bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
					<div className="">
						<Link className="text-black" href={myRouters.home}>
							Home
						</Link>
					</div>
					<div className="flex items-center justify-center gap-x-5">
							{token ? <Auth logout={handleClickLogout} /> : <NotAuth />}
							{isAdmin && loading && <Link className="underline" href={myRouters.admin}>Dashboard</Link>}
						</div>
				</nav>
			</header>
		</>
	);
}

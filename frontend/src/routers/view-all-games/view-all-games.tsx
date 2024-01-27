import { useEffect } from "react";
import { useState } from "react";
import { Link } from "wouter";
import { Login } from "../login/Login";
import { GameUser } from "../../backend/GameUser";
import { AuthUser } from "../../backend/AuthUser";
import { UserToken } from "@/util/GetToken";

interface Game {
	gameId: string;
	gameTitle: string;
	console: string;
	releaseYear: Date;
	createdAt: Date;
}

interface GameData {
	games: Game[];
}

interface Data {
	isError: boolean;
	data: Game[];
}

interface Error {
	isError: boolean;
	status?: number;
}

function Games({ games }: GameData) {
	const [authorized, setAuthorized] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

	useEffect(() => {
		async function verify() {
			setAuthorized(await AuthUser.verifyUser())
		}

		if (!UserToken.getToken()) {
			return 
		}

		verify()
	}, [])

	async function addGame(uuid: string) {
		await GameUser.saveGame(uuid);
	}

	function handleOpenModal() {
		setOpenModal(!openModal);
	}

	return (
		<>
			<table className="w-full text-sm text-left text-black">
				<thead className="text-xs text-gray-200 uppercase bg-gray-700">
					<tr>
						<th scope="col" className="px-4 py-3">
							Indice
						</th>
						<th scope="col" className="px-4 py-3">
							Titulo
						</th>
						<th scope="col" className="px-4 py-3">
							Consola
						</th>
						<th scope="col" className="px-4 py-3">
							Año de lanzamiento
						</th>
						<th scope="col" className="px-4 py-3">
							Acción
						</th>
					</tr>
				</thead>

				<tbody>
					{games.map((data, index) => (
						<tr key={data.gameId} className="border-b">
							<td className="px-4 py-3">{(index += 1)}</td>

							<td className="px-4 py-3">
								<Link href={data.gameId} className="hover:text-blue-600">
									{data.gameTitle}
								</Link>
							</td>

							<td className="px-4 py-3">{data.console.toUpperCase()}</td>

							<td className="px-4 py-3">{data.releaseYear.toString()}</td>

							<td className="px-4 py-3">
								<button
									onClick={() => {
										addGame(data.gameId);

										if (!authorized) {
											handleOpenModal();
											return;
										}
									}}
								>
									Guardar juego
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{!authorized ? (
				<Login open={openModal} setOpenModal={handleOpenModal} />
			) : null}
		</>
	);
}

export function viewAllGame() {
	const [games, setGames] = useState<Data>();
	const [error, setError] = useState<Error>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getGames() {
			try {
				const gamesInfo = await GameUser.getAllGame();

				if (gamesInfo.isError) {
					return setError(() => ({
						isError: gamesInfo.isError,
						status: gamesInfo.status,
					}));
				}

				return setGames(() => ({
					isError: gamesInfo.isError,
					data: gamesInfo.json,
				}));
			} catch (error) {
				return setError({ isError: true });
			} finally {
				setLoading(true);
			}
		}

		getGames();
	}, []);

	return (
		<>
			{loading && (
				<>
					{error?.isError && "Error"}
					{!error?.isError &&
						games?.data &&
						games?.data.length < 1 &&
						"No hay nada"}
					{!error?.isError && games?.data && games?.data.length > 0 && (
						<Games games={games.data} />
					)}
				</>
			)}
		</>
	);
}

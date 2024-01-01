import { useEffect, useState } from "react";
import { UserToken } from "../../util/GetToken";
import { Listgame } from "../../interfaces/ListGame";
import { Table } from "./Table";
import { Link, useLocation } from "wouter";
import { GameUser } from "../../backend/GameUser";

function Title({ text }: { text: string }) {
	return (
		<h1 className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-balance">
			{text}
		</h1>
	);
}

function Text() {
	return (
		<>
			<section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-balance">
					Ho! Parece que no hay nada. Por favor agrega juegos
				</h1>
				<Link
					href="/"
					className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 bg-blue-500"
				>
					Juegos
				</Link>
			</section>
		</>
	);
}

export function Account() {
	const [loading, setLoading] = useState<boolean>(false);
	const [games, setGames] = useState<Listgame[]>([]);
	const [error, setError] = useState<boolean>();
	const [loadNewGames, setLoadNewGames] = useState<boolean>(false);

	const token = UserToken.getToken();

	if (!token) {
		// Vuelve a al página de inicio
		useLocation()[1]("/app");
		return;
	}

	useEffect(() => {
		async function getGameForUser() {
			try {
				const data = await GameUser.listGamesXUsers()

				if (data.isError) {
					setError(data.isError);
					return;
				}

				setGames(data.json);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(true);
			}
		}

		getGameForUser();
	}, []);

	async function removeGame(gameId: string) {
		try {
			setLoadNewGames(true);

			const data = await GameUser.removeGameFromDb(gameId)

			if (data.isError) {
				return;
			}

			if (data.json.code === 404) {
				return;
			}

			setTimeout(() => {
				setGames(data.json.games);
				setLoadNewGames(false);
			}, 3000);
		} catch (error) { }
	}

	return (
		<>
			{!loading && <Title text="Cargando..." />}
			{loading && !error && games.length > 0 && (
				<Table
					games={games}
					removeGame={removeGame}
					changeBoton={loadNewGames}
				/>
			)}
			{loading && !error && games.length < 1 && <Text />}
			{loading && error && "Error"}
		</>
	);
}

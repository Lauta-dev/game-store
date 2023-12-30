import { gameBackendPath } from "../metadata";
import { UserToken } from "../util/GetToken";
import { fetching } from "../util/fetch";

export class GameUser {
	/*
	 * # Muestra todos los juegos
	 */
	static async getAllGame() {
		const gamesInfo = await fetching({
			url: gameBackendPath.getAllGames,
			method: "GET",
		});

		return gamesInfo;
	}

	/*
	 * # Se agrega un nuevo juego en la base de datos
	 */
	static async saveGame(gameId: string): Promise<boolean> {
		const token = UserToken.getToken();

		if (!token) {
			return false;
		}

		// Esta es una ruta protegian, si el token no es valido, devolvera 401 y no guardara en la base de datos
		const save = await fetching({
			url: gameBackendPath.saveGame,
			method: "POST",
			body: { gameId },
			headers: { Authorization: `Bearer ${token}` },
		});

		if (save.status === 401) {
			return false;
		}

		return true;
	}

	static async listGamesXUsers(): Promise<any> {
		const token = UserToken.getToken();

		if (!token) {
			return false;
		}
		const data = await fetching({
			url: gameBackendPath.getGameXUser,
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		return data
	}

	static async removeGameFromDb(gameId: string) {
		const token = UserToken.getToken();

		const data = await fetching({
			url: gameBackendPath.removeGameFromDb,
			method: "DELETE",
			body: { gameId },
			headers: { Authorization: `Bearer ${token}` },
		});

		return data

	}
}

/*
 * Toda la configuración del backend
 *
 * var dockerContainerIPAddress: corresponden a la direccion IP del contenedor de docker que expone para mi maquina host
 * var port: corresponden al puerto de la app para ser accedido desde mi maquina host
 *
 * Esto se ve usando docker inspect "nombre del contenedor"
 */
const dockerContainerIPAddress = "172.22.0.3";
const port = 5000;

const server = `http://${dockerContainerIPAddress}:${port}`;
const user = `${server}/auth`;
const game = `${server}/game`;
const users = `${server}/user`

const authBackendPath = {
	login: `${user}/login`,
	create: `${user}/create`,
	verify: `${user}/verify`,
	verifyAdmin: `${user}/admin`
};

const gameBackendPath = {
	getAllGames: `${game}`,
	saveGame: `${game}/save`,
	getGameXUser: `${game}/one`,
	removeGameFromDb: `${game}/remove`
};

const admin = {
	getAllUsers: (take?: number) => take ? `${users}/all/${take}` : `${users}/all`,
	deleteUser: `${users}/delete`
}

/* Routas de mi app */
const myRouters = {
	home: "/app",
	account: "/app/account",
	createAccount: "/app/create",
	admin: "/admin"
}


export { authBackendPath, gameBackendPath, admin, myRouters };

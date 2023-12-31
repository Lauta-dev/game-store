/*
 * Toda la configuración del backend
 *
 * var dockerContainerIPAddress: corresponden a la direccion IP del contenedor de docker que expone para mi maquina host
 * var port: corresponden al puerto de la app para ser accedido desde mi maquina host
 *
 * Esto se ve usando docker inspect "nombre del contenedor"
 */
const dockerContainerIPAddress = "172.22.0.2";
const port = 5000;

const server = `http://${dockerContainerIPAddress}:${port}`;
const user = `${server}/auth`;
const game = `${server}/game`;

const authBackendPath = {
	login: `${user}/login`,
	create: `${user}/create`,
	verify: `${user}/verify`,
	admin: `${user}`
};

const gameBackendPath = {
	getAllGames: `${game}`,
	saveGame: `${game}/save`,
};

export { authBackendPath, gameBackendPath };

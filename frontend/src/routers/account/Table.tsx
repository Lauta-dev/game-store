import { Link } from "wouter";
import { Listgame } from "../../interfaces/ListGame";

export function Table({
	games,
	removeGame,
	changeBoton,
}: {
	games: Listgame[];
	removeGame: (gameId: string) => void;
	changeBoton: boolean;
}) {
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
						<th scope="col" className="px-4 py-3"></th>
					</tr>
				</thead>

				<tbody>
					{games.map((data, index) => (
						<tr key={data.gameId} className="border-b">
							<td className="px-4 py-3">{(index += 1)}</td>

							<td className="px-4 py-3  ">
								<Link href={data.gameId} className="hover:text-blue-600">
									{data.gameTitle}
								</Link>
							</td>

							<td className="px-4 py-3">{data.console.toUpperCase()}</td>

							<td className="px-4 py-3">{data.releaseYear.toString()}</td>

							<td className="px-4 py-3">
								{changeBoton ? (
									<button
										className="bg-gray-700"
										disabled={true}
										onClick={() => removeGame(data.gameId)}
									>
										Espere...
									</button>
								) : (
									<button
										className="text-red-500"
										onClick={() => removeGame(data.gameId)}
									>
										Eliminar juego
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

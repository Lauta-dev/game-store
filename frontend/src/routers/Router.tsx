import { Route, Switch } from "wouter";
import { viewAllGame } from "./view-all-games/view-all-games";
import { CreateUser } from "./create-user/Create-user";
import { NotFound } from "./404/Not-found";
import { Account } from "./account/Account";
import { Users } from "./admin/Users";
import { useEffect } from "react";
import { fetching } from "../util/fetch";

export function Router() {
	const isAdmin = true

	useEffect(() => {
		async function admin() {
			fetching({
				url: ""
			})
		}
		admin()
	}, [])


	return (
		<>
			<Switch>
				<Route path="/" component={viewAllGame} />
				<Route path="/create" component={CreateUser} />
				<Route path="/account" component={Account} />

				{
					isAdmin
						? <Route path="/admin" component={Users} />
						: <h1 className="text-center text-yellow-100">No tenés permitido estar aqui</h1>
				}

				<Route component={NotFound} />
			</Switch>
		</>
	);
}

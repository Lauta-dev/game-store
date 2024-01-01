import { Route, Router as RouterWouter } from "wouter";
import { viewAllGame } from "./view-all-games/view-all-games";
import { CreateUser } from "./create-user/Create-user";
import { Account } from "./account/Account";

export function Router() {
	return (
		<>
			<RouterWouter base="/app">
				<Route path="/" component={viewAllGame} />
				<Route path="/create" component={CreateUser} />
				<Route path="/account" component={Account} />
			</RouterWouter>
		</>
	);
}

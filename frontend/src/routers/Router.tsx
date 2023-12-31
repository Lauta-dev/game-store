import { Route, Switch } from "wouter";
import { viewAllGame } from "./view-all-games/view-all-games";
import { CreateUser } from "./create-user/Create-user";
import { Account } from "./account/Account";

export function Router() {
	return (
		<>
			<Switch>
				<Route path="/" component={viewAllGame} />
				<Route path="/create" component={CreateUser} />
				<Route path="/account" component={Account} />
			</Switch>
		</>
	);
}

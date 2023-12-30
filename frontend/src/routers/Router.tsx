import { Route, Switch } from "wouter";
import { viewAllGame } from "./view-all-games/view-all-games";
import { CreateUser } from "./create-user/Create-user";
import { NotFound } from "./404/Not-found";
import { Account } from "./account/Account";
import { Users } from "./admin/Users";

export function Router() {
	return (
		<>
			<Switch>
				<Route path="/" component={viewAllGame} />
				<Route path="/create" component={CreateUser} />
				<Route path="/account" component={Account} />
				<Route path="/admin" component={Users} />
				<Route component={NotFound} />
			</Switch>
		</>
	);
}

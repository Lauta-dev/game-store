import { Header } from "./components/Header";
import { Router } from "./routers/Router";
import { AdminPath } from "./routers/admin/Admin";
import "./index.css";
import "./shadcn.css"
import { useLocation } from "wouter";

function App() {
	if (useLocation()[0] === "/") {
		useLocation()[1]("/app")
		location.reload()
		return
	}

	return (
		<>
			<Header />
			<Router />
			<AdminPath />
		</>
	);
}

export default App;

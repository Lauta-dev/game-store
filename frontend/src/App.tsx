import { Header } from "./components/Header";
import { Router } from "./routers/Router";
import { AdminPath } from "./routers/admin/Admin";
import "./index.css";
import "./shadcn.css"

function App() {
	return (
		<>
			<Header />
			<Router />
			<AdminPath />
		</>
	);
}

export default App;

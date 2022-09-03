import './App.css';
import {Route, MemoryRouter, Routes} from "react-router";

function App() {
	return (
		<div className="App">
			<MemoryRouter>
				<Routes>
					<Route path="/">
						{ /* Add home component here */}
					</Route>
					<Route path="/login">
						{ /* Add login component here */}
					</Route>
				</Routes>
			</MemoryRouter>
		</div>
	);
}

export default App;

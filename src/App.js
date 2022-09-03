import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Login from "./login/Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

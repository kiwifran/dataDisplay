import React from "react";
import logo from "./logo.svg";
import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";
import Search from "./components/Search";

function App() {
	return (
		<div className="App">
			<Search />
		</div>
	);
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";
import Search from "./components/Search";
import Details from "./components/Details";

function App() {
	return (
		<Router>
			<div className="App">
				<nav>
					<Link to="/">
						<p>Search</p>
					</Link>
				</nav>
				<Route exact path="/" component={Search} />
				<Route path="/properties/:propertyId" component={Details} />
			</div>
		</Router>
	);
}

export default App;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";
import Search from "./components/Search";
import Details from "./components/Details";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			infoDetails: null
		};
	}
	handleClickOnMap = info => {
		this.setState({ infoDetails: info });
	};
	render() {
		return (
			<Router>
				<div className="App">
					<nav>
						<Link to="/">
							<p>Search</p>
						</Link>
					</nav>
					<Route
						exact
						path="/"
						render={() => {
							return (
								<Search
									handleClickOnMap={this.handleClickOnMap}
								/>
							);
						}}
					/>
					<Route
						path="/properties/:propertyId"
						render={() => {
							return (
								<Details infoDetails={this.state.infoDetails} />
							);
						}}
					/>
				</div>
			</Router>
		);
	}
}

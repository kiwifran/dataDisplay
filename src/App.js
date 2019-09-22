import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faKey, faHome } from "@fortawesome/free-solid-svg-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Search from "./components/Search";
import Details from "./components/Details";
library.add(faKey, faHome);
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
						<div className="iconContainer">
							<FontAwesomeIcon icon="home" />
							<Link to="/">
								<p>Search</p>
							</Link>
						</div>
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

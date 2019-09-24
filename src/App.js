import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faKey,
	faHome,
	faBed,
	faBath
} from "@fortawesome/free-solid-svg-icons";
import zillowLogo from "./assets/Zillowlogo.gif";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Search from "./components/Search";
import Details from "./components/Details";
library.add(faKey, faHome, faBed, faBath);
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			infoDetails: null,
			zestimate: null
		};
	}
	handleClickOnMap = (info, zestimate) => {
		this.setState({ infoDetails: info, zestimate });
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
						<div className="logoContainer">
							<a target="_blank" href="http://www.zillow.com/ ">
								<img src={zillowLogo} alt="logo of Zillow" />
							</a>
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
						render={props => {
							return (
								<Details
									{...props}
									infoDetails={this.state.infoDetails}
									zestimate={this.state.zestimate}
								/>
							);
						}}
					/>
				</div>
			</Router>
		);
	}
}

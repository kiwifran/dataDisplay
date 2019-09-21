import React, { Component } from "react";
//import from libraries
import axios from "axios";
import qs from "qs";
//import from other files
import VectorMap from "./VectorMap";
import Swal from "./SweetAlert";
import { GENERAL_API_URL, SEARCH_API_KEY } from "../constants/API";
export default class Search extends Component {
	constructor() {
		super();

		this.state = {
			propertyList: [],
			mapCenterLat: null,
			mapCenterLon: null,
			addressInput: "",
			cityStateZipInput: ""
		};
	}

	handleInputChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	handleFormSubmit = e => {
		e.preventDefault();

		const { addressInput, cityStateZipInput } = this.state;
		if (!/^\s*$/.test(addressInput) && !/^\s*$/.test(cityStateZipInput)) {
			console.log(addressInput, cityStateZipInput);
			// console.log(e.target);
			document.getElementById("searchForm").reset();
			console.log("arrived");
			this.fetchData(addressInput, cityStateZipInput);
			// const scrollSpeed = {
			// 	speed: 2000,
			// 	minDuration: 1600
			// };
			// animateScrollTo(
			// 	document.querySelector(".resultWrapper"),
			// 	scrollSpeed
			// );
		} else Swal("Input Error!", "Please check your input");
	};
	fetchData = (address, cityStateZip) => {
		axios({
			method: "GET",
			url: "https://proxy.hackeryou.com",
			dataResponse: "json",
			paramsSerializer: function(params) {
				return qs.stringify(params, {
					arrayFormat: "brackets"
				});
			},
			params: {
				reqUrl: GENERAL_API_URL,
				params: {
					"zws-id": SEARCH_API_KEY,
					address: address,
					citystatezip: cityStateZip
				},
				xmlToJSON: true
			}
		})
			.then(res => {
				console.log(res);
				const data =
					res.data["SearchResults:searchresults"].response.results
						.result;
				console.log(data);
				const { longitude, latitude } = data[0].address;
				console.log(longitude, latitude);
				this.setState({
					propertyList: [...data],
					mapCenterLon: +longitude,
					mapCenterLat: +latitude
				});
			})
			.catch(err => {
				Swal("Error!", "sorry cannot get lists of properties now");
			});
	};
	componentDidMount() {}
	render() {
		const { propertyList, mapCenterLat, mapCenterLon } = this.state;
		return (
			<div>
				<h1>this is the start!!</h1>
				<form
					action=""
					onSubmit={this.handleFormSubmit}
					id="searchForm"
				>
					<label htmlFor="addressInput" className="visuallyHidden">
						please type in the address
					</label>
					<input
						aria-live="polite"
						role="status"
						onChange={this.handleInputChange}
						type="text"
						id="addressInput"
						value={this.state.addressInput}
						placeholder="please type in the address"
						required
					/>
					<label
						htmlFor="cityStateZipInput"
						className="visuallyHidden"
					>
						please type in the city and State or zipCode
					</label>
					<input
						aria-live="polite"
						role="status"
						onChange={this.handleInputChange}
						type="text"
						id="cityStateZipInput"
						value={this.state.cityStateZipInput}
						placeholder="please type in the city and State or zipCode(us only)"
						required
					/>

					<button className="submitSearch">Find it</button>
				</form>
				{/* <div
					className="mapContainer"
					style={{ width: `80%`, margin: "0 auto" }}
				> */}
				{mapCenterLat && mapCenterLon ? (
					<VectorMap
						propertyList={propertyList}
						longitude={mapCenterLon}
						latitude={mapCenterLat}
					/>
				) : null}
				{/* </div> */}
				{/* {PigeonMap} */}
			</div>
		);
	}
}

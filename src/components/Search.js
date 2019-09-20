import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import PigeonMap from "./Map";
import VectorMap from "./VectorMap";
import { typeCastExpression } from "@babel/types";
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
		if (
			addressInput &&
			cityStateZipInput &&
			!/^\s*$/.test(addressInput) &&
			!/^\s*$/.test(cityStateZipInput)
		) {
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
		} else
			Swal.fire({
				title: "Input Error!",
				text: "Please check your input",
				confirmButtonText: "Cool"
			});
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
				reqUrl: `http://www.zillow.com/webservice/GetDeepSearchResults.htm`,
				params: {
					"zws-id": "X1-ZWz17nqt50by17_8mfo0",
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
				Swal.fire({
					title: "Error!",
					text: "sorry cannot get lists of properties now",
					confirmButtonText: "Cool"
				});
			});
	};
	componentDidMount() {
		// axios
		// 	.get(`http://www.zillow.com/webservice/GetSearchResults.htm`, {
		// 		params: {
		// 			"zws-id": "X1-ZWz17nrkrfwpor_82rpe",
		// 			address: "court St",
		// 			citystatezip: "Brooklyn NY"
		// 		}
		// 	})
		// 	.then(res => {
		// 		console.log(res);
		// 	});
		// axios({
		// 	method: "GET",
		// 	url: "https://proxy.hackeryou.com",
		// 	dataResponse: "json",
		// 	paramsSerializer: function(params) {
		// 		return qs.stringify(params, {
		// 			arrayFormat: "brackets"
		// 		});
		// 	},
		// 	params: {
		// 		reqUrl: `http://www.zillow.com/webservice/GetDeepSearchResults.htm`,
		// 		params: {
		// 			"zws-id": "X1-ZWz17nqt50by17_8mfo0",
		// 			address: "court St",
		// 			citystatezip: "Brooklyn NY"
		// 		},
		// 		xmlToJSON: true
		// 	}
		// })
		// 	.then(res => {
		// 		console.log(res);
		// 		const data =
		// 			res.data["SearchResults:searchresults"].response.results
		// 				.result;
		// 		console.log(data);
		// 		const { longitude, latitude } = data[0].address;
		// 		console.log(longitude, latitude);
		// 		this.setState({
		// 			propertyList: [...data],
		// 			mapCenterLon: +longitude,
		// 			mapCenterLat: +latitude
		// 		});
		// 	})
		// 	.catch(err => {
		// 		Swal.fire({
		// 			title: "Error!",
		// 			text: "sorry cannot get lists of properties now",
		// 			confirmButtonText: "Cool"
		// 		});
		// 	});
	}
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
					<label htmlFor="addressInput" className="visuallyHidden" />
					<input
						aria-live="polite"
						role="status"
						onChange={this.handleInputChange}
						type="text"
						id="addressInput"
						value={this.state.addressInput}
						placeholder="type in the address"
					/>
					<label
						htmlFor="cityStateZipInput"
						className="visuallyHidden"
					/>
					<input
						aria-live="polite"
						role="status"
						onChange={this.handleInputChange}
						type="text"
						id="cityStateZipInput"
						value={this.state.cityStateZipInput}
						placeholder="type in the city and State or zipCode "
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

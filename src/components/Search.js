import React, { Component, Fragment } from "react";
//packages import
import axios from "axios";
import qs from "qs";
import jump from "jump.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
//files and components import
import Swal from "./SweetAlert";
import VectorMap from "./VectorMap";
import { addHouselist } from "../store/actionCreators";

import { GENERAL_API_URL, SEARCH_API_KEY } from "../constants/API";
class Search extends Component {
	constructor() {
		super();
		this.state = {
			// propertyList: null,
			// mapCenterLat: null,
			// mapCenterLon: null,
			addressInput: "",
			cityStateZipInput: "",
			isMapShown: null
		};
	}
	//handle the change of the input
	handleInputChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	//when user submit the form, use the input to call api and save the data in the state
	handleFormSubmit = e => {
		e.preventDefault();
		const { addressInput, cityStateZipInput } = this.state;
		if (!/^\s*$/.test(addressInput) && !/^\s*$/.test(cityStateZipInput)) {
			this.fetchData(addressInput, cityStateZipInput);
			// e.target.reset();
			this.setState({ addressInput: "", cityStateZipInput: "" });
		} else Swal("Input Error!", "Please check your input");
	};
	//call the search endpoint of api
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
				// set the longitude and latitude of the middle property in the data array as the center of the map
				const data =
					res.data["SearchResults:searchresults"].response.results
						.result;
				const { longitude, latitude } = data[
					Math.floor(data.length / 2) - 1
				].address;
				// this.props.dispatch({
				// 	type: "ADD_HOUSELIST",
				// 	propertyList: [...data],
				// 	mapCenterLat: +latitude,
				// 	mapCenterLon: +longitude
				// });
				this.props.onAddHouseList(data, longitude, latitude);
				// store the data in the session storage for later use
				window.sessionStorage.setItem(
					"propertyList",
					JSON.stringify(data)
				);
				// scroll to the map after the api call gets data successfully
				jump(".mapContainer", {
					duration: 1600,
					a11y: true
				});
			})
			.catch(err => {
				Swal("Error!", "sorry cannot get lists of properties now");
			});
	};
	// check if there is a mapStatus value already stored in the session storage
	componentDidMount() {
		const mapStatus = window.sessionStorage.isMapShown;
		if (mapStatus) {
			this.setState({ isMapShown: mapStatus });
		}
	}
	render() {
		const { isMapShown } = this.state;
		const { propertyList, mapCenterLat, mapCenterLon } = this.props;
		return (
			<Fragment>
				<header className="searchHeader">
					<form
						action=""
						onSubmit={this.handleFormSubmit}
						id="searchForm"
					>
						<div className="inputs">
							<label
								htmlFor="addressInput"
								className="visuallyHidden"
							>
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
								please type in the city and State or the zipCode
								(zipcode for US only)
							</label>
							<input
								aria-live="polite"
								role="status"
								onChange={this.handleInputChange}
								type="text"
								id="cityStateZipInput"
								value={this.state.cityStateZipInput}
								placeholder="please type in the city and State or zipCode(US only)"
								required
							/>
						</div>
						<button
							aria-label="find properties"
							className="submitSearch"
						>
							<FontAwesomeIcon icon="key" />
						</button>
					</form>
				</header>
				{/* render the map if user submits inputs or user comes back from details page */}
				{(mapCenterLat && mapCenterLon) || isMapShown ? (
					<div className="mapContainer">
						<VectorMap
							propertyList={propertyList}
							longitude={mapCenterLon}
							latitude={mapCenterLat}
							handleClickOnMap={this.props.handleClickOnMap}
						/>
					</div>
				) : null}
			</Fragment>
		);
	}
}

function mapStateToProps(reduxStore) {
	const { propertyList, mapCenterLat, mapCenterLon } = reduxStore;
	return {
		propertyList,
		mapCenterLat,
		mapCenterLon
	};
}
function mapDispatchToProps(dispatch) {
	return {
		onAddHouseList: (data, lon, lat) =>
			dispatch(addHouselist(data, +lon, +lat))
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);

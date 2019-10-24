import React, { Component } from "react";
//packages import
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import qs from "qs";
import { connect } from "react-redux";
//files and components import
import { focusOneProperty } from "../store/actionCreators";
import Pin from "./Pin";
import ShortInfo from "./ShortInfo";
import { DETAILS_API_URL, SEARCH_API_KEY, MAP_TOKEN } from "../constants/API";
class VectorMap extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//if user clicks on a marker, call the details endpoint of api, then store the data
	handleClick = async (zpid, info, index) => {
		try {
			const data = await axios({
				method: "GET",
				url: "https://proxy.hackeryou.com",
				dataResponse: "json",
				paramsSerializer: function(params) {
					return qs.stringify(params, {
						arrayFormat: "brackets"
					});
				},
				params: {
					reqUrl: DETAILS_API_URL,
					params: {
						"zws-id": SEARCH_API_KEY,
						zpid
					},
					xmlToJSON: true
				}
			});
			const {
				message: { code }
			} = data.data["UpdatedPropertyDetails:updatedPropertyDetails"];
			// if the api response code is 0(successfully processing the request), use the data with more details coming back from the second api call to show in the pop up
			if (code === "0") {
				const { response } = data.data[
					"UpdatedPropertyDetails:updatedPropertyDetails"
				];
				this.setState({
					popupInfo: response,
					provideLink: true
				});
				this.props.onFocusOneProperty(response, index);
				//retrieve the lists  from the session storage to get the zestimate object for the situation when user comes back from details page and click on another marker on the map
				// const list =
				// 	this.props.propertyList ||
				// 	JSON.parse(window.sessionStorage.getItem("propertyList"));
				// const { zestimate } = list[index];
				// pass the data to the app.js for details page
				// this.props.handleClickOnMap(response, zestimate);
			} else {
				//if the error code is 501 or 502(no updated details in the api database or protected data not available through api calls), use the data from the former api call(general search) to show in the popup
				console.log(`error code ${code}`);
				this.setState({ popupInfo: info, provideLink: false });
			}
		} catch (err) {
			console.log(`error:${err}`);
		}
	};
	//pass geo location data to make markers on the map
	renderMarker = (info, index) => {
		const {
			address: { longitude, latitude },
			zpid
		} = info;
		return (
			<Marker
				key={`marker-${index}`}
				longitude={+longitude}
				latitude={+latitude}
			>
				<Pin
					size={20}
					onClick={() => this.handleClick(zpid, info, index)}
				/>
			</Marker>
		);
	};
	//pass the data to popup and show it on the map
	renderPopup = () => {
		const { popupInfo, provideLink } = this.state;
		return (
			popupInfo && (
				<Popup
					className="popUp"
					tipSize={5}
					anchor="bottom-right"
					longitude={+popupInfo.address.longitude}
					latitude={+popupInfo.address.latitude}
					closeOnClick={false}
					onClose={() =>
						this.setState({ popupInfo: null, provideLink: false })
					}
				>
					<ShortInfo info={popupInfo} provideLink={provideLink} />
				</Popup>
			)
		);
	};
	//create initial settings for the map, use the initial one or the settings/state retrieved from session storage as the state
	componentDidMount() {
		const settings = {
			viewport: {
				width: "100%",
				height: "100%",
				latitude: this.props.latitude,
				longitude: this.props.longitude,
				zoom: 12
			},
			popupInfo: null,
			provideLink: false
		};
		const initialState =
			JSON.parse(window.sessionStorage.getItem("state")) || settings;

		this.setState({ ...initialState });
	}
	componentDidUpdate(prevProps, prevState) {
		//if user submit another search, render the map with new geo location
		if (prevProps.longitude !== this.props.longitude) {
			const newViewport = {
				...this.state.viewport,
				longitude: this.props.longitude,
				latitude: this.props.latitude,
				zoom: 12
			};
			this.setState({
				viewport: newViewport,
				popupInfo: null
			});
		}
		//if longitude or the selected marker changes, set the state(settings) in the session storage and save the open status of map
		if (
			prevState.longitude !== this.state.longitude ||
			prevState.popupInfo !== this.state.popupInfo
		) {
			window.sessionStorage.setItem(
				"state",
				JSON.stringify({ ...this.state })
			);
			window.sessionStorage.setItem("isMapShown", true);
		}
	}
	render() {
		//get property list from props or retrieve it from session storage
		const dataList =
			this.props.propertyList ||
			JSON.parse(window.sessionStorage.getItem("propertyList"));
		return (
			<ReactMapGL
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
				mapStyle="mapbox://styles/mapbox/streets-v10"
				mapboxApiAccessToken={MAP_TOKEN}
			>
				{dataList.map(this.renderMarker)}
				{this.renderPopup()}
			</ReactMapGL>
		);
	}
}
function mapStateToProps(reduxStore) {
	const { popupInfo } = reduxStore;
	return {
		popupInfo
	};
}
function mapDispathToProps(dispatch) {
	return {
		onFocusOneProperty: (data, index) => {
			dispatch(focusOneProperty(data, index));
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispathToProps
)(VectorMap);

import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import axios from "axios";
import qs from "qs";
import ShortInfo from "./ShortInfo";
import Swal from "./SweetAlert";
import { DETAILS_API_URL, SEARCH_API_KEY, MAP_TOKEN } from "../constants/API";
export default class VectorMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
				width: 400,
				height: 400,
				latitude: this.props.latitude,
				longitude: this.props.longitude,
				zoom: 8
			},
			popupInfo: null,
			provideLink: false
		};
	}
	handleClick = async (zpid, info) => {
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
			console.log(data);
			const {
				message: { code }
			} = data.data["UpdatedPropertyDetails:updatedPropertyDetails"];
			if (code === "0") {
				const { response } = data.data[
					"UpdatedPropertyDetails:updatedPropertyDetails"
				];
				this.setState({
					popupInfo: response,
					provideLink: true
				});
				this.props.handleClickOnMap(response);

				console.log("state set");
			} else {
				// Swal("Error!", "sorry, cannot get details now😢");
				console.log(`error code ${code}`);
				this.setState({ popupInfo: info });
			}
		} catch (err) {
			// Swal("Error!", "sorry cannot get lists of properties now");
			console.log(`error:${err}`);
		}
	};
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
					// onClick={() => this.setState({ popupInfo: info })}
					onClick={() => this.handleClick(zpid, info)}
				/>
			</Marker>
		);
	};
	renderPopup = () => {
		const { popupInfo, provideLink } = this.state;
		// const= popupInfo.address;
		return (
			popupInfo && (
				<Popup
					className="popUp"
					tipSize={5}
					anchor="bottom"
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
	fetchDetails = async zpid => {};

	render() {
		return (
			<ReactMapGL
				style={{ width: "80%", margin: "0 auto" }}
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
				mapboxApiAccessToken={MAP_TOKEN}
			>
				{this.props.propertyList.length &&
					this.props.propertyList.map(this.renderMarker)}
				{this.renderPopup()}
			</ReactMapGL>
		);
	}
}

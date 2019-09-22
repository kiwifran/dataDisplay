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
				width: "100%",
				height: "100%",
				latitude: this.props.latitude,
				longitude: this.props.longitude,
				zoom: 12
			},
			popupInfo: null,
			provideLink: false
		};
	}
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
				const { zestimate } = this.props.propertyList[index];
				console.log(zestimate);
				this.props.handleClickOnMap(response, zestimate);

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
					onClick={() => this.handleClick(zpid, info, index)}
				/>
			</Marker>
		);
	};
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
	componentDidUpdate(prevProps, prevStae) {
		if (prevProps.longitude !== this.props.longitude) {
			const newViewport = {
				...this.state.viewport,
				longitude: this.props.longitude,
				latitude: this.props.latitude,
				zoom: 12
			};
			this.setState({
				viewport: newViewport
			});
		}
	}
	render() {
		return (
			<ReactMapGL
				// style={{ width: "100%", margin: "0 auto" }}
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
				mapStyle="mapbox://styles/mapbox/streets-v10"
				mapboxApiAccessToken={MAP_TOKEN}
			>
				{this.props.propertyList.length &&
					this.props.propertyList.map(this.renderMarker)}
				{this.renderPopup()}
			</ReactMapGL>
		);
	}
}

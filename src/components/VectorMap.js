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
			selectedId: ""
		};
	}
	handleClickOnMap = selectedId => {
		this.setState({ selectedId });
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
					onClick={() => {
						this.handleClickOnMap(zpid);

						this.setState({ popupInfo: info });
					}}
				/>
			</Marker>
		);
	};
	renderPopup = () => {
		const { popupInfo } = this.state;
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
					onClose={() => this.setState({ popupInfo: null })}
				>
					<ShortInfo info={popupInfo} />
				</Popup>
			)
		);
	};

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

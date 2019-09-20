import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import ShortInfo from "./ShortInfo";
import { MAP_TOKEN } from "../constants/API";
export default class VectorMap extends Component {
	state = {
		viewport: {
			width: 400,
			height: 400,
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			zoom: 8
		},
		popupInfo: null
	};

	renderMarker = (info, index) => {
		const { longitude, latitude } = info.address;
		return (
			<Marker
				key={`marker-${index}`}
				longitude={+longitude}
				latitude={+latitude}
			>
				<Pin
					size={20}
					onClick={() => this.setState({ popupInfo: info })}
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
				{this.props.propertyList.map(this.renderMarker)}
				{this.renderPopup()}
			</ReactMapGL>
		);
	}
}

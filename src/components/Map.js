import React from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";

const PigeonMap = (
	<Map
		center={[40.76878, -73.92]}
		animate={true}
		zoom={12}
		width={600}
		height={400}
	>
		<Marker
			anchor={[40.76878, -73.92]}
			payload={1}
			onClick={({ event, anchor, payload }) => {}}
		/>
	</Map>
);
export default PigeonMap;

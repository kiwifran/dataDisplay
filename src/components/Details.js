import React, { useState, useEffect } from "react";

export default function Details(props) {
	// const zpid = props.match.params.propertyId;
	// const [propertyDetails, setDetails] = useState(null);
	// useEffect(() => {

	// 	fetchDetails(zpid);
	// }, [zpid]);
	// const {}
	return (
		<div className="details">
			<h1>hey {props.infoDetails.address.street}</h1>
		</div>
	);
}

import React, { useState, useEffect } from "react";

export default function Details(props) {
	// const zpid = props.match.params.propertyId;
	// const [propertyDetails, setDetails] = useState(null);
	// useEffect(() => {
	// 	async function fetchDetails(zpid) {
	// 		try {
	// 			const data = await axios({
	// 				method: "GET",
	// 				url: "https://proxy.hackeryou.com",
	// 				dataResponse: "json",
	// 				paramsSerializer: function(params) {
	// 					return qs.stringify(params, {
	// 						arrayFormat: "brackets"
	// 					});
	// 				},
	// 				params: {
	// 					reqUrl: DETAILS_API_URL,
	// 					params: {
	// 						"zws-id": SEARCH_API_KEY,
	// 						zpid
	// 					},
	// 					xmlToJSON: true
	// 				}
	// 			});
	// 			console.log(data);
	// 			const {
	// 				message: { code }
	// 			} = data.data["UpdatedPropertyDetails:updatedPropertyDetails"];
	// 			if (code === "0") {
	// 				const { response } = data.data[
	// 					"UpdatedPropertyDetails:updatedPropertyDetails"
	// 				];
	// 				setDetails(response);
	// 				console.log("state set");
	// 			} else {
	// Swal("Error!", "sorry, cannot get details now😢")
	// 			}
	// 	} catch (err) {
	// 		Swal("Error!", "sorry cannot get lists of properties now")
	// 	}
	// }
	// 	fetchDetails(zpid);
	// }, [zpid]);

	return (
		<div className="details">
			<h1>hey</h1>
		</div>
	);
}

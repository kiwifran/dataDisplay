import React, { useState, useEffect } from "react";
import { DETAILS_API_URL, SEARCH_API_KEY } from "../constants/API";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";

export default function Details(props) {
	const zpid = props.match.params.propertyId;
	const [propertyDetails, setDetails] = useState(null);
	useEffect(() => {
		async function fetchDetails(zpid) {
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
					setDetails(response);
					console.log("state set");
				} else {
					Swal.fire({
						title: "Error!",
						text: "sorry, cannot get details now😢",
						confirmButtonText: "Cool"
					});
				}
			} catch (err) {
				Swal.fire({
					title: "Error!",
					text: "sorry cannot get lists of properties now",
					confirmButtonText: "Cool"
				});
			}
		}
		fetchDetails(zpid);
	}, [zpid]);

	return <div className="details"></div>;
}

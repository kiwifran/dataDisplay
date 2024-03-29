import React, { useState, useEffect } from "react";
import defaultPicLarge from "../assets/defaultPicLarge.jpg";
export default function Details(props) {
	// set up initial value for property details and Zestimate from props or session storage
	const initialDetails =
		props.infoDetails ||
		JSON.parse(window.sessionStorage.getItem("details"));
	const initialZestimate =
		props.zestimate ||
		JSON.parse(window.sessionStorage.getItem("zestimate"));
	//use the initial value as the initial state
	const [detailState, setDetails] = useState(initialDetails);
	const [zestimateState, setZestimate] = useState(initialZestimate);
	const {
		images,
		editedFacts,
		address,
		homeDescription,
		links
	} = detailState;
	const { amount } = zestimateState;
	//store the details and zestimate data into session storage
	useEffect(() => {
		window.sessionStorage.setItem("details", JSON.stringify(detailState));
		window.sessionStorage.setItem(
			"zestimate",
			JSON.stringify(zestimateState)
		);
	}, [props.match.params.propertyId]);

	return (
		<div className="detailsContainer">
			<div className="detailPicture">
				{images && images.image.url[0].length > 1 ? (
					<div className="detailPicture">
						<img
							src={images.image.url[0]}
							alt={`picture of ${address.street}`}
						/>
					</div>
				) : (
					<img
						src={defaultPicLarge}
						alt="default picture for property details"
					/>
				)}
			</div>

			<div className="addressInfo  infoContainer" tabIndex={0}>
				{amount && amount["$t"] ? (
					<h2>
						<span>Zestimate®:</span> {amount.currency}{" "}
						{parseInt(amount["$t"]).toLocaleString()}
					</h2>
				) : null}
				<p>{address.street}</p>
				<p>
					{address.city} {address.state}
				</p>
				<p>
					<span>Zip Code</span>: {address.zipcode}
				</p>
				{editedFacts && editedFacts.usecode ? (
					<p>
						<span>type:</span> {editedFacts.usecode}
					</p>
				) : null}
				{editedFacts && editedFacts.finishedSqFt ? (
					<p>
						{parseInt(editedFacts.finishedSqFt).toLocaleString()}{" "}
						sqft{" "}
					</p>
				) : null}
				{editedFacts && editedFacts.yearBuilt ? (
					<p>
						<span>Built in </span>
						{editedFacts.yearBuilt}{" "}
					</p>
				) : null}
				{editedFacts && editedFacts.yearUpdated ? (
					<p>
						<span>Updated in </span>
						{editedFacts.yearUpdated}{" "}
					</p>
				) : null}
			</div>
			<div className="propertyDetails infoContainer" tabIndex={0}>
				{editedFacts && editedFacts.applicances ? (
					<p>
						<span>type:</span> {editedFacts.applicances}
					</p>
				) : null}
				{editedFacts && editedFacts.bedrooms ? (
					<p>
						<span>Bedrooms:</span> {+editedFacts.bedrooms}
					</p>
				) : null}
				{editedFacts && editedFacts.bathrooms ? (
					<p>
						<span>Bathrooms:</span> {+editedFacts.bathrooms}
					</p>
				) : null}
				{editedFacts && editedFacts.basement ? (
					<p>
						<span>Basement:</span> {editedFacts.basement}
					</p>
				) : null}

				{editedFacts && editedFacts.heatingSources ? (
					<p>
						<span>Heating Source:</span>{" "}
						{editedFacts.heatingSources}
					</p>
				) : null}
				<a
					target="_blank"
					href={links.homeDetails}
					rel="noopener noreferrer"
				>
					🏠See more details for {address.street} on Zillow{" "}
				</a>
			</div>
			{homeDescription ? (
				<div className="description infoContainer" tabIndex={0}>
					<h3>Home description</h3>
					<p>{homeDescription}</p>
				</div>
			) : null}
		</div>
	);
}

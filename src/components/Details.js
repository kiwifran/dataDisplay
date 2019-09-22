import React, { useState, useEffect } from "react";
import defaultPicLarge from "../assets/defaultPicLarge.jpg";
export default function Details(props) {
	const { images, editedFacts, address, homeDescription } = props.infoDetails;
	const { amount } = props.zestimate;
	// const zpid = props.match.params.propertyId;
	// const [propertyDetails, setDetails] = useState(null);
	// useEffect(() => {

	// 	fetchDetails(zpid);
	// }, [zpid]);
	// const {}

	return (
		<div className="detailsContainer">
			<div className="detailPicture">
				{/* sometimes in the database when there is only one picture for the property, the database stores the url directly as the value for the url property, instead of storing it inside an array */}
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

			<div className="addressInfo  infoContainer">
				{amount && amount["$t"] ? (
					<h2>
						<span>Zestimate:</span> {amount.currency}{" "}
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
					<p>{editedFacts.finishedSqFt} sqft </p>
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
			<div className="propertyDetails infoContainer">
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
			</div>
			{homeDescription ? (
				<div className="description infoContainer">
					<h3>Home description</h3>
					<p>{homeDescription}</p>
				</div>
			) : null}
		</div>
	);
}

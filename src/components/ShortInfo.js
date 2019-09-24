import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultPic from "../assets/defaultPic.jpg";
export default class ShortInfo extends PureComponent {
	render() {
		const {
			provideLink,
			info,
			info: {
				editedFacts,
				bathrooms,
				bedrooms,
				zpid,
				address: { street, city }
			}
		} = this.props;
		const displayName = `${street}, ${city}`;

		return (
			<div className="popUpInfo">
				<div className="popUpImage">
					{info.images && info.images.image.url[0].length > 1 ? (
						<img
							src={info.images.image.url[0]}
							alt={`picture of ${street}`}
						/>
					) : (
						<img src={defaultPic} alt="default picture" />
					)}
				</div>
				<div>
					{displayName}
					<p>
						{editedFacts && editedFacts.bedrooms ? (
							<span>
								<FontAwesomeIcon icon="bed" />{" "}
								{+editedFacts.bedrooms}
							</span>
						) : null}
						{!isNaN(+bedrooms) ? (
							<span>
								<FontAwesomeIcon icon="bed" /> {+bedrooms}
							</span>
						) : null}
						{editedFacts && editedFacts.bathrooms ? (
							<span>
								{" "}
								<FontAwesomeIcon icon="bath" />{" "}
								{+editedFacts.bathrooms}
							</span>
						) : null}
						{!isNaN(+bathrooms) ? (
							<span>
								{" "}
								<FontAwesomeIcon icon="bath" /> {+bathrooms}
							</span>
						) : null}
						{editedFacts && editedFacts.finishedSqFt
							? ` ${parseInt(
									editedFacts.finishedSqFt
							  ).toLocaleString()} sqft`
							: null}
						{!isNaN(+info.finishedSqFt)
							? ` ${parseInt(
									info.finishedSqFt
							  ).toLocaleString()} sqft`
							: null}
					</p>
					<p>
						{provideLink ? (
							<Link to={`/properties/${zpid}`}>Details</Link>
						) : null}
					</p>
				</div>
			</div>
		);
	}
}

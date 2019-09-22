import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import defaultPic from "../assets/defaultPic.jpg";
export default class ShortInfo extends PureComponent {
	render() {
		const {
			provideLink,
			info,
			info: {
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
					{info.images ? (
						<img
							src={info.images.image.url[0]}
							alt="property picture"
						/>
					) : (
						<img src={defaultPic} alt="default picture" />
					)}
				</div>
				<div>
					{displayName}

					<p>
						{!isNaN(+bedrooms) ? `${+bedrooms} bed` : null}{" "}
						{!isNaN(+bathrooms) ? ` ${+bathrooms} bath` : null}{" "}
						{!isNaN(+info.finishedSqFt)
							? ` ${info.finishedSqFt} sqft`
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

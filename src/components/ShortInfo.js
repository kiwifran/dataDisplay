import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class ShortInfo extends PureComponent {
	render() {
		const {
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
			<div className="popUp">
				<div>
					{displayName}
					<Link to={`/properties/${zpid}`}>Details</Link>
					<p>
						{!isNaN(+bedrooms) ? `${+bedrooms} bed` : null}{" "}
						{!isNaN(+bathrooms) ? `, ${+bathrooms} bath` : null}{" "}
						{!isNaN(+info.finishedSqFt)
							? `, ${info.finishedSqFt} sqft`
							: null}
					</p>
				</div>
			</div>
		);
	}
}

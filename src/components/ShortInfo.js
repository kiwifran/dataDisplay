import React, { PureComponent } from "react";

export default class ShortInfo extends PureComponent {
	render() {
		const {
			info,
			info: {
				address: { street, city }
			},
			info: { bathrooms, bedrooms }
		} = this.props;
		const displayName = `${street}, ${city}`;

		return (
			<div className="popUp">
				<div>
					{displayName}
					<p>
						{!isNaN(+bedrooms) ? `${+bedrooms} bed` : null}{" "}
						{!isNaN(+bathrooms) ? `, ${+bathrooms} bath` : null}{" "}
						{!isNaN(+info.finishedSqFt)
							? `, ${info.finishedSqFt} sqft`
							: null}
					</p>
				</div>
				<img width={240} src={info.image} />
			</div>
		);
	}
}

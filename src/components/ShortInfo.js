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
					{/* <a
						target="_new"
						href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
					>
						Wikipedia
					</a> */}
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

import React from "react";
import { Link } from "react-router-dom";
import bed from "../../assets/images/demo-real-estate-icon-bed-small.svg";
import bath from "../../assets/images/demo-real-estate-icon-bath-small.svg";
import size from "../../assets/images/demo-real-estate-icon-size-small.svg";

/**
 * Property Card Component
 * Displays a single property with image, details, and link
 * Memoized for performance optimization
 */
const PropertyCard = React.memo(({ property }) => {
	const {
		_id,
		title,
		imageUrls,
		price,
		locality,
		bedrooms,
		bathrooms,
		size: propertySize,
		purpose,
	} = property;

	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	return (
		<div className="col transition-inner-all">
			<div className="border-radius-6px overflow-hidden box-shadow-quadruple-large">
				<div className="image position-relative">
					<Link to={`/property/${_id}`}>
						<img
							src={imageUrls?.[0]}
							alt={title || "Property image"}
							className="w-100"
							loading="lazy"
						/>
					</Link>
					{purpose && (
						<div className="col-auto bg-base-color border-radius-50px ps-15px pe-15px text-uppercase alt-font fw-600 text-white fs-11 lh-24 position-absolute left-20px top-20px">
							{purpose}
						</div>
					)}
				</div>
				<div className="bg-white">
					<div className="content ps-40px pe-40px pt-35px pb-35px md-p-25px border-bottom border-color-transparent-dark-very-light">
						<div className="d-flex align-items-center">
							<Link
								to={`/property/${_id}`}
								className="alt-font text-dark-gray fw-700 fs-22 me-10px">
								{formatPrice(price)}
							</Link>
						</div>
						<p className="mb-20px">
							{locality?.localGovernment}, {locality?.state}
						</p>
						<Link
							to={`/property/${_id}`}
							className="alt-font text-dark-gray fw-600 fs-19 lh-28 d-inline-block">
							{title}
						</Link>
					</div>
					<div className="row row-cols-3 ps-35px pe-35px pt-20px pb-20px md-ps-25px md-pe-25px align-items-center justify-content-center g-0">
						{bedrooms > 0 && (
							<div className="col border-end border-color-transparent-dark-very-light text-center">
								<img src={bed} className="h-30px mb-5px" alt="Bedrooms" />
								<span className="d-block lh-18 fw-600 text-dark-gray">
									{bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
								</span>
							</div>
						)}
						{bathrooms > 0 && (
							<div className="col border-end border-color-transparent-dark-very-light text-center">
								<img src={bath} className="h-30px mb-5px" alt="Bathrooms" />
								<span className="d-block lh-18 fw-600 text-dark-gray">
									{bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
								</span>
							</div>
						)}
						{propertySize && (
							<div className="col text-center">
								<img src={size} className="h-30px mb-5px" alt="Size" />
								<span className="d-block lh-18 fw-600 text-dark-gray">
									{propertySize} sqft
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;

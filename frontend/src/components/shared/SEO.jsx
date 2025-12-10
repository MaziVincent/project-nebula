import { Helmet } from "react-helmet";

/**
 * SEO Component for setting page metadata
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Open Graph type (website, article, etc.)
 */
const SEO = ({
	title = "MegaTech RealEstate - Find Your Dream Property",
	description = "Online property marketplace to buy, sell, and rent residential and commercial properties in Nigeria.",
	keywords = "real estate, property, buy house, rent apartment, Nigeria real estate, Abakaliki properties",
	image = "https://megatechrealestate.ng/og-image.jpg",
	url = "https://megatechrealestate.ng",
	type = "website",
	author = "MegaTech RealEstate",
	twitterCard = "summary_large_image",
}) => {
	const siteTitle = title.includes("MegaTech")
		? title
		: `${title} | MegaTech RealEstate`;

	return (
		<Helmet>
			{/* Primary Meta Tags */}
			<title>{siteTitle}</title>
			<meta name="title" content={siteTitle} />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content={author} />
			<link rel="canonical" href={url} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={siteTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:site_name" content="MegaTech RealEstate" />

			{/* Twitter */}
			<meta property="twitter:card" content={twitterCard} />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={siteTitle} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />

			{/* Additional Meta Tags */}
			<meta name="robots" content="index, follow" />
			<meta name="language" content="English" />
			<meta name="revisit-after" content="7 days" />
		</Helmet>
	);
};

export default SEO;

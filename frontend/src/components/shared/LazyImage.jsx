import React from "react";

/**
 * Lazy Image Component with loading states
 * Uses Intersection Observer for lazy loading
 */
const LazyImage = ({
	src,
	alt,
	className = "",
	placeholder = null,
	onLoad = () => {},
	onError = () => {},
}) => {
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [isInView, setIsInView] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const imgRef = React.useRef(null);

	React.useEffect(() => {
		if (!imgRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						observer.disconnect();
					}
				});
			},
			{
				rootMargin: "50px",
				threshold: 0.01,
			}
		);

		observer.observe(imgRef.current);

		return () => {
			if (observer) observer.disconnect();
		};
	}, []);

	const handleLoad = () => {
		setIsLoaded(true);
		onLoad();
	};

	const handleError = () => {
		setHasError(true);
		onError();
	};

	return (
		<div ref={imgRef} className={`relative ${className}`}>
			{!isLoaded && !hasError && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse">
					{placeholder || (
						<div className="flex items-center justify-center h-full">
							<svg
								className="w-12 h-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					)}
				</div>
			)}

			{hasError ? (
				<div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
					<span className="text-gray-500 text-sm">Failed to load image</span>
				</div>
			) : (
				isInView && (
					<img
						src={src}
						alt={alt}
						className={`${className} ${
							isLoaded ? "opacity-100" : "opacity-0"
						} transition-opacity duration-300`}
						onLoad={handleLoad}
						onError={handleError}
						loading="lazy"
					/>
				)
			)}
		</div>
	);
};

export default LazyImage;

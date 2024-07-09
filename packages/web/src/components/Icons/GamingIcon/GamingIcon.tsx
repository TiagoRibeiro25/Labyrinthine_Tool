import React, { SVGProps } from "react";

const GamingIcon: React.FC<SVGProps<SVGSVGElement>> = (props): React.JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				fill="currentColor"
				d="M7.51 26a5.5 5.5 0 0 1-1.44-.19A5.6 5.6 0 0 1 2.19 19l2.33-8.84a5.54 5.54 0 0 1 2.59-3.43a5.43 5.43 0 0 1 4.15-.54A5.52 5.52 0 0 1 14.7 9h2.6a5.5 5.5 0 0 1 3.44-2.81a5.43 5.43 0 0 1 4.15.54a5.57 5.57 0 0 1 2.59 3.41L29.81 19a5.6 5.6 0 0 1-3.89 6.83a5.43 5.43 0 0 1-4.15-.54a5.54 5.54 0 0 1-2.59-3.41L19 21h-6l-.23.86a5.54 5.54 0 0 1-2.59 3.41a5.46 5.46 0 0 1-2.67.73M9.83 8a3.5 3.5 0 0 0-1.72.46a3.6 3.6 0 0 0-1.66 2.19l-2.33 8.84a3.6 3.6 0 0 0 2.48 4.39a3.43 3.43 0 0 0 2.62-.34a3.54 3.54 0 0 0 1.66-2.19L11.5 19h9l.61 2.35a3.58 3.58 0 0 0 1.66 2.19a3.46 3.46 0 0 0 2.63.34a3.58 3.58 0 0 0 2.47-4.39l-2.33-8.84a3.55 3.55 0 0 0-1.65-2.19a3.46 3.46 0 0 0-2.63-.34a3.55 3.55 0 0 0-2.37 2.22l-.24.66h-5.3l-.24-.66a3.56 3.56 0 0 0-2.38-2.22a3.5 3.5 0 0 0-.9-.12"
			></path>
			<path fill="currentColor" d="M10 16a2 2 0 1 1 2-2a2 2 0 0 1-2 2m0-2"></path>
			<circle cx="22" cy="12" r="1" fill="currentColor"></circle>
			<circle cx="22" cy="16" r="1" fill="currentColor"></circle>
			<circle cx="20" cy="14" r="1" fill="currentColor"></circle>
			<circle cx="24" cy="14" r="1" fill="currentColor"></circle>
		</svg>
	);
};

export default GamingIcon;

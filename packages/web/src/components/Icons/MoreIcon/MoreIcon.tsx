import React, { SVGProps } from "react";

const MoreIcon: React.FC<SVGProps<SVGSVGElement>> = (props): React.JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M21 19.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m-7.5 0a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m-7.5 0a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0M21 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m0-7.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0M13.5 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m0-7.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0M6 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m0-7.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"
				color="currentColor"
			></path>
		</svg>
	);
};

export default MoreIcon;

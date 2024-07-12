import { SVGProps } from "react";

const CosmeticIcon: React.FC<SVGProps<SVGSVGElement>> = (props): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
			>
				<path d="M37 17v20m-26 0v7h26v-7m-26 0H4V17c0-3 2-6.5 5-9s9-4 9-4h12s6 1.5 9 4s5 6 5 9v20h-7m-26 0V17"></path>
				<path d="M30 4a6 6 0 0 1-12 0"></path>
			</g>
		</svg>
	);
};

export default CosmeticIcon;

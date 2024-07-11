import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = PropsWithChildren & {
	to?: string;
	onClick?: () => void;
	className?: string;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
};

const NavButton: React.FC<Props> = ({
	children,
	to,
	onClick,
	className,
	onMouseEnter,
	onMouseLeave,
}): React.JSX.Element => {
	return to ? (
		<Link
			to={to}
			className={`text-white transition-opacity duration-300 opacity-85 hover:opacity-100 ${className}`}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</Link>
	) : (
		<button
			className={`text-white transition-opacity duration-300 opacity-85 hover:opacity-100 ${className}`}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</button>
	);
};

export default NavButton;

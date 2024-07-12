import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	type?: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
	reversedColors?: boolean;
	onClick?: () => void;
};

const Button: React.FC<Props> = ({
	type = "button",
	className,
	disabled,
	onClick,
	children,
	reversedColors,
}): React.JSX.Element => {
	return (
		<button
			type={type}
			className={classNames(
				"px-4 py-2 font-bold rounded-xl border-2 border-white ease-in-out transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
				reversedColors
					? "hover:bg-white hover:text-black bg-transparent"
					: "bg-white text-black hover:bg-black hover:text-white",
				className
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;

import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	className?: string;
	disabled?: boolean;
	reversedColors?: boolean;
	onClick?: () => void;
};

const Button: React.FC<Props> = ({
	className,
	disabled,
	onClick,
	children,
	reversedColors,
}): React.JSX.Element => {
	return (
		<button
			className={
				reversedColors
					? `px-4 py-2 font-bold bg-transparent text-white rounded-xl hover:bg-white hover:text-black border-2 border-white ease-in-out transition-colors duration-200 ${className}`
					: `px-4 py-2 font-bold bg-white text-black rounded-xl hover:bg-gray-950 hover:text-white border-2 border-white ease-in-out transition-colors duration-200 ${className}`
			}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;

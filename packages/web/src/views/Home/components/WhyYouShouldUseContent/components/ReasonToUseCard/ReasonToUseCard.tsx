import classNames from "classnames";
import React from "react";

type Props = {
	Icon: React.FC<{ className: string }>;
	title: string;
	onClick: () => void;
	selected?: boolean;
};

const ReasonToUseCard: React.FC<Props> = ({
	Icon,
	title,
	onClick,
	selected,
}): React.JSX.Element => {
	return (
		<button
			className={classNames(
				"transition-transform duration-200 ease-in-out bg-black border cursor-pointer bg-opacity-40 w-60 h-60 rounded-3xl hover:scale-105",
				selected ? "lg:border-gray-200 border-gray-700" : "border-gray-700"
			)}
			onClick={onClick}
		>
			<div className="flex items-center justify-center w-full h-40 pb-5">
				<Icon className="w-20 h-20" />
			</div>
			<h3>
				<span className="labyrinth-font">{title}</span>
			</h3>
		</button>
	);
};

export default ReasonToUseCard;

import React from "react";

type Props = {
	Icon: React.FC;
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
		// TODO: Make this a button element
		<div
			// className="transition-transform duration-200 ease-in-out bg-black border border-gray-700 cursor-pointer bg-opacity-40 w-60 h-60 rounded-3xl hover:scale-110"
			className={`transition-transform duration-200 ease-in-out bg-black border cursor-pointer bg-opacity-40 w-60 h-60 rounded-3xl hover:scale-105 ${
				selected ? "border-gray-200" : "border-gray-700"
			}`}
			onClick={onClick}
		>
			<div className="flex items-center justify-center w-full h-40">
				<Icon
					// @ts-expect-error Typescript doesn't know about tailwind classes
					className="w-20 h-20"
				/>
			</div>
			<h3>
				<span className="labyrinth-font">{title}</span>
			</h3>
		</div>
	);
};

export default ReasonToUseCard;

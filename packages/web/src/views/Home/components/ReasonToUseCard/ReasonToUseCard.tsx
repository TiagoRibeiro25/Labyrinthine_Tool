import React from "react";

type Props = {
	Icon: React.FC;
	title: string;
};

const ReasonToUseCard: React.FC<Props> = ({ Icon, title }): React.JSX.Element => {
	return (
		<div className="bg-black border border-gray-700 bg-opacity-40 w-60 h-60 rounded-3xl">
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

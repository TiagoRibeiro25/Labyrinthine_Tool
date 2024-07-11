import React from "react";
import { Link } from "react-router-dom";
import QuestionIcon from "../../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../../components/Icons/UserIcon/UserIcon";
import constants from "../../../../../constants";

const DesktopBar: React.FC = (): React.JSX.Element => {
	const handleClick = (target: string): void => {
		if (target === "main") {
			document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			setTimeout(() => {
				document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
	};

	return (
		<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
			<div className="pt-6">
				<Link
					to={constants.ROUTES.HOME}
					className="text-6xl text-white transition-opacity duration-300 labyrinth-font opacity-85 hover:opacity-100"
					onClick={(): void => handleClick("main")}
				>
					L
				</Link>
			</div>

			<div className="flex flex-col items-center w-full space-y-5">
				<Link
					to={constants.ROUTES.HOME}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
				>
					<QuestionIcon className="w-11 h-11" />
				</Link>
			</div>

			<div className="pb-6">
				<Link
					to={constants.ROUTES.AUTH.LOGIN}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
				>
					<UserIcon className="w-10 h-10" />
				</Link>
			</div>
		</div>
	);
};

export default DesktopBar;

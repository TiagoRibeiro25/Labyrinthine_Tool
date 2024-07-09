import React from "react";
import { Link } from "react-router-dom";
import FriendsIcon from "../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../components/Icons/GamingIcon/GamingIcon";
import QuestionIcon from "../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../components/Icons/UserIcon/UserIcon";
import WarningIcon from "../../../../components/Icons/WarningIcon/WarningIcon";
import constants from "../../../../constants";

const DesktopBar: React.FC = (): React.JSX.Element => {
	return (
		<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
			<div className="pt-6">
				<Link
					to={constants.ROUTES.HOME}
					className="text-6xl text-white transition-opacity duration-300 labyrinth-font opacity-85 hover:opacity-100"
					onClick={(): void => {
						document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					L
				</Link>
			</div>

			<div className="flex flex-col items-center w-full space-y-5">
				<Link
					to={"#why-should-you-use"}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
					onClick={(): void => {
						document
							.querySelector("#why-should-you-use")
							?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<QuestionIcon className="w-11 h-11" />
				</Link>
				<Link
					to={"#what-is-labyrinthine"}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
					onClick={(): void => {
						document
							.querySelector("#what-is-labyrinthine")
							?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<GamingIcon className="w-11 h-11" />
				</Link>
				<Link
					to={"#important-note"}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
					onClick={(): void => {
						document.querySelector("#important-note")?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<WarningIcon className="w-11 h-11" />
				</Link>
				<Link
					to={"#help-friends"}
					className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
					onClick={(): void => {
						document.querySelector("#help-friends")?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<FriendsIcon className="w-11 h-11" />
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

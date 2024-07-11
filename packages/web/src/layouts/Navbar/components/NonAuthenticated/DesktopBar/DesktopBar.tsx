import React from "react";
import FriendsIcon from "../../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../../components/Icons/GamingIcon/GamingIcon";
import QuestionIcon from "../../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../../components/Icons/UserIcon/UserIcon";
import WarningIcon from "../../../../../components/Icons/WarningIcon/WarningIcon";
import constants from "../../../../../constants";
import NavButton from "../../NavButton/NavButton";

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
				<NavButton
					to={constants.ROUTES.HOME}
					className="text-6xl labyrinth-font"
					onClick={(): void => handleClick("main")}
				>
					L
				</NavButton>
			</div>

			<div className="flex flex-col items-center w-full space-y-5">
				<NavButton
					to={constants.ROUTES.HOME + "#why-should-you-use"}
					onClick={(): void => handleClick("#why-should-you-use")}
				>
					<QuestionIcon className="w-11 h-11" />
				</NavButton>
				<NavButton
					to={constants.ROUTES.HOME + "#what-is-labyrinthine"}
					onClick={(): void => handleClick("#what-is-labyrinthine")}
				>
					<GamingIcon className="w-11 h-11" />
				</NavButton>
				<NavButton
					to={constants.ROUTES.HOME + "#important-note"}
					onClick={(): void => handleClick("#important-note")}
				>
					<WarningIcon className="w-11 h-11" />
				</NavButton>
				<NavButton
					to={constants.ROUTES.HOME + "#help-friends"}
					onClick={(): void => handleClick("#help-friends")}
				>
					<FriendsIcon className="w-11 h-11" />
				</NavButton>
			</div>

			<div className="pb-6">
				<NavButton to={constants.ROUTES.AUTH.LOGIN}>
					<UserIcon className="w-10 h-10" />
				</NavButton>
			</div>
		</div>
	);
};

export default DesktopBar;

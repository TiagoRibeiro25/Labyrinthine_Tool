import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../../../../components/Icons/CloseIcon/CloseIcon";
import FriendsIcon from "../../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../../components/Icons/GamingIcon/GamingIcon";
import MoreIcon from "../../../../../components/Icons/MoreIcon/MoreIcon";
import QuestionIcon from "../../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../../components/Icons/UserIcon/UserIcon";
import WarningIcon from "../../../../../components/Icons/WarningIcon/WarningIcon";
import constants from "../../../../../constants";
import NavButton from "../../NavButton/NavButton";

const MobileBar: React.FC = (): React.JSX.Element => {
	const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);

	const handleClick = (target: string): void => {
		if (target === "main") {
			document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			setTimeout(() => {
				document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}

		setSubMenuOpened(false);
	};

	return (
		<>
			<div className="sm:hidden h-[80px] w-full bg-black fixed bottom-0 left-0 z-20 items-center justify-between flex px-5">
				<Fade triggerOnce className="pt-3" direction="left" duration={300} delay={100}>
					<NavButton
						to={constants.ROUTES.HOME}
						className="w-12 text-6xl labyrinth-font"
						onClick={(): void => handleClick("main")}
					>
						L
					</NavButton>
				</Fade>

				<Fade triggerOnce direction="up" duration={300} delay={100}>
					<NavButton onClick={(): void => setSubMenuOpened(!subMenuOpened)}>
						{subMenuOpened ? (
							<CloseIcon className="w-20 h-20" />
						) : (
							<MoreIcon className="w-12 h-12" />
						)}
					</NavButton>
				</Fade>

				<Fade triggerOnce direction="right" duration={300} delay={100}>
					<NavButton to={constants.ROUTES.AUTH.LOGIN}>
						<UserIcon className="w-12 h-12" />
					</NavButton>
				</Fade>
			</div>

			{subMenuOpened && (
				<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
					<Fade triggerOnce direction="up" duration={300} delay={100} className="w-full h-full">
						<div className="flex items-center justify-between w-full h-full px-5 bg-black bg-opacity-70">
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
					</Fade>
				</div>
			)}
		</>
	);
};

export default MobileBar;

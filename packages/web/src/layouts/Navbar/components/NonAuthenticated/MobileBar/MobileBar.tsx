import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import CloseIcon from "../../../../../components/Icons/CloseIcon/CloseIcon";
import FriendsIcon from "../../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../../components/Icons/GamingIcon/GamingIcon";
import MoreIcon from "../../../../../components/Icons/MoreIcon/MoreIcon";
import QuestionIcon from "../../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../../components/Icons/UserIcon/UserIcon";
import WarningIcon from "../../../../../components/Icons/WarningIcon/WarningIcon";
import constants from "../../../../../constants";

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
					<Link
						to={constants.ROUTES.HOME}
						className="w-12 text-6xl text-white transition-opacity duration-300 labyrinth-font opacity-85 hover:opacity-100"
						onClick={(): void => handleClick("main")}
					>
						L
					</Link>
				</Fade>

				<Fade triggerOnce direction="up" duration={300} delay={100}>
					<button
						className="text-6xl text-white transition-opacity duration-300 labyrinth-font opacity-85 hover:opacity-100"
						onClick={(): void => setSubMenuOpened(!subMenuOpened)}
					>
						{subMenuOpened ? (
							<CloseIcon className="w-20 h-20" />
						) : (
							<MoreIcon className="w-12 h-12" />
						)}
					</button>
				</Fade>

				<Fade triggerOnce direction="right" duration={300} delay={100}>
					<Link
						to={constants.ROUTES.AUTH.LOGIN}
						className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
					>
						<UserIcon className="w-12 h-12" />
					</Link>
				</Fade>
			</div>

			{subMenuOpened && (
				<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
					<Fade
						triggerOnce
						direction="up"
						duration={300}
						delay={100}
						className="w-full h-full"
					>
						<div className="flex items-center justify-between w-full h-full px-5 bg-black bg-opacity-70">
							<Link
								to={constants.ROUTES.HOME + "#why-should-you-use"}
								className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
								onClick={(): void => handleClick("#why-should-you-use")}
							>
								<QuestionIcon className="w-11 h-11" />
							</Link>
							<Link
								to={constants.ROUTES.HOME + "#what-is-labyrinthine"}
								className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
								onClick={(): void => handleClick("#what-is-labyrinthine")}
							>
								<GamingIcon className="w-11 h-11" />
							</Link>
							<Link
								to={constants.ROUTES.HOME + "#important-note"}
								className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
								onClick={(): void => handleClick("#important-note")}
							>
								<WarningIcon className="w-11 h-11" />
							</Link>
							<Link
								to={constants.ROUTES.HOME + "#help-friends"}
								className="text-white transition-opacity duration-300 opacity-85 hover:opacity-100"
								onClick={(): void => handleClick("#help-friends")}
							>
								<FriendsIcon className="w-11 h-11" />
							</Link>
						</div>
					</Fade>
				</div>
			)}
		</>
	);
};

export default MobileBar;

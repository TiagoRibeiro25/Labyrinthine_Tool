import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../../../components/Icons/CloseIcon/CloseIcon";
import FriendsIcon from "../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../components/Icons/GamingIcon/GamingIcon";
import MoreIcon from "../../../../components/Icons/MoreIcon/MoreIcon";
import QuestionIcon from "../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../components/Icons/UserIcon/UserIcon";
import WarningIcon from "../../../../components/Icons/WarningIcon/WarningIcon";
import constants from "../../../../constants";
import NavButton from "../NavButton/NavButton";

type Props = {
	onButtonClick: (
		target: string,
		setSubMenuOpenedAction: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
};

const NonAuthenticatedNavbar: React.FC<Props> = ({ onButtonClick }): React.JSX.Element => {
	const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);

	return (
		<>
			<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
				<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
					<NavButton
						to={constants.ROUTES.HOME}
						className="text-6xl labyrinth-font"
						onClick={(): void => onButtonClick("main", setSubMenuOpened)}
					>
						L
					</NavButton>
				</Fade>

				<div className="flex flex-col items-center w-full space-y-5">
					<Fade triggerOnce direction="left" duration={300} delay={100}>
						<NavButton
							to={constants.ROUTES.HOME + "#why-should-you-use"}
							onClick={(): void => onButtonClick("#why-should-you-use", setSubMenuOpened)}
						>
							<QuestionIcon className="w-11 h-11" />
						</NavButton>
						<NavButton
							to={constants.ROUTES.HOME + "#what-is-labyrinthine"}
							onClick={(): void => onButtonClick("#what-is-labyrinthine", setSubMenuOpened)}
						>
							<GamingIcon className="w-11 h-11" />
						</NavButton>
						<NavButton
							to={constants.ROUTES.HOME + "#important-note"}
							onClick={(): void => onButtonClick("#important-note", setSubMenuOpened)}
						>
							<WarningIcon className="w-11 h-11" />
						</NavButton>
						<NavButton
							to={constants.ROUTES.HOME + "#help-friends"}
							onClick={(): void => onButtonClick("#help-friends", setSubMenuOpened)}
						>
							<FriendsIcon className="w-11 h-11" />
						</NavButton>
					</Fade>
				</div>

				<div className="pb-6">
					<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
						<NavButton to={constants.ROUTES.AUTH.LOGIN}>
							<UserIcon className="w-10 h-10" />
						</NavButton>
					</Fade>
				</div>

				<div className="sm:hidden h-[80px] w-full bg-black fixed bottom-0 left-0 z-20 items-center justify-between flex px-5">
					<Fade triggerOnce className="pt-3" direction="left" duration={300} delay={100}>
						<NavButton
							to={constants.ROUTES.HOME}
							className="w-12 text-6xl labyrinth-font"
							onClick={(): void => onButtonClick("main", setSubMenuOpened)}
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
			</div>

			{subMenuOpened && (
				<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
					<Fade triggerOnce direction="up" duration={300} delay={100} className="w-full h-full">
						<div className="flex items-center justify-between w-full h-full px-5 bg-black bg-opacity-70">
							<NavButton
								to={constants.ROUTES.HOME + "#why-should-you-use"}
								onClick={(): void => onButtonClick("#why-should-you-use", setSubMenuOpened)}
							>
								<QuestionIcon className="w-11 h-11" />
							</NavButton>
							<NavButton
								to={constants.ROUTES.HOME + "#what-is-labyrinthine"}
								onClick={(): void => onButtonClick("#what-is-labyrinthine", setSubMenuOpened)}
							>
								<GamingIcon className="w-11 h-11" />
							</NavButton>
							<NavButton
								to={constants.ROUTES.HOME + "#important-note"}
								onClick={(): void => onButtonClick("#important-note", setSubMenuOpened)}
							>
								<WarningIcon className="w-11 h-11" />
							</NavButton>
							<NavButton
								to={constants.ROUTES.HOME + "#help-friends"}
								onClick={(): void => onButtonClick("#help-friends", setSubMenuOpened)}
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

export default NonAuthenticatedNavbar;

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../../../components/Icons/CloseIcon/CloseIcon";
import MoreIcon from "../../../../components/Icons/MoreIcon/MoreIcon";
import NavButton from "../NavButton/NavButton";
import FirstButton from "./components/FirstButton/FirstButton";
import LastButton from "./components/LastButton/LastButton";
import MiddleButtons from "./components/MiddleButtons/MiddleButtons";

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
			{/* DESKTOP NAVBAR */}
			<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
				<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
					<FirstButton onClick={(): void => onButtonClick("main", setSubMenuOpened)} />
				</Fade>

				<div className="flex flex-col items-center w-full">
					<Fade triggerOnce direction="left" duration={300} delay={100}>
						<MiddleButtons onButtonClick={(id): void => onButtonClick(id, setSubMenuOpened)} />
					</Fade>
				</div>

				<div className="pb-6">
					<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
						<LastButton
							className="w-10 h-10"
							onClick={(): void => onButtonClick("main", setSubMenuOpened)}
						/>
					</Fade>
				</div>
			</div>

			{/* MOBILE NAVBAR */}
			<div className="sm:hidden h-[80px] w-full bg-black fixed bottom-0 left-0 z-20 items-center justify-between flex px-5">
				<Fade triggerOnce className="pt-3" direction="left" duration={300} delay={100}>
					<FirstButton
						className="w-12"
						onClick={(): void => onButtonClick("main", setSubMenuOpened)}
					/>
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
					<LastButton
						className="w-12 h-12"
						onClick={(): void => onButtonClick("main", setSubMenuOpened)}
					/>
				</Fade>
			</div>

			{subMenuOpened && (
				<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
					<Fade triggerOnce direction="up" duration={300} delay={100} className="w-full h-full">
						<div className="px-5 bg-black bg-opacity-70">
							<MiddleButtons onButtonClick={(id): void => onButtonClick(id, setSubMenuOpened)} />
						</div>
					</Fade>
				</div>
			)}
		</>
	);
};

export default NonAuthenticatedNavbar;

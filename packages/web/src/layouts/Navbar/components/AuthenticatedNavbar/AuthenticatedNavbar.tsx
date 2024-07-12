import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../../../components/Icons/CloseIcon/CloseIcon";
import MoreIcon from "../../../../components/Icons/MoreIcon/MoreIcon";
import Modal from "../../../../components/Modal/Modal";
import constants from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import useAuthStore from "../../../../stores/auth";
import NavButton from "../NavButton/NavButton";
import LogoutConfirmationModalContent from "./components/LogoutConfirmationModalContent/LogoutConfirmationModalContent";
import ProfileIcon from "../../../../components/Icons/ProfileIcon/ProfileIcon";
import FirstButton from "./components/FirstButton/FirstButton";
import LastButton from "./components/LastButton/LastButton";
import MiddleButtons from "./components/MiddleButtons/MiddleButtons";

type Props = {
	onButtonClick: (
		target: string,
		setSubMenuOpenedAction: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
};

const AuthenticatedNavbar: React.FC<Props> = ({ onButtonClick }): React.JSX.Element => {
	const signOut = useAuthStore((state) => state.signOut);

	const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);
	const [isLogoutButtonHovered, setIsLogoutButtonHovered] = useState<boolean>(false);
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

	const { refetch, isLoading } = useFetch({
		method: "delete",
		route: "/auth/logout",
		runOnMount: false,
	});

	const handleLogout = async (): Promise<void> => {
		if (isLoading) {
			return;
		}

		await refetch();
		signOut();
	};

	return (
		<>
			{/* DESKTOP NAVBAR */}
			<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
				<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
					<FirstButton onClick={(): void => onButtonClick("main", setSubMenuOpened)} />
				</Fade>

				<div className="flex flex-col items-center w-full space-y-5">
					<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
						<MiddleButtons />
					</Fade>
				</div>

				<div className="pb-6">
					<Fade triggerOnce direction="left" duration={300} delay={100} className="pt-6">
						<LastButton
							onMouseEnter={(): void => setIsLogoutButtonHovered(true)}
							onMouseLeave={(): void => setIsLogoutButtonHovered(false)}
							onClick={(): void => setShowLogoutModal(true)}
						/>
					</Fade>

					{isLogoutButtonHovered && (
						<div className="absolute bottom-8 left-20 flex items-center justify-center w-24 h-10 bg-black bg-opacity-70 rounded-lg">
							<p className="text-xs">Logout</p>
						</div>
					)}
				</div>
			</div>

			{/* MOBILE NAVBAR */}
			<>
				<div className="sm:hidden h-[80px] w-full bg-black fixed bottom-0 left-0 z-20 items-center justify-between flex px-5">
					<Fade triggerOnce className="pt-3" direction="left" duration={300} delay={100}>
						<FirstButton
							className="w-12"
							onClick={(): void => onButtonClick("main", setSubMenuOpened)}
						/>
					</Fade>

					<Fade
						className="justify-center flex"
						triggerOnce
						direction="up"
						duration={300}
						delay={100}
					>
						<NavButton onClick={(): void => setSubMenuOpened(!subMenuOpened)}>
							{subMenuOpened ? (
								<CloseIcon className="w-20 h-20" />
							) : (
								<MoreIcon className="w-12 h-12" />
							)}
						</NavButton>
					</Fade>

					<Fade triggerOnce direction="right" duration={300} delay={100}>
						<LastButton className="mt-2" onClick={(): void => setShowLogoutModal(true)} />
					</Fade>
				</div>

				{subMenuOpened && (
					<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
						<Fade triggerOnce direction="up" duration={300} delay={100} className="w-full h-full">
							<div className="flex items-center justify-between w-full h-full px-5 bg-black bg-opacity-70">
								<MiddleButtons />
							</div>
						</Fade>
					</div>
				)}
			</>

			<Modal
				id="logout-modal"
				show={showLogoutModal}
				onClose={(): void => setShowLogoutModal(false)}
			>
				{isLoading ? (
					<h2 className="text-2xl font-bold text-center labyrinth-font mt-3">Signning out...</h2>
				) : (
					<LogoutConfirmationModalContent
						onConfirm={handleLogout}
						onCancel={(): void => setShowLogoutModal(false)}
					/>
				)}
			</Modal>
		</>
	);
};

export default AuthenticatedNavbar;

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../../../components/Icons/CloseIcon/CloseIcon";
import LogoutIcon from "../../../../components/Icons/LogoutIcon/LogoutIcon";
import MoreIcon from "../../../../components/Icons/MoreIcon/MoreIcon";
import QuestionIcon from "../../../../components/Icons/QuestionIcon/QuestionIcon";
import UserIcon from "../../../../components/Icons/UserIcon/UserIcon";
import Modal from "../../../../components/Modal/Modal";
import constants from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import useAuthStore from "../../../../stores/auth";
import NavButton from "../NavButton/NavButton";
import LogoutConfirmationModalContent from "./components/LogoutConfirmationModalContent/LogoutConfirmationModalContent";

const AuthenticatedNavbar: React.FC = (): React.JSX.Element => {
	const signOut = useAuthStore((state) => state.signOut);

	const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);

	const [isLogoutButtonHovered, setIsLogoutButtonHovered] = useState<boolean>(false);
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

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
			{/* TODO: Add Fade */}
			<div className="hidden sm:flex flex-col items-center justify-between w-[80px] h-full bg-black bg-opacity-70">
				<div className="pt-6">
					<NavButton
						to={constants.ROUTES.HOME}
						onClick={(): void => handleClick("main")}
						className="text-6xl labyrinth-font"
					>
						L
					</NavButton>
				</div>

				<div className="flex flex-col items-center w-full space-y-5">
					<NavButton to={constants.ROUTES.HOME}>
						<QuestionIcon className="w-11 h-11" />
					</NavButton>
				</div>

				<div className="pb-6">
					<NavButton
						onMouseEnter={(): void => setIsLogoutButtonHovered(true)}
						onMouseLeave={(): void => setIsLogoutButtonHovered(false)}
						onClick={(): void => setShowLogoutModal(true)}
					>
						<LogoutIcon className="w-10 h-10" />
					</NavButton>

					{isLogoutButtonHovered && (
						<div className="absolute bottom-8 left-20 flex items-center justify-center w-24 h-10 bg-black bg-opacity-70 rounded-lg">
							<p className="text-xs">Logout</p>
						</div>
					)}
				</div>
			</div>

			{/* MOBILE NAVBAR */}
			{/* TODO: Add logout button */}
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
						<NavButton to={constants.ROUTES.AUTH.LOGIN}>
							<UserIcon className="w-12 h-12" />
						</NavButton>
					</Fade>
				</div>

				{subMenuOpened && (
					<div className="sm:hidden h-[80px] w-full fixed bottom-[80px] left-0 z-10 flex justify-evenly">
						<Fade triggerOnce direction="up" duration={300} delay={100} className="w-full h-full">
							<div className="flex items-center justify-between w-full h-full px-5 bg-black bg-opacity-70">
								<NavButton to={constants.ROUTES.HOME}>
									<QuestionIcon className="w-11 h-11" />
								</NavButton>
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
					<p>Loading...</p>
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

import React, { useState } from "react";
import LogoutIcon from "../../../../../components/Icons/LogoutIcon/LogoutIcon";
import QuestionIcon from "../../../../../components/Icons/QuestionIcon/QuestionIcon";
import Modal from "../../../../../components/Modal/Modal";
import constants from "../../../../../constants";
import useFetch from "../../../../../hooks/useFetch";
import useAuthStore from "../../../../../stores/auth";
import NavButton from "../../NavButton/NavButton";
import LogoutConfirmationModalContent from "../LogoutConfirmationModalContent/LogoutConfirmationModalContent";

const DesktopBar: React.FC = (): React.JSX.Element => {
	const signOut = useAuthStore((state) => state.signOut);

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
			</div>
		</div>
	);
};

export default DesktopBar;

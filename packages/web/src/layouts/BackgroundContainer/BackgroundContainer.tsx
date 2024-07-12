import React, { PropsWithChildren } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import AuthBgImage from "../../assets/images/candle.webp";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import UserBgImage from "../../assets/images/chap1.jpg";
import NotFoundImage from "../../assets/images/do_not_enter.png";
import constants from "../../constants";
import useMainLoadingStore from "../../stores/mainLoading";
import Navbar from "../Navbar/Navbar";
import LoadingDots from "./components/LoadingDots/LoadingDots";

type Props = PropsWithChildren & {
	renderNavbar?: boolean;
	loading?: boolean;
};

const BackgroundContainer: React.FC<Props> = ({
	children,
	renderNavbar = true,
}): React.JSX.Element => {
	const location = useLocation();

	const isLoading = useMainLoadingStore((state) => state.isLoading);
	const loadingMessage = useMainLoadingStore((state) => state.loadingMessage);

	const getBackgroundImage = (): string => {
		if (location.pathname === constants.ROUTES.NOT_FOUND) {
			return NotFoundImage;
		}

		if (location.pathname.startsWith(constants.ROUTES.AUTH.PREFIX)) {
			return AuthBgImage;
		}

		if (location.pathname.startsWith(constants.ROUTES.USER.PREFIX)) {
			return UserBgImage;
		}

		return DefaultBgImage;
	};

	return (
		<div className="h-[100dvh]">
			<div className="h-full">
				<Fade triggerOnce>
					<img
						src={getBackgroundImage()}
						alt="Background Image"
						className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
					/>
				</Fade>

				<Fade className="flex justify-center h-full" duration={1200} delay={200} triggerOnce>
					<div className="w-full bg-black bg-opacity-40 -z-40">
						{isLoading ? (
							<div className="flex flex-row items-center justify-center h-full">
								<h1 className="z-50 text-5xl font-bold labyrinth-font">{loadingMessage}</h1>
								<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
							</div>
						) : (
							<div className="flex flex-row h-full">
								<header>{renderNavbar && <Navbar />}</header>

								<Fade className="w-full h-full bg-black bg-opacity-40" duration={1200} triggerOnce>
									<main className="h-full overflow-x-hidden overflow-y-auto">{children}</main>
								</Fade>
							</div>
						)}
					</div>
				</Fade>
			</div>
		</div>
	);
};

export default BackgroundContainer;

import React, { PropsWithChildren, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import AuthBgImage from "../../assets/images/candle.webp";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import NotFoundImage from "../../assets/images/do_not_enter.png";
import constants from "../../constants";
import Navbar from "../Navbar/Navbar";
import LoadingDots from "./components/LoadingDots/LoadingDots";

const INITIAL_DELAY = 200;
const INITIAL_DURATION = 1200;

type Props = PropsWithChildren & {
	renderNavbar?: boolean;
	loading?: boolean;
	loadingMessage?: string;
};

const BackgroundContainer: React.FC<Props> = ({
	children,
	renderNavbar = true,
	loading = false,
	loadingMessage = "Loading",
}): React.JSX.Element => {
	const location = useLocation();
	const [loadingState, setLoadingState] = useState<boolean>(true);

	const getBackgroundImage = (): string => {
		if (location.pathname === constants.ROUTES.NOT_FOUND) {
			return NotFoundImage;
		}

		if (location.pathname.startsWith(constants.ROUTES.AUTH.PREFIX)) {
			return AuthBgImage;
		}

		return DefaultBgImage;
	};

	useEffect(() => {
		let timeout: number | undefined;

		if (loadingState) {
			// TODO (tiago): Ping the server to check if the user is authenticated
			timeout = setTimeout(() => {
				setLoadingState(false);
			}, INITIAL_DURATION + INITIAL_DELAY);
		}

		return (): void => clearTimeout(timeout);
	}, [loading, loadingState]);

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

				<Fade
					className="flex justify-center h-full"
					duration={INITIAL_DURATION}
					delay={INITIAL_DELAY}
					triggerOnce
				>
					<div className="w-full bg-black bg-opacity-45 -z-40">
						{loadingState ? (
							<div className="flex flex-row items-center justify-center h-full">
								<h1 className="z-50 text-5xl font-bold labyrinth-font">{loadingMessage}</h1>
								<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
							</div>
						) : (
							<div className="flex flex-row h-full">
								<header>{renderNavbar && <Navbar />}</header>

								<Fade
									className="w-full h-full bg-black bg-opacity-50"
									duration={1200}
									triggerOnce
								>
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

import React, { PropsWithChildren, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import NotFoundImage from "../../assets/images/do_not_enter.png";
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

	useEffect(() => {
		let timeout: number | undefined;

		if (loadingState) {
			// TODO: Ping the server to check if the user is authenticated
			timeout = setTimeout(() => {
				setLoadingState(false);
			}, INITIAL_DURATION + INITIAL_DELAY);
		}

		return (): void => clearTimeout(timeout);
	}, [loading, loadingState]);

	return (
		<div className="h-[100dvh] min-h-[700px]">
			<div className="h-full">
				<img
					src={location.pathname === "/404" ? NotFoundImage : DefaultBgImage}
					alt="Background Image"
					className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
				/>

				<Fade
					className="flex justify-center h-full"
					duration={INITIAL_DURATION}
					delay={INITIAL_DELAY}
					triggerOnce
				>
					<div className="w-full bg-black bg-opacity-65 -z-40">
						{loadingState ? (
							<div className="flex flex-row items-center justify-center h-full">
								<h1 className="z-50 text-5xl font-bold labyrinth-font">{loadingMessage}</h1>
								<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
							</div>
						) : (
							<div className="flex flex-row h-full">
								<header>{renderNavbar && <Navbar />}</header>

								<Fade
									className="w-full h-full min-w-[500px] bg-black bg-opacity-30 backdrop-blur-md"
									duration={1200}
									triggerOnce
								>
									<main className="h-full p-10">{children}</main>
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

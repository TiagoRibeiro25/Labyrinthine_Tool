import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import NotFoundImage from "../../assets/images/do_not_enter.png";
import Navbar from "../Navbar/Navbar";
import LoadingDots from "./components/LoadingDots/LoadingDots";

type Props = {
	children: React.ReactNode;
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
		if (loadingState) {
			// TODO: Ping the server to check if the user is authenticated
			setTimeout(() => {
				setLoadingState(false);
			}, 3000);
		}
	}, [loading, loadingState]);

	return (
		<div className="h-[100dvh] min-h-[700px]">
			<div className="h-full">
				<img
					src={location.pathname === "/404" ? NotFoundImage : DefaultBgImage}
					alt="Background Image"
					className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
				/>

				<Fade className="flex justify-center h-full" duration={1500}>
					<div className="w-full bg-black bg-opacity-65 -z-40">
						{loadingState ? (
							<div className="flex flex-row items-center justify-center h-full">
								<h1 className="z-50 text-5xl font-bold text-white labyrinth-font">
									{loadingMessage}
								</h1>
								<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2 text-white" />
							</div>
						) : (
							<div className="flex flex-row h-full">
								<header>{renderNavbar && <Navbar />}</header>

								<Fade
									className="w-full min-w-[500px] bg-black bg-opacity-30 backdrop-blur-md p-10"
									duration={1200}
								>
									<main>{children}</main>
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

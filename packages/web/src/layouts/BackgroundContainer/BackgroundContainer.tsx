import React from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import NotFoundImage from "../../assets/images/do_not_enter.png";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
	children: React.ReactNode;
	renderSidebar?: boolean;
};

const BackgroundContainer: React.FC<Props> = ({
	children,
	renderSidebar = true,
}): React.JSX.Element => {
	const location = useLocation();

	return (
		<div className="h-[100dvh] min-h-[700px]">
			<div className="h-full">
				<img
					src={location.pathname === "/404" ? NotFoundImage : DefaultBgImage}
					alt="Background Image"
					className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
				/>

				<Fade className="top-0 left-0 flex justify-center w-full h-full" duration={1200}>
					<div className="top-0 left-0 flex flex-row w-full h-full bg-black bg-opacity-50">
						<header>{renderSidebar && <Sidebar />}</header>

						<Fade
							className="h-full top-0 left-0 w-full min-w-[500px] bg-black bg-opacity-50 backdrop-blur-md p-10"
							delay={1200}
						>
							<main>{children}</main>
						</Fade>
					</div>
				</Fade>
			</div>
		</div>
	);
};

export default BackgroundContainer;

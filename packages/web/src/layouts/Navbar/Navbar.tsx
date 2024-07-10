import React from "react";
import { Fade } from "react-awesome-reveal";
// import DesktopBar from "./components/DesktopBar/DesktopBar";
// import MobileBar from "./components/MobileBar/MobileBar";
import NonAuthenticatedDesktopBar from "./components/NonAuthenticated/DesktopBar/DesktopBar";
import NonAuthenticatedMobileBar from "./components/NonAuthenticated/MobileBar/MobileBar";

const Navbar: React.FC = (): React.JSX.Element => {
	return (
		<>
			<Fade className="sm:h-full">
				<NonAuthenticatedDesktopBar />
			</Fade>

			<NonAuthenticatedMobileBar />
		</>
	);
};

export default Navbar;

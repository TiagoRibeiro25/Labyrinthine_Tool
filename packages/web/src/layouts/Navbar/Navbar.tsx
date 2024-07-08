import React from "react";
import { Fade } from "react-awesome-reveal";
import DesktopBar from "./components/DesktopBar/DesktopBar";
import MobileBar from "./components/MobileBar/MobileBar";

const Navbar: React.FC = (): React.JSX.Element => {
	return (
		<>
			<Fade delay={1200} className="sm:h-full">
				<DesktopBar />
			</Fade>

			<MobileBar />
		</>
	);
};

export default Navbar;

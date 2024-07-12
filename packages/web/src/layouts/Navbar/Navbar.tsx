import React from "react";
import { Fade } from "react-awesome-reveal";
import useAuthStore from "../../stores/auth";
import NonAuthenticatedDesktopBar from "./components/NonAuthenticated/DesktopBar/DesktopBar";
import NonAuthenticatedMobileBar from "./components/NonAuthenticated/MobileBar/MobileBar";
import AuthenticatedNavbar from "./components/AuthenticatedNavbar/AuthenticatedNavbar";

const Navbar: React.FC = (): React.JSX.Element => {
	const isAuthenticated: boolean = !!useAuthStore((state) => state.loggedUser);

	return (
		<>
			{isAuthenticated ? (
				<AuthenticatedNavbar />
			) : (
				<>
					<Fade className="sm:h-full">
						<NonAuthenticatedDesktopBar />
					</Fade>

					<NonAuthenticatedMobileBar />
				</>
			)}
		</>
	);
};

export default Navbar;

import React from "react";
import { Fade } from "react-awesome-reveal";
import useAuthStore from "../../stores/auth";
import AuthenticatedDesktopBar from "./components/Authenticated/DesktopBar/DesktopBar";
import AuthenticatedMobileBar from "./components/Authenticated/MobileBar/MobileBar";
import NonAuthenticatedDesktopBar from "./components/NonAuthenticated/DesktopBar/DesktopBar";
import NonAuthenticatedMobileBar from "./components/NonAuthenticated/MobileBar/MobileBar";

const Navbar: React.FC = (): React.JSX.Element => {
	const isAuthenticated: boolean = !!useAuthStore((state) => state.loggedUser);

	return (
		<>
			{isAuthenticated ? (
				<>
					<Fade className="sm:h-full">
						<AuthenticatedDesktopBar />
					</Fade>

					<AuthenticatedMobileBar />
				</>
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

import React from "react";
import useAuthStore from "../../stores/auth";
import AuthenticatedNavbar from "./components/AuthenticatedNavbar/AuthenticatedNavbar";
import NonAuthenticatedNavbar from "./components/NonAuthenticatedNavbar/NonAuthenticatedNavbar";

const Navbar: React.FC = (): React.JSX.Element => {
	const isAuthenticated: boolean = !!useAuthStore((state) => state.loggedUser);

	const handleClick = (
		target: string,
		setSubMenuOpenedAction: React.Dispatch<React.SetStateAction<boolean>>
	): void => {
		if (target === "main") {
			document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			setTimeout(() => {
				document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}

		setSubMenuOpenedAction(false);
	};

	return (
		<>
			{isAuthenticated ? (
				<AuthenticatedNavbar onButtonClick={handleClick} />
			) : (
				<NonAuthenticatedNavbar onButtonClick={handleClick} />
			)}
		</>
	);
};

export default Navbar;

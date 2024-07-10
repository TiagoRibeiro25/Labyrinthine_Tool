import React from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import constants from "../../constants";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

const Auth: React.FC = (): React.JSX.Element => {
	const location = useLocation();

	return (
		<div className="flex flex-col items-center pt-14">
			<Fade triggerOnce direction="up" duration={800} cascade>
				<h1 className="text-4xl font-bold labyrinth-font">
					{location.pathname === constants.ROUTES.AUTH.LOGIN ? "Login" : "Create Account"}
				</h1>
			</Fade>

			<div className="w-full p-5 mt-20 bg-black bg-opacity-50 border rounded-3xl max-w-[700px]">
				{location.pathname === constants.ROUTES.AUTH.LOGIN ? <Login /> : <SignUp />}
			</div>
		</div>
	);
};

export default Auth;

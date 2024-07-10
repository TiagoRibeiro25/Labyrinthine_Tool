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
			<Fade triggerOnce direction="up" duration={800}>
				<h1 className="text-4xl font-bold labyrinth-font">
					{location.pathname === constants.ROUTES.AUTH.LOGIN ? "Login" : "Create Account"}
				</h1>
			</Fade>

			<Fade
				triggerOnce
				direction="up"
				duration={800}
				delay={200}
				className="flex justify-center w-full"
			>
				<div className="w-full p-7 mt-20 bg-black bg-opacity-60 border rounded-3xl max-w-[700px]">
					{location.pathname === constants.ROUTES.AUTH.LOGIN ? <Login /> : <SignUp />}
				</div>
			</Fade>
		</div>
	);
};

export default Auth;

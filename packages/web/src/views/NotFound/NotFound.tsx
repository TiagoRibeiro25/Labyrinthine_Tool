import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const NotFound: React.FC = (): React.JSX.Element => {
	return (
		<div className="flex flex-col items-center">
			<Fade triggerOnce direction="up" delay={100} duration={800}>
				<h1 className="mt-20 text-6xl text-center text-gray-200 labyrinth-font">Oops!</h1>
			</Fade>

			<Fade triggerOnce direction="up" delay={800} duration={800}>
				<p className="mt-5 text-center text-gray-200">
					The page you are looking for does not exist.
				</p>
			</Fade>

			<Fade className="mt-12" triggerOnce direction="up" delay={1500} duration={800}>
				<Link to="/">
					<Button reversedColors>Back to Home</Button>
				</Link>
			</Fade>
		</div>
	);
};

export default NotFound;

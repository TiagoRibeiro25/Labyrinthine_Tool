import React from "react";
import { Link } from "react-router-dom";
import constants from "../../../../constants";

const MobileBar: React.FC = (): React.JSX.Element => {
	return (
		<div className="sm:hidden h-[80px] w-full bg-black bg-opacity-70 fixed bottom-0 left-0 z-20 items-center flex px-5 pt-2">
			<div>
				<Link
					to={constants.ROUTES.HOME}
					className="text-6xl text-white transition-opacity duration-300 labyrinth-font opacity-85 hover:opacity-100"
					onClick={(): void => {
						document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					L
				</Link>
			</div>
		</div>
	);
};

export default MobileBar;

import React from "react";
import { Link } from "react-router-dom";

const DesktopBar: React.FC = (): React.JSX.Element => {
	return (
		<div className="hidden sm:block w-[80px] h-full bg-black bg-opacity-70">
			<h2 className="text-white">Navbar</h2>

			<Link to={"/somewhere"}>404</Link>
		</div>
	);
};

export default DesktopBar;

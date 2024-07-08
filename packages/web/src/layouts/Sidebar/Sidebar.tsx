import React from "react";
import { Fade } from "react-awesome-reveal";

const Sidebar: React.FC = (): React.JSX.Element => {
	return (
		<Fade delay={1200} className="w-[80px] h-full bg-black bg-opacity-70 backdrop-blur-md">
			<h2 className="text-white">Sidebar</h2>
		</Fade>
	);
};

export default Sidebar;

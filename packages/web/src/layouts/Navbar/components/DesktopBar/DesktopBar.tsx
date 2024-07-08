import React from "react";

const DesktopBar: React.FC = (): React.JSX.Element => {
	return (
		<div className="hidden sm:block w-[80px] h-full bg-black bg-opacity-70 backdrop-blur-md">
			<h2 className="text-white">Navbar</h2>
		</div>
	);
};

export default DesktopBar;

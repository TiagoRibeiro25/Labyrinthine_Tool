import React from "react";

const MobileBar: React.FC = (): React.JSX.Element => {
	return (
		<div className="sm:hidden h-[80px] w-full bg-black bg-opacity-70 backdrop-blur-md fixed bottom-0 left-0 z-20">
			<h2 className="z-50 text-white">Navbar</h2>
		</div>
	);
};

export default MobileBar;

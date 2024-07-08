import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Navigation;

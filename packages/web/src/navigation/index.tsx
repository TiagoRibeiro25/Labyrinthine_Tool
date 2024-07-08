import React from "react";
import { Route, Routes } from "react-router-dom";
import BackgroundContainer from "../layouts/BackgroundContainer/BackgroundContainer";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<BackgroundContainer>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BackgroundContainer>
	);
};

export default Navigation;

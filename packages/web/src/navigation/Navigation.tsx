import React from "react";
import { Route, Routes } from "react-router-dom";
import BackgroundContainer from "../layouts/BackgroundContainer/BackgroundContainer";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";
import RedirectTo404 from "./RedirectTo404/RedirectTo404";

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<BackgroundContainer>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<RedirectTo404 />} />
			</Routes>
		</BackgroundContainer>
	);
};

export default Navigation;

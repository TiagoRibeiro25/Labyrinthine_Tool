import React from "react";
import { Route, Routes } from "react-router-dom";
import constants from "../constants";
import Auth from "../views/Auth/Auth";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import RedirectTo404 from "./RedirectTo404/RedirectTo404";

const Navigation: React.FC = (): React.JSX.Element => {
	return (
		<Routes>
			<Route path={constants.ROUTES.HOME} element={<Home />} />
			<Route path={constants.ROUTES.NOT_FOUND} element={<NotFound />} />
			<ProtectedRoute
				path={constants.ROUTES.AUTH.PREFIX + "/*"}
				element={<Auth />}
				cannotBeAuthenticated={true}
				redirectPath={constants.ROUTES.HOME}
			/>
			<Route path="*" element={<RedirectTo404 />} />
		</Routes>
	);
};

export default Navigation;

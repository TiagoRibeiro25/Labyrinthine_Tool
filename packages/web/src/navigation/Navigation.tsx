import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import constants from "../constants";
import useAuthStore from "../stores/auth";
import Auth from "../views/Auth/Auth";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";

const DEFAULT_NON_AUTHENTICATED_ROUTE = constants.ROUTES.AUTH.LOGIN;
const DEFAULT_AUTHENTICATED_ROUTE = constants.ROUTES.HOME;

const Navigation: React.FC = (): React.JSX.Element => {
	const isAuthenticated: boolean = !!useAuthStore((state) => state.loggedUser);

	return (
		<Routes>
			<Route path={constants.ROUTES.HOME} element={<Home />} />
			<Route path={constants.ROUTES.NOT_FOUND} element={<NotFound />} />

			<Route
				path={constants.ROUTES.AUTH.PREFIX + "/*"}
				element={
					isAuthenticated ? <Navigate to={DEFAULT_AUTHENTICATED_ROUTE} replace /> : <Auth />
				}
			/>
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	);
};

export default Navigation;

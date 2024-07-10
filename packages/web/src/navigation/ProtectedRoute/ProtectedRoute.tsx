import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import constants from "../../constants";
import useAuthStore from "../../stores/auth";

type Props = {
	path: string;
	element: React.ReactNode;
	mustBeAuthenticated?: boolean;
	cannotBeAuthenticated?: boolean;
	redirectPath?: string;
};

const ProtectedRoute: React.FC<Props> = ({
	path,
	element,
	mustBeAuthenticated,
	redirectPath,
	cannotBeAuthenticated,
}): React.JSX.Element => {
	const navigate = useNavigate();
	const isAuthenticated: boolean = !!useAuthStore((state) => state.loggedUser);

	useEffect(() => {
		if (mustBeAuthenticated && !isAuthenticated) {
			navigate(redirectPath || constants.ROUTES.AUTH.LOGIN);
			return;
		}

		if (isAuthenticated && cannotBeAuthenticated) {
			navigate(redirectPath || constants.ROUTES.HOME);
			return;
		}
	}, [cannotBeAuthenticated, isAuthenticated, mustBeAuthenticated, navigate, redirectPath]);

	return <Route path={path} element={element} />;
};

export default ProtectedRoute;

import React, { PropsWithChildren, useEffect } from "react";
import constants from "../../constants";
import useFetch from "../../hooks/useFetch";
import useAuthStore from "../../stores/auth";
import useMainLoadingStore from "../../stores/mainLoading";
import { SuccessResponseBodyData } from "../../types";

type ResponseData = SuccessResponseBodyData & {
	data: {
		user: {
			id: string;
			username: string;
			discordUsername: string;
			steamProfileUrl: string;
			cosmetics: string[];
			totalFriends: number;
			friendRequestStatus: string;
			isLoggedUser: boolean;
			createdAt: string;
		};
	};
};

const HandleAutoSignInProvider: React.FC<PropsWithChildren> = ({
	children,
}): React.JSX.Element => {
	const setIsLoading = useMainLoadingStore((state) => state.setIsLoading);
	const setLoadingMessage = useMainLoadingStore((state) => state.setLoadingMessage);

	const authToken = useAuthStore((state) => state.authToken);
	const loggedUser = useAuthStore((state) => state.loggedUser);

	const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
	const signOut = useAuthStore((state) => state.signOut);

	const { data, isLoading, isError, refetch } = useFetch({
		method: constants.API.ROUTES.USERS.GET_LOGGED_USER.METHOD,
		route: constants.API.ROUTES.USERS.GET_LOGGED_USER.ENDPOINT,
		runOnMount: false,
	});

	useEffect(() => {
		if (!authToken || isLoading || isError || data) {
			return;
		}

		// This means that the user is already logged in
		if (authToken && loggedUser) {
			return;
		}

		refetch();
	}, [authToken, data, isError, isLoading, loggedUser, refetch]);

	useEffect(() => {
		if (isLoading) {
			setIsLoading(true);
			setLoadingMessage("Loading user data");
			return;
		}

		if (data) {
			const bodyData = data as ResponseData;
			setLoggedUser({
				id: bodyData.data.user.id,
				username: bodyData.data.user.username,
			});
		} else if (isError) {
			signOut();
		}

		setIsLoading(false);
	}, [data, isError, isLoading, setIsLoading, setLoadingMessage, setLoggedUser, signOut]);

	return <>{children}</>;
};

export default HandleAutoSignInProvider;

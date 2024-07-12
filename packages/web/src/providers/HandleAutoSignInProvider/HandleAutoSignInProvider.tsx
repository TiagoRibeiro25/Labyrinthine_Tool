import React, { PropsWithChildren, useEffect } from "react";
import useAuthStore from "../../stores/auth";
import useMainLoadingStore from "../../stores/mainLoading";
import { SuccessResponseBodyData } from "../../types";
import useGet from "../../hooks/useGet";

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

const HandleAutoSignInProvider: React.FC<PropsWithChildren> = ({ children }): React.JSX.Element => {
	const setIsLoading = useMainLoadingStore((state) => state.setIsLoading);
	const setLoadingMessage = useMainLoadingStore((state) => state.setLoadingMessage);

	const authToken = useAuthStore((state) => state.authToken);
	const loggedUser = useAuthStore((state) => state.loggedUser);
	const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
	const signOut = useAuthStore((state) => state.signOut);

	const { data, refetch, isLoading, isError } = useGet({
		route: "/users/me",
		runOnMount: false,
	});

	useEffect(() => {
		if (authToken && !loggedUser && !isLoading && !isError) {
			refetch();
			setIsLoading(true);
			setLoadingMessage("Loading user data...");
		}
	}, [authToken, isError, isLoading, loggedUser, refetch, setIsLoading, setLoadingMessage]);

	useEffect(() => {
		if (data && !isError) {
			const bodyData = data as ResponseData;

			setLoggedUser({
				id: bodyData.data.user.id,
				username: bodyData.data.user.username,
			});
		} else if (isError) {
			signOut();
		}

		if (!isLoading) {
			setIsLoading(false);
		}
	}, [data, isError, isLoading, setIsLoading, setLoggedUser, signOut]);

	return <>{children}</>;
};

export default HandleAutoSignInProvider;

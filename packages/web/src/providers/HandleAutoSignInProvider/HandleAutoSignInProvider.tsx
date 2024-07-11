import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import api from "../../api/axios";
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

const HandleAutoSignInProvider: React.FC<PropsWithChildren> = ({ children }): React.JSX.Element => {
	const setIsLoading = useMainLoadingStore((state) => state.setIsLoading);
	const setLoadingMessage = useMainLoadingStore((state) => state.setLoadingMessage);

	const authToken = useAuthStore((state) => state.authToken);
	const updateFirstFetch = useAuthStore((state) => state.updateFirstFetch);
	const setLoggedUser = useAuthStore((state) => state.setLoggedUser);

	const { data, status, refetch } = useQuery({
		queryKey: ["getLoggedUser"],
		queryFn: async () => {
			const response = await api.get("/users/me", {
				headers: { Authorization: authToken },
			});

			return response.data as ResponseData;
		},
		enabled: false,
	});

	useEffect(() => {
		if (status === "success") {
			setLoggedUser({
				id: data.data.user.id,
				username: data.data.user.username,
			});
		}

		if (status !== "pending") {
			updateFirstFetch();
			setIsLoading(false);
		}
	}, [data, setIsLoading, setLoggedUser, status, updateFirstFetch]);

	useEffect(() => {
		if (authToken) {
			refetch();
			setIsLoading(true);
			setLoadingMessage("Loading user data...");
		} else {
			updateFirstFetch();
			setIsLoading(false);
		}
	}, [authToken, refetch, setIsLoading, setLoadingMessage, updateFirstFetch]);

	return <>{children}</>;
};

export default HandleAutoSignInProvider;

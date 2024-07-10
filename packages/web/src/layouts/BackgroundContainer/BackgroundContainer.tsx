import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import AuthBgImage from "../../assets/images/candle.webp";
import DefaultBgImage from "../../assets/images/Chapter_1_Entrance.webp";
import NotFoundImage from "../../assets/images/do_not_enter.png";
import constants from "../../constants";
import useAuthStore from "../../stores/auth";
import { BaseResponseBodyData } from "../../types";
import Navbar from "../Navbar/Navbar";
import LoadingDots from "./components/LoadingDots/LoadingDots";

type ResponseData = BaseResponseBodyData & {
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

type Props = PropsWithChildren & {
	renderNavbar?: boolean;
	loading?: boolean;
	loadingMessage?: string;
};

const BackgroundContainer: React.FC<Props> = ({
	children,
	renderNavbar = true,
	loadingMessage = "Loading",
}): React.JSX.Element => {
	const location = useLocation();
	const authToken = useAuthStore((state) => state.authToken);
	const didFirstFetch = useAuthStore((state) => state.didFirstFetch);
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
		}
	}, [data, setLoggedUser, status, updateFirstFetch]);

	useEffect(() => {
		if (authToken) {
			refetch();
		} else {
			updateFirstFetch();
		}
	}, [authToken, refetch, updateFirstFetch]);

	const getBackgroundImage = (): string => {
		if (location.pathname === constants.ROUTES.NOT_FOUND) {
			return NotFoundImage;
		}

		if (location.pathname.startsWith(constants.ROUTES.AUTH.PREFIX)) {
			return AuthBgImage;
		}

		return DefaultBgImage;
	};

	return (
		<div className="h-[100dvh]">
			<div className="h-full">
				<Fade triggerOnce>
					<img
						src={getBackgroundImage()}
						alt="Background Image"
						className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
					/>
				</Fade>

				<Fade className="flex justify-center h-full" duration={1200} delay={200} triggerOnce>
					<div className="w-full bg-black bg-opacity-45 -z-40">
						{!didFirstFetch ? (
							<div className="flex flex-row items-center justify-center h-full">
								<h1 className="z-50 text-5xl font-bold labyrinth-font">{loadingMessage}</h1>
								<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
							</div>
						) : (
							<div className="flex flex-row h-full">
								<header>{renderNavbar && <Navbar />}</header>

								<Fade
									className="w-full h-full bg-black bg-opacity-50"
									duration={1200}
									triggerOnce
								>
									<main className="h-full overflow-x-hidden overflow-y-auto">{children}</main>
								</Fade>
							</div>
						)}
					</div>
				</Fade>
			</div>
		</div>
	);
};

export default BackgroundContainer;

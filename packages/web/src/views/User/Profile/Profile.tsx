import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import constants from "../../../constants";
import LoadingDots from "../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import useAuthStore from "../../../stores/auth";
import { FriendStatus, SuccessResponseBodyData } from "../../../types";
import Cosmetics from "./components/Cosmetics/Cosmetics";
import Friends from "./components/Friends/Friends";
import HelpUser from "./components/HelpUser/HelpUser";
import UserInfo from "./components/UserInfo/UserInfo";

export type Friend = {
	id: string;
	username: string;
	profilePictureId: string;
};

export type Cosmetic = {
	id: string;
	name: string;
	profilePictureId?: string;
};

export type User = {
	id: string;
	username: string;
	profilePictureId?: string;
	discordUsername?: string;
	steamProfileUrl?: string;
	unlockedCosmetics: number;
	someUnlockedCosmetics: Cosmetic[];
	totalCosmetics: number;
	someFriends: Friend[];
	totalFriends: number;
	friendRequestStatus: FriendStatus;
	isLoggedUser: boolean;
	createdAt: string;
};

type SuccessResponseData = SuccessResponseBodyData & {
	data: {
		user: User;
	};
};

const Profile: React.FC = (): React.JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams();

	const loggedUser = useAuthStore((state) => state.loggedUser);

	const { isLoading, isSuccess, data, isError } = useQuery({
		queryKey: ["user", { id }],
		queryFn: async () => {
			const response = await api.get(`/users/${id}`);
			return response.data as SuccessResponseData;
		},
	});

	useEffect(() => {
		// If the user is logged in and is trying to access their own profile, replace the user id in the URL with "me"
		if (loggedUser && id === loggedUser.id) {
			window.history.replaceState({}, "", constants.ROUTES.USER.PROFILE.replace(":id", "me"));
		} else if (isError) {
			navigate(constants.ROUTES.NOT_FOUND);
		}
	}, [id, isError, loggedUser, navigate]);

	return (
		<div className="flex justify-center sm:px-10">
			<Fade
				triggerOnce
				direction="up"
				duration={600}
				delay={100}
				className="flex justify-center w-full h-full"
			>
				<div className="max-w-[985px] w-full sm:mt-10 mb-10 sm:pb-0 pb-20 bg-black bg-opacity-30 sm:rounded-3xl">
					{isSuccess && data && id && (
						<>
							<Fade triggerOnce cascade direction="up" duration={300} delay={100}>
								<UserInfo user={data.data.user} />
								{data.data.user.totalFriends > 0 && (
									<Friends
										totalFriends={data.data.user.totalFriends}
										userId={id}
										someFriends={data.data.user.someFriends}
									/>
								)}
								<Cosmetics
									someUnlockedCosmetics={data.data.user.someUnlockedCosmetics}
									unlockedCosmetics={data.data.user.unlockedCosmetics}
									userId={id}
								/>
								{data.data.user.unlockedCosmetics < data.data.user.totalCosmetics && (
									<HelpUser
										userId={id}
										isLoggedUser={data.data.user.isLoggedUser}
										missingCosmetics={
											data.data.user.totalCosmetics - data.data.user.unlockedCosmetics
										}
									/>
								)}
							</Fade>
						</>
					)}

					{isLoading && (
						<div className="h-[90vh] flex md:flex-row flex-col justify-center items-center">
							<Fade triggerOnce direction="up" duration={600} delay={400}>
								<h1 className="z-50 text-5xl font-bold text-center labyrinth-font">
									{id === "me" ? "Loading your profile" : "Searching for user"}
								</h1>
								<LoadingDots className="z-50 mt-4 ml-2 w-10 h-10" />
							</Fade>
						</div>
					)}
				</div>
			</Fade>
		</div>
	);
};

export default Profile;

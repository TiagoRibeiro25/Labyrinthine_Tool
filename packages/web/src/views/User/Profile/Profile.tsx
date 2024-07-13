import React, { useEffect } from "react";
import UserInfo from "./components/UserInfo/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { FriendStatus, SuccessResponseBodyData } from "../../../types";
import LoadingDots from "../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import { Fade } from "react-awesome-reveal";
import Friends from "./components/Friends/Friends";
import constants from "../../../constants";

export type Friend = {
	id: string;
	username: string;
	profilePictureId: string;
};

export type User = {
	id: string;
	username: string;
	profilePictureId: string;
	discordUsername?: string;
	steamProfileUrl?: string;
	unlockedCosmetics: string[];
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
	const { id } = useParams(); // User id

	const { isLoading, isSuccess, data, isError } = useQuery({
		queryKey: ["user", { id }],
		queryFn: async () => {
			const response = await api.get(`/users/${id}`);
			return response.data as SuccessResponseData;
		},
	});

	useEffect(() => {
		if (isError) {
			navigate(constants.ROUTES.NOT_FOUND);
		}
	}, [isError, navigate]);

	return (
		<div className="flex justify-center h-full sm:px-10">
			<div className="max-w-[985px] w-full sm:my-10 bg-black bg-opacity-30 sm:rounded-3xl">
				{isSuccess && data && id && (
					<>
						<Fade triggerOnce cascade direction="up" duration={700} delay={200}>
							<UserInfo user={data.data.user} />
							{data.data.user.totalFriends > 0 && (
								<Friends
									totalFriends={data.data.user.totalFriends}
									userId={id}
									someFriends={data.data.user.someFriends}
								/>
							)}
						</Fade>
					</>
				)}

				{isLoading && (
					<div className="h-full flex md:flex-row flex-col justify-center items-center">
						<Fade triggerOnce direction="up" duration={1200} delay={200}>
							<h1 className="z-50 text-5xl font-bold labyrinth-font text-center">
								Searching for user
							</h1>
							<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
						</Fade>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;

import React from "react";
import UserInfo from "./components/UserInfo/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import { FriendStatus, SuccessResponseBodyData } from "../../../types";
import LoadingDots from "../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";

export type User = {
	id: string;
	username: string;
	discordUsername?: string;
	steamProfileUrl?: string;
	unlockedCosmetics: string[];
	totalCosmetics: number;
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
	const { id } = useParams(); // User id

	const { isLoading, isSuccess, data } = useQuery({
		queryKey: ["user", { id }],
		queryFn: async () => {
			const response = await api.get(`/users/${id}`);
			return response.data as SuccessResponseData;
		},
	});

	return (
		<div className="flex justify-center h-full px-10">
			<div className="h-full max-w-[985px] w-full my-10 bg-black bg-opacity-30 rounded-3xl">
				{isSuccess && data && (
					<>
						<UserInfo user={data.data.user} />
					</>
				)}

				{isLoading && (
					<div className="h-full flex md:flex-row flex-col justify-center items-center">
						<h1 className="z-50 text-5xl font-bold labyrinth-font text-center">
							Searching for user
						</h1>
						<LoadingDots className="z-50 w-10 h-10 mt-4 ml-2" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CosmeticIcon from "../../../../../components/Icons/CosmeticIcon/CosmeticIcon";
import DiscordIcon from "../../../../../components/Icons/DiscordIcon/DiscordIcon";
import SteamIcon from "../../../../../components/Icons/SteamIcon/SteamIcon";
import { FriendStatus } from "../../../../../types";
import utils from "../../../../../utils";
import { User } from "../../Profile";
import ActionButton from "./components/ActionButton/ActionButton";

type Props = {
	user: User;
};

type ScoreColor = "red" | "yellow" | "blue" | "green";

const UserInfo: React.FC<Props> = ({ user }): React.JSX.Element => {
	const [scoreColor, setScoreColor] = useState<ScoreColor>("red");
	const [steamUsername, setSteamUsername] = useState<string>("");

	const getScoreColor = (unlocked: number, total: number): ScoreColor => {
		const percentage = (unlocked / total) * 100;
		switch (true) {
			case percentage < 25:
				return "red";
			case percentage < 50:
				return "yellow";
			case percentage < 75:
				return "blue";
			default:
				return "green";
		}
	};

	useEffect(() => {
		setScoreColor(getScoreColor(user.unlockedCosmetics, user.totalCosmetics));
	}, [user.totalCosmetics, user.unlockedCosmetics]);

	useEffect(() => {
		if (user.steamProfileUrl) {
			const username = utils.steam.getSteamLinkUsername(user.steamProfileUrl);
			setSteamUsername(username || "Steam Profile");
		}
	}, [user.steamProfileUrl]);

	return (
		<div className="flex flex-col justify-between items-center p-10 space-x-0 bg-black bg-opacity-50 sm:rounded-3xl lg:flex-row lg:space-x-8 lg:items-start">
			<img
				src={utils.picture.getProfilePicture(user.profilePictureId)}
				alt="Profile Picture"
				className="object-cover w-60 h-60 rounded-3xl border lg:w-44 lg:h-44"
			/>

			<div className="flex flex-col items-center my-6 w-full lg:my-0 lg:items-start">
				<h1 className="mb-4 text-3xl font-bold truncate">{user.username}</h1>

				<div id="socials" className="space-y-2">
					<span className="flex flex-row items-center text-gray-400">
						<SteamIcon className="mr-1" />
						{user.steamProfileUrl ? (
							<a
								href={user.steamProfileUrl}
								target="_blank"
								rel="noreferrer"
								className="flex flex-row items-center hover:underline"
							>
								{steamUsername}
							</a>
						) : (
							<>Unkown</>
						)}
					</span>

					<span className="flex flex-row items-center text-gray-400">
						<DiscordIcon className="mr-1" />
						{user.discordUsername ? <>{user.discordUsername}</> : <>Unkown</>}
					</span>
				</div>
			</div>

			<div className="min-w-[170px] flex flex-col items-center justify-between space-y-5">
				<CosmeticIcon
					className={classNames("w-16 h-16 opacity-85", {
						"text-red-500": scoreColor === "red",
						"text-yellow-500": scoreColor === "yellow",
						"text-blue-500": scoreColor === "blue",
						"text-green-500": scoreColor === "green",
					})}
				/>

				<h2 className="text-2xl font-bold text-center">
					<span
						className={classNames({
							"text-red-500": scoreColor === "red",
							"text-yellow-500": scoreColor === "yellow",
							"text-blue-500": scoreColor === "blue",
							"text-green-500": scoreColor === "green",
						})}
					>
						{user.unlockedCosmetics}
					</span>{" "}
					/ {user.totalCosmetics}
				</h2>

				<ActionButton
					friendStatus={user.friendRequestStatus}
					isLoggedUser={user.isLoggedUser}
					userId={user.id}
					onFriendStatusChange={(newStatus: FriendStatus): void => {
						user.friendRequestStatus = newStatus;
					}}
				/>
			</div>
		</div>
	);
};

export default UserInfo;

import React, { useEffect, useState } from "react";
import CosmeticIcon from "../../../../../components/Icons/CosmeticIcon/CosmeticIcon";
import DiscordIcon from "../../../../../components/Icons/DiscordIcon/DiscordIcon";
import SteamIcon from "../../../../../components/Icons/SteamIcon/SteamIcon";
import ActionButton from "./components/ActionButton/ActionButton";
import classNames from "classnames";
import { User } from "../../Profile";
import utils from "../../../../../utils";
import constants from "../../../../../constants";

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
		<div className="bg-black bg-opacity-50 p-10 sm:rounded-3xl flex lg:flex-row flex-col lg:space-x-8 space-x-0 justify-between items-center lg:items-start">
			<img
				src={constants.PROFILE_PICTURES[user.profilePictureId]}
				alt="Profile Picture"
				className="rounded-3xl border lg:w-44 lg:h-44 w-60 h-60 object-cover"
			/>

			<div className="w-full lg:my-0 my-6 flex lg:items-start flex-col items-center">
				<h1 className="text-3xl font-bold mb-4 truncate">{user.username}</h1>

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

				<ActionButton friendStatus={user.friendRequestStatus} isLoggedUser={user.isLoggedUser} />
			</div>
		</div>
	);
};

export default UserInfo;

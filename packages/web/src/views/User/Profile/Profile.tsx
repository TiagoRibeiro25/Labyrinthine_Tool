import React from "react";
import SteamIcon from "../../../components/Icons/SteamIcon/SteamIcon";
import DiscordIcon from "../../../components/Icons/DiscordIcon/DiscordIcon";
import CosmeticIcon from "../../../components/Icons/CosmeticIcon/CosmeticIcon";

const DUMMY_USER = {
	id: "6e907dab-a111-49fe-93c4-9282288e1b79",
	username: "Tiggy",
	discordUsername: "NeeKrox",
	steamProfileUrl: "https://steamcommunity.com/id/NeeKrox/",
	unlockedCosmetics: [], // Array of strings
	totalCosmetics: 2,
	totalFriends: 0,
	friendRequestStatus: "none",
	isLoggedUser: true,
	createdAt: "2024-07-10T16:15:24.457Z",
};

const Profile: React.FC = (): React.JSX.Element => {
	// TODO: Use react query to fetch user data (so that the data can be cached)

	return (
		<div className="flex justify-center h-full px-10">
			<div className="h-full max-w-[985px] w-full my-10 bg-black bg-opacity-30 rounded-3xl">
				<div className="bg-black bg-opacity-50 p-10 rounded-3xl flex flex-row space-x-8 justify-between">
					<img
						src="https://via.placeholder.com/150"
						alt="Profile Picture"
						className="rounded-3xl border"
					/>

					<div className="w-full">
						<h1 className="text-3xl font-bold mb-3">{DUMMY_USER.username}</h1>

						<div id="socials" className="space-y-1">
							{DUMMY_USER.steamProfileUrl && (
								<a
									href={DUMMY_USER.steamProfileUrl}
									target="_blank"
									rel="noreferrer"
									className="text-blue-500 flex flex-row items-center hover:underline"
								>
									<SteamIcon className="mr-1" />
									Steam Profile
								</a>
							)}

							{DUMMY_USER.discordUsername && (
								<div className="flex flex-row items-center ">
									<DiscordIcon className="mr-1" />
									{DUMMY_USER.discordUsername}
								</div>
							)}
						</div>
					</div>

					<div className="w-[300px] flex justify-center">
						<CosmeticIcon className="w-16 h-16 opacity-85" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

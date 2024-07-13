import { Link } from "react-router-dom";
import Button from "../../../../../components/Button/Button";
import constants from "../../../../../constants";

type Props = {
	missingCosmetics: number;
	isLoggedUser: boolean;
	userId: string;
};

const HelpUser: React.FC<Props> = ({
	missingCosmetics,
	isLoggedUser,
	userId,
}): React.JSX.Element => {
	return (
		<div className="bg-black bg-opacity-50 p-10 sm:rounded-3xl mt-12">
			<h2 className="text-2xl sm:text-3xl labyrinth-font">
				{isLoggedUser ? "Need Help" : "Help this player"}
			</h2>

			<p className="my-2 sm:text-start text-justify">
				{isLoggedUser ? (
					<>
						Do you need help collecting the {missingCosmetics} missing cosmetics? You should join
						the{" "}
						<a
							href={constants.OFFICIAL_DISCORD_INVITE_URL}
							target="_blank"
							rel="noreferrer"
							className="text-gray-300 labyrinth-font hover:underline"
						>
							Official Labyrinthine Discord
						</a>{" "}
						and ask for help there. There are many players willing to help you out!
					</>
				) : (
					<>
						Do you want to help this player collect the {missingCosmetics} missing cosmetics? Add
						them on Steam or Discord and offer your help! Don't forget to tell them about the{" "}
						<a
							href={constants.OFFICIAL_DISCORD_INVITE_URL}
							target="_blank"
							rel="noreferrer"
							className="text-gray-300 labyrinth-font hover:underline"
						>
							Official Labyrinthine Discord
						</a>{" "}
						so they can join and ask for help from other players as well!
					</>
				)}
			</p>

			<div className="flex justify-center mt-6">
				<Link to={constants.ROUTES.USER.COSMETICS.replace(":id", userId) + "?type=locked"}>
					<Button reversedColors>See which cosmetics are missing</Button>
				</Link>
			</div>
		</div>
	);
};

export default HelpUser;

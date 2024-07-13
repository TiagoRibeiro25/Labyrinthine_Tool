import { Link } from "react-router-dom";
import { Friend } from "../../Profile";
import Marquee from "react-fast-marquee";
import constants from "../../../../../constants";

const FriendItem: React.FC<{ friend: Friend }> = ({ friend }): React.JSX.Element => {
	return (
		<div key={friend.id} className="mr-2">
			<Link
				to={
					constants.ROUTES.USER.PROFILE.replace(":id", friend.id) + "?username=" + friend.username
				}
			>
				<img
					src={constants.PROFILE_PICTURES[friend.profilePictureId]}
					alt="Friend"
					className="w-12 h-12 rounded"
				/>
			</Link>
		</div>
	);
};

type Props = {
	totalFriends: number;
	someFriends: Friend[];
	userId: string;
};

const Friends: React.FC<Props> = ({ totalFriends, someFriends, userId }): React.JSX.Element => {
	return (
		<div className="bg-black bg-opacity-50 p-10 sm:rounded-3xl mt-12 flex lg:flex-row flex-col">
			<div className="flex lg:flex-col flex-row lg:items-start items-center">
				<h2 className="text-2xl sm:text-3xl labyrinth-font">Friends</h2>
				<Link
					to={constants.ROUTES.USER.FRIENDS.replace(":id", userId)}
					className="hover:underline lg:ml-0 ml-auto"
				>
					See all {totalFriends} friends
				</Link>
			</div>
			<div className="lg:ml-auto flex items-center lg:max-w-[500px] lg:mt-0 mt-6">
				{someFriends.length >= 7 ? (
					<Marquee
						autoFill
						gradient
						gradientColor="black"
						gradientWidth={50}
						speed={35}
						pauseOnHover={true}
					>
						{someFriends.map((friend) => (
							<FriendItem key={friend.id} friend={friend} />
						))}
					</Marquee>
				) : (
					<div className="flex flex-row">
						{someFriends.map((friend) => (
							<FriendItem key={friend.id} friend={friend} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Friends;

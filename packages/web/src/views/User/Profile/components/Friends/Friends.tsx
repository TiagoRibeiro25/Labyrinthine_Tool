import { Link } from "react-router-dom";
import constants from "../../../../../constants";
import { Friend } from "../../Profile";
import Marquee from "react-fast-marquee";
import utils from "../../../../../utils";

type Props = {
	totalFriends: number;
	someFriends: Friend[];
	userId: string;
};

const Friends: React.FC<Props> = ({ totalFriends, someFriends, userId }): React.JSX.Element => {
	return (
		<div className="bg-black bg-opacity-50 p-10 sm:rounded-3xl mt-12 flex flex-row">
			<div className="flex flex-col">
				<h2 className="text-2xl sm:text-3xl labyrinth-font">Friends</h2>
				<Link to={constants.ROUTES.USER.FRIENDS.replace(":id", userId)} className="hover:underline">
					See all {totalFriends} friends
				</Link>
			</div>
			<div className="ml-auto flex items-center max-w-[500px]">
				{someFriends.length >= 10 ? (
					<Marquee
						autoFill
						gradient
						gradientColor="black"
						gradientWidth={50}
						speed={35}
						pauseOnHover={true}
					>
						{someFriends.map((friend) => (
							<div className="mr-2">
								<Link key={friend.id} to={constants.ROUTES.USER.PROFILE.replace(":id", friend.id)}>
									<img
										src={utils.profilePicture.getPicture(friend.profilePictureId)}
										alt="Friend"
										className="w-12 h-12 rounded"
									/>
								</Link>
							</div>
						))}
					</Marquee>
				) : (
					<div className="flex flex-row">
						{someFriends.map((friend) => (
							<div className="mr-2">
								<Link
									key={friend.id}
									to={
										constants.ROUTES.USER.PROFILE.replace(":id", friend.id) +
										"?username=" +
										friend.username
									}
								>
									<img
										src={utils.profilePicture.getPicture(friend.profilePictureId)}
										alt="Friend"
										className="w-12 h-12 rounded"
									/>
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Friends;

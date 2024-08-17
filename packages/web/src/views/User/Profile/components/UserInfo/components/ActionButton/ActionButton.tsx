import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../../../../../components/Button/Button";
import constants from "../../../../../../../constants";

const STATUS: { [key: string]: string } = {
	none: "Add Friend",
	"waiting for the other user to accept": "Cancel Request",
	"the other user is waiting for you to accept": "Accept Request",
	friends: "Remove Friend",
};

type Props = {
	isLoggedUser: boolean;
	friendStatus: string;
	className?: string;
};

const ActionButton: React.FC<Props> = ({
	isLoggedUser,
	friendStatus,
	className,
}): React.JSX.Element => {
	// const addFriend = useFetch({
	//     route:
	// })

	// TODO: Implement the logic
	const handleClick = async (): Promise<void> => {
		switch (friendStatus) {
			case "none":
				console.log("Add Friend");
				break;
			case "waiting for the other user to accept":
				console.log("Cancel Request");
				break;
			case "the other user is waiting for you to accept":
				console.log("Accept Request");
				break;
			case "friends":
				console.log("Remove Friend");
				break;
			default:
				break;
		}
	};

	return (
		<>
			{isLoggedUser ? (
				<Link to={constants.ROUTES.USER.EDIT_PROFILE}>
					<Button reversedColors className={classNames(className)}>
						Edit Profile
					</Button>
				</Link>
			) : (
				<Button className={classNames(className)} onClick={handleClick}>
					{STATUS[friendStatus]}
				</Button>
			)}
		</>
	);
};

export default ActionButton;

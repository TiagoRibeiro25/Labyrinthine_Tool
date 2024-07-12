import React from "react";
import Button from "../../../../../../../components/Button/Button";
import classNames from "classnames";
import { Link } from "react-router-dom";
import constants from "../../../../../../../constants";

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
	const handleClick = (): void => {
		// TODO: implement the logic
		console.log("clicked");
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
					{friendStatus === "none" && "Add Friend"}
					{friendStatus === "waiting for the other user to accept" && "Cancel Request"}
					{friendStatus === "the other user is waiting for you to accept" && "Accept Request"}
					{friendStatus === "friends" && "Remove Friend"}
				</Button>
			)}
		</>
	);
};

export default ActionButton;

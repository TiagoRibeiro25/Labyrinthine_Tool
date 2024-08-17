import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../../../../components/Button/Button";
import constants from "../../../../../../../constants";
import useFetch from "../../../../../../../hooks/useFetch";
import LoadingDots from "../../../../../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import useWarningStore from "../../../../../../../stores/warning";
import { FriendStatus } from "../../../../../../../types";

const STATUS: { [key: string]: string } = {
	none: "Add Friend",
	"waiting for the other user to accept": "Cancel Request",
	"the other user is waiting for you to accept": "Accept Request",
	friends: "Remove Friend",
};

type Props = {
	isLoggedUser: boolean;
	friendStatus: string;
	userId: string;
	className?: string;
	onFriendStatusChange: (status: FriendStatus) => void;
};

const ActionButton: React.FC<Props> = ({
	isLoggedUser,
	friendStatus,
	userId,
	className,
	onFriendStatusChange,
}): React.JSX.Element => {
	const { addWarning } = useWarningStore();

	// Api Calls
	const addFriend = useFetch({
		method: constants.API.ROUTES.USERS.SEND_REQUEST.METHOD,
		route: constants.API.ROUTES.USERS.SEND_REQUEST.ENDPOINT.replace(":userId", userId),
		runOnMount: false,
	});

	const removeFriend = useFetch({
		method: constants.API.ROUTES.USERS.REMOVE_FRIEND.METHOD,
		route: constants.API.ROUTES.USERS.REMOVE_FRIEND.ENDPOINT.replace(":userId", userId),
		runOnMount: false,
	});

	const acceptFriend = useFetch({
		method: constants.API.ROUTES.USERS.ACCEPT_REQUEST.METHOD,
		route: constants.API.ROUTES.USERS.ACCEPT_REQUEST.ENDPOINT.replace(":userId", userId),
		runOnMount: false,
	});

	// Callbacks
	const isLoading = useCallback((): boolean => {
		return [addFriend.isLoading, removeFriend.isLoading, acceptFriend.isLoading].some(
			(loading) => loading
		);
	}, [acceptFriend.isLoading, addFriend.isLoading, removeFriend.isLoading]);

	const isError = useCallback((): boolean => {
		return [addFriend.isError, removeFriend.isError, acceptFriend.isError].some(
			(error) => error
		);
	}, [acceptFriend.isError, addFriend.isError, removeFriend.isError]);

	const isActionCompleted = useCallback((): boolean => {
		return [addFriend.data, removeFriend.data, acceptFriend.data].some((data) => !!data);
	}, [acceptFriend.data, addFriend.data, removeFriend.data]);

	const handleClick = async (): Promise<void> => {
		// TODO: Fix error 403 in the backend when trying to cancel a friend request or remove a friend
		switch (friendStatus) {
			case "none": // Add Friend
				await addFriend.refetch();
				break;
			case "waiting for the other user to accept": // Cancel Request (same endpoint as add friend)
				await removeFriend.refetch();
				break;
			case "the other user is waiting for you to accept": // Accept Request
				await acceptFriend.refetch();
				break;
			case "friends": // Remove Friend
				// TODO: Add a confirmation dialog for the user to confirm the action before proceeding
				await removeFriend.refetch();
				break;
			default:
				console.log("Invalid action. This should not happen. Something went wrong.");
				break;
		}
	};

	useEffect(() => {
		// If an error occurred while trying to perform the action, display a warning
		if (isError()) {
			addWarning("An error occurred. Please try again later.", "error");
			console.log(
				"An error occurred while trying to perform this action:",
				STATUS[friendStatus]
			);
		}

		// If the action was completed successfully, tell the parent component to update the friend status
		else if (isActionCompleted()) {
			console.log("Action completed successfully");
			const updatedStatus: { [key: string]: string } = {
				none: "waiting for the other user to accept", // Add Friend -> waiting for the other user to accept
				"waiting for the other user to accept": "none", // Cancel Request -> Add Friend
				"the other user is waiting for you to accept": "friends", // Accept Request -> Remove Friend
				friends: "none", // Remove Friend -> Add Friend
			};
			onFriendStatusChange(updatedStatus[friendStatus] as FriendStatus);
		}
	}, [addWarning, friendStatus, isActionCompleted, isError, onFriendStatusChange]);

	if (isLoggedUser) {
		return (
			<Link to={constants.ROUTES.USER.EDIT_PROFILE}>
				<Button reversedColors className={classNames(className)}>
					Edit Profile
				</Button>
			</Link>
		);
	}

	return (
		<>
			{isLoading() ? (
				<LoadingDots className="pt-1 w-9 h-9" />
			) : (
				<Button className={classNames(className)} onClick={handleClick}>
					{STATUS[friendStatus]}
				</Button>
			)}
		</>
	);
};

export default ActionButton;

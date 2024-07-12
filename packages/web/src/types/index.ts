export type SuccessResponseBodyData = {
	message: string;
	statusCode: number;
};

export type ErrorResponseBodyData = {
	message: string;
	statusCode: number;
	error?: string;
	code?: string;
};

export type FriendStatus =
	| "none"
	| "waiting for the other user to accept"
	| "the other user is waiting for you to accept"
	| "friends";

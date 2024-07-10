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

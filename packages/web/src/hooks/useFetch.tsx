import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { AxiosError } from "axios";
import { ErrorResponseBodyData, SuccessResponseBodyData } from "../types";

type Props = {
	route: string;
	body?: unknown;
	runOnMount?: boolean;
	method?: "get" | "post" | "put" | "patch" | "delete";
};

type ResponseData = SuccessResponseBodyData | ErrorResponseBodyData;

const useFetch = ({ route, body, runOnMount = true, method = "get" }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<AxiosError | null>(null);
	const [responseData, setResponseData] = useState<ResponseData | null>(null);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		if (isLoading) {
			return;
		}

		// Reset the state except for the loading state
		setIsLoading(true);
		setIsError(false);
		setResponseData(null);
		setError(null);

		try {
			const response = await api[method](route, { ...(body as object) });
			const bodyData = response.data as SuccessResponseBodyData;
			setResponseData(bodyData);
		} catch (err) {
			setIsError(true);
			setError(err as AxiosError);
		} finally {
			setIsLoading(false);
		}
	}, [isLoading, method, route, body]);

	useEffect(() => {
		if (runOnMount) {
			fetchData();
		}
	}, [fetchData, runOnMount]);

	// Define a function to refetch data with the same URL
	const refetchData = () => fetchData();

	return { isLoading, isError, error, data: responseData, refetch: refetchData };
};

export default useFetch;

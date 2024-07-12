import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { AxiosError } from "axios";
import { ErrorResponseBodyData, SuccessResponseBodyData } from "../types";

type Props = {
	route: string;
	params?: unknown;
	runOnMount?: boolean;
};

type ResponseData = SuccessResponseBodyData | ErrorResponseBodyData;

const useGet = ({ route, params, runOnMount = true }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<AxiosError | null>(null);
	const [responseData, setResponseData] = useState<ResponseData | null>(null);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await api.get(route, { params });
			const bodyData = response.data.data as SuccessResponseBodyData;
			setResponseData(bodyData);
		} catch (err) {
			setError(err as AxiosError);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [route, params]);

	useEffect(() => {
		if (runOnMount) {
			fetchData();
		}

		return () => {
			setIsLoading(false);
			setIsError(false);
			setError(null);
			setResponseData(null);
		};
	}, [fetchData, runOnMount]);

	// Define a function to refetch data with the same URL
	const refetchData = () => fetchData();

	return { isLoading, isError, error, data: responseData, refetch: refetchData };
};

export default useGet;

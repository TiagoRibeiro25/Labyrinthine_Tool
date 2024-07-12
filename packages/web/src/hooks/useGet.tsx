import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { AxiosError } from "axios";

type Props = {
	route: string;
	params?: unknown;
};

const useGet = ({ route, params }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<AxiosError | null>(null);
	const [responseData, setResponseData] = useState(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [status, setStatus] = useState<number | null>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setIsError(false);

		try {
			const response = await api.get(route, { params });
			setStatus(response.status);
			setResponseData(response.data);
		} catch (err) {
			setError(err as AxiosError);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [route, params]);

	useEffect(() => {
		// Call fetchData when the component mounts
		fetchData();

		return () => {
			setIsLoading(false);
			setIsError(false);
			setError(null);
			setResponseData(null);
			setStatus(null);
		};
	}, [fetchData]);

	// Define a function to refetch data with the same URL
	const refetchData = () => fetchData();

	return { isLoading, isError, error, data: responseData, status, refetch: refetchData };
};

export default useGet;

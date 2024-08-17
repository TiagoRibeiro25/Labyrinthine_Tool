import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Input from "../../../../components/Input/Input";
import constants from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import LoadingDots from "../../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import useAuthStore from "../../../../stores/auth";
import { ErrorResponseBodyData, SuccessResponseBodyData } from "../../../../types";
import utils from "./utils";

type SuccessResponseData = SuccessResponseBodyData & {
	data: {
		token: string;
		user: {
			id: string;
			username: string;
		};
	};
};

const Login: React.FC = (): React.JSX.Element => {
	const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
	const setAuthToken = useAuthStore((state) => state.setAuthToken);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const [usernameError, setUsernameError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");

	const { refetch, isLoading, data, isError, error } = useFetch({
		method: constants.API.ROUTES.AUTH.LOGIN.METHOD,
		route: constants.API.ROUTES.AUTH.LOGIN.ENDPOINT,
		body: { username, password },
		runOnMount: false,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (usernameError || passwordError || !username || !password) {
			return;
		}

		await refetch();
	};

	// Handle the response
	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (isError && error) {
			const bodyData = error.response?.data as ErrorResponseBodyData;
			const errorData = utils.handleResponseErrorData(bodyData);
			setUsernameError(errorData.username || "");
			setPasswordError(errorData.password || "");
			return;
		}

		// If it reaches here, it means the request was successful
		if (data) {
			const bodyData = data as SuccessResponseData;

			setAuthToken(bodyData.data.token);
			setLoggedUser(bodyData.data.user);

			// Save the token in the local storage if the user wants to be remembered
			if (rememberMe) {
				localStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, bodyData.data.token);
			} else {
				sessionStorage.setItem(constants.SESSION_STORAGE_KEYS.AUTH_TOKEN, bodyData.data.token);
			}
		}

		// We don't want to re-run this effect when "rememberMe" changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, error, isError, isLoading, setAuthToken, setLoggedUser]);

	// When the user changes the input, remove the error(s) message(s)
	useEffect(() => {
		setUsernameError("");
		setPasswordError("");
	}, [username, password]);

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="Username"
				placeholder="Enter your username"
				id="username"
				value={username}
				error={usernameError}
				autoComplete="username"
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					setUsername(e.target.value);
				}}
				required
			/>

			<Input
				type="password"
				labelClassName="mt-10"
				label="Password"
				placeholder="Enter your password"
				id="password"
				value={password}
				error={passwordError}
				autoComplete="current-password"
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					setPassword(e.target.value);
				}}
				required
			/>

			<Checkbox
				label="Remember me"
				selected={rememberMe}
				onChange={(): void => setRememberMe(!rememberMe)}
				className="mt-8 text-sm text-gray-300"
			/>

			<div className="flex flex-col items-center space-y-6">
				<Link to={constants.ROUTES.AUTH.SIGNUP} className="mt-8 text-sm hover:underline">
					Dont have an account? Sign up
				</Link>

				{isLoading ? (
					<LoadingDots className="w-10 h-10" />
				) : (
					<Button
						type="submit"
						className="w-[200px] mt-4"
						disabled={!!(usernameError || passwordError) || !username || !password}
					>
						Sign In
					</Button>
				)}
			</div>
		</form>
	);
};

export default Login;

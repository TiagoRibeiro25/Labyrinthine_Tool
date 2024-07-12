import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Input from "../../../../components/Input/Input";
import constants from "../../../../constants";
import LoadingDots from "../../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import useAuthStore from "../../../../stores/auth";
import { SuccessResponseBodyData } from "../../../../types";
import useFetch from "../../../../hooks/useFetch";

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

	const { refetch, isLoading, data, isError } = useFetch({
		method: "post",
		route: "/auth/login",
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
		if (isLoading || !data) {
			return;
		}

		if (isError) {
			if (data.message.startsWith("body/password")) {
				// Cut the "body/password" part of the message and replace it with "Password"
				setPasswordError("Password " + data.message.split(" ").slice(1).join(" "));
			} else if (data.message.startsWith("body/username")) {
				// Cut the "body/username" part of the message and replace it with "Username"
				setUsernameError("Username " + data.message.split(" ").slice(1).join(" "));
			} else if (data.message === "There's no user with that username") {
				setUsernameError(data.message);
			} else if (data.message === "Invalid credentials") {
				setPasswordError("Wrong password");
			} else if (data.statusCode === 400) {
				setUsernameError("Invalid username");
				setPasswordError("Invalid password");
			}

			return;
		}

		// If it reaches here, it means the request was successful
		const bodyData = data as SuccessResponseData;

		setAuthToken(bodyData.data.token);
		setLoggedUser(bodyData.data.user);

		// Save the token in the local storage if the user wants to be remembered
		if (rememberMe) {
			localStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, bodyData.data.token);
		}
	}, [data, isError, isLoading, rememberMe, setAuthToken, setLoggedUser]);

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

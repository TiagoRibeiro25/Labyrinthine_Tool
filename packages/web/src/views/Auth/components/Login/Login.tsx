import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import Button from "../../../../components/Button/Button";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Input from "../../../../components/Input/Input";
import constants from "../../../../constants";
import LoadingDots from "../../../../layouts/BackgroundContainer/components/LoadingDots/LoadingDots";
import useAuthStore from "../../../../stores/auth";
import useWarningStore from "../../../../stores/warning";
import { ErrorResponseBodyData, SuccessResponseBodyData } from "../../../../types";

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
	const addWarning = useWarningStore((state) => state.addWarning);

	const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
	const setAuthToken = useAuthStore((state) => state.setAuthToken);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const [usernameError, setUsernameError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");

	const { refetch, status, isFetching, data, error } = useQuery({
		queryKey: ["login"],
		queryFn: async () => {
			const response = await api.post("/auth/login", {
				username,
				password,
			});

			return response.data as SuccessResponseData;
		},
		enabled: false,
		retry: 0,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (usernameError || passwordError || !username || !password) {
			return;
		}

		refetch();
	};

	// Handle the response
	useEffect(() => {
		if (status === "error") {
			const err = error as unknown as { response: { data: ErrorResponseBodyData } };
			const bodyData = err.response.data;

			if (!bodyData) {
				addWarning("An error occurred while trying to login", "error");
			}

			if (bodyData.message.startsWith("body/password")) {
				// Cut the "body/password" part of the message and replace it with "Password"
				setPasswordError("Password " + bodyData.message.split(" ").slice(1).join(" "));
			} else if (bodyData.message.startsWith("body/username")) {
				// Cut the "body/username" part of the message and replace it with "Username"
				setUsernameError("Username " + bodyData.message.split(" ").slice(1).join(" "));
			} else if (bodyData.message === "There's no user with that username") {
				setUsernameError(bodyData.message);
			} else if (bodyData.message === "Invalid credentials") {
				setPasswordError("Wrong password");
			} else {
				setUsernameError("Invalid username");
				setPasswordError("Invalid password");
			}

			return;
		}

		if (status === "success") {
			setAuthToken(data.data.token);
			setLoggedUser(data.data.user);

			// Save the token in the local storage if the user wants to be remembered
			if (rememberMe) {
				localStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, data.data.token);
			}
		}
	}, [addWarning, data, error, rememberMe, setAuthToken, setLoggedUser, status]);

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

				{isFetching ? (
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

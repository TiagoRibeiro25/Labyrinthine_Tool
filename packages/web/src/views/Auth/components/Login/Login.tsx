import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Input from "../../../../components/Input/Input";
import constants from "../../../../constants";

const Login: React.FC = (): React.JSX.Element => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	return (
		<form>
			<Input
				label="Username"
				placeholder="Enter your username"
				id="username"
				value={username}
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

				<Button className="w-[200px] mt-4">Sign In</Button>
			</div>
		</form>
	);
};

export default Login;

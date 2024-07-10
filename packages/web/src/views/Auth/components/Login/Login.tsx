import React, { useState } from "react";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import Input from "../../../../components/Input/Input";

const Login: React.FC = (): React.JSX.Element => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	return (
		<form className="h-72">
			<Input
				label="Username"
				placeholder="Enter your username"
				id="username"
				value={username}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
				required
			/>

			<Input
				type="password"
				labelClassName="mt-10"
				label="Password"
				placeholder="Enter your password"
				id="password"
				value={password}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				required
			/>

			<Checkbox
				label="Remember me"
				selected={rememberMe}
				onChange={() => setRememberMe(!rememberMe)}
				className="mt-8 text-sm text-gray-300"
			/>
		</form>
	);
};

export default Login;

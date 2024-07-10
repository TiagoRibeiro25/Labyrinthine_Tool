import React, { useState } from "react";
import Input from "../../../../components/Input/Input";

const Login: React.FC = (): React.JSX.Element => {
	const [username, setUsername] = useState<string>("");

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
		</form>
	);
};

export default Login;

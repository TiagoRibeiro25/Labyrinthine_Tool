import React from "react";
import useAuthStore from "../../../stores/auth";

const Profile: React.FC = (): React.JSX.Element => {
	const loggedUser = useAuthStore((state) => state.loggedUser);

	return (
		<div>
			<h1>Profile</h1>
			<p>Logged in as: {JSON.stringify(loggedUser)}</p>
		</div>
	);
};

export default Profile;

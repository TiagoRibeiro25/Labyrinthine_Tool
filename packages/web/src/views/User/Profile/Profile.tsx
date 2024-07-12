import React from "react";
import useAuthStore from "../../../stores/auth";

const Profile: React.FC = (): React.JSX.Element => {
	const loggedUser = useAuthStore((state) => state.loggedUser);

	return (
		<div className="flex justify-center h-full px-10">
			<div className="h-full max-w-[985px]">
				<h1>Profile</h1>
				<p>Logged in as: {JSON.stringify(loggedUser)}</p>
			</div>
		</div>
	);
};

export default Profile;

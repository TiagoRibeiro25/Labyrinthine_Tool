import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = (): React.JSX.Element => {
	return (
		<div>
			<h1 className="mt-20 text-4xl font-bold text-center text-gray-800">Not Found</h1>
			<Link to="/" className="block mt-5 text-center text-blue-500">
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;

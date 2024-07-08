import React from "react";

const NotFound: React.FC = (): React.JSX.Element => {
	return (
		<div>
			<h1 className="mt-20 text-4xl font-bold text-center text-gray-800">Not Found</h1>;
			<a href="/" className="block mt-5 text-center text-blue-500">
				Back to Home
			</a>
		</div>
	);
};

export default NotFound;

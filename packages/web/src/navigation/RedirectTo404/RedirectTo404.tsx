import React, { useEffect } from "react";

const RedirectTo404: React.FC = (): React.JSX.Element | null => {
	useEffect(() => {
		window.location.href = "/404";
	});

	return null;
};

export default RedirectTo404;

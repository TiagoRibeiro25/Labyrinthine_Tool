import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectTo404: React.FC = (): React.JSX.Element | null => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/404");
	});

	return null;
};

export default RedirectTo404;

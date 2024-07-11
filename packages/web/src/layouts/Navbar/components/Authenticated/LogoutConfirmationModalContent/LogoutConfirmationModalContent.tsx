import React from "react";
import Button from "../../../../../components/Button/Button";

type Props = {
	onConfirm: () => void; // When the
	onCancel: () => void;
};

const LogoutConfirmationModalContent: React.FC<Props> = ({
	onConfirm,
	onCancel,
}): React.JSX.Element => {
	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onCancel();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onConfirm();
	};

	return (
		<form id="logout-form" onReset={handleReset} onSubmit={onConfirm}>
			<h2 className="text-center text-2xl font-bold labyrinth-font">
				Are you sure you want to log out?
			</h2>

			<p className="my-7 text-sm text-gray-400 text-start">
				The next time you log in, you will need to enter your credentials again.
			</p>

			<div className="flex justify-around">
				<Button type="submit" className="w-32">
					Confirm
				</Button>

				<Button type="reset" className="w-32" reversedColors>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default LogoutConfirmationModalContent;

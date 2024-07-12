import React from "react";
import Button from "../../../../../../components/Button/Button";

type Props = {
	onConfirm: () => void; // When the
	onCancel: () => void;
};

const LogoutConfirmationModalContent: React.FC<Props> = ({
	onConfirm,
	onCancel,
}): React.JSX.Element => {
	const handleAction = (event: React.FormEvent<HTMLFormElement>, action: () => void): void => {
		event.preventDefault();
		action();
	};

	return (
		<form
			id="logout-form"
			onReset={(event) => handleAction(event, onCancel)}
			onSubmit={(event) => handleAction(event, onConfirm)}
		>
			<h2 className="text-center text-2xl font-bold labyrinth-font">
				Are you sure you want to log out?
			</h2>

			<p className="my-7 text-sm text-gray-400 text-start">
				The next time you log in, you will need to enter your credentials again.
			</p>

			<div className="flex justify-around sm:flex-row flex-col items-center space-y-5 sm:space-y-0">
				<Button type="submit" className="sm:w-32 w-full">
					Confirm
				</Button>

				<Button type="reset" className="sm:w-32 w-full" reversedColors>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default LogoutConfirmationModalContent;

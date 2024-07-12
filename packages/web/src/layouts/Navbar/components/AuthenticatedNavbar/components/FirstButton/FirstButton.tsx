import classNames from "classnames";
import constants from "../../../../../../constants";
import NavButton from "../../../NavButton/NavButton";

type Props = {
	onClick: () => void;
	className?: string;
};

const FirstButton: React.FC<Props> = ({ onClick, className }): React.JSX.Element => {
	return (
		<NavButton
			to={constants.ROUTES.HOME}
			className={classNames("text-6xl", "labyrinth-font", className)}
			onClick={onClick}
		>
			L
		</NavButton>
	);
};

export default FirstButton;

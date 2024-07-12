import NavButton from "../../../NavButton/NavButton";
import constants from "../../../../../../constants";
import FriendsIcon from "../../../../../../components/Icons/FriendsIcon/FriendsIcon";
import GamingIcon from "../../../../../../components/Icons/GamingIcon/GamingIcon";
import QuestionIcon from "../../../../../../components/Icons/QuestionIcon/QuestionIcon";
import WarningIcon from "../../../../../../components/Icons/WarningIcon/WarningIcon";

type Props = {
	onButtonClick: (id: string) => void;
};

const MiddleButtons: React.FC<Props> = ({ onButtonClick }): React.JSX.Element => {
	return (
		<div className="flex sm:flex-col sm:space-y-5 sm:justify-center justify-between w-full">
			<NavButton
				to={constants.ROUTES.HOME + "#why-should-you-use"}
				onClick={(): void => onButtonClick("#why-should-you-use")}
			>
				<QuestionIcon className="w-11 h-11" />
			</NavButton>
			<NavButton
				to={constants.ROUTES.HOME + "#what-is-labyrinthine"}
				onClick={(): void => onButtonClick("#what-is-labyrinthine")}
			>
				<GamingIcon className="w-11 h-11" />
			</NavButton>
			<NavButton
				to={constants.ROUTES.HOME + "#important-note"}
				onClick={(): void => onButtonClick("#important-note")}
			>
				<WarningIcon className="w-11 h-11" />
			</NavButton>
			<NavButton
				to={constants.ROUTES.HOME + "#help-friends"}
				onClick={(): void => onButtonClick("#help-friends")}
			>
				<FriendsIcon className="w-11 h-11" />
			</NavButton>
		</div>
	);
};

export default MiddleButtons;

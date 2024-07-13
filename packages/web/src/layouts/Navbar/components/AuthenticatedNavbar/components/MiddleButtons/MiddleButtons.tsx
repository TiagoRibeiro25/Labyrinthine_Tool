import NavButton from "../../../NavButton/NavButton";
import ProfileIcon from "../../../../../../components/Icons/ProfileIcon/ProfileIcon";
import constants from "../../../../../../constants";

type Props = {
	onButtonClick: () => void;
};

const MiddleButtons: React.FC<Props> = ({ onButtonClick }): React.JSX.Element => {
	return (
		<NavButton to={constants.ROUTES.USER.OWN_PROFILE} onClick={onButtonClick}>
			<ProfileIcon className="w-14 h-14" />
		</NavButton>
	);
};

export default MiddleButtons;

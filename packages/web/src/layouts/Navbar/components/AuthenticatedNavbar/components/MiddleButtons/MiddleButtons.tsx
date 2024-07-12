import NavButton from "../../../NavButton/NavButton";
import ProfileIcon from "../../../../../../components/Icons/ProfileIcon/ProfileIcon";
import constants from "../../../../../../constants";

const MiddleButtons: React.FC = (): React.JSX.Element => {
	return (
		<NavButton to={constants.ROUTES.USER.OWN_PROFILE}>
			<ProfileIcon className="w-14 h-14" />
		</NavButton>
	);
};

export default MiddleButtons;

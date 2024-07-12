import classNames from "classnames";
import NavButton from "../../../NavButton/NavButton";
import UserIcon from "../../../../../../components/Icons/UserIcon/UserIcon";
import constants from "../../../../../../constants";

type Props = {
	className?: string;
	onClick: () => void;
};

const LastButton: React.FC<Props> = ({ className, onClick }): React.JSX.Element => {
	return (
		<NavButton to={constants.ROUTES.AUTH.LOGIN} onClick={onClick}>
			<UserIcon className={classNames(className)} />
		</NavButton>
	);
};

export default LastButton;

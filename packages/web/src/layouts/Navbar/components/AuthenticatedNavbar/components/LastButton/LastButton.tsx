import classNames from "classnames";
import NavButton from "../../../NavButton/NavButton";
import LogoutIcon from "../../../../../../components/Icons/LogoutIcon/LogoutIcon";

type Props = {
	onClick: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	className?: string;
};

const LastButton: React.FC<Props> = ({
	onClick,
	onMouseEnter,
	onMouseLeave,
	className,
}): React.JSX.Element => {
	return (
		<NavButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
			<LogoutIcon className={classNames("w-10 h-10", className)} />
		</NavButton>
	);
};

export default LastButton;

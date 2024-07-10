import React from "react";

type Props = {
	label: string;
	selected: boolean;
	onChange: () => void;
	className?: string;
};

const Checkbox: React.FC<Props> = ({
	label,
	selected,
	onChange,
	className,
}): React.JSX.Element => {
	return (
		<label className={`flex items-center font-bold ${className}`}>
			<input
				className="mr-2 leading-tight"
				type="checkbox"
				checked={selected}
				onChange={onChange}
			/>
			<span>{label}</span>
		</label>
	);
};

export default Checkbox;

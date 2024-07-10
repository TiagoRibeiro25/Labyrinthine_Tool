import React from "react";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../../components/Icons/CloseIcon/CloseIcon";
import useWarningStore from "../../stores/warning";

const WarningPopUp: React.FC = (): React.JSX.Element => {
	const warnings = useWarningStore((state) => state.warnings);
	const deleteWarning = useWarningStore((state) => state.deleteWarning);

	return (
		<div className="fixed z-50 space-y-5 top-10 right-10">
			{warnings.map((warning, index) => (
				<Fade
					key={warning.id}
					triggerOnce
					direction="right"
					duration={500}
					delay={100 + index * 10}
				>
					<div
						className={`flex flex-row items-center rounded-md pl-3.5 p-2 border ${
							warning.type === "error"
								? "text-red-500 border-red-500"
								: "text-yellow-500 border-yellow-500"
						}`}
					>
						{warning.text}

						<button
							className="ml-1 transition-transform duration-200 ease-in-out hover:scale-125"
							onClick={(): void => deleteWarning(warning.id)}
						>
							<CloseIcon className="w-6 h-6" />
						</button>
					</div>
				</Fade>
			))}
		</div>
	);
};

export default WarningPopUp;

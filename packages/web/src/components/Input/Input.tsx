import React from "react";

type Props = {
	label: string;
	placeholder: string;
	error?: string;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
};

const Input: React.FC<Props> = ({
	label,
	placeholder,
	error,
	id,
	value,
	onChange,
	required,
}): React.JSX.Element => {
	return (
		<>
			<label className="block mb-2 text-sm font-bold tracking-wide uppercase" htmlFor={id}>
				{label}
			</label>
			<input
				className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-200 bg-gray-950 border rounded-lg appearance-none focus:outline-none focus:bg-gray-800 transition-all duration-200 ${
					error ? "border-red-500" : ""
				}`}
				id={id}
				type="text"
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
			/>
			{error && <p className="text-xs italic text-red-500">{error}</p>}
		</>
	);
};

export default Input;

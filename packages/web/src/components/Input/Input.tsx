import classNames from "classnames";
import React from "react";

type Props = {
	type?: "text" | "password";
	label: string;
	placeholder: string;
	error?: string;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	labelClassName?: string;
	inputClassName?: string;
	autoComplete?: string;
};

const Input: React.FC<Props> = ({
	type = "text",
	label,
	placeholder,
	error,
	id,
	value,
	onChange,
	required,
	labelClassName,
	inputClassName,
	autoComplete,
}): React.JSX.Element => {
	return (
		<>
			<label
				className={classNames(
					"block mb-2 text-sm font-bold tracking-wide uppercase",
					labelClassName
				)}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className={classNames(
					"block w-full px-4 py-3 mb-3 leading-tight text-gray-200 bg-gray-950 border rounded-lg appearance-none focus:outline-none focus:bg-gray-800 transition-all duration-200",
					error ? "border-red-500" : "",
					inputClassName
				)}
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
			/>
			{error && <p className="text-xs italic text-red-500">{error}</p>}
		</>
	);
};

export default Input;

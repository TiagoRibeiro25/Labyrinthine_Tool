import classNames from "classnames";
import { PropsWithChildren, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Fade } from "react-awesome-reveal";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

type ModalProps = PropsWithChildren & {
	id: string;
	show: boolean;
	onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ id, show, children, onClose }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const mainContentElement = document.querySelector("main");
		if (mainContentElement) {
			mainContentElement.style.overflow = show ? "hidden" : "";
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (show) {
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [show, onClose]);

	return (
		show &&
		ReactDOM.createPortal(
			<div
				id={id}
				tabIndex={-1}
				className={classNames(
					"fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 px-3",
					show ? "block" : "hidden"
				)}
			>
				<div ref={modalRef} className="relative w-full max-w-lg mx-auto max-h-[90vh]">
					<Fade triggerOnce direction="up" delay={50} duration={400}>
						<div className="overflow-y-auto bg-black bg-opacity-85 border rounded-3xl shadow">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
								onClick={onClose}
							>
								<CloseIcon className="w-12 h-12" />
								<span className="sr-only">Close modal</span>
							</button>
							<div className="p-10 text-center">{children}</div>
						</div>
					</Fade>
				</div>
			</div>,
			document.body
		)
	);
};

export default Modal;

import { create } from "zustand";
import constants from "../constants";

type Warning = {
	id: number;
	text: string;
	type: "error" | "warning";
};

interface WarningState {
	warnings: Warning[];
	addWarning: (text: string, type?: "error" | "warning") => void;
	deleteWarning: (id: number) => void;
}

const useWarningStore = create<WarningState>((set) => ({
	warnings: [],

	addWarning: (text, type = "warning") => {
		const warning = { id: Date.now(), text, type } as Warning;

		set((state) => ({
			warnings: [...state.warnings, warning],
		}));

		// Remove warning after 5 seconds
		setTimeout(() => {
			set((state) => ({
				warnings: state.warnings.filter((w) => w.id !== warning.id),
			}));
		}, constants.WARNINGS.MILLISECONDS_BEFORE_REMOVAL);
	},

	deleteWarning: (id: number) => {
		set((state) => ({
			warnings: state.warnings.filter((w) => w.id !== id),
		}));
	},
}));

export default useWarningStore;

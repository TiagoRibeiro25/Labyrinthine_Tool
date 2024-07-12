import { create } from "zustand";
import constants from "../constants";

type LoggedUser = {
	id: string;
	username: string;
};

interface AuthState {
	loggedUser: LoggedUser | null;
	authToken: string;
	setLoggedUser: (loggedUser: LoggedUser) => void;
	setAuthToken: (authToken: string) => void;
	signOut: () => void;
}

const initial_state = {
	loggedUser: null,
	authToken: localStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN) || "",
};

const useAuthStore = create<AuthState>((set) => ({
	...initial_state,

	setLoggedUser: (loggedUser: LoggedUser) => set({ loggedUser }),
	setAuthToken: (authToken: string) => {
		set({ authToken });

		// Check if there's an old token in the local storage
		// If so, that means the user was logged in before with the "remember me" option checked
		// So we set the token in the local storage again to keep the user logged in for future visits
		if (localStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN)) {
			localStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, authToken);
		}
	},

	signOut: () => {
		localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN);
		set({ ...initial_state });
	},
}));

export default useAuthStore;

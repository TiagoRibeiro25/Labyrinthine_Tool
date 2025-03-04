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

const getStoredAuthToken = () => {
	return (
		sessionStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN) || // Check session storage first (for the current session)
		localStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN) || // Check local storage next
		""
	);
};

const useAuthStore = create<AuthState>((set) => ({
	loggedUser: null,
	authToken: getStoredAuthToken(),

	setLoggedUser: (loggedUser: LoggedUser) => set({ loggedUser }),
	setAuthToken: (authToken: string) => {
		set({ authToken });

		// Check if there's an old token in the local storage
		// If so, that means the user was logged in before with the "remember me" option checked
		// So we set the token in the local storage again to keep the user logged in for future visits
		if (localStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN)) {
			localStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, authToken);
		}

		if (sessionStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN)) {
			sessionStorage.setItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN, authToken);
		}
	},

	signOut: () => {
		sessionStorage.removeItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN);
		localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN);
		set({ loggedUser: null, authToken: "" });
	},
}));

export default useAuthStore;

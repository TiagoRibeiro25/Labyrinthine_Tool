import { create } from "zustand";
import constants from "../constants";

type LoggedUser = {
	id: string;
	username: string;
};

interface AuthState {
	loggedUser: LoggedUser | null;
	authToken: string;
	didFirstFetch: boolean;
	setLoggedUser: (loggedUser: LoggedUser) => void;
	updateFirstFetch: () => void;
	setAuthToken: (authToken: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
	loggedUser: null as LoggedUser | null,
	authToken: localStorage.getItem(constants.LOCAL_STORAGE_KEYS.AUTH_TOKEN) || "",
	didFirstFetch: false,

	setLoggedUser: (loggedUser: LoggedUser) => set({ loggedUser }),
	updateFirstFetch: () => set({ didFirstFetch: true }),
	setAuthToken: (authToken: string) => set({ authToken }),
}));

export default useAuthStore;

import { create } from "zustand";

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
	authToken: localStorage.getItem("authToken") || "", // TODO: Change this to http only cookie
	didFirstFetch: false,

	setLoggedUser: (loggedUser: LoggedUser) => set({ loggedUser }),
	updateFirstFetch: () => set({ didFirstFetch: true }),
	setAuthToken: (authToken: string) => set({ authToken }),
}));

export default useAuthStore;

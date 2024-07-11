// This store is used to manage the main loading state of the application

import { create } from "zustand";

interface mainLoadingState {
	isLoading: boolean;
	loadingMessage: string;
	setIsLoading: (isLoading: boolean) => void;
	setLoadingMessage: (loadingMessage: string) => void;
}

const useMainLoadingStore = create<mainLoadingState>((set) => ({
	isLoading: true,
	loadingMessage: "Loading...",

	setIsLoading: (isLoading: boolean) => {
		set({ isLoading });
	},

	setLoadingMessage: (loadingMessage: string) => {
		set({ loadingMessage });
	},
}));

export default useMainLoadingStore;

import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Navigation";

import "./assets/fonts/Ubuntu/Ubuntu-Bold.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Light.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Medium.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Regular.ttf";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/fonts/Labyrinth/Labyrinth.ttf";
import BackgroundContainer from "./layouts/BackgroundContainer/BackgroundContainer";
import WarningPopUp from "./layouts/WarningPopUp/WarningPopUp";
import useMainLoadingStore from "./stores/mainLoading";

const queryClient = new QueryClient();

const App: React.FC = (): React.JSX.Element => {
	const isLoading = useMainLoadingStore((state) => state.isLoading);
	const loadingMessage = useMainLoadingStore((state) => state.loadingMessage);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<BackgroundContainer loadingMessage="Logging in...">
					<Navigation />
				</BackgroundContainer>
				<WarningPopUp />
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;

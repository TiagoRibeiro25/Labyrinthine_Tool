import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import BackgroundContainer from "./layouts/BackgroundContainer/BackgroundContainer";
import WarningPopUp from "./layouts/WarningPopUp/WarningPopUp";
import Navigation from "./navigation/Navigation";
import HandleAutoSignInProvider from "./providers/HandleAutoSignInProvider/HandleAutoSignInProvider";

import "./assets/fonts/Ubuntu/Ubuntu-Bold.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Light.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Medium.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Regular.ttf";
import "./assets/fonts/Labyrinth/Labyrinth.ttf";

const queryClient = new QueryClient();

//TODO: STORE ALL IMAGES OF ALL COSMETICS (and user avatars) in the front end
const App: React.FC = (): React.JSX.Element => {
	return (
		<QueryClientProvider client={queryClient}>
			<HandleAutoSignInProvider>
				<BrowserRouter>
					<BackgroundContainer>
						<Navigation />
					</BackgroundContainer>
					<WarningPopUp />
				</BrowserRouter>
			</HandleAutoSignInProvider>
		</QueryClientProvider>
	);
};

export default App;

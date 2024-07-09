import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Navigation";

import "./assets/fonts/Ubuntu/Ubuntu-Bold.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Light.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Medium.ttf";
import "./assets/fonts/Ubuntu/Ubuntu-Regular.ttf";

import "./assets/fonts/Labyrinth/Labyrinth.ttf";
import BackgroundContainer from "./layouts/BackgroundContainer/BackgroundContainer";

const App: React.FC = (): React.JSX.Element => {
	return (
		<BrowserRouter>
			<BackgroundContainer>
				<Navigation />
			</BackgroundContainer>
		</BrowserRouter>
	);
};

export default App;

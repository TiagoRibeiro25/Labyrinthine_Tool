import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import MainTitleAnimation from "./MainTitleAnimation/MainTitleAnimation";

const MAIN_TITLE_ANIMATION_DELAY = 1300;
const MAIN_TITLE_ANIMATION_DURATION = 900;

const Home: React.FC = (): React.JSX.Element => {
	const [isTitleAnimationOver, setIsTitleAnimationOver] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsTitleAnimationOver(true);
		}, MAIN_TITLE_ANIMATION_DELAY + MAIN_TITLE_ANIMATION_DURATION - 500);

		return (): void => clearTimeout(timeout);
	}, []);

	return (
		<div className="flex flex-col items-center h-full">
			<MainTitleAnimation
				delay={MAIN_TITLE_ANIMATION_DELAY}
				duration={MAIN_TITLE_ANIMATION_DURATION}
				className="ease-in-out"
			>
				<h1 className="labyrinth-font">Labyrinthine Tool</h1>
			</MainTitleAnimation>

			{isTitleAnimationOver && (
				<Fade direction="up" triggerOnce duration={800} className="mt-4">
					<h2 className="text-2xl">
						An online tool made to help you with your{" "}
						<span className="labyrinth-font">Labyrinthine</span> cosmetics hunts
					</h2>
				</Fade>
			)}
		</div>
	);
};

export default Home;

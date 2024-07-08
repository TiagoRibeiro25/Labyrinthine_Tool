import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Marquee from "react-fast-marquee";
import FreeToUseIcon from "./components/FreeToUseIcon/FreeToUseIcon";
import MainTitleAnimation from "./components/MainTitleAnimation/MainTitleAnimation";
import OpenSourceIcon from "./components/OpenSourceIcon/OpenSourceIcon";
import ReasonToUseCard from "./components/ReasonToUseCard/ReasonToUseCard";
import UpToDateIcon from "./components/UpToDateIcon/UpToDateIcon";
import cosmetics from "./cosmetics.json";

const MAIN_TITLE_ANIMATION_DELAY = 1200;
const MAIN_TITLE_ANIMATION_DURATION = 1000;

const Home: React.FC = (): React.JSX.Element => {
	const [isTitleAnimationOver, setIsTitleAnimationOver] = useState<boolean>(false);

	useEffect(() => {
		const mainContainer = document.querySelector("main");
		const scrollEvent = (): void => mainContainer?.scrollTo(0, 0);
		scrollEvent();

		mainContainer?.addEventListener("scroll", scrollEvent);

		const timeout = setTimeout(() => {
			setIsTitleAnimationOver(true);
			mainContainer?.removeEventListener("scroll", scrollEvent);
		}, MAIN_TITLE_ANIMATION_DELAY + MAIN_TITLE_ANIMATION_DURATION - 500);

		return (): void => {
			mainContainer?.removeEventListener("scroll", scrollEvent);
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="flex flex-col items-center h-full pt-10">
			<MainTitleAnimation
				delay={MAIN_TITLE_ANIMATION_DELAY}
				duration={MAIN_TITLE_ANIMATION_DURATION}
				className="hidden mt-10 text-center duration-500 ease-in-out lg:block"
			>
				<h1 className="text-6xl labyrinth-font">Labyrinthine Tool</h1>
			</MainTitleAnimation>

			<div className="block lg:hidden">
				<Fade
					direction="up"
					triggerOnce
					delay={MAIN_TITLE_ANIMATION_DELAY - 400}
					duration={MAIN_TITLE_ANIMATION_DURATION}
					className="mt-10 text-center duration-500 ease-in-out"
				>
					<h1 className="text-4xl sm:text-6xl labyrinth-font">Labyrinthine Tool</h1>
				</Fade>
			</div>

			{isTitleAnimationOver && (
				<Fade direction="up" triggerOnce duration={800} className="mt-10">
					<h2 className="text-2xl">
						An online tool made to help you with your{" "}
						<a
							href="https://store.steampowered.com/app/1302240/Labyrinthine/"
							target="_blank"
							rel="noreferrer"
							className="labyrinth-font hover:underline animate-pulse"
						>
							Labyrinthine
						</a>{" "}
						cosmetics hunts
					</h2>

					<Fade direction="up" triggerOnce duration={800} delay={600}>
						<h3 className="mt-4 text-xl">
							Never lose track of your cosmetics again, and always know what you need to find
							to complete your collection
						</h3>
					</Fade>

					<div className="xl:w-[985px] mt-20">
						<Fade direction="up" triggerOnce duration={700} delay={1000}>
							<h4 className="mt-12 text-xl">
								Now updated with the latest cosmetics from the{" "}
								<a
									href="https://store.steampowered.com/news/app/1302240/view/4141701971813405619"
									target="_blank"
									rel="noreferrer"
									className="labyrinth-font hover:underline"
								>
									Summer Event
								</a>
								:
							</h4>

							<div className="flex mt-12 sm:w-auto w-200px">
								<Marquee
									className="hidden overflow-hidden sm:flex"
									autoFill
									gradient
									gradientColor="black"
									gradientWidth={200}
								>
									{cosmetics.map((cosmetic: string, index: number) => (
										<div key={index} className="flex flex-col items-center mr-8">
											<img
												src={cosmetic}
												alt={cosmetic}
												className="object-cover w-32 h-32 border-2 border-gray-900 rounded-3xl"
											/>
										</div>
									))}
								</Marquee>
							</div>
						</Fade>
					</div>

					<Fade
						direction="up"
						triggerOnce
						duration={800}
						delay={2000}
						className="mt-24 text-center"
					>
						<h2 className="text-3xl labyrinth-font">Why should you use this tool?</h2>

						<div className="flex flex-row justify-between mb-20 space-x-12">
							<ReasonToUseCard Icon={OpenSourceIcon} title="Open Source" />
							<ReasonToUseCard Icon={FreeToUseIcon} title="Free to Use" />
							<ReasonToUseCard Icon={UpToDateIcon} title="Up to Date" />
						</div>
					</Fade>
				</Fade>
			)}
		</div>
	);
};

export default Home;

import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Marquee from "react-fast-marquee";
import DownArrowIcon from "../../components/Icons/DownArrowIcon/DownArrowIcon";
import MainTitleAnimation from "./components/MainTitleAnimation/MainTitleAnimation";
import WhyYouShouldUseContent from "./components/WhyYouShouldUseContent/WhyYouShouldUseContent";
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

			// Check if there's a hash in the URL and scroll to it
			if (window.location.hash) {
				document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
			}
		}, MAIN_TITLE_ANIMATION_DELAY + MAIN_TITLE_ANIMATION_DURATION - 500);

		return (): void => {
			mainContainer?.removeEventListener("scroll", scrollEvent);
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="flex justify-center h-full">
			<div className="h-full max-w-[985px] w-auto">
				<section className="flex flex-col items-center h-full pt-10" id="welcome">
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
							<h2 className="text-2xl text-center md:text-start">
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
								<h3 className="mt-4 text-xl text-center md:text-start">
									Never lose track of your cosmetics again, and always know what you need to
									find to complete your collection
								</h3>
							</Fade>

							<div className="mt-20">
								<Fade direction="up" triggerOnce duration={700} delay={1000}>
									<h4 className="mt-12 text-xl text-center md:text-start">
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

									<div className="flex mt-12">
										<Marquee
											className="hidden overflow-hidden md:flex"
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

								<div className="flex justify-center mt-24">
									<Fade direction="up" triggerOnce duration={500} delay={1700}>
										<a href="#why-should-you-use">
											<DownArrowIcon className="w-8 h-8 cursor-pointer opacity-85< animate-bounce" />
										</a>
									</Fade>
								</div>
							</div>
						</Fade>
					)}
				</section>

				<section id="why-should-you-use" className="pt-20">
					<WhyYouShouldUseContent />
				</section>
			</div>
		</div>
	);
};

export default Home;

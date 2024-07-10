import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import DownArrowIcon from "../../components/Icons/DownArrowIcon/DownArrowIcon";
import constants from "../../constants";
import MainTitleAnimation from "./components/MainTitleAnimation/MainTitleAnimation";
import WhyYouShouldUseContent from "./components/WhyYouShouldUseContent/WhyYouShouldUseContent";
import cosmetics from "./cosmetics.json";

const MAIN_TITLE_ANIMATION_DELAY = 1500;
const MAIN_TITLE_ANIMATION_DURATION = 1000;

const Home: React.FC = (): React.JSX.Element => {
	const [isTitleAnimationOver, setIsTitleAnimationOver] = useState<boolean>(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsTitleAnimationOver(true);

			// Check if there's a hash in the URL and scroll to it
			if (window.location.hash) {
				document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
			}
		}, MAIN_TITLE_ANIMATION_DELAY + MAIN_TITLE_ANIMATION_DURATION - 200);

		return (): void => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="flex justify-center h-full px-10">
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
							delay={MAIN_TITLE_ANIMATION_DELAY - 800}
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
									href={constants.STEAM_BUY_URL}
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
											href={constants.SUMMER_EVENT_ANNOUNCEMENT_URL}
											target="_blank"
											rel="noreferrer"
											className="labyrinth-font hover:underline"
										>
											Summer Event
										</a>
										<span className="hidden md:inline-block">:</span>
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
														className="object-cover w-32 h-32 rounded-3xl"
													/>
												</div>
											))}
										</Marquee>
									</div>
								</Fade>

								<div className="flex justify-center mt-16">
									<Fade direction="up" triggerOnce duration={500} delay={1700}>
										<button
											onClick={(): void => {
												document
													.querySelector("#why-should-you-use")
													?.scrollIntoView({ behavior: "smooth" });
											}}
										>
											<DownArrowIcon className="w-8 h-8 cursor-pointer opacity-85< animate-bounce" />
										</button>
									</Fade>
								</div>
							</div>
						</Fade>
					)}
				</section>

				<section id="why-should-you-use" className="pt-36">
					<WhyYouShouldUseContent />
				</section>

				<section id="what-is-labyrinthine" className="pt-40">
					<Fade direction="up" triggerOnce duration={800} delay={100}>
						<h2 className="text-3xl text-center labyrinth-font">What is Labyrinthine?</h2>
					</Fade>

					<div className="flex flex-col-reverse items-center pt-16 space-y-8 lg:items-start lg:space-x-12 lg:space-y-0 lg:flex-row">
						<Fade direction="left" triggerOnce duration={800} delay={200} className="lg:w-1/2">
							<div className="flex flex-col mt-12 lg:mt-0">
								<p className="text-lg text-justify sm:text-start lg:pt-4">
									Labyrinthine is a co-op horror game like no other... Play with 1-4 players
									online as you solve puzzles, collect items and run from the horrors that lie
									within. Follow in the footsteps of Joan in the story mode or tackle
									procedurally generated maps that scale with your level and bring a fresh
									experience each game..
								</p>

								<div className="flex justify-center mt-12 lg:mt-6">
									<a href={constants.STEAM_BUY_URL} target="_blank" rel="noreferrer">
										<Button reversedColors>Buy Labyrinthine on Steam</Button>
									</a>
								</div>
							</div>
						</Fade>

						<Fade
							direction="right"
							triggerOnce
							duration={800}
							delay={200}
							className="lg:w-1/2"
						>
							<video autoPlay loop muted playsInline className="rounded-3xl">
								<source src={constants.GAME_TAILER_URL} type="video/webm" />
								Your browser does not support video playback
							</video>
						</Fade>
					</div>
				</section>

				<section
					id="important-note"
					className="p-5 mt-40 bg-black bg-opacity-50 border rounded-3xl"
				>
					<Fade direction="up" triggerOnce duration={800} delay={100}>
						<h2 className="text-3xl text-center labyrinth-font sm:text-start">
							Important Note
						</h2>
					</Fade>

					<Fade direction="up" triggerOnce duration={800} delay={200}>
						<p className="mt-8 text-lg text-justify sm:text-start">
							This website is not affiliated with or endorsed by Labyrinthine, its developers,
							or its publishers. All copyrights and trademarks are the property of their
							respective owners.
						</p>

						<p className="mt-8 text-lg text-justify sm:text-start">
							All cosmetics images are property of Labyrinthine and are used for illustrative
							purposes only.
						</p>

						<p className="mt-8 text-lg text-justify sm:text-start">
							I have no control over the availability of the game, its cosmetics, or the game's
							updates. This website is a fan-made project to help players keep track of their
							progress in the game.
						</p>
					</Fade>
				</section>

				<section id="help-friends" className="pt-40">
					<Fade direction="up" triggerOnce duration={800} delay={100}>
						<h2 className="text-3xl text-center labyrinth-font">Help Friends</h2>
					</Fade>

					<Fade direction="up" triggerOnce duration={800} delay={100}>
						<p className="mt-8 text-lg text-justify sm:text-center">
							Do you have friends who play Labyrinthine? Or maybe you want to help other
							players complete their cosmetics collection? With this tool, you can easily add
							other players and see their progress. Never lose track of your friends' cosmetics
							again!
						</p>
					</Fade>

					<Fade
						className="flex mt-2 sm:justify-center"
						direction="up"
						triggerOnce
						duration={800}
						delay={100}
					>
						<span className="text-sm text-gray-400">
							If you don't know anyone who plays Labyrinthine, you can always join the{" "}
							<a
								href={constants.OFFICIAL_DISCORD_INVITE_URL}
								target="_blank"
								rel="noreferrer"
								className="text-gray-300 labyrinth-font hover:underline"
							>
								Official Labyrinthine Discord
							</a>{" "}
							and find players to play with!
						</span>
					</Fade>
				</section>

				<section id="create-account" className="flex justify-center py-40">
					<Fade direction="up" triggerOnce duration={800} delay={100}>
						<Link to={constants.ROUTES.AUTH.SIGNUP}>
							<Button className="w-[208px]">Create an account now</Button>
						</Link>
					</Fade>
				</section>
			</div>
		</div>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import FreeToUseIcon from "../../../../components/Icons/FreeToUseIcon/FreeToUseIcon";
import OpenSourceIcon from "../../../../components/Icons/OpenSourceIcon/OpenSourceIcon";
import UpToDateIcon from "../../../../components/Icons/UpToDateIcon/UpToDateIcon";
import ReasonToUseCard from "./components/ReasonToUseCard/ReasonToUseCard";

type ArrowPositon = "left" | "center" | "right";
const DEFAULT_ARROW_POSITION = "left";

const WhyYouShouldUseContent: React.FC = (): React.JSX.Element => {
	const [arrowPosition, setArrowPosition] = useState<ArrowPositon | null>(null);

	useEffect(() => {
		// If it's null, it means it's the first time the component is being rendered
		if (!arrowPosition) {
			// Try to get the arrowPosition state from the session storage
			const cachedValue = sessionStorage.getItem("whyShouldYouUseArrowPosition");

			// If it exists and is a valid value, set it
			if (cachedValue && ["left", "center", "right"].includes(cachedValue)) {
				setArrowPosition(cachedValue as ArrowPositon);
			} else {
				setArrowPosition(DEFAULT_ARROW_POSITION);
			}
		}

		// Update the session storage with the new value on every arrowPosition change
		else {
			sessionStorage.setItem("whyShouldYouUseArrowPosition", arrowPosition);
		}
	}, [arrowPosition]);

	return (
		<Fade direction="up" triggerOnce duration={800} delay={100} className="mt-24 text-center">
			<h2 className="text-3xl labyrinth-font">Why should you use this tool?</h2>

			<div className="flex flex-col items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
				<ReasonToUseCard
					Icon={OpenSourceIcon}
					title="Open Source"
					selected={arrowPosition === "left"}
					onClick={() => setArrowPosition("left")}
				/>
				<ReasonToUseCard
					Icon={FreeToUseIcon}
					title="Free to Use"
					selected={arrowPosition === "center"}
					onClick={() => setArrowPosition("center")}
				/>
				<ReasonToUseCard
					Icon={UpToDateIcon}
					title="Up to Date"
					selected={arrowPosition === "right"}
					onClick={() => setArrowPosition("right")}
				/>
			</div>

			<Fade direction="up" triggerOnce duration={800} delay={100}>
				<div className="hidden lg:block">
					{arrowPosition === "left" && (
						<div className="w-0 h-0 ml-24 border-l-[20px] border-l-transparent border-b-[35px] border-r-[20px] border-r-transparent border-gray-200"></div>
					)}

					{arrowPosition === "center" && (
						<div className="flex justify-center">
							<div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-r-[20px] border-r-transparent border-gray-200"></div>
						</div>
					)}

					{arrowPosition === "right" && (
						<div className="w-0 h-0 ml-auto mr-24 border-l-[20px] border-l-transparent border-b-[35px] border-r-[20px] border-r-transparent border-gray-200"></div>
					)}

					<div className="p-5 border border-gray-200 rounded-3xl">
						{arrowPosition === "left" && (
							<Fade triggerOnce fraction={0.7}>
								<p className="text-justify">
									By being open source, it means that the code is available for anyone to see
									and contribute to. This allows anyone to see how the tool works and even
									suggest improvements. There's no hidden code or secrets, everything is out in
									the open. If you're a developer or just curious, you can check out the code
									on{" "}
									<a
										href="#"
										target="_blank"
										rel="noreferrer"
										className="text-blue-500 hover:underline"
									>
										GitHub
									</a>
									.
								</p>
							</Fade>
						)}

						{arrowPosition === "center" && (
							<Fade triggerOnce fraction={0.4}>
								<p className="text-justify">
									You don't need to pay anything to use this tool. It's completely free to use
									and always will be. There are no ads, no subscriptions, and no hidden fees.
									Just use the tool as much as you want, whenever you want, for free.
								</p>
							</Fade>
						)}

						{arrowPosition === "right" && (
							<Fade triggerOnce fraction={0.4}>
								<p className="text-justify">
									As soon as new cosmetics are added to the game, they are added to the tool. I
									try to keep the tool up to date as soon as possible after new cosmetics are
									added. This means you can always rely on the tool to have the latest
									information.
								</p>
							</Fade>
						)}
					</div>
				</div>
			</Fade>
		</Fade>
	);
};

export default WhyYouShouldUseContent;

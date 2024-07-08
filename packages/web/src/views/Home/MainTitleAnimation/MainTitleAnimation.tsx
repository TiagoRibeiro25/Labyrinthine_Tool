import { Keyframes, keyframes } from "@emotion/react";
import React, { PropsWithChildren } from "react";
import Reveal from "react-awesome-reveal";

type Props = PropsWithChildren & {
	className?: string;
	delay: number;
	duration: number;
};

const customAnimation: Keyframes = keyframes`
  from {
    font-size: 7rem;
		height: 100%;
    transform: translateY(40%);
  }

  to {
    font-size: 4rem;
		height: 100px
  }
`;

const MainTitleAnimation: React.FC<Props> = ({
	children,
	className,
	delay,
	duration,
}): React.JSX.Element => {
	return (
		<Reveal
			triggerOnce
			delay={delay}
			duration={duration}
			keyframes={customAnimation}
			className={className}
		>
			{children}
		</Reveal>
	);
};

export default MainTitleAnimation;

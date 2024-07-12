import { Keyframes, keyframes } from "@emotion/react";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import Reveal from "react-awesome-reveal";

type Props = PropsWithChildren & {
	className?: string;
	delay: number;
	duration: number;
};

const customAnimation: Keyframes = keyframes`
  from {
    // font-size: 7rem;
		scale: 1.7;
		height: 100%;
    transform: translateY(40%);
  }

  to {
    // font-size: 5rem;
		scale: 1;
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
			className={classNames(className)}
		>
			{children}
		</Reveal>
	);
};

export default MainTitleAnimation;

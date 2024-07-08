import { Fade } from "react-awesome-reveal";
import Chapter_1_Entrance from "../../assets/images/Chapter_1_Entrance.webp";

const Home: React.FC = (): React.JSX.Element => {
	return (
		<div className="h-full">
			<img
				src={Chapter_1_Entrance}
				alt="Background Image"
				className="absolute top-0 left-0 object-cover object-center w-full h-full -z-50"
			/>

			<Fade className="top-0 left-0 flex justify-center w-full h-full" duration={1200}>
				<div className="top-0 left-0 flex flex-row w-full h-full bg-black bg-opacity-50">
					<div className=" w-[80px] h-full enable-animation">{/* LAYOUT SIDE BAR */}</div>
					<Fade
						className="h-full top-0 left-0 w-full min-w-[500px] bg-black bg-opacity-50 backdrop-blur-md p-10"
						delay={1200}
					>
						<h1 className="mt-20 text-5xl font-bold text-center text-gray-100 labyrinth-font">
							Labyrinthine Tool
						</h1>
					</Fade>
				</div>
			</Fade>
		</div>
	);
};

export default Home;

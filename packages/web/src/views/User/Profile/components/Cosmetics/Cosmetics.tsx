import { Link } from "react-router-dom";
import constants from "../../../../../constants";
import { Cosmetic } from "../../Profile";
import Marquee from "react-fast-marquee";

type Props = {
	someUnlockedCosmetics: Cosmetic[];
	unlockedCosmetics: number;
	userId: string;
};

const Cosmetics: React.FC<Props> = ({
	unlockedCosmetics,
	someUnlockedCosmetics,
	userId,
}): React.JSX.Element => {
	return (
		<div className="bg-black bg-opacity-50 p-10 sm:rounded-3xl mt-12 flex lg:flex-row flex-col">
			<div className="flex lg:flex-col sm:flex-row lg:items-start sm:items-center flex-col items-start">
				<h2 className="text-2xl sm:text-3xl labyrinth-font">Cosmetics</h2>
				{unlockedCosmetics > 0 ? (
					<Link
						to={constants.ROUTES.USER.COSMETICS.replace(":id", userId)}
						className="hover:underline lg:ml-0 sm:ml-auto"
					>
						See all {unlockedCosmetics} cosmetics unlocked
					</Link>
				) : (
					<p className="lg:ml-0 sm:ml-auto">No cosmetics unlocked</p>
				)}
			</div>
			<div className="lg:ml-auto flex items-center lg:max-w-[500px] lg:mt-0 mt-6">
				{someUnlockedCosmetics.length >= 5 ? (
					<Marquee
						autoFill
						gradient
						gradientColor="black"
						gradientWidth={50}
						speed={35}
						pauseOnHover={true}
					>
						{someUnlockedCosmetics.map((cosmetic) => (
							<div key={cosmetic.id} className="mr-2">
								<Link to={constants.ROUTES.USER.PROFILE.replace(":id", cosmetic.id)}>
									<img
										src={constants.COSMETICS[cosmetic.id].picture}
										alt="Cosmetic"
										className="w-12 h-12 rounded"
									/>
								</Link>
							</div>
						))}
					</Marquee>
				) : (
					<div className="flex flex-row">
						{someUnlockedCosmetics.map((cosmetic) => (
							<div key={cosmetic.id} className="mr-2">
								<Link
									to={
										constants.ROUTES.COSMETIC.ITEM.replace(":id", cosmetic.id) +
										"?name=" +
										cosmetic.name
									}
								>
									<img
										src={constants.COSMETICS[cosmetic.id].picture}
										alt="Cosmetic"
										className="w-16 h-16 rounded"
									/>
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Cosmetics;

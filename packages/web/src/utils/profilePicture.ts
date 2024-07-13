import FirstPicture from "../assets/images/avatars/1.webp";

const PICTURES: { [key: string]: string } = {
	"1": FirstPicture,
};

export default {
	getPicture: (id: string): string => {
		return PICTURES[id] || FirstPicture;
	},
};

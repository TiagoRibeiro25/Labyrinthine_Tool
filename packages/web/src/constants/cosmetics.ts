const PREFIX = "/cosmetics";
const ICONS_PREFIX = PREFIX + "/icons";
const PICTURES_PREFIX = PREFIX + "/pictures";

type Cosmetic = {
	icon: string;
	picture: string;
};

export default {
	"f2b899ee-a3ac-4cf2-bd22-7c5c74d59e3b": {
		icon: ICONS_PREFIX + "/f2b899ee-a3ac-4cf2-bd22-7c5c74d59e3b.png",
		picture: PICTURES_PREFIX + "/f2b899ee-a3ac-4cf2-bd22-7c5c74d59e3b.webp",
	},
} as Record<string, Cosmetic>;

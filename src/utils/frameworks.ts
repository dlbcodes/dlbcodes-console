import vueLogo from "../assets/icons/vue.svg";
import nuxtLogo from "../assets/icons/nuxt.svg";
import viteLogo from "../assets/icons/vite.svg";
import nodeLogo from "../assets/icons/node.svg";

const frameworkLogo: Record<string, string> = {
	Vue: vueLogo,
	Nuxt: nuxtLogo,
	VitePress: viteLogo,
	Node: nodeLogo,
};

export const getFrameworkLogo = (framework: string): string | undefined =>
	frameworkLogo[framework];
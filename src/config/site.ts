export interface SiteConfig {
	name: string;
	description: string;
	url: string;
	links: {
		github: string;
		twitter?: string;
	};
}

export const siteConfig: SiteConfig = {
	name: "Forge",
	description:
		"A reference application showcasing @dlbcodes/my-design-system — fully themeable, accessible, built from reusable components.",
	url: "https://dlbcodes-ui-showcase.vercel.app",
	links: {
		github: "https://github.com/dlbcodes/dlbcodes-console",
		twitter: "https://twitter.com/dlbcodes",
	},
};
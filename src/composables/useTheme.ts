import { ref, watch } from "vue";

export type Theme = "lattice" | "slate" | "zinc";
export type FontMode = "sans" | "mono";

export interface BrandInfo {
	name: string;
	tagline: string;
}

const THEMES: Record<Theme, BrandInfo> = {
	lattice: { name: "Lattice", tagline: "Structure for ambitious teams." },
	slate: { name: "Slate", tagline: "Clarity in every detail." },
	zinc: { name: "Zinc", tagline: "Simple. Sharp. Focused." },
};

// ─── Color theme (data-theme) ───
const current = ref<Theme>("slate");

const applyTheme = (theme: Theme): void => {
	document.documentElement.setAttribute("data-theme", theme);
};

watch(current, applyTheme, { immediate: true });

const fontMode = ref<FontMode>("sans");

const applyFont = (mode: FontMode): void => {
	document.documentElement.setAttribute("data-font", mode);
};

watch(fontMode, applyFont, { immediate: true });

export const useTheme = () => ({
	current,
	themes: THEMES,
	setTheme: (t: Theme): void => {
		current.value = t;
	},
	brand: () => THEMES[current.value],

	fontMode,
	setFontMode: (m: FontMode): void => {
		fontMode.value = m;
	},
	toggleFont: (): void => {
		fontMode.value = fontMode.value === "mono" ? "sans" : "mono";
	},
});
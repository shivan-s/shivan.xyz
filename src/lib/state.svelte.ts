import { browser } from '$app/environment';

export const DARK = 'dark';
export const LIGHT = 'light';
const THEMES = Object.freeze({ dark: DARK, light: LIGHT });
const THEME_KEY = 'theme';

type Theme = (typeof THEMES)[keyof typeof THEMES];

class ThemeManager {
	#theme = $state(
		Object.entries(THEMES)
			.map(([, t]) => t)
			.find((t) => t === (browser && !!localStorage && localStorage.getItem(THEME_KEY))) ??
			getSystemTheme()
	);

	setTheme(t: Theme) {
		if (localStorage) {
			localStorage.setItem(THEME_KEY, t);
		}
		this.#theme = t;
	}

	get current(): Theme {
		return this.#theme;
	}
}

function getSystemTheme(): Theme {
	if (browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return DARK;
	}
	return LIGHT;
}

export const theme = new ThemeManager();

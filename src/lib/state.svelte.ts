import { browser } from '$app/environment';

export const DARK = 'dark';
export const LIGHT = 'light';
const THEMES = [DARK, LIGHT] as const;
const THEME_KEY = 'theme';

type Themes = typeof THEMES;
type Theme = Themes[number];

class ThemeManager {
	#theme = $state(
		THEMES.find((t) => t === (browser && !!localStorage && localStorage.getItem(THEME_KEY))) ??
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
		return 'dark';
	}
	return 'light';
}

export const theme = new ThemeManager();

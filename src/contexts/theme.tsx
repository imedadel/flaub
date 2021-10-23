// Based on next-theme

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	useRef,
} from "react"

export interface UseThemeProps {
	/** Update the theme */
	setTheme: (theme: string) => void
	/** Active theme name */
	theme?: string
}

const ThemeContext = createContext<UseThemeProps>({
	setTheme: (_) => {},
})
export const useTheme = () => useContext(ThemeContext)

const colorSchemes = ["light", "dark"]
const MEDIA = "(prefers-color-scheme: dark)"

export const ThemeProvider: React.FC<{}> = ({ children }) => {
	const disableTransitionOnChange = true
	const enableColorScheme = true
	const storageKey = "theme"
	const value = {
		dark: "dark-theme",
		light: "light-theme",
	}
	const themes = ["light", "dark"]
	const enableSystem = true
	const attribute = "class"
	const defaultTheme = enableSystem ? "system" : "light"

	const [theme, setThemeState] = useState(() =>
		getTheme(storageKey, defaultTheme)
	)
	const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey))
	const attrs = !value ? themes : Object.values(value)

	const handleMediaQuery = useCallback(
		(e?) => {
			const systemTheme = getSystemTheme(e)
			setResolvedTheme(systemTheme)
			if (theme === "system") changeTheme(systemTheme, false)
		},
		[theme]
	)

	// Ref hack to avoid adding handleMediaQuery as a dep
	const mediaListener = useRef(handleMediaQuery)
	mediaListener.current = handleMediaQuery

	const changeTheme = useCallback(
		(theme, updateStorage = true, updateDOM = true) => {
			// @ts-ignore
			let name = value?.[theme] || theme

			const enable =
				disableTransitionOnChange && updateDOM ? disableAnimation() : null

			if (updateStorage) {
				try {
					localStorage.setItem(storageKey, theme)
				} catch (e) {
					// Unsupported
				}
			}

			if (theme === "system" && enableSystem) {
				const resolved = getSystemTheme()
				name = value?.[resolved] || resolved
			}

			if (updateDOM) {
				const d = document.documentElement

				if (attribute === "class") {
					d.classList.remove(...attrs)
					d.classList.add(name)
				} else {
					d.setAttribute(attribute, name)
				}
				enable?.()
			}
		},
		[]
	)

	useEffect(() => {
		const handler = (...args: any) => mediaListener.current(...args)

		// Always listen to System preference
		const media = window.matchMedia(MEDIA)

		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handler)
		handler(media)

		return () => media.removeListener(handler)
	}, [])

	const setTheme = useCallback((newTheme) => {
		changeTheme(newTheme)
		setThemeState(newTheme)
	}, [])

	// localStorage event handling
	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key !== storageKey) {
				return
			}
			// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
			const theme = e.newValue || defaultTheme
			setTheme(theme)
		}

		window.addEventListener("storage", handleStorage)
		return () => window.removeEventListener("storage", handleStorage)
	}, [setTheme])

	// color-scheme handling
	useEffect(() => {
		if (!enableColorScheme) return

		let colorScheme =
			theme && colorSchemes.includes(theme)
				? theme
				: // If theme is system, use the resolved version
				theme === "system"
				? resolvedTheme || null
				: null

		// color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
		// if color-scheme is null, this will remove the property
		document.documentElement.style.setProperty("color-scheme", colorScheme)
	}, [enableColorScheme, theme, resolvedTheme])

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

// Helpers
const getTheme = (key: string, fallback?: string) => {
	if (typeof window === "undefined") return undefined
	let theme
	try {
		theme = localStorage.getItem(key) || undefined
	} catch (e) {
		// Unsupported
	}
	return theme || fallback
}

const disableAnimation = () => {
	const css = document.createElement("style")
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
		)
	)
	document.head.appendChild(css)

	return () => {
		// Force restyle
		;(() => window.getComputedStyle(document.body))()

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css)
		}, 1)
	}
}

const getSystemTheme = (e?: MediaQueryList) => {
	if (!e) {
		e = window.matchMedia(MEDIA)
	}

	const isDark = e.matches
	const systemTheme = isDark ? "dark" : "light"
	return systemTheme
}

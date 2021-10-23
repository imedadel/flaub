// Based on next-theme

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

export interface UseFontProps {
	setFont: (font: string) => void
	font?: string
}

const FontContext = createContext<UseFontProps>({
	setFont: (_) => {},
})
export const useFont = () => useContext(FontContext)

export const FontProvider: React.FC<{}> = ({ children }) => {
	const storageKey = "font"
	const fonts = ["sans", "serif"]
	const attribute = "class"
	const defaultFont = "sans"
	const value = {
		serif: "serif-font",
		sans: "sans-font",
	}
	const [font, setFontState] = useState(() => getFont(storageKey, defaultFont))
	const attrs = !value ? fonts : Object.values(value)

	const changeFont = useCallback(
		(font, updateStorage = true, updateDOM = true) => {
			// @ts-ignore
			let name = value?.[font] || font

			if (updateStorage) {
				try {
					localStorage.setItem(storageKey, font)
				} catch (e) {
					// Unsupported
				}
			}

			if (updateDOM) {
				const d = document.documentElement

				if (attribute === "class") {
					d.classList.remove(...attrs)
					d.classList.add(name)
				} else {
					d.setAttribute(attribute, name)
				}
			}
		},
		[]
	)

	const setFont = useCallback((newFont) => {
		changeFont(newFont)
		setFontState(newFont)
	}, [])

	// localStorage event handling
	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key !== storageKey) {
				return
			}
			// If default font set, use it if localstorage === null (happens on local storage manual deletion)
			const font = e.newValue || defaultFont
			setFont(font)
		}

		window.addEventListener("storage", handleStorage)
		return () => window.removeEventListener("storage", handleStorage)
	}, [setFont])

	return (
		<FontContext.Provider
			value={{
				font,
				setFont,
			}}
		>
			{children}
		</FontContext.Provider>
	)
}

// Helpers
const getFont = (key: string, fallback?: string) => {
	if (typeof window === "undefined") return undefined
	let font
	try {
		font = localStorage.getItem(key) || undefined
	} catch (e) {
		// Unsupported
	}
	return font || fallback
}

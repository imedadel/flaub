import { useTheme } from "../contexts/theme"
import { useEffect, useState } from "react"
import { ReactComponent as Moon } from "../icons/Feather/moon.svg"
import { ReactComponent as Sun } from "../icons/Feather/sun.svg"
import { ReactComponent as Loader } from "../icons/Feather/loader.svg"
import clsx from "clsx"

export function ThemeSwitcher({
	className,
	...props
}: Omit<React.ComponentProps<"button">, "onClick">) {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	function handleClick() {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<button
			className={clsx(
				"transition p-2 hover:bg-gray3 active:bg-gray4 rounded text-gray12",
				className != null && className
			)}
			onClick={handleClick}
			disabled={!mounted}
			{...props}
		>
			{!mounted ? (
				<Loader className="animate-spin w-[1em] h-[1em]" />
			) : theme === "light" ? (
				<Sun className="w-[1em] h-[1em]" />
			) : (
				<Moon className="w-[1em] h-[1em]" />
			)}
		</button>
	)
}

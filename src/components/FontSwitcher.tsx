import { useFont } from "../contexts/font"
import { useEffect, useState } from "react"
import { ReactComponent as Square } from "../icons/Feather/square.svg"
import { ReactComponent as Circle } from "../icons/Feather/circle.svg"
import { ReactComponent as Loader } from "../icons/Feather/loader.svg"
import clsx from "clsx"

export function FontSwitcher({
	className,
	...props
}: Omit<React.ComponentProps<"button">, "onClick">) {
	const [mounted, setMounted] = useState(false)
	const { font, setFont } = useFont()

	useEffect(() => setMounted(true), [])

	function handleClick() {
		setFont(font === "sans" ? "serif" : "sans")
	}

	return (
		<button
			className={clsx(
				"transition p-2 hover:bg-gray3 active:bg-gray4 rounded text-gray12",
				className != null && className
			)}
			onClick={handleClick}
			disabled={!mounted}
			title="Font Switcher"
			{...props}
		>
			{!mounted ? (
				<Loader className="animate-spin w-[1em] h-[1em]" />
			) : font === "sans" ? (
				<Circle className="w-[1em] h-[1em]" />
			) : (
				<Square className="w-[1em] h-[1em]" />
			)}
		</button>
	)
}

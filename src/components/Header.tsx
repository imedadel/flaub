import { ThemeSwitcher } from "./ThemeSwitcher"
import { ReactComponent as Logo } from "../icons/Custom/logo.svg"

export function Header() {
	return (
		<div className="w-full flex h-16 items-center justify-between">
			<div className="text-lg">
				<Logo className="h-[1em] w-auto" />
			</div>
			<ThemeSwitcher />
		</div>
	)
}

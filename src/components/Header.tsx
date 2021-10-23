import { ThemeSwitcher } from "./ThemeSwitcher"
import { ReactComponent as Logo } from "../icons/Custom/logo.svg"
import { Link } from "wouter"
import { FontSwitcher } from "./FontSwitcher"

export function Header({
	showFontSwitcher = false,
}: { showFontSwitcher?: boolean } = {}) {
	return (
		<div className="w-full flex h-16 items-center justify-between">
			<Link href="/">
				<a>
					<div className="text-lg">
						<Logo className="h-[1em] w-auto" />
					</div>
				</a>
			</Link>
			<div className="flex items-center space-x-4">
				{showFontSwitcher && <FontSwitcher />}
				<ThemeSwitcher />
			</div>
		</div>
	)
}
